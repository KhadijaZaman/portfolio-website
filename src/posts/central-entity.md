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

In August 2026 I had to choose one entity for a software company’s whole content network, the thing every page would connect back to. The brand name was an option. So was “AI citations”, the unit the product measures. I picked neither and went with the category: AI visibility.

Google has a patent application that asks a smaller version of that question about a single web page. I’ve read it closely. It’s called “Identifying Topical Entities” (US 2015/0278366 A1). It walks through how a system could work out which of the many things a page mentions is the thing the page is really about.

Following its method step by step is the clearest way I’ve found to explain what a central entity does. It also shows where it’s easy to read more into the patent than the text supports.

## Five terms, in plain English

These are the five terms I use throughout, in the sense the patent gives them.

- **Entity.** A word or phrase that stands for a concept or topic, such as “NBA” or “Chicago Bulls”.
- **Entity graph.** A map where each entity is a dot (a node), and a line (an edge) joins two entities that appear on the same pages more often than chance.
- **Central entities.** The entities left after a page’s weakly connected entities are cut. One page can have several.
- **Centrality score.** A number that ranks a page’s central entities, starting from how much weight sits on each one’s outgoing lines.
- **Topical entity.** The one predominant topic of a page, confirmed with search results and query data.

## The patent is about showing related content, not ranking pages

The first thing I noticed is that the patent describes a system for showing related content next to the page you’re reading, not a way of ranking pages. It can run as a browser add-on: while you read, a panel shows related news, videos, images, maps, reviews, or price comparisons.

In the drawings I count three examples: a tablet review, a page about an art museum in Paris, and an online store selling a baby gym. Each one gets a different mix of related content.

To pick that content well, the system first needs to know what the page is about. That, as I read it, is the job the entities, graphs, and scores are doing here.

One caution I apply to every patent write-up. An application describes a method Google sought to protect. It doesn’t show that Google runs that method, in Search or anywhere else, and nothing in this one is about ranking the page itself.

The application was filed on June 3, 2011 and published on October 1, 2015. What I take from it is precise vocabulary for a messy problem.

## The entity graph comes from the whole web, not from your site

The first ingredient I found is an entity graph. Every entity is a node, and two nodes get an edge when their entities show up on the same pages more often than you’d expect if they had nothing to do with each other. “The same pages” means a large collection, for example the pages a search engine has indexed.

The patent’s example pair is “michael jordan” and “basketball”. The strength of an edge comes from pointwise mutual information (PMI), which I boil down to one question: how much more often do these two appear together than they would by luck?

If the answer is “no more often”, the weight is zero and there’s no edge. I’ve left the formulas out. They’re in the patent if you want to check my reading of the math.

Edges also have a direction, and I’ll come back to why it matters. A page that mentions Omri Casspi, an NBA player, almost always mentions the NBA. A page about the NBA rarely mentions Omri Casspi. So the arrow runs from “Omri Casspi” to “NBA”, from the specific entity to the broader one it implies.

<figure><img src="/static/uploads/entity-graph-two-rules.webp" alt="Two rules from the patent: entities that share pages more often than chance get an edge, and arrows point from the specific entity to the broader one." width="1000" height="700"><figcaption>Two rules build the entity graph: entities that share pages more often than chance get linked, and arrows point from the specific entity to the broader one.</figcaption></figure>

One practical consequence, in my reading: repeating two entities side by side across your own site does little to an edge that’s calculated over an entire index. What you control is which entities appear on a page, and where they appear.

## Most of a page’s entities get cut before anything is scored

The next step, as I follow it, works on a single page. The system collects every entity it can tie to it, from the text, the metadata, the title, and the URL, and keeps only the slice of the big graph that involves those entities.

Then the cutting starts. Entities with no edges to the page’s other entities go first. Entities with no outgoing arrows go next. The way I read that second rule, none of the entity’s usual companions are on the page, so it looks like a passing mention.

Whatever survives counts as a central entity. When I traced the patent’s worked example, a graph of 15 entities narrows to the 12 found on the page, then to 8 central entities once one loner and three entities with no outgoing arrows are removed.

<figure><img src="/static/uploads/topical-entities-pruning-15-12-8.webp" alt="Pruning in the patent’s example: 15 entities in the graph, 12 on the page, 8 central entities after the loner and no-outgoing-arrow entities are cut." width="1000" height="700" loading="lazy"><figcaption>In the patent’s worked example, 15 entities become 12 on the page, then 8 central entities once one loner and three entities with no outgoing arrows are cut.</figcaption></figure>

