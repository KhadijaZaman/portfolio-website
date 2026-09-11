# Tools · SEO & AI Search Instruments — Khadija Zaman

> Every tool Khadija Zaman has built: the Google-patent-based Query Fan-Out Generator featured in Search Engine Land, LLM Query Builder, AI Humanizer, four free in-browser utilities, and six open-source SEO projects on GitHub.

Source: https://khadijazaman.com/tools/

[Home](/) / Tools

# Tools that bridge search science and AI retrieval

Three kinds of tool here: free interactive utilities you can run right now, no sign-up; the three tools I built at Wellows, grounded in Google patent research and used by 1,647 people worldwide with zero paid spend, led by the Query Fan-Out Generator that Search Engine Land picked to demonstrate query fan-out; and the open-source SEO projects on my GitHub. Each one fills a real gap between what content teams produce and what AI systems actually cite.

## What tools has Khadija Zaman built?

Khadija Zaman built three SEO tools at Wellows grounded in Google patent research, the Query Fan-Out Generator, the LLM Query Builder and the AI Humanizer, used by 1,647 practitioners with no paid acquisition. She also publishes four free in-browser tools on this site and six open-source SEO projects on GitHub.

Free Tools · No sign-up

## Try these free — no email required

[

### AEO Citeability Checker

Paste your content and score how ready it is to be cited by ChatGPT, Gemini, and Perplexity — with specific fixes.

Check my content →](/tools/citeability-checker/)[

### SERP Snippet Preview

See exactly how your title and meta description render in Google — with pixel-width and truncation warnings.

Preview my snippet →](/tools/serp-preview/)[

### Query Fan-Out Explorer

Enter a seed query and see the related questions and sub-queries search engines and LLMs expand it into.

Expand a query →](/tools/query-fan-out/)[

### Schema JSON-LD Generator

Fill a short form and copy ready-to-paste Article, FAQ, or Person structured data for richer results.

Generate schema →](/tools/schema-generator/)

Proprietary Tools

## Built at Wellows for practitioners, used by 1,647

1,647 is the three tools combined — 829 + 149 + 669 — from my own tracking while I was building and measuring them. These are not the tools’ lifetime totals: Wellows’ live counter for the Query Fan-Out Generator reads **6,849** in the Search Engine Land feature, because the tool kept acquiring users long after I stopped counting.

Google Patent-Based · Featured in Search Engine Land

### Query Fan-Out Generator

Built on Google's query fan-out patent research — the sub-query expansion AI Mode and AI Overviews run before they answer. Enter one seed query and it returns 40+ semantically distinct variants, each classified by intent (informational, commercial, comparative, navigational) and relevance, with CSV export for content planning. It surfaces the topical gaps your competitors are filling and gives you the architecture to fill them first. *The free Query Fan-Out Explorer above is a lightweight, on-site preview of this tool.*

-   **829** active users in my tracking period
-   **6,849** lifetime users on Wellows’ live counter
-   **5.1%** CTR from organic search

