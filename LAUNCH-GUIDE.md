# Launch guide — khadijazaman.com

Everything from "I have the patch file" to "the site is live on my domain with a
working blog." Follow the phases in order. Commands are for macOS/Linux Terminal
(on Windows use Git Bash, which comes with Git).

Time: ~45–60 minutes, most of it waiting on DNS.

---

## Phase 0 — Install the tools (one time)

You need three things on your computer:

1. **Git** — check with `git --version`. If missing: https://git-scm.com/downloads
2. **Node.js 20+** — check with `node --version`. If missing: https://nodejs.org (LTS).
3. **A GitHub account** you can push to (you already own `KhadijaZaman/portfolio-website`).

---

## Phase 1 — Get the new code onto GitHub

The new work (multi-page site, blue palette, CMS, forms, analytics, blog posts)
was delivered as a patch file: **`khadija-multipage-work.patch`**. You apply it
once to your `main` branch.

1. **Clone your repo** (skip if you already have it locally):
   ```bash
   git clone https://github.com/KhadijaZaman/portfolio-website.git
   cd portfolio-website
   ```
   If you already have it: `cd portfolio-website && git checkout main && git pull`

2. **Put the patch file in this folder** (move the downloaded
   `khadija-multipage-work.patch` into the `portfolio-website` folder).