I found a few optional cuts listed on top of those. An entity that’s a substring of another can be dropped, like “Jordan” when “Michael Jordan” is already there. Entities whose edges are all weak can be dropped.

A whole cluster of connected entities can be dropped if none of them appear in the title, the URL, the metadata, or the search queries that led people to the page. And when one entity’s search results are a subset of another entity’s results, the narrower one can go.

The takeaway I keep coming back to: a page that mentions a dozen things in passing doesn’t end up with a dozen topics. Koray Tuğberk GÜBÜR makes a similar point about coverage in his course: it means connected information, not page counts or entity stuffing.

## The centrality score ranks the survivors

Each central entity on a page then gets a centrality score. The starting number, as I understand it, is the share of the page graph’s total edge weight on that entity’s outgoing arrows. Several strong arrows out beat a single weak one.

A variant also counts the edges among the entities it points to.

I count four signals that then move the centrality score.

- The more often an entity appears on the page, the higher its final score.
- Entities that are common across the whole collection get marked down with an IDF-style adjustment, so a word doesn’t look central just because it’s popular everywhere.
- If the entity appears in search queries that brought people to the page, its score goes up, and it goes up further when the entity shows up in those queries often.
- Entities in the title, URL, or metadata get a boost.

<figure><img src="/static/uploads/centrality-score-signals.webp" alt="Centrality score signals: outgoing link weight as the base. Page frequency, title and URL, and query data raise it. Web-wide frequency lowers it." width="1000" height="700" loading="lazy"><figcaption>A centrality score starts from outgoing link weight. Page frequency, title and URL placement, and query data push it up, while being common everywhere pulls it down.</figcaption></figure>

There’s a floor on the score as well, which I hadn’t expected. If no entity scores above a threshold, the system can decide to show no related content for that page at all.

## The topical entity has to pass a search test

Central entities and the topical entity are two different outputs, and my own first draft of this post blurred them. A page can have several central entities but at most one topical entity: its predominant topic, which the patent describes as a topic covering more than a threshold share of the page’s content.

The centrality score isn’t the main way the system finds the topical entity. Search behavior is, and that was the biggest surprise for me.

In one version the patent describes, I read the checks as running in this order.

1. It looks at the queries that brought people to the page. If one entity accounts for more than a threshold share of them, that’s the topical entity, and if several do, the biggest share wins. A thin query log sends the system on to the next check.
2. Each entity becomes a search query, and the system checks whether the page ranks above a cutoff (the examples are the top 10, 100, or 1,000 results). One qualifying entity wins outright. With several, the best ranking score wins, and picking the highest centrality score is listed as an alternative.
3. Some queries return shopping results, map results, or an answer box. When an entity’s query does, and the entity also sits in the page’s title or URL, the page gets that topical entity without ranking at all. The example is a page titled “Buy the Baby Gym here”: “baby gym” returns shopping results, so it wins.

If none of those three checks works, the page has no topical entity. I also checked the claims at the end of the document, which set out what Google asked to protect. They build on this search-results test, and none of them mention a centrality score.

<figure><img src="/static/uploads/topical-entity-search-test.webp" alt="Flowchart of the topical entity test: query logs, then whether the page ranks for the entity, then a shopping or answer box shortcut." width="1000" height="700" loading="lazy"><figcaption>The topical entity is confirmed through query data, rankings, or a special-results shortcut tied to the title and URL. Centrality only shows up as an alternative tie-breaker.</figcaption></figure>

My reading: a page doesn’t get to declare its topical entity. It gets confirmed when the title and URL, the page’s rankings, and the queries people typed all point at the same entity.

## Ambiguous names get a second word

One more mechanism in the patent matters for the brands I work with, since plenty of brand names are ordinary words. The patent’s example is an encyclopedia page about Moscow, Idaho.

“Moscow” is clearly central to that page. But most indexed pages that mention Moscow are about the city in Russia, so related content pulled for “Moscow” would be useless to someone reading about Idaho.

To catch ambiguity, as I understand it, the system runs the entity as a query and scores the top results by how many other entities they share with the page. If fewer than a threshold share of those results are related (the example threshold is half), the entity counts as ambiguous.

The fixes are practical, and I’d use any of them: drop the entity, append another entity from the page (the patent’s version is “Moscow Id.”), pick an unambiguous query suggestion, or borrow a phrase from queries that already bring people to the page.

