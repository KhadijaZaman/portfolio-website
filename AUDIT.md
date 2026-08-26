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

Findings are ranked P1 (highest) to P7. Each is marked **FIXED** or **OPEN** (documented, left
to decide).

**Round 2 (same date)** closed findings 10, 13, 15 and 17, corrected two findings I had got
wrong, and added finding 20. See "Corrections" and "What changed" at the end.

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

### 10. Blog TOC anchors were generated client-side — **FIXED (round 2)**

`src/js/site.js` assigned `h2` ids in the browser, so section anchors existed in **no** served
HTML — invisible to crawlers that don't run JS, and impossible to deep-link. On a site whose
thesis is retrieval-readiness, this was the most valuable gap on the list.

Both halves now happen at build time, with **no new dependency**:

- `.eleventy.js` uses `amendLibrary("md", …)` to push a markdown-it core rule that stamps a
  slug on every article `h2`, deduping repeats per document.
- A `tocFromHtml` filter extracts the `{id, text}` pairs from the rendered post, and
  `src/_includes/post.njk` prints the table of contents as real `<li><a href="#…">` markup.

`src/js/site.js` keeps only the scroll-spy `IntersectionObserver`. The slug helper is now
shared with the `slugify` filter and the category collection, so an anchor and its heading
cannot drift apart.

`src/css/main.css` gained a `.post-layout--no-toc` modifier: `.post-layout` is a
`220px minmax(0,720px)` grid, so a post with fewer than two `h2`s (none today) would have
dropped its prose into the sidebar track.

### 11. One shared OG image for all 22 pages — **OPEN**

Every page shares `/og-image.png`. Per-post images would improve social and AI previews. Low
priority.

---

## P4 — correctness

### 12. Carousel would throw if the dots container were absent — **FIXED**

The recognition carousel guarded `ptrack` and `car` but then called `dotsW.appendChild`
unguarded. Added `dotsW` to the guard.

### 13. Contact-form `mailto:` fallback was broken — **FIXED (round 2)**

