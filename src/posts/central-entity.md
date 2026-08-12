---
title: "Central Entity in SEO: What Google’s “Identifying Topical Entities” Patent Actually Describes"
metaTitle: "Central Entity in SEO: What Google’s Patent Describes"
date: 2026-08-12
category: "Content Strategy"
description: "How Google’s Identifying Topical Entities patent application confirms a page’s main topic, and how a central entity anchors a topical map."
readTime: "14 min"
answerQ: "What is a central entity in SEO?"
answerA: "A central entity is the entity a page, or a whole content network, is mainly about. In Google’s “Identifying Topical Entities” patent application, a system cuts a page’s entities down to the well-connected ones, scores them, then checks rankings, query logs, and the title and URL to confirm one predominant topic. Koray Tuğberk GÜBÜR’s topical map framework applies the same idea at site scale: one central entity runs through every page, and a root page covers it broadly."
layer: "core"
starter: false
---

In August 2026 I had to choose one entity for the whole Wellows content network, the thing every page would connect back to. Our brand name was an option. So was “AI citations”, the unit our platform measures. I picked neither and went with the category: AI visibility.

Google has a patent application that asks a smaller version of that question about a single web page. It’s called “Identifying Topical Entities” (US 2015/0278366 A1), and it walks through how a system could work out which of the many things a page mentions is the thing the page is really about. Following its method step by step is the clearest way I’ve found to explain what a central entity does, and where it’s easy to read more into the patent than the text supports.

Every ¶ number below points to a paragraph of that document, which is linked in the sources at the end.

## Five terms, in plain English

- **Entity.** A word or phrase that stands for a concept or topic, such as “NBA” or “Chicago Bulls”. (¶0024)
- **Entity graph.** A map where each entity is a dot (a node), and a line (an edge) joins two entities that appear on the same pages more often than chance. (¶0025)
- **Central entities.** The entities left after a page’s weakly connected entities are cut. One page can have several. (¶0032)
- **Centrality score.** A number that ranks a page’s central entities, starting from how much weight sits on each one’s outgoing lines. (¶0036)
- **Topical entity.** The one predominant topic of a page, confirmed with search results and query data. (¶0048, ¶0053)

## The patent is about showing related content, not ranking pages

Before the mechanics, it helps to know what the document was for. The system it describes can run as a browser add-on: while you read a page, a panel shows related news, videos, images, maps, reviews, or price comparisons. The drawings show three examples: a tablet review, a page about an art museum in Paris, and an online store selling a baby gym. Each one gets a different mix of related content. (¶0022, ¶0093 to ¶0096)

To pick that content well, the system first needs to know what the page is about. That’s the job the entities, graphs, and scores are doing here.

One caution I apply to every patent write-up. An application describes a method Google sought to protect. It doesn’t show that Google runs that method, in Search or anywhere else, and nothing in this one is about ranking the page itself. It was filed on June 3, 2011 and published on October 1, 2015. What it gives you is precise vocabulary for a messy problem.

## The entity graph comes from the whole web, not from your site

The first ingredient is an entity graph. Every entity is a node, and two nodes get an edge when their entities show up on the same pages more often than you’d expect if they had nothing to do with each other. “The same pages” means a large collection, for example the pages a search engine has indexed. (¶0025, ¶0028)

The patent’s example pair is “michael jordan” and “basketball”. The strength of an edge comes from pointwise mutual information (PMI), which boils down to one question: how much more often do these two appear together than they would by luck? If the answer is “no more often”, the weight is zero and there’s no edge. (¶0029) I’m leaving the formulas out. They sit in paragraphs 0028 and 0029 if you want to check the math.

Edges also have a direction, and it matters later. A page that mentions Omri Casspi, an NBA player, almost always mentions the NBA. A page about the NBA rarely mentions Omri Casspi. So the arrow runs from “Omri Casspi” to “NBA”, from the specific entity to the broader one it implies. (¶0030)

<figure><img src="/static/uploads/entity-graph-two-rules.webp" alt="Two entity graph rules from the patent: entities that share pages more often than chance get an edge, and the arrow points from the specific entity, Omri Casspi, to the broader one, NBA." width="1000" height="700"><figcaption>Two rules build the entity graph: entities that share pages more often than chance get linked, and arrows point from the specific entity to the broader one.</figcaption></figure>

One practical consequence, in my reading: repeating two entities side by side across your own site does little to an edge that’s calculated over an entire index. What you control is which entities appear on a page, and where they appear.

## Most of a page’s entities get cut before anything is scored

Now take a single page. The system collects every entity it can tie to it, from the text, the metadata, the title, and the URL, and keeps only the slice of the big graph that involves those entities. (¶0031)

