/* Eleventy config for khadijazaman.com
   - Home / About / Tools / Contact stay as hand-built static HTML (passthrough-copied)
   - The blog is generated from Markdown in src/posts/ through the shared layouts
   - The blog index and sitemap.xml are generated from the posts collection
*/
module.exports = function (eleventyConfig) {
  // Only treat Nunjucks + Markdown as templates; everything else is copied verbatim.
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  // Static pages & assets — copied through untouched.
  [
    "about", "work", "tools", "contact",
    "css", "js", "admin", "static",
    "robots.txt", ".htaccess", "og-image.png", "site.webmanifest",
    "favicon.ico", "favicon.svg", "favicon-96x96.png",
    "apple-touch-icon.png",
    "web-app-manifest-192x192.png", "web-app-manifest-512x512.png"
  ].forEach((p) => eleventyConfig.addPassthroughCopy("src/" + p));

  // Stable slug used for both heading ids and the /blog/category/<slug>/ pages,
  // so a TOC anchor and its heading can never drift apart.
  const slug = (s) =>
    String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  // Give every article h2 an id at BUILD time. Previously these were assigned in
  // the browser, so section anchors existed in no served HTML — invisible to
  // crawlers that don't run JS, and impossible to deep-link.
  eleventyConfig.amendLibrary("md", (md) => {
    md.core.ruler.push("heading_ids", (state) => {
      const used = new Map(); // per-document, so repeated headings dedupe predictably
      state.tokens.forEach((token, i) => {
        if (token.type !== "heading_open" || token.tag !== "h2") return;
        const inline = state.tokens[i + 1];
        const base = slug(inline && inline.type === "inline" ? inline.content : "");
        if (!base) return;
        const n = used.get(base) || 0;
        used.set(base, n + 1);
        token.attrSet("id", n === 0 ? base : `${base}-${n + 1}`);
      });
    });
  });

  // Pull {id, text} for each h2 out of rendered post HTML, so post.njk can print
  // the table of contents at build time instead of leaving an empty <ul> for JS.
  eleventyConfig.addFilter("tocFromHtml", (html) => {
    const out = [];
    const re = /<h2[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;
    let m;
    while ((m = re.exec(String(html || "")))) {
      const text = m[2].replace(/<[^>]*>/g, "").trim();
      if (text) out.push({ id: m[1], text });
    }
    return out;
  });

  // Date helpers (UTC-stable, no external dependency).
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  eleventyConfig.addFilter("readableDate", (d) => {
    const x = new Date(d);
    return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("rssDate", (d) => new Date(d).toUTCString());

  // Small array helpers for "read next" / "latest posts".
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("excludeUrl", (arr, url) => (arr || []).filter((p) => p.url !== url));
  eleventyConfig.addFilter("slugify", slug);
  // Posts sharing a category with the given post first, then the rest ("read next").
  eleventyConfig.addFilter("relatedByCategory", (posts, url, category) => {
    const same = (posts || []).filter((p) => p.url !== url && p.data.category === category);
    const rest = (posts || []).filter((p) => p.url !== url && p.data.category !== category);
    return same.concat(rest);
  });

  // Blog posts, newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  // Distinct categories with their posts (for /blog/category/<slug>/ pages).
  eleventyConfig.addCollection("categories", (api) => {
    const posts = api.getFilteredByGlob("src/posts/*.md");
    const map = new Map();
    posts.forEach((p) => {
      const c = p.data.category || "Uncategorized";
      if (!map.has(c)) map.set(c, []);
      map.get(c).push(p);
    });
    return Array.from(map, ([title, items]) => ({
      title,
      slug: slug(title),
      posts: items.sort((a, b) => b.date - a.date)
    }));
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
