# Portfolio audit — khadijazaman.com

**Date:** 26 August 2026
**Scope:** source-level audit of this repository at `claude/khadijazaman-portfolio-review-nqyrhv`.

## How this audit was performed — and its limits

The live site could **not** be fetched: `khadijazaman.com` is blocked by the network egress
proxy in the environment this audit ran in. Everything below was verified by reading the files
in `src/`, building with Eleventy, and inspecting `_site/`.

That means the following were **not** checked and are not claimed either way:

- Real Core Web Vitals / field performance.
- Rendered colour contrast in a browser (contrast is reasoned about from the token values only).
- Whether the deployed HTML on Hostinger actually matches this source.
- Whether the live `/admin/` CMS login works end to end.

Findings are ranked P1 (highest) to P6. Each is marked **FIXED** (applied in this pass) or
**OPEN** (documented, left to decide).

---

## P1 — visible defects

### 1. Editor note was shipping to production — **FIXED**

`src/tools/index.html` rendered a visible note to self on the public page:

> ✎ **Add live links when ready.** Each "Request access" button currently points to the contact
> page. Once your tools have public URLs, swap them in and I'll wire them up.

On the page that sells the tools. Removed; the buttons still point at `/contact/`.

### 2. No global keyboard focus indicator — **FIXED**

`src/css/main.css` styled focus on only six specific selectors. Nav links, every button, cards,
CTAs and footer links had **no visible focus ring at all** — a WCAG 2.4.7 (Focus Visible)
failure on every page of the site.

Added one global `:focus-visible` rule covering `a`, `button`, `input`, `select`, `textarea`,
`summary` and `[tabindex]`, plus an `@supports not selector(:focus-visible)` fallback.

Note on the colour: the existing `--accent` (`#2563EB`) against `--bg-0` (`#060B12`) is roughly
**2.3:1**, below the 3:1 floor WCAG 1.4.11 sets for non-text UI indicators. The ring therefore
uses a new `--focus-ring` token pointing at the lighter `--accent-2` (`#38BDF8`). The
pre-existing `.proof-shot:focus-visible` rule was repointed at the same token so there is one
focus colour site-wide.

### 3. A broken image was silently hiding a proof figure — **FIXED**

Both `src/work/index.html` and `src/index.njk` referenced
`/static/uploads/gscyearoveryear.jpg`, which **does not exist in the repository**. It was the
second GSC screenshot in the featured Wellows case study — the visual backing for the
"AllAboutAI author pages — 10.7K → 23.6K clicks · 275K → 928K impressions" claim.

This was invisible rather than obviously broken: `src/js/site.js` hides any `.case-shot`
whose image fails to load, so the figure *and its caption* silently vanished. The proof simply
was not there, with nothing to signal it.

`src/static/uploads/recognition/aaai.jpg` turned out to be exactly that GSC comparison card
(23.6K/928K vs 10.7K/275K), so both references now point at it.

> **Worth knowing:** those graceful-degradation handlers in `site.js` (for `.proof-shot`,
> `.case-shot` and `.prose` images) mean a missing asset is *never* visible as a problem. That
> is good for visitors and bad for you — a proof screenshot can disappear without a trace. Run
> the check in "Verifying this yourself" below after any image change.

### 4. "Request access" tools have no destination — **OPEN**

The three proprietary tools carry the site's strongest proof claims (1,647 users, 829 active,
5.1% CTR) and every CTA lands on `/contact/`. Either wire the real URLs or reframe the CTA
copy — as it stands the strongest claim on the site is the one a visitor can least verify.

---

## P2 — recognition section (requested changes)

### 5. Recognition carousel is now Slack-only — **FIXED (as requested)**

The `/work/` carousel held 13 tiles. Each image was opened and classified:

**Kept (8, all genuine Slack `#general` screenshots):**
`ranking-query-fan-out.png`, `llm-query-builder-launch.png`, `traffic-growth.png`,
`dr-83-backlink.png`, `gsc-regex-workflow.png`, `allaboutai-authority-link-1/2/3.png`

**Removed (5, not Slack):**

| File | What it actually was |
|---|---|
| `casestudy1.png` | Google Search Console screenshot (allaboutai.com property) |
| `casestudy2.png` | The same GSC view, impressions selected |
| `casestudy3.png` | The same GSC view again, third variant |
| `aaai.jpg` | GSC year-over-year comparison card — **reused to fix finding 3** |
| `pvrecognition.png` | A screenshot of an **older version of this very site**, showing empty grey "Slack screenshot (live on site)" placeholder boxes |

`pvrecognition.png` deserves calling out separately: it was a design mockup of the recognition
section itself, with unfilled placeholders, presented in the live carousel as recognition.

