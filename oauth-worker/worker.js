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
 *   ALLOWED_ORIGIN  e.g. "https://khadijazaman.com"
 *                   REQUIRED — the worker fails closed if it is not set, and the
 *                   token is only ever posted to (and accepted from) this origin.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowedOrigin = env.ALLOWED_ORIGIN;

    // Fail closed: never broker a token unless the trusted origin is configured.
    if (!allowedOrigin) {
      return new Response('Server misconfigured: ALLOWED_ORIGIN is not set.', { status: 500 });
    }

    if (url.pathname === '/auth') {
      const state = crypto.randomUUID();
      const redirectUri = `${url.origin}/callback`;
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', url.searchParams.get('scope') || 'repo,user');
      authUrl.searchParams.set('state', state);
      // Remember the state in a first-party cookie so /callback can verify it (CSRF).
      return new Response(null, {
        status: 302,
        headers: {
          'Location': authUrl.toString(),
          'Set-Cookie': `cms_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
        }
      });
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing ?code', { status: 400 });

      // CSRF protection: the state echoed by GitHub must match the cookie from /auth.
      const returnedState = url.searchParams.get('state');
      const cookie = request.headers.get('Cookie') || '';
      const cookieMatch = cookie.match(/(?:^|;\s*)cms_oauth_state=([^;]+)/);
      const cookieState = cookieMatch ? cookieMatch[1] : null;
      if (!returnedState || !cookieState || returnedState !== cookieState) {
        return new Response('Invalid OAuth state.', { status: 400 });
      }

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

      const result = data.error
        ? { status: 'error', payload: data.error_description || data.error }
        : { status: 'success', payload: { token: data.access_token, provider: 'github' } };

      const originJson = JSON.stringify(allowedOrigin);
      const msgJson = JSON.stringify(result.status + ':' + JSON.stringify(result.payload));

      // Hand the token back to the CMS popup opener — but only ever to the exact
      // allowed origin, and only in response to a message from that same origin.
      const body = `<!doctype html><html><body><script>
(function () {
  var ORIGIN = ${originJson};
  var MSG = 'authorization:github:' + ${msgJson};
  function post() { if (window.opener) window.opener.postMessage(MSG, ORIGIN); }
  window.addEventListener('message', function (e) {
    if (e.origin !== ORIGIN) return;
    post();
  }, { once: true });
  post();
})();
</script><p>Completing sign-in… you can close this window.</p></body></html>`;

      // Clear the one-time state cookie on the way out.
      return new Response(body, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Set-Cookie': 'cms_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
        }
      });
    }

    return new Response('Sveltia/Decap CMS GitHub OAuth worker. Use /auth to begin.', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