Then the cutting starts. Entities with no edges to the page’s other entities go first. Entities with no outgoing arrows go next. The way I read that second rule, none of the entity’s usual companions are on the page, so it looks like a passing mention. Whatever survives counts as a central entity. In the patent’s worked example, a graph of 15 entities narrows to the 12 found on the page, then to 8 central entities once one loner and three entities with no outgoing arrows are removed. (¶0031, ¶0032)

<figure><img src="/static/uploads/topical-entities-pruning-15-12-8.webp" alt="Three stages of pruning from the patent’s worked example: 15 entities in the graph, 12 found on the page, 8 central entities after one loner and three entities with no outgoing arrows are cut." width="1000" height="700" loading="lazy"><figcaption>In the patent’s worked example, 15 entities become 12 on the page, then 8 central entities once one loner and three entities with no outgoing arrows are cut.</figcaption></figure>

The patent lists a few optional cuts on top of those. An entity that’s a substring of another can be dropped, like “Jordan” when “Michael Jordan” is already there. Entities whose edges are all weak can be dropped. A whole cluster of connected entities can be dropped if none of them appear in the title, the URL, the metadata, or the search queries that led people to the page. And when one entity’s search results are a subset of another entity’s results, the narrower one can go. (¶0033 to ¶0035)

So a page that mentions a dozen things in passing doesn’t end up with a dozen topics. Koray Tuğberk GÜBÜR makes a similar point about coverage in his course: it means connected information, not page counts or entity stuffing.

## The centrality score ranks the survivors

Each central entity then gets a score. The starting number is the share of the page graph’s total edge weight that sits on that entity’s outgoing arrows, so an entity with several strong arrows out beats one with a single weak arrow. A variant also counts the edges among the entities it points to. (¶0036, ¶0037)

Four signals then move that number. (¶0038 to ¶0041)

- The more often an entity appears on the page, the higher its final score.
- Entities that are common across the whole collection get marked down with an IDF-style adjustment, so a word doesn’t look central just because it’s popular everywhere.
- If the entity appears in search queries that brought people to the page, its score goes up, and it goes up further when the entity shows up in those queries often.
- Entities in the title, URL, or metadata get a boost.

<figure><img src="/static/uploads/centrality-score-signals.webp" alt="Centrality score signals: outgoing link weight as the base, with page frequency, title and URL placement, and query data pushing the score up and web-wide frequency pulling it down." width="1000" height="700" loading="lazy"><figcaption>A centrality score starts from outgoing link weight. Page frequency, title and URL placement, and query data push it up, while being common everywhere pulls it down.</figcaption></figure>

There’s a floor as well. If no entity scores above a threshold, the system can decide to show no related content for that page at all. (¶0085)

## The topical entity has to pass a search test

Central entities and the topical entity are two different outputs. A page can have several central entities but at most one topical entity: its predominant topic, which the patent describes as a topic covering more than a threshold share of the page’s content. And the score from the last section isn’t the main way the system finds it. (¶0027, ¶0048)

In one version the patent describes, the checks run in this order.

1. It looks at the queries that brought people to the page. If one entity accounts for more than a threshold share of them, that’s the topical entity, and if several do, the biggest share wins. A thin query log sends the system on to the next check. (¶0059)
2. Each entity becomes a search query, and the system checks whether the page shows up above a cutoff (the examples given are the top 10, 100, or 1,000 results). One qualifying entity wins outright. With several, the entity whose query gives the page its best ranking score wins, and choosing the highest centrality score instead is listed as an alternative. (¶0051 to ¶0054)
3. Some queries return shopping results, map results, or an answer box. When an entity’s query does, and the entity also sits in the page’s title or URL, the page can get that topical entity without ranking at all. The example is an obscure page titled “Buy the Baby Gym here”: “baby gym” returns shopping results, so it becomes the page’s topical entity. (¶0056 to ¶0058)

If none of that works, the page has no topical entity. (¶0055) The claims at the end of the document, which set out what Google asked to protect, build on this search-results test. None of them mention a centrality score.

<figure><img src="/static/uploads/topical-entity-search-test.webp" alt="Flowchart of the topical entity test: query logs first, then whether the page ranks for each entity’s query, then the shopping, map, or answer box shortcut tied to the title and URL, with centrality only as an alternative tie-breaker." width="1000" height="700" loading="lazy"><figcaption>The topical entity is confirmed through query data, rankings, or a special-results shortcut tied to the title and URL. Centrality only shows up as an alternative tie-breaker.</figcaption></figure>

