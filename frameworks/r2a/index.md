# R2A Content Framework: Retrieval-to-Action for AI Search

> A practitioner framework for scoring whether AI systems can retrieve, select, cite and act on a page. Eight layers, one hard gate, graded evidence.

Source: https://khadijazaman.com/frameworks/r2a/  ·  Last modified: 2026-09-18

[Home](/) / [Frameworks](/frameworks/) / The R2A Content Framework: what a page has to get through before anyone acts on it

[Framework](/frameworks/ "Back to Frameworks")20 Aug 2026 · 8 min read · by Khadija Zaman

# The R2A Content Framework: what a page has to get through before anyone acts on it

## What is the R2A Content Framework?

R2A (Retrieval-to-Action) is Khadija Zaman's practitioner framework for scoring whether AI systems can retrieve, select, cite and act on a page. It has eight layers: Measurement as the base, Eligibility as the only hard gate, and six independently scored layers, with every recommendation carrying one of five evidence grades.

A page can be crawlable, indexed and ranking on page one, and still never show up in an AI answer for the query it ranks for. A standard SEO audit has no column for that gap, because it was built for a results page of ten links, not one assembled response.

The R2A Content Framework is how I score that gap. R2A stands for Retrieval-to-Action. It covers what has to be true about a page between the moment a system finds it and the moment someone (a person or an agent) does something with what it said.

It's a practitioner lens, built from working on AI visibility day to day. It isn't an official model from any search engine or AI company, and every recommendation in it carries an evidence grade so you can see how sure I am. The studies behind the grades are indexed under [research](/research/).

## The journey stops at action, and the outcomes sit outside it

R2A models five stages: Discovery, Retrieval, Selection, Citation and Action. A crawler or agent finds the URL. A system pulls passages from it into a candidate set. A model picks which candidates to use. The source gets credited. Someone acts.

![Sketch-note diagram: five boxes labelled Discovery, Retrieval, Selection, Citation and Action connected by arrows inside a dashed boundary, with five outcome pills below it labelled Ranking, Citation, Recommendation, Conversion and Agent Action](/static/uploads/r2a-fig1-journey-vs-outcomes.png)
*Figure 1. The five R2A stages sit inside the framework. Ranking, Citation, Recommendation, Conversion and Agent Action are outcomes, observed but not scored.*

Ranking, Citation, Recommendation, Conversion and Agent Action are treated as outcomes, and they sit outside the framework on purpose. Yes, Citation appears twice. As a stage, it means the page is in a condition to be credited. As an outcome, it means a specific engine credited it on a specific day, which also depends on who else was in the candidate set, how the engine was behaving that week and what the person actually asked.

If a framework scores outcomes, you end up grading yourself on your competitors' pages. R2A scores the page (the [AEO Citeability Checker](/tools/citeability-checker/) runs a lightweight version of that scoring in the browser), and you watch the outcomes to see whether the scoring holds up.

## Eight layers, and only one of them is a gate

The framework has eight layers. An earlier draft ran them as a strict sequence, with Control & Observability sitting last. The current version is a hybrid: measurement moved to the bottom, one layer acts as a gate, and the rest are scored independently.

![Sketch-note diagram: six boxes for layers 2 to 7 with empty checkboxes, arrows rising from a fenced gate labelled Layer 1 Eligibility, a green check reading pass score layers 2 to 7, a red cross reading fail nothing else counts yet, and a hatched base bar labelled Layer 0 Measurement](/static/uploads/r2a-fig2-layer-structure.png)
*Figure 2. Measurement is the base, Eligibility is the only hard gate, and layers 2 to 7 are scored independently.*

**Layer 0: Measurement (Control & Observability).** Logs and signals, attribution, feedback loops and iteration: the prompt set you monitor, what crawlers actually did in your logs, and the baseline you compare every change against. It moved to the bottom because a score with no baseline can't tell you whether anything improved.

**Layer 1: Eligibility.** Can the system reach and use the page at all? That covers crawlability, indexability, technical accessibility and rendering, meaning whether the content that matters loads for a client that doesn't run a full browser. Crawl rules follow the Robots Exclusion Protocol, which the IETF published as [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) in September 2022, and the standard says those rules are not a form of access authorization. Crawlers are asked to honor them, not forced to. This is the only layer that works as a gate. If it fails, the other scores describe a page nobody can use.

**Layers 2 to 7** are scored as independent checks, in any order:

| Layer | What it checks |
| --- | --- |
| 2. Entity Integrity | The brand, its products and its people are described consistently, completely and authentically, and can't be confused with anything else sharing the name |
| 3. Information Extractability | Semantic HTML, structured data, clear headings, definitions and real tables and lists carry the facts |
| 4. Retrieval Efficiency | The meaning is cheap to fetch: small payload, sensible caching, and alternate representations served through content negotiation |
| 5. Source Fitness | Expertise, experience, authority, trust and evidence stand behind the page's claims |
| 6. Web Corroboration | Independent mentions, citations, reviews and references say the same thing the page says |
| 7. Agent Operability | APIs or MCP, clear actions, stated permissions and tool-readiness let an agent complete the next step |

