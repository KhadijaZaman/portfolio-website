# khadijazaman.com

Personal-brand website for **Khadija Zaman** — Marketing Manager specialising in **SEO, AI search visibility (GEO/AEO), content strategy, and marketing automation**.

Content-first, multi-page site: a homepage gateway, an about page, a work/case-studies page, a **CMS-driven blog**, a tools hub (with four free in-browser tools), a contact page, and a crawlable XML sitemap. Built with a lightweight static-site generator so **new blog posts are written in a visual editor — no code**.

---

## How it's built

- **Static hand-built pages** — Home, About, Tools, Contact live as plain HTML in `src/` and are copied through the build untouched. They rarely change.
- **Generated blog** — each post is a Markdown file in `src/posts/`. [Eleventy](https://www.11ty.dev/) renders it through the shared layout into `/blog/<slug>/`, and **regenerates the blog index and `sitemap.xml` automatically**.
- **Visual CMS** — [Sveltia CMS](https://github.com/sveltia/sveltia-cms) at `/admin/` lets you write and publish posts from a browser. It logs in with GitHub through the Cloudflare Worker in `oauth-worker/`, and publishing commits straight to `main`.

```
Write in /admin  →  commit to main  →  GitHub Actions builds  →  Hostinger serves  →  live in ~1 min
```

## Repo layout

```
src/
  index.njk             Home            (rendered, but self-contained HTML)
  about/  work/  tools/  contact/       (static, passthrough)
  tools/<slug>/         Four free in-browser tools (static, passthrough)
  posts/*.md            Blog posts      (Markdown → generated HTML)
  blog.njk              Blog index      (generated from posts)
  blog-category.njk     /blog/category/<slug>/ pages
  sitemap.njk           sitemap.xml     (generated from posts)
  feed.njk              feed.xml        (RSS)
  llms.njk              llms.txt        (llmstxt.org summary for AI crawlers)
  _includes/
    base.njk            Shared shell: head, nav, newsletter, footer
    post.njk            Article layout (+ BlogPosting/Breadcrumb JSON-LD)
  _data/site.js         Site-wide values (url, email, socials)
  _data/buildDate.js    Build timestamp (used for sitemap lastmod)
  admin/                Sveltia CMS (index.html + config.yml)
  css/main.css          Design system (shared by every page)
  js/site.js            Shared behaviour (nav, reveal, forms, tools UI)
  static/uploads/       Images uploaded from the CMS
  .htaccess             Apache/LiteSpeed config for Hostinger (caching, security headers)
.eleventy.js            Build config
.github/workflows/deploy.yml  Builds on push to main, publishes _site/ to the deploy branch
oauth-worker/           Cloudflare Worker backing the CMS GitHub login
package.json            Eleventy dependency + scripts
```

The output builds to `_site/` (git-ignored; GitHub Actions generates it and force-pushes it to the `deploy` branch, which Hostinger serves).

## Local development

```bash
npm install        # once
npm run serve      # live-reload dev server at http://localhost:8080
npm run build      # one-off production build into _site/
```

## Publishing a blog post

**The easy way (no code):** go to `https://khadijazaman.com/admin/`, log in, click **New Blog post**, fill in title / date / category / description / body, and **Publish**. The site rebuilds itself.

**The manual way (in the repo):** add a Markdown file to `src/posts/`, e.g. `src/posts/my-post.md`:

```markdown
---
title: "My post title"
date: 2026-08-01
category: "SEO"          # AI Search | GEO / AEO | SEO | Content Strategy | Automation
description: "One-line summary for the card + search snippet."
readTime: "6 min"
starter: false           # true shows the amber 'starter draft' banner
---

Your article body in Markdown…
```

Commit and push — the blog index and sitemap update on the next build.

## Hosting & deployment

The site is hosted on **Hostinger** and deployed by GitHub Actions — there is no Netlify
involvement despite what `SETUP-NETLIFY.md` still describes (that file is obsolete).

```
push to main  →  .github/workflows/deploy.yml  →  npx @11ty/eleventy
              →  force-push _site/ to the `deploy` branch  →  Hostinger serves it
```

So the live site always serves built HTML, never source. `src/.htaccess` ships with the build
and supplies compression, cache headers, and the security headers (HSTS, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`).

CMS login goes through the Cloudflare Worker in `oauth-worker/`, configured in
`src/admin/config.yml` via `base_url`.

## SEO / AEO

- Per-page `<title>`, meta description, canonical, Open Graph + Twitter meta.
- JSON-LD on every page: `Person` + `WebSite` (home), `AboutPage`, `CollectionPage` (work), `Blog` / `BlogPosting`, `ContactPage`, `WebApplication` (each free tool), `BreadcrumbList`.
- `robots.txt` + generated `sitemap.xml`, open to search and AI answer-engine crawlers.
- Generated `llms.txt` ([llmstxt.org](https://llmstxt.org/)) summarising the site for AI answer engines.
- Generated `feed.xml` (RSS).

## Content status

All four published posts are real (`starter: false`); the `starter` flag remains available for drafts. The contact and newsletter forms post to **Web3Forms** (key in `src/js/site.js`), falling back to `mailto:` if the key is cleared. The three proprietary tools' "Request access" buttons still point at `/contact/` until those tools have public URLs.

## Links
- LinkedIn: https://www.linkedin.com/in/khadija-zaman-2628751b1/
- Email: hello@khadijazaman.com
