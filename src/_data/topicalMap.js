/* The site's topical map, published as a page (/topical-map/).

   One central entity, decomposed into entity → attribute pairs. Each pair is
   either in the CORE (what a hiring manager or client is deciding on: results,
   methods, tools) or the OUTER section (trust: definitions, studies,
   corrections, context). The target split is roughly 65/35 core to outer.

   Every node says whether it is built (a page on this site answers it) or
   not. Unbuilt nodes are the roadmap, listed on purpose: an honest gap reads
   as a plan, a hidden one reads as a hole. Posts and case studies carry a
   `layer` field so their pages can badge themselves; keep that in sync with
   the `url` values here. */
module.exports = {
  centralEntity: "AI search visibility",
  definition: "Getting a brand found on Google and cited inside ChatGPT, Gemini, Perplexity and AI Overviews, run with SEO, content architecture and measurement as one system.",
  sourceContext: "Khadija Zaman, AI Search Manager at Wellows, publishing what she has measured, built and been wrong about, so a hiring manager or client can check the work.",
  targetSplit: { core: 65, outer: 35 },
  sections: [
    {
      key: "core",
      title: "Core: what the work produces",
      lead: "The commercial half. Each pair here is something a hiring manager or client is judging: a result with a source, a method that can be repeated, or a tool that exists.",
      entities: [
        { entity: "AI search visibility", attributes: [
          { attr: "LLM referral growth, measured", url: "/work/wellows-ai-visibility/", built: true, note: "9× in 8 months from 176/month, GA4" },
          { attr: "Retrieval-ready content checklist", url: "/blog/get-cited-by-ai-search/", built: true },
          { attr: "Query fan-out as the expansion model", url: "/tools/query-fan-out/", built: true, note: "Free explorer, plus the Wellows generator used by Search Engine Land" },
          { attr: "Tools as LLM entry points", url: "/tools/", built: true },
          { attr: "Grounded vs non-grounded citation experiments, the method", url: null, built: false, note: "Described inside the Wellows case study; needs its own write-up with the protocol" },
          { attr: "Distribution on the surfaces models read (Reddit, Quora, G2)", url: null, built: false, note: "Named in the case study; no page shows the placement method or its measurement" },
          { attr: "LLM referral segmentation in GA4, the setup", url: null, built: false, note: "Which sources count, how the segment is built, how it is reported" }
        ]},
        { entity: "SEO management", attributes: [
          { attr: "Core update recovery, five workstreams run together", url: "/work/core-update-recovery/", built: true, note: "Position 32 → 8.2, Search Console" },
          { attr: "AI Overview absorption, read from position vs CTR", url: "/work/core-update-recovery/", built: true, note: "Labelled as an inference on the page" },
          { attr: "Technical SEO: crawl, indexation, schema, Core Web Vitals", url: null, built: false, note: "Claimed on the homepage; no page shows an audit or a fix" },
          { attr: "Internal linking, AI-assisted", url: "/tools/#open-source", built: true, note: "Open-source Internal Link System; no case or post yet" }
        ]},
        { entity: "Content architecture", attributes: [
          { attr: "Topic cluster architecture", url: "/blog/topic-cluster-architecture/", built: true },
          { attr: "Ranking step change that held", url: "/work/ranking-breakthrough/", built: true, note: "Position 55 → 20s, held 11 weeks" },
          { attr: "Semantic SEO framework (Koray Tuğberk's model) applied", url: null, built: false, note: "A credential on the About page; no page shows it applied to a site" }
        ]},
        { entity: "Measurement and automation", attributes: [
          { attr: "Provenance for every published number", url: "/sources/", built: true },
          { attr: "Reporting pipeline: n8n, GA4, BigQuery, Looker", url: null, built: false, note: "Named in the case study; the pipeline itself is not shown" },
          { attr: "Open-source tooling (six repositories)", url: "/tools/#open-source", built: true }
        ]}
      ]
    },
    {
      key: "outer",
      title: "Outer: what makes the core believable",
      lead: "The trust half. Definitions, studies, corrections and context. Wider than deep on purpose; each pair exists so the core can be checked, not so it can be sold.",
      entities: [
        { entity: "Definitions", attributes: [
          { attr: "SEO vs AEO vs GEO, and the order to build them", url: "/blog/geo-aeo-vs-seo/", built: true },
          { attr: "What query fan-out is", url: "/tools/query-fan-out/", built: true },
          { attr: "Glossary of AI search terms (citation, grounding, entity, retrieval)", url: null, built: false }
        ]},
        { entity: "Studies and corrections", attributes: [
          { attr: "Cross-engine citation study, re-tested against a permutation null", url: "/blog/breaking-my-own-study/", built: true, note: "Two findings retracted" },
          { attr: "The original citation overlap study", url: "https://wellows.com/blog/ai-citation-overlap-study/", built: true, note: "On the Wellows blog" },
          { attr: "The 94-day query fan-out experiment", url: "/work/#press", built: true, note: "Posted publicly by Wellows' COO" }
        ]},
        { entity: "Who is behind it", attributes: [
          { attr: "Who Khadija Zaman is", url: "/about/", built: true },
          { attr: "CV with sources", url: "/cv/", built: true },
          { attr: "How to cite this site, and what it offers machines", url: "/llms.txt", built: true, note: "llms.txt, answers.json, agents.json, markdown twins" }
        ]}
      ]
    }
  ]
};
