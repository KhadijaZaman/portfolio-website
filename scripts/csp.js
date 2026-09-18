/* Content-Security-Policy for every page, computed from the built site.

   Runs last in "build" (see package.json). Every page carries a few inline
   <script> blocks (the .js class flag, the home canvases, each tool's own
   logic) and two inline event handlers (the Google Fonts onload swap and the
   CV print button). Rather than 'unsafe-inline', this script hashes each one
   from the rendered HTML and writes a policy that allows exactly those, then
   replaces the placeholder line in _site/.htaccess (copied from src/).

   Anything new that is inline is picked up on the next build; anything that
   is not in the built HTML is not allowed. JSON blocks (ld+json, the curve
   data) are never executed, so CSP does not apply to them and they are not
   hashed. */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const OUT = path.resolve(__dirname, "..", "_site");
const HT = path.join(OUT, ".htaccess");
const PLACEHOLDER = /^[ \t]*# CSP: written by scripts\/csp\.js at build time[^\n]*$|^[ \t]*Header set Content-Security-Policy .*$/m;

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "admin") walk(p, acc); }
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}
const sha = (s) => "'sha256-" + crypto.createHash("sha256").update(s, "utf8").digest("base64") + "'";

const scriptHashes = new Set();
const handlerHashes = new Set();
let scripts = 0, handlers = 0;
for (const file of walk(OUT, [])) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = (attrs.match(/\btype\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (type && !/^(text|application)\/(javascript|ecmascript)$|^module$/i.test(type)) continue;
    scripts++; scriptHashes.add(sha(m[2]));
  }
  for (const m of html.matchAll(/\son[a-z]+\s*=\s*"([^"]*)"/gi)) { handlers++; handlerHashes.add(sha(m[1])); }
}

const policy = [
  "default-src 'self'",
  ["script-src 'self'", ...scriptHashes, ...(handlerHashes.size ? ["'unsafe-hashes'", ...handlerHashes] : []), "https://static.cloudflareinsights.com"].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://api.web3forms.com https://cloudflareinsights.com https://static.cloudflareinsights.com",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "upgrade-insecure-requests"
].join("; ");

const ht = fs.readFileSync(HT, "utf8");
if (!PLACEHOLDER.test(ht)) throw new Error("csp.js: no placeholder line found in _site/.htaccess");
fs.writeFileSync(HT, ht.replace(PLACEHOLDER, `  Header set Content-Security-Policy "${policy}"`));
console.log(`[csp] ${scriptHashes.size} inline script hashes (${scripts} blocks), ${handlerHashes.size} handler hashes (${handlers} attributes); policy is ${policy.length} bytes`);
