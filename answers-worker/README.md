# answers-worker

Grounded answer endpoint for khadijazaman.com, declared in
`/.well-known/agents.json`. No model in the loop: it matches a question
against the site's published `/answers.json` (one direct-answer block per
page) and returns the best answer verbatim with its source URL, or
`answer: null` with a status.

```
GET https://khadijazaman-answers.khadijazaman.workers.dev/?q=what%20tools%20has%20khadija%20built
```

Deploy (once, from a machine logged in to the same Cloudflare account as
`oauth-worker/`):

```bash
cd answers-worker
npx wrangler login
npx wrangler deploy
```

Then set `"status": "live"` on the `grounded-answer` entry in
`src/.well-known/agents.json` and push.
