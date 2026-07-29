# khadijazaman.com

Personal-brand website for **Khadija Zaman** — Marketing Manager specialising in **SEO, AI search visibility (GEO/AEO), content strategy, and marketing automation**.

Content-first, multi-page site (modelled on nicklafferty.com): a homepage gateway, an about page, a **CMS-driven blog**, a tools hub, a contact page, and a crawlable XML sitemap. Built with a lightweight static-site generator so **new blog posts are written in a visual editor — no code**.

---

## How it's built

- **Static hand-built pages** — Home, About, Tools, Contact live as plain HTML in `src/` and are copied through the build untouched. They rarely change.
- **Generated blog** — each post is a Markdown file in `src/posts/`. [Eleventy](https://www.11ty.dev/) renders it through the shared layout into `/blog/<slug>/`, and **regenerates the blog index and `sitemap.xml` automatically**.
- **Visual CMS** — [Decap CMS](https://decapcms.org/) at `/admin/` lets you write and publish posts from a browser. Publishing commits to GitHub, which triggers a Netlify rebuild.

```
Write in /admin  →  commit to GitHub  →  Netlify rebuilds  →  live in ~1 min
```

## Repo layout

```
src/
  index.html            Home            (static, passthrough)
  about/  tools/  contact/              (static, passthrough)
  posts/*.md            Blog posts      (Markdown → generated HTML)
  blog.njk              Blog index      (generated from posts)
  sitemap.njk           sitemap.xml     (generated from posts)
  _includes/
    base.njk            Shared shell: head, nav, newsletter, footer
    post.njk            Article layout (+ BlogPosting/Breadcrumb JSON-LD)
  _data/site.js         Site-wide values (url, email, socials)
  admin/                Decap CMS (index.html + config.yml)
  css/main.css          Design system (shared by every page)
  js/site.js            Shared behaviour (nav, reveal, forms)
  static/uploads/       Images uploaded from the CMS
.eleventy.js            Build config
netlify.toml            Netlify build settings
package.json            Eleventy dependency + scripts
```

The output builds to `_site/` (git-ignored; Netlify generates it).

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

## Hosting & first-time setup

See **[SETUP-NETLIFY.md](./SETUP-NETLIFY.md)** for the one-time steps: connect the repo to Netlify, turn on Identity + Git Gateway (the CMS login), invite yourself, and point the domain.

## SEO / AEO

- Per-page `<title>`, meta description, canonical, Open Graph + Twitter meta.
- JSON-LD on every page: `Person` + `WebSite` (home), `AboutPage`, `Blog` / `BlogPosting`, `ContactPage`, `BreadcrumbList`.
- `robots.txt` + generated `sitemap.xml`, open to search and AI answer-engine crawlers.

## Content status

The three seeded posts carry a **"starter draft" banner** — replace them with your own writing (or unset `starter`). The newsletter form and the tools' "Request access" buttons are placeholders (mailto / contact) until an email provider and public tool URLs are wired in.

## Links
- LinkedIn: https://www.linkedin.com/in/khadija-zaman-2628751b1/
- Email: khadijarafiqzaman@gmail.com
