/**
 * GitHub OAuth worker for Sveltia CMS (also works with Decap / Netlify CMS).
 *
 * It brokers the GitHub login for the /admin/ editor so you don't need Netlify
 * Identity. Deploy it once (see README.md), point the CMS at it with
 * `base_url` in src/admin/config.yml, and you can host the site anywhere.
 *
 * Routes:
 *   GET /auth      → redirect the browser to GitHub's authorize screen
 *   GET /callback  → exchange the code for a token, hand it back to the CMS
 *
 * Required secrets (set with `wrangler secret put`):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 * Optional var:
 *   ALLOWED_ORIGIN  e.g. "https://khadijazaman.com" (defaults to "*")
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', url.searchParams.get('scope') || 'repo,user');
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing ?code', { status: 400 });

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code
        })
      });
      const data = await tokenRes.json();
      const origin = env.ALLOWED_ORIGIN || '*';

      const result = data.error
        ? { status: 'error', payload: data.error_description || data.error }
        : { status: 'success', payload: { token: data.access_token, provider: 'github' } };

      // The CMS opened this in a popup; hand the token back via postMessage.
      const body = `<!doctype html><html><body><script>
(function () {
  function post(state) {
    window.opener && window.opener.postMessage(
      'authorization:github:' + state, ${JSON.stringify(origin)}
    );
  }
  window.addEventListener('message', function () {
    post('${result.status}:' + ${JSON.stringify(JSON.stringify(result.payload))});
  }, { once: true });
  post('${result.status}:' + ${JSON.stringify(JSON.stringify(result.payload))});
})();
</script><p>Completing sign-in… you can close this window.</p></body></html>`;

      return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    return new Response('Sveltia/Decap CMS GitHub OAuth worker. Use /auth to begin.', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