The heading and lead were updated to match what the section now contains:

- was: "What the numbers looked like when they landed" / "…straight from GSC, Ahrefs, and the team channel."
- now: "What the team said when the numbers landed" / "…unedited reactions from the Wellows team channel as the work shipped."

The four removed files are still on disk and unreferenced. Deleting them is your call —
`casestudy1-3.png` in particular are legitimate GSC evidence that may belong somewhere else on
the site rather than in the bin.

### 6. Search Engine Land feature added — **FIXED (needs one image from you)**

Added in three places:

1. **`/work/`** — a new "Featured In" section above the Slack carousel, with the pull quote
   ("There are multiple query fan-out tools. For this tutorial, we'll use Wellows."), the
   byline (Jolissa Skow, edited by Pat Goggins), a link to
   <https://searchengineland.com/guide/topic-clusters-for-ai-search>, and the screenshot.
2. **`/tools/`** — an inline press credit on the Query Fan-Out Generator card, where the claim
   is most load-bearing.
3. **Homepage hero** — a one-line "Featured in Search Engine Land" credit under the stat chips.

Also added to `src/llms.njk` under a new `## Recognition` heading, so AI answer engines reading
`llms.txt` see the third-party citation. For a site optimising to be *cited*, a Search Engine
Land reference is among the most valuable signals on it.

**Outstanding:** the screenshot file. The markup expects it at
`src/static/uploads/recognition/search-engine-land-query-fan-out.png`. Until it exists the
figure is hidden by the error handler described in finding 3 — the text, quote and link all
still render, so nothing looks broken, but the image is missing.

---

## P3 — SEO / AEO

### 7. Blog posts were missing Twitter card text — **FIXED**

`src/_includes/base.njk` set `twitter:image` and `twitter:card` but never `twitter:title` or
`twitter:description`, so shared posts fell back to whatever the crawler inferred.
`src/index.njk` had both. Added to `base.njk`.

### 8. `og:title` ignored `metaTitle` — **FIXED**

