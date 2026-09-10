/* Markdown twins for every page.

   Runs after Eleventy (see "build" in package.json). For each _site/**\/index.html
   it converts the rendered <main> to Markdown and writes index.md beside it, so
   every page is also available at <url>index.md and, through the rewrite rules
   in src/.htaccess, on a request carrying `Accept: text/markdown`.

   The twin is generated from the rendered page, never from source, so it
   cannot drift from what a browser sees. Each directory also gets a small
   .htaccess that sets the X-Markdown-Twin header naming the mechanism and the
   bytes saved, a canonical Link back to the HTML, and noindex on the twin so
   search engines do not treat it as a duplicate page.

   Prints a before/after byte table; the heaviest page is the shareable number.
*/
const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");

const OUT = path.resolve(__dirname, "..", "_site");
const SITE = "https://khadijazaman.com";
const SKIP = new Set(["/admin/"]);

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-", emDelimiter: "*" });
td.remove(["script", "style", "svg", "canvas", "form", "button", "noscript", "iframe", "template"]);
// Decorative or interactive blocks that carry no reading value out of the page.
const DROP = ["lightbox", "cg", "cg-mobile", "curve", "hero-orb-1", "hero-orb-2", "sec-bg-orb", "sec-canvas", "page-hero-orb", "contact-glow", "newsletter-glow", "pc-dots", "pc-arrow", "skip-nav", "cg-prompt", "cg-m-prompt", "toc", "author-box", "read-next"];
td.addRule("drop-decorative", {
  filter: (node) => node.nodeType === 1 && node.classList && DROP.some((c) => node.classList.contains(c)),
  replacement: () => ""
});
// Figures keep their image and caption on separate lines.
td.addRule("figure", {
  filter: "figure",
  replacement: (content) => "\n\n" + content.trim() + "\n\n"
});
td.addRule("figcaption", { filter: "figcaption", replacement: (c) => "\n*" + c.trim() + "*\n" });
// Tables: turndown core drops them; emit a simple pipe table.
td.addRule("table", {
  filter: "table",
  replacement: (content, node) => {
    const rows = Array.from(node.querySelectorAll("tr")).map((tr) => Array.from(tr.querySelectorAll("th,td")).map((c) => c.textContent.replace(/\s+/g, " ").trim().replace(/\|/g, "\\|")));
    if (!rows.length) return "";
    const head = rows[0], body = rows.slice(1);
    const line = (r) => "| " + r.join(" | ") + " |";
    return "\n\n" + line(head) + "\n| " + head.map(() => "---").join(" | ") + " |\n" + body.map(line).join("\n") + "\n\n";
  }
});

const meta = (html, re) => { const m = html.match(re); return m ? m[1].replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').trim() : ""; };
const walk = (dir, out = []) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === "index.html") out.push(p); } return out; };

const rows = [];
const answers = [];
for (const file of walk(OUT)) {
  const dir = path.dirname(file);
  const url = ("/" + path.relative(OUT, dir).split(path.sep).join("/") + "/").replace("//", "/");
  if (SKIP.has(url)) continue;
  const html = fs.readFileSync(file, "utf8");
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [])[1];
  if (!main) continue;
  const title = meta(html, /<title>([^<]*)<\/title>/i);
  const description = meta(html, /<meta name="description" content="([^"]*)"/i);
  const modified = (html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/) || [])[1] || "";
  let body = td.turndown(main)
    .replace(/\[\s*\]\([^)]*\)/g, "")      // links whose only content was a dropped element
    .replace(/\n{3,}/g, "\n\n").trim();
  // Direct-answer index for the grounded answer endpoint: the question and
  // answer from the page's #answer block, plus the selectors that locate them.
  const q = (main.match(/class="answer-q"[^>]*>([\s\S]*?)<\/h[23]>/) || [])[1];
  const ans = (main.match(/class="answer-a"[^>]*>([\s\S]*?)<\/p>/) || [])[1];
  const strip = (h) => h ? h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").replace(/&amp;/g, "&").replace(/&rsquo;|&#39;/g, "'").trim() : null;
  if (q && ans) answers.push({ url: SITE + url, title, question: strip(q), answer: strip(ans), selector: ["#answer .answer-q", "#answer .answer-a"], modified: modified || null });
  const md = [
    `# ${title}`,
    "",
    description ? `> ${description}` : "",
    "",
    `Source: ${SITE}${url}` + (modified ? `  ·  Last modified: ${modified}` : ""),
    "",
    body,
    "",
    "---",
    `Markdown twin of ${SITE}${url}, generated from the rendered page at build time. Cite the HTML URL. How to cite: ${SITE}/llms.txt`,
    ""
  ].filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n");
  fs.writeFileSync(path.join(dir, "index.md"), md);
  const htmlBytes = Buffer.byteLength(html), mdBytes = Buffer.byteLength(md), saved = htmlBytes - mdBytes;
  rows.push({ url, htmlBytes, mdBytes, saved, pct: Math.round((saved / htmlBytes) * 100) });

  const ht = [
    "# Generated by scripts/markdown-twins.js. Names the markdown twin, what it saved, and keeps it out of search indexes.",
    "<IfModule mod_headers.c>",
    `  <Files "index.html">`,
    `    Header set X-Markdown-Twin "${url}index.md; html-bytes=${htmlBytes}; md-bytes=${mdBytes}; saved=${saved}"`,
    `    Header set Link '<${SITE}${url}index.md>; rel="alternate"; type="text/markdown"'`,
    `    Header set Vary "Accept, Accept-Encoding"`,
    "  </Files>",
    `  <Files "index.md">`,
    `    Header set X-Markdown-Twin "generated-from-rendered-html; html-bytes=${htmlBytes}; md-bytes=${mdBytes}; saved=${saved}"`,
    `    Header set Link '<${SITE}${url}>; rel="canonical"; type="text/html"'`,
    `    Header set Vary "Accept, Accept-Encoding"`,
    `    Header set X-Robots-Tag "noindex"`,
    "  </Files>",
    "</IfModule>",
    ""
  ].join("\n");
  const htPath = path.join(dir, ".htaccess");
  if (fs.existsSync(htPath)) fs.appendFileSync(htPath, "\n" + ht); else fs.writeFileSync(htPath, ht);
}

fs.writeFileSync(path.join(OUT, "answers.json"), JSON.stringify({ site: SITE, generated: new Date().toISOString().slice(0, 10), about: "Every direct-answer block on khadijazaman.com: the question a page answers and a two-sentence answer that stays true out of context, with the page URL and the CSS selectors that locate it (the same selectors as the page's Speakable markup). Quote the answer verbatim and cite the url.", count: answers.length, answers }, null, 2));
console.log(`[answers] ${answers.length} direct answers indexed in answers.json`);
rows.sort((a, b) => b.htmlBytes - a.htmlBytes);
fs.writeFileSync(path.join(OUT, "markdown-twins.json"), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), mechanism: "Accept: text/markdown → <url>index.md (also at /<path>.md); generated from the rendered page", pages: rows }, null, 2));
const w = (s, n) => String(s).padEnd(n);
console.log(`[twins] ${rows.length} markdown twins written`);
console.log(w("url", 40) + w("html", 9) + w("md", 8) + "saved");
for (const r of rows.slice(0, 6)) console.log(w(r.url, 40) + w(r.htmlBytes, 9) + w(r.mdBytes, 8) + `${r.saved} (${r.pct}%)`);