In the `!WEB3FORMS_KEY` branch of `src/js/site.js`, `f.name` resolved to
`HTMLFormElement.name` (the form's own attribute), **not** the input named `name`, so
`f.name.value` was `undefined`. Dead code while the key is set — live the moment it is cleared,
which is exactly when the fallback matters. The three reads now go through `f.elements`.

---

## P5 — privacy & abuse (both your call)

### 14. GA4 loaded with no consent gate — **FIXED**

`src/js/site.js` fired `gtag('config', …)` on every page load, before any consent — a GDPR/PECR
exposure for the UK/EU audience the site says it reaches, and an awkward look for a site
selling technical rigour.

Resolved by removing GA4 entirely and replacing it with **Cloudflare Web Analytics**, which is
free, sets no cookies, and stores no per-visitor identifier — so no consent banner is needed
rather than one being added. The beacon only loads when `CF_BEACON_TOKEN` is set.

The two GA4 conversion events (`generate_lead`, `sign_up`) were dropped with it; Cloudflare
Web Analytics is pageview-only by design. Form conversions were always visible in the
Web3Forms inbox and dashboard, so nothing was actually lost. `LAUNCH-GUIDE.md` documents the
split: Cloudflare for traffic, Search Console for search, Web3Forms for conversions.

### 15. Newsletter form had no bot protection — **FIXED (round 2, and corrected)**

**This finding was originally wrong.** I wrote that "neither form carries a honeypot". The
contact form already had one — `src/contact/index.html:92`, a `botcheck` checkbox hidden by
`.hp-field` (`src/css/main.css:447`). I had grepped `src/js/site.js` for the Web3Forms wiring
and never grepped the markup for `botcheck` before writing the finding.

The real gap was the **newsletter** form, which had no honeypot in any of its three copies
(`src/_includes/base.njk`, `src/index.njk`, `src/tools/index.html`). All three now carry the
same markup and the same `.hp-field` class — no new CSS. `submitWeb3Forms` already posts the
whole `FormData`, so no JS change was needed.

That the same one-line fix had to be applied in three files is finding 18 in miniature.

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

### 17. Obsolete deployment docs — **FIXED (round 2, and wider than first reported)**

`SETUP-NETLIFY.md` documented a Netlify + Identity + Git Gateway setup that is not how this
site deploys or authenticates, and referenced a long-gone branch. **Deleted.**

Round 1 missed that two other docs were stale in the same way:

- **`LAUNCH-GUIDE.md`** was worse than the README had been — an entire "Phase 2 — Deploy to
  Netlify" section, `netlify.toml` field instructions, a Netlify-brokered OAuth walkthrough
  with an `api.netlify.com` callback, Netlify DNS/SSL steps, and Netlify build-log
  troubleshooting. The whole document was a pre-launch narrative ("apply this patch to get the
  site onto GitHub") for a site that has been live for months. Rewritten as an operations
  guide: the real Actions → `deploy` branch → Hostinger flow, publishing, local dev,
  configuration, and troubleshooting — including the missing-image check from finding 3.
- **`oauth-worker/README.md`** described itself as *optional*, told the reader that "on Netlify
  you don't need this worker", and pointed at the now-deleted `SETUP-NETLIFY.md`. That worker
  is what actually brokers CMS login today. Corrected.

---

## P8 — third-party dependencies (found in round 2)

### 20. Every photo of Khadija was hosted on a third-party CDN — **FIXED**

`cdn.builder.io` serves all three portraits — a leftover from a Builder.io page builder:

| Where | File:line |
|---|---|
| Homepage hero portrait — almost certainly the **LCP element** | `src/index.njk:163` |
| About page photo | `src/about/index.html:114` |
| Author avatar on **every** blog post | `src/_includes/post.njk:53` |

Three separate problems. The site's entire visual identity depends on an asset URL you don't
own or control — if that Builder.io space is deleted or the asset id rotates, every photo of
you disappears from the site at once. The homepage LCP image sits on a third-party origin. And
it is a third-party request on every page view, which is a privacy surface you don't control.
The `preconnect` hints (`src/index.njk:33`, `src/about/index.html:30`) reduce the latency cost
but not the dependency.

**Fixed.** The three images are now served from `src/static/img/` as WebP:

| File | Size | Used by |
|---|---|---|
| `khadija-hero.webp` | 840×840, 36KB | Homepage hero (LCP) |
| `khadija-about.webp` | 680×680, 27KB | About page |
| `khadija-avatar.webp` | 200×200, 4KB | Author box on every post |

The two `preconnect` hints to `cdn.builder.io` were removed with them — they pointed at a host
the site no longer contacts. No `.eleventy.js` change was needed: `src/static` was already in
the passthrough list. The hero already carried `fetchpriority="high"` and no `loading="lazy"`,
which is correct for an LCP image.

Nothing on the site now loads an image from a third-party host. The one remaining external
script is Sveltia CMS on `/admin/`, below.

`src/admin/index.html:14` also loads Sveltia CMS from `unpkg.com`, but pinned to `0.180.1`.
That is the normal install method and the pin makes it acceptable — noted, no action.

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

## What changed — round 1

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

## What changed — round 2

| File | Change |
|---|---|
| `.eleventy.js` | Build-time `h2` ids via `amendLibrary`; `tocFromHtml` filter; shared `slug` helper |
| `src/_includes/post.njk` | Table of contents rendered at build time |
| `src/js/site.js` | `mailto` fallback reads via `f.elements`; TOC block reduced to scroll-spy |
| `src/_includes/base.njk`, `src/index.njk`, `src/tools/index.html` | Newsletter honeypot |
| `src/css/main.css` | `.post-layout--no-toc` modifier |
| `LAUNCH-GUIDE.md` | Rewritten as an operations guide for the live site |
| `SETUP-NETLIFY.md` | Deleted |
| `oauth-worker/README.md` | No longer describes itself as optional or points at the deleted file |
| `AUDIT.md` | Corrections, finding 20, status flips |

## Corrections to this audit

Four findings were wrong as first written and are corrected in place above. Recording them
because an audit that quietly edits its own mistakes is worth less than one that shows them:

1. **Tool pages already had `WebApplication` schema** (finding 9) — I'd truncated a grep and
   concluded they had no JSON-LD at all. Only `BreadcrumbList` was actually missing.
2. **The lightbox did bind to case-study figures** — the `<a>` is nested inside the `<figure>`,
   which a `grep` for the class alone didn't show. No bug; no change made.
3. **The contact form already had a honeypot** (finding 15) — only the newsletter form lacked one.
4. **Obsolete deployment docs were wider than reported** (finding 17) — `LAUNCH-GUIDE.md` and
   `oauth-worker/README.md` were stale in the same way as `SETUP-NETLIFY.md`.

Findings 1, 2, 3 and 5 were each verified by opening the file or the image directly, and
finding 3 by checking every upload reference against the filesystem.

Still deliberately untouched: the copy, the claims, the numbers, and the static-page structure.

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
