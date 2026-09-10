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

   `map` draws the "system in one picture" graph on the case page (site.js
   renders it into a 560×430 box). `nodes` are keyed by id with a position and
   label; `cls` is "ctr" for the client in the centre or "tool" for something
   built. `edges` are [from, to, style, label] where style is "" (solid), "d"
   (dashed) or "c" (cyan). Only studies whose approach is described get a map:
   a graph of a method the page does not explain would be decoration.
*/
module.exports = [
  {
    slug: "wellows-ai-visibility",
    layer: "core",
    answer: { q: "How did Wellows grow LLM referral traffic 9× with no paid spend?", a: "Wellows grew LLM referral sessions from 176 a month to roughly nine times that between July 2025 and February 2026 with no paid spend, measured in GA4. The work was an AEO framework built on Koray Tuğberk's semantic model and Google's query fan-out patent, grounded-versus-non-grounded citation experiments, three free tools built as LLM entry points, and answers placed on Reddit, Quora and G2." },
    order: 1,
    pill: "AEO / LLM Visibility",
    pillClass: "pill-blue",
    barClass: "bar-blue",

    /* 9× over Jul 2025 – Feb 2026 from a 176/month baseline. The 22× figure
       elsewhere on the site is a DIFFERENT, confidential project; it must
       never be attached to this study. The homepage and /work/ cards use the
       identical wording to this title. */
    title: "AI visibility from near-zero: 9× LLM traffic in 8 months on $0 paid spend",
    metaTitle: "9× LLM Traffic in 8 Months From Near-Zero, $0 Paid",
    description:
      "Wellows had no citation footprint inside AI answers. Eight months of AEO work took LLM sessions from a 176/month baseline to roughly nine times that, with zero paid spend (GA4).",

    client: "Wellows",
    clientNote: "In-house — my own work as AI Search Manager at Wellows, not a client engagement.",
    confidential: false,
    sector: "B2B SaaS",
    window: "July 2025 – February 2026",
    sources: "GA4, Looker Studio, Google Search Console",

    stats: [
      { val: "9×", lbl: "LLM sessions, 8 months", note: "from a 176/month baseline, Jul 2025 – Feb 2026 (GA4)" },
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

    map: {
      alt: "Wellows in the centre. Dashed lines to Reddit, Quora and G2, where AEO answers were placed. Solid lines to the three tools built as LLM entry points. A cyan measurement loop through n8n into GA4 and Looker, labelled with the 9× LLM sessions result.",
      groups: [
        { x: 80, y: 20, label: "CHANNELS" },
        { x: 470, y: 20, label: "LLM ENTRY POINTS" },
        { x: 120, y: 410, label: "MEASUREMENT" }
      ],
      nodes: {
        wellows: { x: 250, y: 210, label: "Wellows", cls: "ctr" },
        reddit:  { x: 70,  y: 80,  label: "Reddit" },
        quora:   { x: 60,  y: 210, label: "Quora" },
        g2:      { x: 70,  y: 340, label: "G2" },
        qfo:     { x: 440, y: 60,  label: "Query Fan-Out Generator", cls: "tool" },
        lqb:     { x: 470, y: 160, label: "LLM Query Builder", cls: "tool" },
        hum:     { x: 460, y: 260, label: "AI Humanizer", cls: "tool" },
        n8n:     { x: 250, y: 385, label: "n8n" },
        ga4:     { x: 440, y: 385, label: "GA4 / Looker" }
      },
      edges: [
        ["wellows", "reddit", "d", "AEO answers"],
        ["wellows", "quora",  "d", "AEO answers"],
        ["wellows", "g2",     "d", "reviews"],
        ["wellows", "qfo",    "",  "829 users"],
        ["wellows", "lqb",    "",  "149 users"],
        ["wellows", "hum",    "",  "669 users"],
        ["wellows", "n8n",    "c", "reporting"],
        ["n8n",     "ga4",    "c", "9× LLM sessions"]
      ],
      legend: [
        { style: "d", label: "Distribution channel" },
        { style: "",  label: "Tool built as an LLM entry point" },
        { style: "c", label: "Measurement loop" }
      ]
    },

    outcome:
      "LLM sessions rose from 176 a month to roughly nine times that across the eight months this case study covers (GA4). Average position improved from 28.9 to 17.3 and session duration went from 45 seconds to over six minutes — the second number matters more than it looks, because it separates traffic that arrives and leaves from traffic that arrives and reads.",

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
        width: 1612, height: 551,
        alt: "Wellows Google Search Console: 7.27K clicks and 3.78M impressions over the last 3 months, average position improving from 28.9 to 17.3",
        caption: "Wellows, site-wide — clicks 2.29K → 7.27K · impressions 680K → 3.78M · avg. position 28.9 → 17.3 (last 3 months vs. the previous 3)"
      }
    ]
  },

  {
    slug: "core-update-recovery",
    layer: "core",
    answer: { q: "How did the publisher recover from a core update?", a: "A high-volume AI content publisher lost 70% of organic clicks in four months after a core update and recovered from an average position of 32 to 8.2 over the 12 months to May 2026 (Search Console). Five workstreams, technical and on-page SEO, semantic optimisation, topical authority, internal linking and third-party mentions, were run together by one owner instead of being split across vendors." },
    order: 2,
    pill: "SEO Management",
    pillClass: "pill-green",
    barClass: "bar-green",

    title: "Losing 70% of organic clicks, then recovering to position 8.2",
    metaTitle: "Core Update Recovery: Position 32 to 8.2",
    description:
      "A publisher lost 70% of organic clicks in four months. Five workstreams run together, not split across vendors, took average position from 32 back to 8.2.",

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

    map: {
      alt: "The publisher in the centre with five workstreams around it, all run by one owner at the same time: technical and on-page SEO, semantic optimisation, topical authority, internal linking, third-party mentions. A cyan line to the outcome, average position 32 to 8.2.",
      groups: [
        { x: 280, y: 20, label: "FIVE WORKSTREAMS · ONE OWNER · RUN TOGETHER" }
      ],
      nodes: {
        pub:  { x: 280, y: 215, label: "Publisher", cls: "ctr" },
        ws1:  { x: 280, y: 60,  label: "Technical & on-page SEO" },
        ws2:  { x: 100, y: 140, label: "Semantic optimisation" },
        ws3:  { x: 460, y: 140, label: "Topical authority" },
        ws4:  { x: 95,  y: 300, label: "Internal linking" },
        ws5:  { x: 465, y: 300, label: "Third-party mentions" },
        out:  { x: 280, y: 395, label: "Avg. position 32 → 8.2", cls: "tool" }
      },
      edges: [
        ["pub", "ws1", "", ""],
        ["pub", "ws2", "", ""],
        ["pub", "ws3", "", ""],
        ["pub", "ws4", "", ""],
        ["pub", "ws5", "", ""],
        ["pub", "out", "c", "12-month average"]
      ],
      legend: [
        { style: "",  label: "Workstream, owned and run together" },
        { style: "c", label: "Outcome, Search Console" }
      ]
    },

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
    layer: "core",
    answer: { q: "How did a property stuck at position 55 move into the 20s?", a: "A property flat near position 55 from July to early September 2025 moved into the 20s within days of a mid-September step change and held there for eleven weeks, reading 28.8 on 29 November 2025 (Search Console). Holding for eleven weeks is what separates a re-rating from volatility." },
    order: 3,
    pill: "Content Strategy",
    pillClass: "pill-blue",
    barClass: "bar-blue",

    title: "Stuck near position 55 for two months, into the 20s in days",
    metaTitle: "Position 55 to the 20s, Held 11 Weeks",
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