This ambiguity check is the part of the patent closest to what I’m working on now. I’m setting up a study on how often AI answers get a brand’s name, products, or prices wrong, and which source caused each error.

There are no results to share yet. When there are, they’ll go through the same checks I used to [break my own citation study](/blog/breaking-my-own-study/).

## Five shorthand readings, checked against the text

Patents get paraphrased a lot, and paraphrases drift. These five readings are ones I’ve seen, and in one case written myself, about this patent.

| Shorthand reading | What the text says | Verdict |
| --- | --- | --- |
| It finds the main topic of a whole website. | It works on one resource at a time: a page, a PDF, an image, a video. | Not in the text |
| The entity graph shows how entities connect inside your site. | Edges come from co-occurrence across a large collection, such as the pages a search engine has indexed. | Not in the text |
| Weakly connected entities count for less. | They’re removed from the page’s graph, not just weighted down. | Understated |
| The centrality score decides the topical entity. | Query logs and search rankings do most of the work. Highest centrality is one listed alternative. | Partly |
| The goal is ranking the page for related queries. | The goal is showing related news, videos, images, maps, reviews, and prices next to the page. | Not in the text |

## From one page to a whole site: where the central entity comes in

The patent stops at the page. Koray Tuğberk GÜBÜR’s topical map framework, which I was trained in and use in my own work, works across a whole site.

Koray names five components every topical map needs, and I build to all five: source context (what the site focuses on and how it makes money), the central entity, the central search intent, a core section, and an outer section.

In Koray’s framework the central entity appears across every piece of content in the network. His course says it should show up everywhere on the site so the main topic is hard to miss.

The root document, as I build it, is the page every related page links to, and it links back to all of them. Its H1 states the topic plainly, and its brief covers the main aspects of the entire map.

Nothing in the patent mentions topical maps, and nothing in Koray’s framework depends on this patent. I read them side by side because they share a principle: one center, entities that genuinely connect to it, and whatever doesn’t connect trimmed away.

That link is my practitioner lens, not a documented Google process. This site runs on the same idea, and I publish its own [topical map](/topical-map/), central entity included, with the gaps still to fill.

| Term | In the patent (one page) | In a topical map (whole site) |
| --- | --- | --- |
| Central entity | One of several entities left after a page’s graph is pruned | The single entity that runs through every page in the network |
| Topical entity | The page’s one predominant topic, confirmed with search data | No matching term; the nearest idea is the one main focus each page should have |
| Centrality score | A number that ranks a page’s central entities | Not part of the framework |
| Root | Not used | The page every related page links to, covering the central entity broadly |

<figure><img src="/static/uploads/page-topic-vs-site-central-entity.webp" alt="Left, a page titled Buy the Baby Gym here with baby gym as its topical entity. Right, a site with AI visibility as its central entity." width="1000" height="700" loading="lazy"><figcaption>The patent works on a single page. A topical map puts one central entity at the root of a whole site. In this example, AI visibility.</figcaption></figure>

## How I apply this to a topical map

### Picking the center

Choosing a central entity means testing the candidates against the patent’s logic. For the content network I mapped in August 2026, three came up: the brand name, AI citations, and AI visibility.

The brand name is the narrowest option. I’d expect the arrow to run from the brand to AI visibility rather than back, because pages that mention the brand tend to discuss AI visibility, while most pages about AI visibility never mention the brand. A network centered on the brand would mostly speak to people who already know it.

“AI citations” was my second candidate. It’s specific, and it connects to a lot. It’s also one attribute of AI visibility, sitting next to AI mentions and brand sentiment, rather than the thing those attributes describe.

AI visibility, my pick, sits between the two. Every keyword in the topical map hangs off it, from generative engine optimization and AI search optimization to AI mention tracking and entity SEO strategy.

I didn’t get the phrase AI visibility from a keyword tool. It came from the way prospects described what they wanted on sales calls, and at the time it had no meaningful search volume. A sales call isn’t a query log, but it’s the same kind of evidence the patent leans on: the words people use when they come looking for you.

### Filtering the map before writing anything

My topical map started as a keyword list: generative engine optimization, AI search optimization, AI visibility tools, tracking, score, audit and monitoring, AI brand visibility, AI citation optimization, AI mention tracking, AI reputation management, entity SEO strategy, and similar terms.

Before planning a single post, I filtered that list against a full sitemap export of the site, with Search Console, GA4, Bing, and AI citation columns on every URL. Keywords the site already covered came off the list. For the rest, the filter surfaced the existing or nearest page so an internal link could go in.

