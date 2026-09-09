/* Static entries for the hero question box. Posts and case studies are added
   at build time in index.njk, so this list only needs the pages that have no
   data file of their own. `k` holds extra words a visitor might type. */
module.exports = [
  { t: "AEO Citeability Checker", d: "Score how ready a page is to be cited by ChatGPT, Gemini and Perplexity, with fixes.", u: "/tools/citeability-checker/", g: "Free tool", k: "citeable citation checker score audit page content ready retrieval" },
  { t: "SERP Snippet Preview", d: "See how a title tag and meta description render in Google, with pixel widths.", u: "/tools/serp-preview/", g: "Free tool", k: "title tag meta description snippet preview truncation pixel google" },
  { t: "Query Fan-Out Explorer", d: "Expand a seed query into the questions and sub-queries engines and LLMs generate.", u: "/tools/query-fan-out/", g: "Free tool", k: "fan out fanout query expansion sub-queries seed keyword research intent" },
  { t: "Schema JSON-LD Generator", d: "Paste-ready Article, FAQ or Person structured data.", u: "/tools/schema-generator/", g: "Free tool", k: "schema structured data json-ld jsonld faq article person markup rich results" },
  { t: "Query Fan-Out Generator", d: "Patent-based query expansion used by 829 practitioners and by Search Engine Land's topic cluster guide.", u: "/tools/#tool-query-fan-out", g: "Wellows tool", k: "fan out fanout generator patent wellows search engine land topic clusters" },
  { t: "LLM Query Builder", d: "Builds query structures for LLM-based SEO research and entity mapping.", u: "/tools/#tool-llm-query-builder", g: "Wellows tool", k: "llm query builder entity mapping research prompts" },
  { t: "AI Humanizer", d: "Turns AI drafts into content that reads naturally and holds topical depth.", u: "/tools/#tool-ai-humanizer", g: "Wellows tool", k: "humanizer humanize ai writing draft natural rewrite detector" },
  { t: "SEO management, AI search, content strategy, automation", d: "The four disciplines run as one system.", u: "/#expertise", g: "What I do", k: "services expertise seo management technical audit schema core web vitals n8n automation workflow reporting content strategy geo aeo hire" },
  { t: "About Khadija", d: "Career since 2019, credentials, and the stack.", u: "/about/", g: "About", k: "about who is khadija zaman career experience background credentials nust koray wellows marketing manager karachi" },
  { t: "Start a conversation", d: "Hiring for a marketing or SEO role, or need specialist strategy? Tell me what you are building.", u: "/contact/", g: "Contact", k: "contact hire email work together price rates availability consult freelance job" },
  { t: "Featured in Search Engine Land", d: "Its topic cluster guide runs on the Query Fan-Out Generator.", u: "https://searchengineland.com/guide/topic-clusters-for-ai-search", g: "Press", k: "search engine land featured press recognition guide topic clusters" }
];