**Featured in Search Engine Land.** Its guide to topic clusters for AI search uses this tool to demonstrate the method — “There are multiple query fan-out tools. For this tutorial, we’ll use Wellows.” The article credits Wellows, where I built it; [the COO’s public post](https://www.linkedin.com/posts/saleemahrar_i-have-always-believed-that-when-you-want-activity-7395425630474907648-Zn_i) on the experiment behind it names me. [Read the Search Engine Land guide →](https://searchengineland.com/guide/topic-clusters-for-ai-search)

**Listed in Search Engine Land’s query fan-out tools roundup** alongside the category’s other software. [See the roundup →](https://searchengineland.com/guide/query-fan-out-tools-software)

[Try the free preview on this site →](/tools/query-fan-out/)

AI Search · 149 Users

### LLM Query Builder

Generates the natural-language queries a buyer would actually type into ChatGPT, Perplexity, or Gemini about your category — 40 at a time, spread across personas and the four intent types (informational, navigational, commercial, transactional). Built for practitioners who need to work with AI retrieval systematically, not ad hoc. The open-source engine behind it is on GitHub below.

**Launched on Product Hunt.** Masab Gadit’s launch post credits me for the build. [Read Masab Gadit’s Product Hunt post →](https://www.linkedin.com/posts/masab-gadit_producthunt-aisearch-seo-activity-7399797741079412736-_oZC)

669 Users · 60–72% Engagement Rate

### AI Humanizer

Transforms AI-generated drafts into content that reads naturally, holds topical depth, and aligns with how LLMs evaluate quality signals. Paste a draft, set tone and strength, and compare before-and-after stats. Its GA4 engagement rate (engaged sessions as a share of all sessions, where an engaged session lasts over 10 seconds, has a conversion, or has two or more page views) ran between 60% and 72% across the months I tracked it — users work with it, not through it. Built because content that AI models cite has to be genuinely useful, not just optimized.

Open Source · GitHub

## Open-source SEO and AI-search tooling

Everything below is public on [github.com/KhadijaZaman](https://github.com/KhadijaZaman). Clone it, run it, fork it. These are working codebases, not demos — several of them power the production tools above.

TypeScript · Node · OpenAI

### LLM AI Search Query Builder

The engine behind the LLM Query Builder. A 9-step pipeline reads a site’s homepage, feature, and pricing pages, extracts products, use cases, audiences, and plans, maps them to personas and pain points, and generates 100+ natural-language queries across the customer journey — then de-duplicates and strips competitor brand names.

[LLM AI Search Query Builder on GitHub →](https://github.com/KhadijaZaman/LLM-AI-Search-Query-Builder)

TypeScript · Postgres · Common Crawl

### Domain Authority Explorer

A free, open-data alternative to proprietary authority scores. Ingests the Common Crawl Web Graph (about 121 million domains) and returns two 0–100 metrics: an Authority Score from harmonic centrality and a Popularity Score from PageRank, with monthly history back to January 2018 and a corpus audit of how often a domain is captured.

[Domain Authority Explorer on GitHub →](https://github.com/KhadijaZaman/domain-authority-explorer)

TypeScript · React · Express

### Citation Auditor

Full-stack app that scrapes a set of pages, scores each one for the signals AI answer engines cite — the same criteria as the free Citeability Checker above, run at scale — and exports the results as a spreadsheet so a content team can work through them.

[Citation Auditor on GitHub →](https://github.com/KhadijaZaman/citation-auditor)

TypeScript · Claude API · MIT

### Internal Link System

A monorepo for AI-assisted internal linking: a typed API spec and Zod schemas, a database layer, a React client, and a Claude batch integration that reads your pages and proposes contextually relevant internal links instead of keyword-matched ones.

[Internal Link System on GitHub →](https://github.com/KhadijaZaman/internal-link-system)

TypeScript · MCP · OAuth 2.0 · MIT

### Wellows MCP Server

A production Model Context Protocol server that lets Claude and any MCP client check a domain’s citation score inside Google AI Overviews without opening a dashboard. Four tools: extract domain entities, generate 40 intent-driven queries, scan live AI Overviews for citations, and benchmark the resulting score with next actions.

[Wellows MCP Server on GitHub →](https://github.com/KhadijaZaman/wellows-mcp-server)

Python · Jupyter · NLP

### Custom Semantic Search Engine

Where the retrieval interest started: a semantic document search built from scratch with Word2Vec embeddings, cosine-similarity ranking, and BART summarisation, packaged as a Colab notebook with explanations and exercises. Useful if you want to see how vector retrieval works under the hood before optimising for it.

[Custom Semantic Search Engine on GitHub →](https://github.com/KhadijaZaman/custom-search-engine)

Why I built them

## Authority signals, not vanity metrics

No tool bridged Google's patent-level search science and AI-retrieval content strategy — so I built three at Wellows, and open-sourced the engines and the surrounding tooling. Together they created the entity signal LLMs treat as a credibility marker, onboarded 1,647 practitioners across the UK, US, and EU with zero paid spend, and got the Query Fan-Out Generator picked up by Search Engine Land twice.

01

### Grounded in research

Every tool starts from primary source material — Google's query fan-out patents and how retrieval systems actually score and select content — not from recycled best-practice blog posts. That is why Search Engine Land chose the Query Fan-Out Generator to demonstrate the method.

02

### Distributed by usefulness

1,647 users, 100% organic. The tools spread because they solve a real problem, which is exactly the signal search and answer engines are built to reward.

03

### Tied to outcomes

They aren't side projects — they're part of a system that grew Wellows’ LLM referral sessions 9× in 8 months and lifted GSC impressions from 680K to 3.78M.

The Newsletter

## Get new tools and teardowns first

I share new instruments, use cases, and the research behind them with the list before anywhere else.

Unsubscribe anytime.

---
Markdown twin of https://khadijazaman.com/tools/, generated from the rendered page at build time. Cite the HTML URL. How to cite: https://khadijazaman.com/llms.txt
