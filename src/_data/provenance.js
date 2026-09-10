/* Provenance for every number published on the site.

   One entry per figure. `method` says how the number came to exist:
     measured  - Khadija read it herself from the named analytics property
     reported  - a third party published it (their counter, their post)
     cited     - taken from a published document
   `evidence` is a URL that shows the figure (a screenshot on this site or a
   public post), or null when nothing public shows it. `verified` is the date
   the figure was last checked against its source, or null when it has not
   been re-checked since it was first written down. `status` is "confirmed"
   only when both a source and a verified date exist; anything else says
   plainly what is missing. Nothing here is a guess: where a value is not
   primary-confirmed the field is null and the status says so.

   Rendered at /sources/ (people) and /provenance.json (machines), and as a
   footnote on each case study whose slug appears in `pages`. */
const SITE = "https://khadijazaman.com";
const shot = (p) => SITE + "/static/uploads/" + p;

module.exports = [
  // ── Wellows, AI visibility (case study) ──
  { id: "wellows-llm-9x", figure: "9×", claim: "LLM referral sessions rose to roughly nine times the baseline",
    property: "Wellows", window: "Jul 2025 – Feb 2026 (8 months)", source: "GA4", method: "measured",
    evidence: null, evidenceLabel: null, verified: "2026-09-09", status: "confirmed",
    note: "Confirmed by Khadija on 9 Sep 2026 as Wellows, July 2025 to February 2026, from 176/month.",
    pages: ["wellows-ai-visibility", "home", "cv", "about"] },
  { id: "wellows-llm-baseline", figure: "176 / month", claim: "LLM referral sessions per month before the work started",
    property: "Wellows", window: "Jun 2025 (the month before the window)", source: "GA4", method: "measured",
    evidence: null, evidenceLabel: null, verified: "2026-09-09", status: "confirmed",
    note: "Whether June 2025 alone or a three-month average is used should be stated; see the sources page.",
    pages: ["wellows-ai-visibility", "home", "cv"] },
  { id: "wellows-llm-after", figure: null, claim: "LLM referral sessions per month at the end of the window, and their share of all sessions",
    property: "Wellows", window: "Feb 2026", source: "GA4", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "not published",
    note: "The absolute after-figure has not been published. Fill llm.wellows.sessionsAfter and shareOfTotal in live.json to print it.",
    pages: ["wellows-ai-visibility"] },
  { id: "wellows-impressions", figure: "680K → 3.78M", claim: "Google Search Console impressions, site-wide",
    property: "Wellows", window: "last 3 months vs the previous 3 (per screenshot; capture date not shown)", source: "Google Search Console", method: "measured",
    evidence: shot("gsctrafficgrowth.png"), evidenceLabel: "Search Console screenshot", verified: "2026-09-10", status: "confirmed",
    note: "Was labelled '12 months' on the site until 10 Sep 2026; corrected to match the screenshot, which shows a 3-month comparison.",
    pages: ["wellows-ai-visibility", "home", "cv", "about"] },
  { id: "wellows-clicks", figure: "2.29K → 7.27K", claim: "Google Search Console clicks, site-wide",
    property: "Wellows", window: "last 3 months vs the previous 3 (per screenshot)", source: "Google Search Console", method: "measured",
    evidence: shot("gsctrafficgrowth.png"), evidenceLabel: "Search Console screenshot", verified: "2026-09-10", status: "confirmed",
    note: null, pages: ["wellows-ai-visibility", "cv"] },
  { id: "wellows-position", figure: "28.9 → 17.3", claim: "Average Search Console position, site-wide",
    property: "Wellows", window: "last 3 months vs the previous 3 (per screenshot)", source: "Google Search Console", method: "measured",
    evidence: shot("gsctrafficgrowth.png"), evidenceLabel: "Search Console screenshot", verified: "2026-09-09", status: "confirmed",
    note: null, pages: ["wellows-ai-visibility", "home", "cv"] },
  { id: "wellows-duration", figure: "45 s → 6+ min", claim: "Average session duration",
    property: "Wellows", window: "Jul 2025 – Feb 2026", source: "GA4", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification",
    note: "Written from GA4 at the time; not re-checked since.", pages: ["wellows-ai-visibility"] },
  { id: "wellows-paid", figure: "$0", claim: "Paid spend behind the AI-visibility results",
    property: "Wellows", window: "Jul 2025 – Feb 2026", source: "Wellows marketing budget", method: "measured",
    evidence: null, evidenceLabel: null, verified: "2026-09-09", status: "confirmed", note: null,
    pages: ["wellows-ai-visibility", "home", "cv"] },

  // ── Confidential client, 22× ──
  { id: "confidential-llm-22x", figure: "22×", claim: "LLM referral traffic grew 22× over 12 months",
    property: "confidential client (not Wellows)", window: "12 months", source: "GA4", method: "measured",
    evidence: null, evidenceLabel: null, verified: "2026-09-09", status: "headline only",
    note: "Confirmed by Khadija as a separate project measured in GA4. The client name and the baseline are not published, so the multiplier cannot be checked from the outside.",
    pages: ["work", "home", "cv", "about"] },
  { id: "confidential-llm-baseline", figure: null, claim: "Baseline monthly LLM referral sessions for the 22× project",
    property: "confidential client", window: "month before the 12-month window", source: "GA4", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "not published",
    note: "Not available to Khadija at the time of writing. Without it the 22× is a headline figure, not a verified one.",
    pages: ["work"] },

  // ── Tools ──
  { id: "tools-users-total", figure: "1,647", claim: "Practitioners using the three Wellows tools, combined",
    property: "Wellows tools", window: "Khadija's tracking period while building and measuring them", source: "own tracking (829 + 149 + 669)", method: "measured",
    evidence: SITE + "/tools/", evidenceLabel: "reconciliation on the tools page", verified: "2026-09-09", status: "confirmed",
    note: "Not a lifetime total; see the 6,849 entry.", pages: ["home", "work", "tools", "cv", "about"] },
  { id: "tools-qfo-users", figure: "829", claim: "Active users of the Query Fan-Out Generator in the tracking period",
    property: "Wellows tools", window: "tracking period", source: "own tracking", method: "measured",
    evidence: null, evidenceLabel: null, verified: "2026-09-09", status: "confirmed", note: null, pages: ["tools"] },
  { id: "tools-lqb-users", figure: "149", claim: "Users of the LLM Query Builder", property: "Wellows tools", window: "tracking period",
    source: "own tracking", method: "measured", evidence: null, evidenceLabel: null, verified: "2026-09-09", status: "confirmed", note: null, pages: ["tools"] },
  { id: "tools-hum-users", figure: "669", claim: "Users of the AI Humanizer", property: "Wellows tools", window: "tracking period",
    source: "own tracking", method: "measured", evidence: null, evidenceLabel: null, verified: "2026-09-09", status: "confirmed", note: null, pages: ["tools"] },
  { id: "tools-qfo-lifetime", figure: "6,849", claim: "Lifetime users of the Query Fan-Out Generator on Wellows' live counter",
    property: "Wellows tools", window: "lifetime, as of the Search Engine Land feature", source: "Wellows' on-page counter", method: "reported",
    evidence: shot("recognition/search-engine-land-query-fan-out.png"), evidenceLabel: "Search Engine Land screenshot showing the counter", verified: null, status: "reported by Wellows",
    note: "Wellows' number, not Khadija's tracking.", pages: ["tools", "work"] },
  { id: "tools-qfo-ctr", figure: "5.1%", claim: "Organic search CTR to the Query Fan-Out Generator",
    property: "Wellows tools", window: "tracking period", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification", note: null, pages: ["tools"] },
  { id: "tools-hum-engagement", figure: "60–72%", claim: "GA4 engagement rate of the AI Humanizer across the months tracked",
    property: "Wellows tools", window: "tracking period", source: "GA4", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification",
    note: "Defined on the tools page as GA4 engagement rate. Khadija has not yet confirmed that definition.", pages: ["tools"] },

  // ── Core update recovery (confidential publisher) ──
  { id: "recovery-position", figure: "32 → 8.2", claim: "Average position from the post-decline low to the 12-month average",
    property: "confidential AI content publisher", window: "12 months to May 2026", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification", note: null, pages: ["core-update-recovery", "home", "work", "cv"] },
  { id: "recovery-clicks-lost", figure: "231K → 69.2K (−70%)", claim: "Organic clicks lost over four months after the core update",
    property: "confidential AI content publisher", window: "Mar–Jul 2025 vs Jul–Nov 2025", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification", note: null, pages: ["core-update-recovery", "cv"] },
  { id: "recovery-impressions-lost", figure: "27.5M → 11M (−60%)", claim: "Impressions lost over the same four months",
    property: "confidential AI content publisher", window: "Mar–Jul 2025 vs Jul–Nov 2025", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification", note: null, pages: ["core-update-recovery"] },
  { id: "recovery-12mo", figure: "1.01M clicks · 153M impressions", claim: "12-month totals spanning the decline and the recovery",
    property: "confidential AI content publisher", window: "12 months to May 2026", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification", note: "Understates the recovered run-rate; read the position figure.", pages: ["core-update-recovery"] },
  { id: "recovery-ctr-inference", figure: "≈0.7% CTR at position 8.2", claim: "CTR far below what position 8.2 normally returns; AI Overview absorption inferred",
    property: "confidential AI content publisher", window: "12 months to May 2026", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "inference, labelled as such on the page", note: null, pages: ["core-update-recovery"] },

  // ── Ranking breakthrough (confidential) ──
  { id: "breakthrough-band", figure: "50–58 → 20–30", claim: "Average position band before and after the mid-September step change",
    property: "confidential property", window: "Jul – Nov 2025", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification", note: null, pages: ["ranking-breakthrough", "work", "cv"] },
  { id: "breakthrough-held", figure: "11 weeks · 28.8 on 29 Nov 2025", claim: "The new band held for eleven weeks",
    property: "confidential property", window: "mid-Sep – 29 Nov 2025", source: "Google Search Console", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "awaiting re-verification", note: null, pages: ["ranking-breakthrough"] },

  // ── Headline-only results ──
  { id: "affiliate-sessions", figure: "8K → 25K / month (+213%)", claim: "Monthly sessions after a topic-cluster rebuild on an affiliate site",
    property: "affiliate site (agency client)", window: "6 months", source: "analytics at the time", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "headline only",
    note: "No full write-up; the analytics property is no longer accessible to Khadija.", pages: ["work", "home", "cv"] },
  { id: "kiva-launch", figure: "447 users · 110 credit-card signups · #1 U.S. rating on All About AI", claim: "KIVA launch-month results",
    property: "KIVA", window: "launch month", source: "product analytics and All About AI", method: "measured",
    evidence: null, evidenceLabel: null, verified: null, status: "headline only", note: "No full write-up on this site.", pages: ["work", "home", "cv"] },

  // ── Search Engine Land and the fan-out experiment ──
  { id: "sel-feature", figure: "Featured", claim: "Search Engine Land's guide to topic clusters for AI search uses the Wellows Query Fan-Out Generator",
    property: "searchengineland.com", window: "published guide", source: "Search Engine Land", method: "cited",
    evidence: "https://searchengineland.com/guide/topic-clusters-for-ai-search", evidenceLabel: "the guide", verified: "2026-09-09", status: "confirmed",
    note: "The article credits Wellows, not Khadija by name.", pages: ["home", "work", "tools", "cv", "about"] },
  { id: "sel-roundup", figure: "Listed", claim: "Listed in Search Engine Land's query fan-out tools roundup",
    property: "searchengineland.com", window: "published roundup", source: "Search Engine Land", method: "cited",
    evidence: "https://searchengineland.com/guide/query-fan-out-tools-software", evidenceLabel: "the roundup", verified: null, status: "cited, not re-checked",
    note: null, pages: ["work", "tools"] },
  { id: "fanout-experiment", figure: "923 → 2.12K clicks · 62.9K → 626K impressions", claim: "The 94-day query fan-out experiment, fan-out pages only",
    property: "Wellows, experiment pages only", window: "11 Aug – 12 Nov 2025 vs the prior 94 days", source: "Google Search Console, posted by Wellows COO Muhammad Saleem Ahrar", method: "reported",
    evidence: "https://www.linkedin.com/posts/saleemahrar_i-have-always-believed-that-when-you-want-activity-7395425630474907648-Zn_i", evidenceLabel: "the COO's LinkedIn post", verified: "2026-09-09", status: "confirmed",
    note: "A different scope from the site-wide Wellows figures.", pages: ["work"] },
  { id: "aaai-author-pages", figure: "10.7K → 23.6K clicks (+121%) · 275K → 928K impressions", claim: "AllAboutAI author pages, year over year",
    property: "allaboutai.com, Khadija's author pages", window: "2025 vs 2024", source: "Google Search Console", method: "measured",
    evidence: shot("recognition/author-pages-yoy.jpg"), evidenceLabel: "Search Console comparison screenshot", verified: null, status: "screenshot on file, not re-checked",
    note: null, pages: ["work", "cv"] }
];
