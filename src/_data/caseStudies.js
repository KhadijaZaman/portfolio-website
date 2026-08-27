/* Case study data — every number on a /work/<slug>/ page comes from here.
   Keeping them in one place means a metric is updated once, not hunted for
   across hand-written HTML.

   Two conventions worth keeping:

   - `stats[].note` exists so a multiplier can never appear without its
     baseline. "9×" alone invites the reader to imagine any starting point;
     "9×, from 176 sessions/month" is a claim that can be checked.
   - `tables[].scope` states the measurement window and source on every table.
     Two figures from different windows sitting near each other read as a
     contradiction unless each says what it covers.

   A fourth case study (a 9-day high-intent breakthrough) is deliberately not
   here. Nine days is a signal, not a result; it goes in once there is a
   longer window to stand on.
*/
module.exports = [
  {
    slug: "wellows-ai-visibility",
    order: 1,
    pill: "AEO / LLM Visibility",
    pillClass: "pill-blue",
    barClass: "bar-blue",

    title: "AI visibility from near-zero: 9× LLM traffic on $0 paid spend",
    metaTitle: "9× LLM Traffic From Near-Zero, $0 Paid — Case Study",
    description:
      "Wellows had no citation footprint inside AI answers. Four months of AEO work took LLM sessions from 176/month to roughly nine times that, with zero paid spend.",

    client: "Wellows",
    clientNote: "In-house — my own work as Marketing Manager, not a client engagement.",
    confidential: false,
    sector: "B2B SaaS",
    window: "July 2025 – February 2026",
    sources: "GA4, Looker Studio, Google Search Console",

    stats: [
      { val: "9×", lbl: "LLM sessions", note: "from a 176/month baseline" },
      { val: "28.9→17.3", lbl: "Avg. SERP position" },
      { val: "45s→6+ min", lbl: "Session duration" },
      { val: "$0", lbl: "Paid spend" }
    ],

    problem:
      "Wellows ranked in Google but was effectively invisible inside AI answers — near-zero LLM referral traffic and no citation footprint in ChatGPT, Gemini, Perplexity or AI Overviews. The gap was not authority in the traditional sense. It was that nothing on the site was structured the way retrieval systems select and quote content.",

    approach: [
      {
        title: "AEO framework",
        body: "Koray Tuğberk's semantic logic combined with Google's query fan-out patent, used to model how a question actually expands before an answer is assembled."
      },
      {
        title: "Citation experiments",
        body: "Grounded versus non-grounded tests, tracking explicit citations and implicit brand mentions separately — they move independently and mean different things."
      },
      {
        title: "Tool- and community-led distribution",
        body: "Three free tools built as LLM entry points, plus AEO across Reddit, Quora and G2, with n8n and GA4 wired together for reporting."
      }
    ],

    outcome:
      "LLM sessions rose from 176 a month to roughly nine times that over the period. Average position improved from 28.9 to 17.3 and session duration went from 45 seconds to over six minutes — the second number matters more than it looks, because it separates traffic that arrives and leaves from traffic that arrives and reads.",

    tables: [
      {
        caption: "Before and after",
        scope: "Wellows, July 2025 – February 2026. Sources: GA4 for sessions and duration, Search Console for position.",
        head: ["Metric", "Before", "After"],
        rows: [
          ["LLM sessions", "176 / month", "≈9× the baseline"],
          ["Avg. position", "28.9", "17.3"],
          ["Session duration", "45 sec", "6+ min"],
          ["Paid spend", "—", "$0"]
        ]
      }
    ],

    shots: [
      {
        src: "/static/uploads/gsctrafficgrowth.png",
        alt: "Wellows Google Search Console: 7.27K clicks and 3.78M impressions over the last 3 months, average position improving from 28.9 to 17.3",
        caption: "Wellows, site-wide — 7.27K clicks · 3.78M impressions · avg. position 28.9 → 17.3 (last 3 months vs. previous)"
      }
    ]
  },

  {
    slug: "core-update-recovery",
    order: 2,
    pill: "SEO Management",
    pillClass: "pill-green",
    barClass: "bar-green",

    title: "Losing 70% of organic clicks, then recovering to position 8.2",
    metaTitle: "Core Update Recovery: Position 32 Back to 8.2 — Case Study",
    description:
      "A high-volume publisher lost 70% of its organic clicks in four months. Five workstreams run together — not sequenced across vendors — took average position from 32 back to 8.2.",

    client: "Confidential — a high-volume AI content publisher",
    confidential: true,

    stats: [
      { val: "32→8.2", lbl: "Avg. position", note: "post-decline low to 12-month average" },
      { val: "−70%", lbl: "Clicks lost first", note: "231K → 69.2K over four months" },
      { val: "5", lbl: "Workstreams, one owner" }
    ],

    problem:
      "A core update took 70% of organic clicks in four months — 231K down to 69.2K — with impressions falling 60% and average position sliding from 23.2 to 32. Recoveries like this usually stall because the response gets split across separate vendors: one for technical, one for content, one for links. Each optimises its own slice and nobody owns the interaction between them.",

    approach: [
      {
        title: "Five workstreams, one owner",
        body: "Technical and on-page SEO, semantic optimisation, topical authority, internal linking, and third-party mentions — run together rather than sequenced."
      }
    ],

    outcome:
      "Average position recovered from the post-decline low of 32 to 8.2. That is the number to judge this by: it measures whether the site earned its standing back, independent of how traffic happened to be distributed across the period.",

    tables: [
      {
        caption: "The decline",
        scope: "Search Console. Note that Search Console lists the earlier window first, which reads like the current period — it is not.",
        head: ["Metric", "Mar – Jul 2025", "Jul – Nov 2025", "Change"],
        rows: [
          ["Clicks", "231K", "69.2K", "−70%"],
          ["Impressions", "27.5M", "11M", "−60%"],
          ["Avg. position", "23.2", "32", "−8.8"]
        ]
      },
      {
        caption: "The recovery",
        scope:
          "Search Console. The 12-month totals span the decline as well as the recovery, so they understate the recovered run-rate — read the position figure, not the totals.",
        head: ["Metric", "Post-decline low", "12 months to May 2026"],
        rows: [
          ["Avg. position", "32", "8.2"],
          ["Clicks", "69.2K over 4 months", "1.01M"],
          ["Impressions", "11M over 4 months", "153M"]
        ]
      }
    ],

    inference: {
      title: "One inference, flagged as an inference",
      body:
        "CTR at position 8.2 is running around 0.7%, far below what that position normally returns. The likeliest explanation is AI Overview absorption — the answer is being served without the click. This is read from the gap between position and CTR, not something the Search Console export states, and it is the reason recovery work now has to be paired with AEO rather than treated as finished at rank."
    }
  },

  {
    slug: "ranking-breakthrough",
    order: 3,
    pill: "Content Strategy",
    pillClass: "pill-blue",
    barClass: "bar-blue",

    title: "Stuck near position 55 for two months, into the 20s in days",
    metaTitle: "Position 55 to the 20s in Days, Held 11 Weeks — Case Study",
    description:
      "A property sat flat around position 55 for two months. A mid-September step change moved it into the 20s within days, and it held there for eleven weeks.",

    client: "Confidential",
    confidential: true,
    window: "July – November 2025",
    sources: "Google Search Console",

    stats: [
      { val: "50–58 → 20–30", lbl: "Avg. position band" },
      { val: "28.8", lbl: "Position, 29 Nov 2025" },
      { val: "11 weeks", lbl: "Held after the step change" }
    ],

    problem:
      "The property was flat near position 55 from July into early September — not declining, which is its own kind of problem. Steady mid-page ranking means the content is considered relevant enough to index and not relevant enough to rank, and month-to-month averages hide whether anything is actually moving.",

    outcome:
      "The band moved from 50–58 to 20–30 within days of mid-September and stayed there for eleven weeks, reading 28.8 on 29 November. Holding matters more than the jump: a step change that decays over a fortnight is volatility, while one that holds for eleven weeks is a re-rating.",

    tables: [
      {
        caption: "Before and after the step change",
        scope:
          "Search Console, July – November 2025. Reported as position bands rather than a period average — a single average across both windows would flatten the step change into a middling number that describes neither.",
        head: ["Metric", "Jul – early Sep 2025", "Mid-Sep – Nov 2025"],
        rows: [
          ["Avg. position", "50 – 58", "20 – 30"],
          ["Position on 29 Nov", "—", "28.8"]
        ]
      }
    ]
  }
];