A page doesn’t get to declare its topical entity, then. It gets confirmed when the title and URL, the page’s rankings, and the queries people typed all point at the same entity.

## Ambiguous names get a second word

One more mechanism matters for brands, since plenty of brand names are ordinary words. The patent’s example is an encyclopedia page about Moscow, Idaho. “Moscow” is clearly central to that page, but most indexed pages that mention Moscow are about the city in Russia, so related content pulled for “Moscow” would be useless to someone reading about Idaho. (¶0061, ¶0062)

To catch this, the system runs the entity as a query and scores the top results by how many other entities they share with the page. If fewer than a threshold share of those results are related (the example threshold is half), the entity counts as ambiguous. The fixes are practical: drop the entity, append another entity from the page (the patent’s version is “Moscow Id.”), pick an unambiguous query suggestion, or borrow a phrase from queries that already bring people to the page. (¶0064 to ¶0070)

This is the part of the patent closest to what I’m working on now. I’m setting up a study on how often AI answers get a brand’s name, products, or prices wrong, and which source caused each error. There are no results to share yet.

## Five shorthand readings, checked against the text

Patents get paraphrased a lot, and paraphrases drift. These five readings are easy to fall into with this one.

| Shorthand reading | What the text says | Verdict |
| --- | --- | --- |
| It finds the main topic of a whole website. | It works on one resource at a time: a page, a PDF, an image, a video. (¶0021, ¶0048) | Not in the text |
| The entity graph shows how entities connect inside your site. | Edges come from co-occurrence across a large collection, such as the pages a search engine has indexed. (¶0025) | Not in the text |
| Weakly connected entities count for less. | They’re removed from the page’s graph, not just weighted down. (¶0032, ¶0033) | Understated |
| The centrality score decides the topical entity. | Query logs and search rankings do most of the work. Highest centrality is one listed alternative. (¶0054, ¶0059) | Partly |
| The goal is ranking the page for related queries. | The goal is showing related news, videos, images, maps, reviews, and prices next to the page. (¶0006, ¶0074) | Not in the text |

## From one page to a whole site: where the central entity comes in

The patent stops at the page. Koray Tuğberk GÜBÜR’s topical map framework, which I was trained in and use for Wellows, works across a whole site. It names five components every topical map needs: source context (what the site focuses on and how it makes money), the central entity, the central search intent, a core section, and an outer section.

In his framework the central entity appears across every piece of content in the network, and his course says it should show up everywhere on the site so the main topic is hard to miss. The root document is the page every related page links to, and it links back to all of them. Its H1 states the topic plainly, and its brief covers the main aspects of the entire map.

Nothing in the patent mentions topical maps, and nothing in Koray’s framework depends on this patent. I read them side by side because they share a principle: one center, entities that genuinely connect to it, and whatever doesn’t connect trimmed away. That link is my practitioner lens, not a documented Google process.

| Term | In the patent (one page) | In a topical map (whole site) |
| --- | --- | --- |
| Central entity | One of several entities left after a page’s graph is pruned | The single entity that runs through every page in the network |
| Topical entity | The page’s one predominant topic, confirmed with search data | No matching term; the nearest idea is the one main focus each page should have |
| Centrality score | A number that ranks a page’s central entities | Not part of the framework |
| Root | Not used | The page every related page links to, covering the central entity broadly |

<figure><img src="/static/uploads/page-topic-vs-site-central-entity.webp" alt="Left, one page titled Buy the Baby Gym here with baby gym as its topical entity. Right, one site with AI visibility as the central entity linked to AI visibility tools, AI citation optimization, AI mention tracking, and entity SEO strategy." width="1000" height="700" loading="lazy"><figcaption>The patent works on a single page. A topical map puts one central entity at the root of a whole site, which for Wellows is AI visibility.</figcaption></figure>

## How I apply this at Wellows

### Picking the center

Back to the choice from the top of this post. Here’s how the three candidates hold up against the patent’s logic.

Our brand name is the narrowest option. I’d expect the arrow to run from Wellows to AI visibility rather than back, because pages that mention us tend to discuss AI visibility, while most pages about AI visibility never mention us. A network centered on the brand would mostly speak to people who already know it.

“AI citations” is specific, and it connects to a lot. It’s also one attribute of AI visibility, sitting next to AI mentions and brand sentiment, rather than the thing those attributes describe.

AI visibility sits between the two. All 30 keywords in the topical map I built for Wellows hang off it, from generative engine optimization and AI search optimization to AI mention tracking and entity SEO strategy.