Koray’s expand-or-create rule backs up how I filtered: when a topic is a deeper attribute of something a page already covers, expand that page instead of opening a new one. The output was a workbook and a weekly content calendar for the following quarter.

### Linking back to the root

Koray’s rule for a root page is easy to state, and I apply it to every map: every related page links to it, it links back to them, and its H1 says plainly what the network is about.

A category hub that every post in the category links to, and that links back to each of them, is the pattern I point to. I set out how to build that structure in [topic cluster architecture that scales organic traffic](/blog/topic-cluster-architecture/).

The links come from two places. I run internal linking passes that add contextual links from blog posts to feature and comparison pages, and I built an internal linking tool that pulls Search Console, GA4, Bing, and CMS data into one place, so link decisions start from data.

### Checking that the signals agree

The patent’s search test gives me three questions for any page meant to carry the central entity or one of its main attributes. Is the entity in the title and the URL? Does the page show up for the entity’s query? Do the queries that bring people in contain it?

Google Search Console is the closest thing a site owner has to the patent’s query log. The GSC keyword classifier I’m building splits queries into branded and non-branded groups, which helps with that third question.

My rule of thumb: a page meant to own a category term that mostly pulls branded queries is being read, by searchers at least, as a page about the brand.

### What I don’t know yet

Nothing in the patent tells me how ChatGPT, Perplexity, or AI Overviews decide what a page is about. It predates all three, and it sits on the SEO layer of the [SEO, AEO, and GEO sequence](/blog/geo-aeo-vs-seo/) rather than the generative one.

What I’ve found so far about getting a brand named in those answers is in [how to get cited by ChatGPT, Gemini and Perplexity](/blog/get-cited-by-ai-search/). Whether topical authority matters for LLM visibility is still an open question, and I’m folding it into the study on wrong brand details in AI answers.

## Questions worth answering before you cite this patent

### Does Google use this patent to rank pages?

Nothing I found in the patent shows Google using it to rank pages. It describes a system that picks related content to display next to a page, and it uses search rankings as an input rather than producing them.

The version I quote here is the published application, US 2015/0278366 A1. Claims can change between an application and a granted patent, so check its current status on Google Patents before quoting the claims.

### What’s the difference between a central entity and a topical entity?

As I read the patent, central entities are the several entities that survive pruning on one page, and the topical entity is that page’s single predominant topic, confirmed with search data. In Koray’s topical map framework, the central entity is one entity for an entire site.

### Is a centrality score the same as harmonic centrality?

No, and I see the two confused a lot. Harmonic centrality is a link-graph measure of how close a site sits to every other site. It’s one of the rankings Common Crawl publishes for its web graph.

The patent’s centrality score measures how well an entity connects to the other entities on a single page. Same word, different graph.

### What if my site serves two different kinds of business?

Then one topical map may not be enough, in my experience, and the single-center approach in this post doesn’t transfer directly. Koray’s course handles that case with a separate topical map for each source context, so the same entity can get a different core section, outer section, and set of attributes for each one.

### My page is new. Does any of this apply?

Partly, and I’d plan for that. A new page has no query data for the log check, and a page that doesn’t rank yet fails the search test. Under the patent’s logic that leaves the title, the URL, and the special-results shortcut carrying the load, which is a good reason to get the entity into the title and URL from day one.

## A 10-minute check on your own root page

If you already have a page that’s meant to carry your central entity, here’s the check I run. It takes about ten minutes in Google Search Console.

1. Open Performance, then Search results, and add a Page filter for that URL.
2. Switch to the Queries tab and read the top non-branded queries. Note whether your central entity, or a close variant, appears in them.
3. Compare those queries with the page’s title tag and URL. If the entity is missing from either one, fix that first.
4. Search the entity yourself and see whether the page appears in the top 10. If a different page of yours shows up instead, that page is the one currently winning your central entity’s query.

## Sources

- Haran Pilpel, Tomer Shmiel, Eran Ofek, Eldad Barkai, and Ziv Bar-Yossef, [“Identifying Topical Entities”, US 2015/0278366 A1](https://patents.google.com/patent/US20150278366A1/en), assigned to Google Inc. Filed June 3, 2011, published October 1, 2015.
- Koray Tuğberk GÜBÜR, Holistic SEO Course, [holisticseo.digital](https://www.holisticseo.digital/), for the topical map components, the central entity, root documents, and the expand-or-create decision rule.
