# Operations guide — khadijazaman.com

How the live site is built, deployed and updated. Commands are for macOS/Linux
Terminal; on Windows use Git Bash or PowerShell.

> This file used to be a pre-launch walkthrough (apply a patch → deploy to Netlify
> → point DNS). The site is live, so it now documents running it instead.

---

## How it deploys

There is no build step you run by hand and no Netlify involved.

```
push to main
  → .github/workflows/deploy.yml  (GitHub Actions)
  → npm ci && npx @11ty/eleventy
  → force-push _site/ to the `deploy` branch
  → Hostinger serves the `deploy` branch
```

So the live site always serves built HTML, never source. `src/.htaccess` ships with
the build and supplies compression, cache headers and the security headers
(HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

A push to `main` is all it takes. Watch the run under the repo's **Actions** tab.

---

## Publishing a blog post

**From the browser (no code):**

1. Go to `https://khadijazaman.com/admin/` and sign in with GitHub.
2. **Blog posts → New Blog post.**
3. Fill in Title, Publish date, Category, Short description, Read time, Body.
4. **Publish.** It commits to `main`, Actions rebuilds, and the post is live at
   `/blog/<slug>/` in about a minute. The blog index, category pages,
   `sitemap.xml`, `feed.xml` and `llms.txt` all regenerate themselves.

The editor is **Sveltia CMS** (a drop-in Decap/Netlify-CMS-compatible editor),
configured in `src/admin/config.yml`. Login is brokered by the Cloudflare Worker
in `oauth-worker/` — see that folder's README.

**From the repo:** add `src/posts/my-post.md` with this front matter, then commit
and push:

```markdown
---
title: "Your Post Title"
metaTitle: "Shorter Title For Search & Social"   # optional
date: 2026-08-05
category: "SEO"          # AI Search | GEO / AEO | SEO | Content Strategy | Automation
description: "One sentence for the card and the SEO meta description."
readTime: "6 min"
starter: false           # true shows the amber 'starter draft' banner
---

Your article in **Markdown**…
```

Every `##` heading automatically gets an `id` at build time and appears in the
article's table of contents — you don't need to add anchors yourself.

---

## Local development

```bash
npm install        # once
npm run serve      # live-reload dev server at http://localhost:8080
npm run build      # one-off production build into _site/
```

Always view the site through `npm run serve`, not by opening the HTML files
directly — the absolute `/css/…` paths won't resolve from `file://`.

---

## Configuration

Two values sit at the top of **`src/js/site.js`**:

```js
var WEB3FORMS_KEY     = '…';   // contact + newsletter delivery (web3forms.com)
var GA_MEASUREMENT_ID = '…';   // Google Analytics 4
```

Both are already set. Either can be blanked: with no Web3Forms key the forms fall
back to opening the visitor's email client, and with no GA4 ID analytics simply
doesn't load.

Site-wide values (URL, contact email, social links) live in `src/_data/site.js`.

---

## Adding images

- **From the CMS:** the editor uploads into `src/static/uploads/`.
- **From the repo:** drop files into `src/static/uploads/` (or
  `src/static/uploads/recognition/` for Work-page screenshots), commit and push.

⚠️ **Check that every referenced image exists before pushing.** `src/js/site.js`
hides any `.proof-shot`, `.case-shot` or article image that fails to load, so a
missing file disappears silently instead of showing a broken icon — a proof
screenshot can vanish with nothing to signal it. This check catches it:

```bash
grep -rho 'src="/static/uploads/[^"]*"\|href="/static/uploads/[^"]*"' src/ \
  --include=*.html --include=*.njk --include=*.md \
  | sed -e 's/.*="//' -e 's/"$//' | sort -u \
  | while read -r u; do [ -f "src${u}" ] || echo "MISSING $u"; done
```

---

## Troubleshooting

- **Build fails in Actions** → open the failing run under the **Actions** tab. The
  workflow pins Node 20; most failures are a syntax error in a template or a bad
  front-matter date.
- **A push didn't reach the live site** → check the Actions run succeeded *and*
  that the `deploy` branch got a new commit. Hostinger serves `deploy`, not `main`.
- **Contact form opens the email app instead of sending** → `WEB3FORMS_KEY` is
  blank or wrong in `src/js/site.js`.
- **`/admin/` won't log in** → the GitHub OAuth app's callback URL must match the
  Cloudflare Worker's `/callback`, and `base_url` in `src/admin/config.yml` must
  point at the worker. See `oauth-worker/README.md`.
- **An image isn't showing** → it's probably missing rather than broken. Run the
  check above.
- **Styles look wrong locally** → you opened the file directly instead of using
  `npm run serve`.
