# Setup: hosting + the visual CMS on Netlify

One-time setup. After this, publishing a blog post is just: open `/admin`, write, click **Publish**.

Everything in the repo is already configured for this — you only need to do the account/click steps below.

---

## 1. Get the code onto GitHub

Make sure this branch is pushed to your `KhadijaZaman/portfolio-website` repo. (It's committed on `claude/khadijazaman-website-setup-j455bf` — merge it into `main`, since the CMS and Netlify build from `main`.)

## 2. Connect the repo to Netlify

1. Sign up / log in at **[netlify.com](https://www.netlify.com/)** (free) with your GitHub account.
2. **Add new site → Import an existing project → GitHub → `portfolio-website`.**
3. Netlify reads `netlify.toml`, so the build settings are auto-filled:
   - **Build command:** `npm run build`
   - **Publish directory:** `_site`
4. Click **Deploy**. In ~1 minute you'll get a live `something.netlify.app` URL. Confirm the site and `/blog/` look right.

## 3. Turn on the CMS login (Netlify Identity + Git Gateway)

The `/admin` editor needs a login provider. Decap is already wired to `git-gateway`, so:

1. In your site's Netlify dashboard: **Integrations / Identity → Enable Identity.**
   *(On newer Netlify UIs this may appear under "Add-ons" or you may need to enable the "Identity" beta — it's still available.)*
2. Under **Identity → Registration**, set it to **Invite only** (so only you can log in).
3. Under **Identity → Services → Git Gateway**, click **Enable Git Gateway.** This is what lets the CMS commit to GitHub on your behalf.
4. Under **Identity → Invite users**, invite your own email. Accept the emailed invite and set a password.

## 4. Log in and publish

1. Go to `https://<your-site>/admin/` (or `https://khadijazaman.com/admin/` once the domain is live).
2. Log in with the Identity account you just created.
3. **New Blog post → fill in the fields → Publish.** It commits to `main`; Netlify rebuilds; the post is live in about a minute, and the blog index + sitemap update themselves.

## 5. Point your domain

1. Netlify dashboard → **Domain management → Add a domain → `khadijazaman.com`.**
2. Either move your DNS to Netlify (they give you nameservers) **or** add the records they show at your current registrar.
3. Netlify provisions HTTPS automatically. Done.

---

## Notes & alternatives

- **Cloudflare Pages instead of Netlify?** Same build settings (`npm run build` → `_site`), but the CMS login needs a small GitHub OAuth worker instead of Identity/Git Gateway. Ask and I'll switch `src/admin/config.yml` to the GitHub backend and add the worker.
- **Prefer reviewing posts before they go live?** In `src/admin/config.yml`, change `publish_mode: simple` to `publish_mode: editorial_workflow` — the CMS then opens a pull request per post instead of committing straight to `main`.
- **Editor images** upload to `src/static/uploads/` and serve from `/static/uploads/`.
- **No build step locally?** You don't need one to edit content — the CMS handles it. For dev, `npm install` then `npm run serve`.