The phrase didn’t come from a keyword tool. Until June 2026 we positioned Wellows as an AI SEO agent. The switch to “AI visibility platform” came after a booked demo where the prospect described what they wanted in terms of visibility, and that keyword had no meaningful search volume. A demo call isn’t a query log, but it’s the same kind of evidence the patent leans on: the words people use when they come looking for you.

### Filtering the map before writing anything

The map started as 30 keywords: generative engine optimization, AI search optimization, AI visibility tools, tracking, score, audit and monitoring, AI brand visibility, AI citation optimization, AI mention tracking, AI reputation management, entity SEO strategy, and similar terms. Before planning a single post, I filtered it against a sitemap export of wellows.com with 421 pages, each carrying GSC, GA4, Bing, and citation columns. Keywords the site already covered came off the list. For the rest, the filter surfaced the existing or nearest page so an internal link could go in.

Koray’s decision rule backs this up: when a topic is a deeper attribute of something a page already covers, expand that page instead of opening a new one. The output was a five-tab workbook and a weekly content calendar that runs from 24 August to 16 November 2026.

### Linking back to the root

Koray’s rule for a root page is easy to state: every related page links to it, it links back to them, and its H1 says plainly what the network is about. On our blog, the /blog/geo/ hub is the pattern I point to, and it’s the model I used when planning a research hub at /blog/insights/.

The links come from two places. I run internal linking passes that add contextual links from blog posts to feature and comparison pages, and I built an internal linking app that pulls GSC, GA4, Bing, and WordPress data into one place, so link decisions start from data.

### Checking that the signals agree

The search test gives me three questions for any page meant to carry the central entity or one of its main attributes. Is the entity in the title and the URL? Does the page show up for the entity’s query? Do the queries that bring people in contain it?

Google Search Console is the closest thing a site owner has to the patent’s query log. The GSC keyword classifier I’m building splits queries into branded and non-branded groups, which helps with that third question. My rule of thumb: a page meant to own a category term that mostly pulls branded queries is being read, by searchers at least, as a page about the brand.

### What I don’t know yet

None of this tells me how ChatGPT, Perplexity, or AI Overviews decide what a page is about. The patent predates all three. Whether topical authority matters for LLM visibility is still an open question, and I’m folding it into that study on wrong brand details in AI answers.

## Questions worth answering before you cite this patent

### Does Google use this patent to rank pages?

Nothing in the document shows that. It describes a system that picks related content to display next to a page, and it uses search rankings as an input rather than producing them. The version quoted here is the published application, US 2015/0278366 A1. Claims can change between an application and a granted patent, so check its current status on Google Patents before quoting the claims.

### What’s the difference between a central entity and a topical entity?

In the patent, central entities are the several entities that survive pruning on one page, and the topical entity is that page’s single predominant topic, confirmed with search data. In Koray’s topical map framework, the central entity is one entity for an entire site.

### Is a centrality score the same as harmonic centrality?

No. Harmonic centrality is a link-graph measure of how close a site sits to every other site, and it’s one of the rankings Common Crawl publishes for its web graph. The patent’s centrality score measures how well an entity connects to the other entities on a single page. Same word, different graph.

### What if my site serves two different kinds of business?

Then one map may not be enough, and the single-center approach in this post doesn’t transfer directly. Koray’s course handles that case with a separate topical map for each source context, so the same entity can get a different core section, outer section, and set of attributes for each one.

### My page is new. Does any of this apply?

Partly. A new page has no query data for the log check, and a page that doesn’t rank yet fails the search test. Under the patent’s logic that leaves the title, the URL, and the special-results shortcut carrying the load, which is a good reason to get the entity into the title and URL from day one.

## A 10-minute check on your own root page

If you already have a page that’s meant to carry your central entity, this takes about ten minutes in Google Search Console.

1. Open Performance, then Search results, and add a Page filter for that URL.
2. Switch to the Queries tab and read the top non-branded queries. Note whether your central entity, or a close variant, appears in them.
3. Compare those queries with the page’s title tag and URL. If the entity is missing from either one, fix that first.
4. Search the entity yourself and see whether the page appears in the top 10. If a different page of yours shows up instead, that page is the one currently winning your central entity’s query.

## Sources

- Haran Pilpel, Tomer Shmiel, Eran Ofek, Eldad Barkai, and Ziv Bar-Yossef, [“Identifying Topical Entities”, US 2015/0278366 A1](https://patents.google.com/patent/US20150278366A1/en), assigned to Google Inc. Filed June 3, 2011, published October 1, 2015. Every ¶ number in this post points to a paragraph of this document.
- Koray Tuğberk GÜBÜR, Holistic SEO Course, [holisticseo.digital](https://www.holisticseo.digital/), for the topical map components, the central entity, root documents, and the expand-or-create decision rule.
