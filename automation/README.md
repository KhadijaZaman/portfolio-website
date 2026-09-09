# Live metrics pipeline

The homepage hero reads its headline figures from `src/_data/live.json`, not
from hand-typed HTML. The n8n workflow in this folder refreshes that file once
a week. Each commit to `main` triggers the deploy workflow, so the site rebuilds
with the new numbers a few minutes later.

```
Monday 06:00 ─┬─ GA4 Data API  (LLM referral sessions, last 12 months vs the 12 before)
              ├─ Search Console (impressions, clicks, avg position: last 3 months vs the same 3 months a year earlier)
              └─ GitHub: read live.json (keeps the manually tracked tool counts)
                   └─ Code: assemble JSON ─► GitHub: commit src/_data/live.json to main ─► site rebuilds
```

## What the file carries

| Field | Meaning | Source |
| --- | --- | --- |
| `llm.multiplier` | LLM referral sessions, last 12 months divided by the 12 before, one decimal | GA4 |
| `gsc.impressions`, `gsc.impressionsBefore` | Impressions, last 3 months vs the same 3 months a year earlier | Search Console |
| `gsc.avgPosition`, `gsc.avgPositionBefore` | Average position over those two windows | Search Console |
| `tools.*` | Users of the three Wellows tools | Manual. The workflow keeps whatever is in the file. |
| `updatedAt`, `updatedBy` | Shown under the hero stats as "Figures updated …" | Workflow |

Raw numbers only. The templates format them (`680000` becomes `680K`).

Search Console keeps 16 months of data, so a true "12 months vs the 12 before"
is not available from the API. The workflow compares the latest 3 months with the
same 3 months a year earlier, and writes that window label into the file so the
hero says what it measures. If any source returns nothing, the run fails instead
of publishing seed or zero figures; check the execution log in n8n.

## Set-up, about 30 minutes

1. In n8n, **Workflows → Import from file** and pick `n8n-live-metrics.json`.
2. Create four **variables** (Settings → Variables): `GA4_PROPERTY_ID` (digits only),
   `GSC_SITE_URL` (for example `sc-domain:wellows.com` or `https://wellows.com/`),
   `GITHUB_OWNER` (`KhadijaZaman`), `GITHUB_REPO` (`portfolio-website`).
3. Credentials:
   - **Google Analytics OAuth2** on the GA4 node.
   - **Google OAuth2 API** (generic) on the two Search Console nodes, with the scope
     `https://www.googleapis.com/auth/webmasters.readonly`.
   - **GitHub** (a fine-grained token with *Contents: read and write* on this repository)
     on the two GitHub nodes.
4. Run it once by hand and check the commit appears on `main`. The deploy workflow
   will follow within a minute; the homepage updates a few minutes after that.
5. Activate the workflow.

## Which property the numbers describe

The 22× and the impressions on the homepage describe Wellows, the in-house
program. Point `GA4_PROPERTY_ID` and `GSC_SITE_URL` at that property, not at
khadijazaman.com, or the hero will start reporting the portfolio's own traffic.

## Changing the LLM referrer list

The GA4 node filters `sessionSource` with the pattern
`chatgpt|openai|perplexity|gemini|copilot|claude|bard|you\.com`. Add a source
there when a new engine starts sending traffic.