The reason they aren't a sequence is practical. Fixing a price table that's an image (Layer 3) has no dependency on cleaning up schema naming (Layer 2, where the [Schema JSON-LD Generator](/tools/schema-generator/) gives you a clean baseline), so a strict order would hold back fixes that are ready to ship.

If you're reading this with one of your own pages open in another tab, score Layer 1 first. The rest can wait until that one passes.

## Every claim gets an evidence grade

AI search advice has a sourcing problem. A lot of it mixes documented platform behaviour, one person's test and pure hypothesis into the same confident tone. R2A tags every recommendation with one of five grades.

![Sketch-note scale with five points from left to right: Established means official docs, standards or replicated studies; Observed means seen in the real world but needing more validation; Emerging means early signals and examples; Experimental means actively testing with no causation assumed; Speculative means a hypothesis or informed guess. Green text reads safe to act on, red text reads test before you act](/static/uploads/r2a-fig3-evidence-continuum.png)
*Figure 3. The five-level evidence continuum. The line gets thinner as the evidence does.*

Established means strong evidence from official documentation, standards or replicated studies. Observed means seen in the real world, but still in need of more validation. Emerging means early signals and examples that look promising. Experimental means it's being actively tested, and causation isn't assumed. Speculative means a hypothesis or an informed guess.

The grade describes the evidence, not the idea, and it sets how a claim gets worded. An Observed pattern gets described as something seen in data, not as how a system works.

## The loop that moves a grade

Grades change through the KZ Web Lab loop: hypothesis, experiment, data, analysis, publish, refine.

![Sketch-note cycle of six rounded boxes connected by curved arrows: hypothesis, experiment, data, analysis, publish and refine, with a cartoon brain holding a magnifying glass in the centre](/static/uploads/r2a-fig4-web-lab-loop.png)
*Figure 4. The KZ Web Lab loop. Publishing sits inside the cycle, followed by refine.*

Publish comes before refine, so a published finding stays open to revision. A grade can move up after more runs, and it can move back down.

## Worked example: one pricing page, layer by layer

The example below is illustrative. Tallybird is a made-up invoicing tool, and none of this comes from a client.

![Sketch-note clipboard scoring an illustrative pricing page: Measurement, Eligibility, Retrieval Efficiency (server-rendered, light, cached) and Source Fitness (named owner, last-updated date) have green checks; Entity Integrity, Extractability, Web Corroboration and Agent Operability have red crosses; a confused robot asks whether the price is in a picture](/static/uploads/r2a-fig5-worked-example.png)
*Figure 5. An illustrative R2A pass on a pricing page. The gate passes, so layers 2 to 7 are scored.*

Tallybird tracks a fixed prompt set and has crawler logs, so Layer 0 has a baseline. The pricing page is crawlable and indexable, so it clears the gate.

Then it starts failing in places that no ranking report would flag. The page calls the entry plan "Tallybird Starter", while the Organization and Product markup calls it "Basic" (Layer 2). The price table is a PNG, so the figures a model needs aren't in the text at all (Layer 3). The page itself is server-rendered, light and cached, so it's cheap to fetch (Layer 4), even if the one fact people want from it sits in that image. It names the team that owns pricing and shows a last-updated date, which is the accountability Layer 5 looks for.

Layer 6 is where it gets expensive. Tallybird retired its free plan, but two review sites still list it. So when a model answers from those sources, it tells buyers about a plan that no longer exists. And the only way to start a trial is a "talk to sales" form, which an agent can't finish on a user's behalf (Layer 7).

Order of fixes: turn the price table into HTML, align the plan name across page copy and schema, then work on the review listings. The first two are an afternoon of work. The third depends on other people updating their sites, so it can take weeks, and you don't control when.

That Layer 6 failure is exactly what the [BERAP Map](/frameworks/r2a/berap/) was built to catch from the model side, because a model can repeat the old free plan even when it never retrieves the review page.

## Where R2A doesn't fit

R2A scores pages, and a page only shapes an answer when something retrieves it. When a model answers from what it learned in training, layers 3 and 4 have little to act on for that answer. BERAP covers that gap, because it grades what engines say about a brand whether the answer came from retrieval or not.

It also isn't much use for pages where no action is the point, like a legal notice or an archived press release. You can score them, but a failing Layer 7 there tells you nothing worth fixing.

And it won't explain a traffic drop on its own. A page can pass every layer and still lose citations because a competitor published something better, which is why the outcomes stay outside the score.

The BERAP instrument is graded Experimental for now, and its panel results will decide whether that grade moves.

---
Markdown twin of https://khadijazaman.com/frameworks/r2a/, generated from the rendered page at build time. Cite the HTML URL. How to cite: https://khadijazaman.com/llms.txt