`base.njk` used `metaTitle` for `<title>` but bare `{{ title }}` for `og:title`. Every post
sets a shorter, punchier `metaTitle` (e.g. "I Tried to Break My Own AI Study. 2 Findings
Failed."), and none of that reached social or AI previews. `og:title` and the new
`twitter:title` now mirror the `<title>` logic.

### 9. `BreadcrumbList` missing on the four tool pages — **FIXED**

Every other page carries breadcrumb schema; the four free tool pages did not. Added to all
four. (They already had correct `WebApplication` + `Offer` + `Person` schema — an earlier note
claiming otherwise was wrong.)

### 10. Blog TOC anchors are generated client-side — **OPEN**

`src/js/site.js` assigns `h2` ids in the browser. Section anchors therefore do not exist for
crawlers that do not execute JS, and deep links into an article's sections are not in the
served HTML. Generating them at build time (a markdown-it anchor plugin in `.eleventy.js`)
would make them crawlable. For a site whose thesis is retrieval-readiness, this is the gap
most worth closing next.

### 11. One shared OG image for all 22 pages — **OPEN**

Every page shares `/og-image.png`. Per-post images would improve social and AI previews. Low
priority.

---

## P4 — correctness

### 12. Carousel would throw if the dots container were absent — **FIXED**

The recognition carousel guarded `ptrack` and `car` but then called `dotsW.appendChild`
unguarded. Added `dotsW` to the guard.

### 13. Contact-form `mailto:` fallback is broken — **OPEN**

In the `!WEB3FORMS_KEY` branch of `src/js/site.js`, `f.name` resolves to
`HTMLFormElement.name` (the form's own attribute), **not** the input named `name`, so
`f.name.value` is `undefined`. Dead code today because the key is set — live the moment the key
is ever cleared, which is exactly when you would be relying on the fallback. Fix:
`f.elements.name.value`.

---

## P5 — privacy & abuse (both your call)

### 14. GA4 loads with no consent gate — **OPEN**

`src/js/site.js` fires `gtag('config', …)` on every page load, before any consent. The site
states it reaches UK/US/EU audiences; for UK/EU visitors that is a GDPR/PECR exposure. Whether
to add a consent banner (or switch to a cookieless analytics tool) is a product decision, not
something to change unilaterally — flagging it, not fixing it.

### 15. Web3Forms endpoint has no bot protection — **OPEN**

The access key in `src/js/site.js` is public by design, but neither form carries a honeypot or
Web3Forms' `botcheck` field, so the endpoint can be driven straight into
`hello@khadijazaman.com`. Adding `<input type="checkbox" name="botcheck" class="hidden"
style="display:none;">` to both forms is a one-line mitigation.

---

## P6 — documentation drift

### 16. README described the wrong CMS, the wrong host, and a file that doesn't exist — **FIXED**

Corrected throughout:

| README said | Reality |
|---|---|
| Decap CMS | **Sveltia CMS** (`src/admin/config.yml`), GitHub login via the Cloudflare Worker in `oauth-worker/` |
| Netlify builds and hosts | **GitHub Actions** (`.github/workflows/deploy.yml`) builds and force-pushes `_site/` to the `deploy` branch; **Hostinger** serves it (`src/.htaccess` is an Apache/LiteSpeed config) |
| `netlify.toml` in the repo layout | No such file exists |
| `src/index.html` | `src/index.njk` |
| Contact: `khadijarafiqzaman@gmail.com` | `hello@khadijazaman.com` (what the site actually uses) |
| "newsletter form … placeholders (mailto/contact)" | Web3Forms is wired up |
| Three seeded posts carry a "starter draft" banner | All four posts are real (`starter: false`) |

The repo layout section was also missing `work/`, the four tool pages, `blog-category.njk`,
`feed.njk`, `llms.njk`, `_data/buildDate.js`, `.htaccess`, `oauth-worker/` and the workflow.

### 17. `SETUP-NETLIFY.md` is obsolete — **OPEN**

It documents a Netlify + Identity + Git Gateway setup that is not how this site deploys or
authenticates. The README now says so explicitly, but the file itself should be deleted or
replaced with a Hostinger/Actions equivalent. Deleting a doc is your call.

---

## P7 — maintainability (proposed, not done)

### 18. The page shell is duplicated eight times — **OPEN**

`.eleventy.js` passthrough-copies Home, About, Work, Tools, Contact and the four tool pages as
raw HTML, so each one hand-repeats the nav, newsletter and footer. The headline numbers are
hard-coded across all of them:

- `22×` — homepage hero, homepage impact strip, About, Work, Tools
- `1,647` — homepage (×2), About, Tools (×3), Work
- `680K→3.78M` — homepage, About, Work
- `3.78M`, `28.9→17.3` — homepage, Work

Updating one metric is a multi-file edit with a real chance of leaving a stale number behind on
one page. The fix is to convert the static pages to `.njk` on `src/_includes/base.njk` and move
the numbers into `src/_data/site.js` so they are edited once.

**Deliberately not done here** — it would touch every page in the site and swamp the diff for
this review. Worth doing as its own change, with the pages checked visually one at a time.

### 19. `© 2026` is hard-coded — **OPEN**

In `base.njk` and all five static pages. `src/_data/buildDate.js` already exists and could
supply the year to any templated page. Rolls into finding 18.

---

## What changed in this pass

| File | Change |
|---|---|
| `AUDIT.md` | This document |
| `src/css/main.css` | Global `:focus-visible` ring + `--focus-ring` token; `.press-card` / `.tool-press` styles |
| `src/tools/index.html` | Removed the editor note; added the Search Engine Land credit |
| `src/tools/*/index.html` (4) | Added `BreadcrumbList` JSON-LD |
| `src/_includes/base.njk` | `twitter:title`, `twitter:description`; `og:title` now honours `metaTitle` |
| `src/js/site.js` | Guarded `dotsW` in the carousel |
| `src/work/index.html` | Recognition carousel reduced to Slack-only + reworded; broken figure repointed; new "Featured In" section |
| `src/index.njk` | Broken figure repointed; hero press line |
| `src/llms.njk` | New `## Recognition` section citing Search Engine Land and AllAboutAI |
| `README.md` | Corrected CMS, host, deploy flow, repo layout, contact email, content status |

Not touched: the copy, the claims, the numbers, the static-page structure.

---

## Verifying this yourself

```bash
npm ci && npm run build          # must complete with no Eleventy errors
```

Check every referenced upload actually exists — this is the check that would have caught
finding 3, and it is worth running after any image change:

```bash
grep -rho 'src="/static/uploads/[^"]*"\|href="/static/uploads/[^"]*"' src/ \
  --include=*.html --include=*.njk --include=*.md \
  | sed -e 's/.*="//' -e 's/"$//' | sort -u \
  | while read -r u; do [ -f "src${u}" ] || echo "MISSING $u"; done
```

Validate every JSON-LD block parses:

```bash
python3 - <<'PY'
import glob, json, re
for f in glob.glob('_site/**/*.html', recursive=True):
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>',
                         open(f, encoding='utf-8').read(), re.S):
        if 'JSON.stringify' in m.group(1): continue   # the schema generator's own example
        try: json.loads(m.group(1))
        except Exception as e: print('INVALID', f, e)
PY
```

Then serve `_site/` and tab through the homepage — the focus ring should be visible on every
nav link, button and card.