3. **Apply it** — this replays the 5 commits onto `main`:
   ```bash
   git am < khadija-multipage-work.patch
   ```
   You should see "Applying: …" lines with no errors.
   *(If it complains, run `git am --abort` and tell me — I'll send a rebased patch.)*

4. **Preview locally before pushing** (optional but smart):
   ```bash
   npm install
   npm run serve
   ```
   Open http://localhost:8080 — click through Home, Work, About, Tools, Blog,
   Contact. Press `Ctrl+C` to stop when done.

5. **Push to GitHub:**
   ```bash
   git push origin main
   ```
   Your repo now has the full site. ✅

> Prefer a review step instead of pushing straight to `main`? Do
> `git checkout -b launch` before step 3, push that branch, open a Pull Request
> on GitHub, and merge it when happy. Netlify (next phase) builds `main`.

---

## Phase 2 — Deploy to Netlify (get a live URL)

1. Go to **https://www.netlify.com** and **sign up with GitHub** (free).
2. **Add new site → Import an existing project → Deploy with GitHub.**
3. Authorize Netlify, then pick **`portfolio-website`**.
4. Netlify auto-reads `netlify.toml`, so the fields are already correct:
   - **Build command:** `npm run build`
   - **Publish directory:** `_site`
5. Click **Deploy**. Wait ~1 minute → you get a URL like
   `https://random-name-123.netlify.app`. Open it and confirm the site and
   `/blog/` look right.

*(Every future `git push` to `main` now auto-rebuilds and redeploys.)*

---

## Phase 3 — Turn on the contact form + analytics

Both are two lines at the very top of **`src/js/site.js`**:
```js
var WEB3FORMS_KEY     = '';   // ← paste key here
var GA_MEASUREMENT_ID = '';   // ← paste GA4 ID here
```

### 3a. Contact + newsletter forms (Web3Forms — free, no backend)
1. Go to **https://web3forms.com**, enter the email where you want enquiries to
   land, and copy the **Access Key** they email/show you.
2. Paste it: `var WEB3FORMS_KEY = 'your-key-here';`
3. Save.

### 3b. Analytics (Google Analytics 4)
1. Go to **https://analytics.google.com** → Admin → **Create property** for
   khadijazaman.com → add a **Web** data stream.
2. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`).
3. Paste it: `var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';`
4. Save.

### 3c. Ship it
```bash
git add src/js/site.js
git commit -m "Configure Web3Forms key and GA4 analytics"
git push origin main
```
Netlify redeploys in ~1 min. Test the contact form on the live site — you should
get an email, and GA4 **Realtime** should show your visit.

---

## Phase 4 — Turn on the CMS login (so you can write posts at /admin/)

The editor is **Sveltia CMS**, which logs in with GitHub. You need one GitHub
OAuth app, brokered by Netlify.

1. **Create the OAuth app:** GitHub → your avatar → **Settings → Developer
   settings → OAuth Apps → New OAuth App**:
   - **Application name:** `khadijazaman.com CMS`
   - **Homepage URL:** your live URL (the `.netlify.app` one, or the domain once set)
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
   - Click **Register application**, then **Generate a new client secret**.
   - Copy the **Client ID** and **Client secret**.
2. **Give them to Netlify:** Netlify dashboard → your site → **Site
   configuration → Access & security → OAuth → Install provider → GitHub** →
   paste the Client ID + secret → save.
3. **Log in:** go to `https://<your-site>/admin/`, click **Sign in with GitHub**,
   authorize. You're in the editor.

*(Hosting on Cloudflare/Vercel instead of Netlify later? Use the worker in
`oauth-worker/` — its README has the steps.)*

---

## Phase 5 — Point your domain (khadijazaman.com)

1. Netlify dashboard → **Domain management → Add a domain →** type
   `khadijazaman.com` → verify.
2. Netlify shows you DNS records. Two ways to finish:
   - **Easiest:** at your domain registrar, change the **nameservers** to the
     ones Netlify gives you (they then manage DNS + SSL).
   - **Or** keep your registrar's DNS and add the **A / CNAME records** Netlify
     shows.
3. Wait for DNS to propagate (minutes to a few hours). Netlify auto-provisions
   **HTTPS** once it resolves. Done — the site is live at your domain.

4. **Update the OAuth Homepage URL** (Phase 4, step 1) to
   `https://khadijazaman.com` once the domain is live.

---

## Phase 6 — Content polish (anytime)

- **Add your recognition screenshots:** drop the images into
  `src/static/uploads/recognition/` using the filenames referenced on the Work
  page (e.g. `traffic-growth.png`), commit, push. Missing tiles hide
  themselves, so add as many or as few as you have.
- **Replace the hero/about photo** if you want a different one (currently a
  Builder.io-hosted image referenced in `src/index.html` and `src/about/`).
- **Check the footer/contact details** (email, phone, LinkedIn) across pages.

---

## How you'll add blog posts from now on

**The easy way (no code):**
1. Go to `khadijazaman.com/admin/` and sign in with GitHub.
2. **Blog posts → New Blog post.**
3. Fill Title, Publish date, Category, Short description, Read time, Body.
4. **Publish.** It commits to GitHub → Netlify rebuilds → the post is live at
   `/blog/<slug>/` in ~1 minute, and the blog index + `sitemap.xml` update
   themselves.

**The code way (if you're already in the repo):** add a file
`src/posts/my-post.md` with this top block, then commit + push:
```markdown
---
title: "Your Post Title"
date: 2026-08-05
category: "SEO"
description: "One sentence for the card and the SEO meta description."
readTime: "6 min"
starter: false
---

Your article in **Markdown**…
```

---

## Quick troubleshooting

- **`git am` fails / conflicts** → `git am --abort`, then ask me for a fresh patch.
- **Netlify build fails** → open the deploy log; usually a Node version issue —
  `netlify.toml` pins Node 20, which is correct.
- **Contact form does nothing / opens email app** → `WEB3FORMS_KEY` is still
  blank or wrong. Re-check Phase 3a and that you pushed.
- **`/admin/` won't log in** → the GitHub OAuth callback must be exactly
  `https://api.netlify.com/auth/done`, and the provider must be installed in
  Netlify (Phase 4).
- **Images/CSS look unstyled locally** → make sure you opened the site through
  `npm run serve` (http://localhost:8080), not by double-clicking the HTML file.

---

## The 6-line version

```bash
git clone https://github.com/KhadijaZaman/portfolio-website.git
cd portfolio-website
git am < khadija-multipage-work.patch
git push origin main
# → Netlify: import repo, deploy
# → paste WEB3FORMS_KEY + GA4 ID in src/js/site.js, push; set up /admin OAuth; point domain
```
