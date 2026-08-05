# CMS GitHub OAuth worker (optional)

The `/admin/` editor (Sveltia CMS) logs in with GitHub. On **Netlify** you don't
need this worker — you can register a GitHub OAuth app in Netlify's dashboard
(see the repo's `SETUP-NETLIFY.md`). Use this worker instead when you host the
site on **Cloudflare Pages, Vercel, GitHub Pages, or anywhere without Netlify's
OAuth broker**.

It's a tiny Cloudflare Worker that runs the GitHub OAuth handshake and hands the
token back to the CMS popup.

## Deploy (one time, ~5 minutes)

1. **Install Wrangler** and log in:
   ```bash
   npm i -g wrangler
   wrangler login
   ```

2. **Create a GitHub OAuth app** — GitHub → Settings → Developer settings →
   OAuth Apps → **New OAuth App**:
   - **Homepage URL:** `https://khadijazaman.com`
   - **Authorization callback URL:** `https://<your-worker-subdomain>.workers.dev/callback`
     (you'll get the exact worker URL after the first `wrangler deploy`; update
     the OAuth app afterwards if needed)
   - Generate a **client secret** and copy both the Client ID and secret.

3. **Deploy the worker** from this folder:
   ```bash
   cd oauth-worker
   wrangler deploy
   wrangler secret put GITHUB_CLIENT_ID       # paste the Client ID
   wrangler secret put GITHUB_CLIENT_SECRET   # paste the client secret
   ```
   Optionally lock the token audience to your site: uncomment `ALLOWED_ORIGIN`
   in `wrangler.toml` (or `wrangler secret put ALLOWED_ORIGIN`).

4. **Point the CMS at the worker** — in `src/admin/config.yml`, under `backend:`
   add:
   ```yaml
   backend:
     name: github
     repo: KhadijaZaman/portfolio-website
     branch: main
     base_url: https://<your-worker-subdomain>.workers.dev
     auth_endpoint: /auth
   ```
   Commit + redeploy the site, then log in at `/admin/`.

That's it — the login button now runs through your own worker.
