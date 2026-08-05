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

## 3. Turn on the CMS login (GitHub OAuth via Netlify)

The `/admin` editor is **Sveltia CMS**, wired to the GitHub backend — you log in
with your GitHub account, no Netlify Identity needed. GitHub needs one OAuth app,
and Netlify hosts the OAuth handshake for you:

1. **Create a GitHub OAuth app.** GitHub → **Settings → Developer settings →
   OAuth Apps → New OAuth App**:
   - **Homepage URL:** `https://khadijazaman.com` (or your `.netlify.app` URL)
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
   - Click **Register**, then **Generate a new client secret**. Copy the
     **Client ID** and **Client secret**.
2. **Give Netlify the OAuth app.** Netlify dashboard → **Site configuration →
   Access & security → OAuth → Install provider → GitHub**, and paste the
   Client ID + secret from step 1.
3. That's it — Netlify now brokers the GitHub login for `/admin/`. (Sveltia
   uses this same Netlify OAuth flow that Decap/Netlify CMS use.)

## 4. Log in and publish

1. Go to `https://<your-site>/admin/` (or `https://khadijazaman.com/admin/` once the domain is live).
2. Click **Sign in with GitHub** and authorize.
3. **New Blog post → fill in the fields → Publish.** It commits to `main`; Netlify rebuilds; the post is live in about a minute, and the blog index + sitemap update themselves.

> Editing locally? Run `npx @sveltia/cms-proxy-server` in the repo, then open
> `http://localhost:8080/admin/` — Sveltia reads/writes your working tree directly
> (this is what `local_backend: true` in `config.yml` enables).

## 5. Point your domain

1. Netlify dashboard → **Domain management → Add a domain → `khadijazaman.com`.**
2. Either move your DNS to Netlify (they give you nameservers) **or** add the records they show at your current registrar.
3. Netlify provisions HTTPS automatically. Done.

---

## Notes & alternatives

- **Cloudflare Pages / Vercel instead of Netlify?** Same build settings (`npm run build` → `_site`). Sveltia's GitHub backend still works — either keep using Netlify's OAuth endpoint (step 3 above) even while hosting elsewhere, or deploy a tiny GitHub OAuth worker. Ask and I'll wire it up.
- **Prefer reviewing posts before they go live?** In `src/admin/config.yml`, change `publish_mode: simple` to `publish_mode: editorial_workflow` — the CMS then opens a pull request per post instead of committing straight to `main`.
- **Editor images** upload to `src/static/uploads/` and serve from `/static/uploads/`.
- **No build step locally?** You don't need one to edit content — the CMS handles it. For dev, `npm install` then `npm run serve`.
