# BERAP Map: Brand Entity Recall & Association Probing

> BERAP probes AI engines with repeated prompts and grades answers against a dated attribute table, producing six scores for brand recall and accuracy.

Source: https://khadijazaman.com/frameworks/r2a/berap/  ·  Last modified: 2026-09-18

[Home](/) / [Frameworks](/frameworks/) / [R2A Framework](/frameworks/r2a/) / The BERAP Map: measuring what AI models remember about your brand

[Instrument](/frameworks/r2a/ "Back to R2A Framework")27 Aug 2026 · 7 min read · by Khadija Zaman

# The BERAP Map: measuring what AI models remember about your brand

## What is the BERAP Map?

BERAP (Brand Entity Recall & Association Probing) is the instrument inside the R2A Content Framework that measures what AI engines say about a brand, whether the answer came from retrieval or from training. It runs repeated prompts across five engines in two directions, grades each answer against a dated attribute table, and reports six scores: Recall Rate, Association Accuracy, Evidence Recall, Stability, Attribute Penetration and Source Dependency.

A model can tell a buyer your pricing without retrieving a single page of yours. It answers from what it already absorbed, and if what it absorbed is a year old, the buyer gets a year-old answer delivered with full confidence.

Page-level audits can't see that, because nothing on your site was involved. The BERAP Map is the instrument I use for it inside the [R2A Content Framework](/frameworks/r2a/). BERAP stands for Brand Entity Recall & Association Probing: ask engines about a brand many times, in a controlled way, then grade what comes back. Some of those answers come from retrieval and some from what the model already absorbed, and BERAP grades the answer either way.

## A probe run is a panel, not a prompt

One prompt in one engine tells you almost nothing. Ask the same question twice and you can get two different answers, so a single screenshot of ChatGPT naming your brand is an anecdote.

![Sketch-note diagram: two probe direction cards, Brand to Category asking what is this brand and Category to Brand asking which brands fit here, linked by a note to compare both directions, feed into five cartoon robots labelled 5 engines times 5 runs each, which feed a cartoon brain grader holding a clipboard, which outputs six scores; a box reads starting panel 5 x 10 x 5 equals 250 responses per direction, 500 in total](/static/uploads/berap-fig1-probe-panel.png)
*Figure 1. The starting BERAP panel: two probe families (one per direction), 5 engines, 10 prompts per family, 5 runs each, 500 responses in total.*

Prompts run in two directions. Brand to Category asks what the brand is ("What is Tallybird?"). Category to Brand asks which brands fit a category ("Which tools handle invoicing for freelancers?").

Each direction is its own probe family. The starting panel is 5 engines × 10 prompts per family × 5 runs, which is 250 responses per direction and 500 across both. Results are reported per family rather than blended, because the two directions can disagree, and the framework treats the association holding both ways as critical. An engine that answers "What is Tallybird?" correctly but never names Tallybird when asked for invoicing tools knows the brand exists and still leaves it out of the set buyers choose from. Probing one direction only would never show that.

The whole panel is graded Experimental on the R2A evidence continuum. It's a starting design, and the panel size is one of the things being tested. The same discipline, applied to my own citation study, is written up in the [citation study re-test](/research/citation-study-retest/).

## Six scores, each answering a different question

![Sketch-note grid of six gauges with questions underneath: Recall Rate asks does the answer name or link us, Association Accuracy asks are the facts about us right as of today, Evidence Recall asks is a source cited when we are mentioned, Stability asks does recall hold week to week, Attribute Penetration asks how many of our facts show up in a run, Source Dependency asks does one outside site carry the story](/static/uploads/berap-fig2-six-scores.png)
*Figure 2. The six BERAP scores. None of them is meant to be read alone.*

| Score | How it's calculated | The rule that matters |
| --- | --- | --- |
| Recall Rate | Responses that name or link the brand ÷ responses in the family | A link with no name still counts. Reported per probe family |
| Association Accuracy | Associations graded correct ÷ associations graded | Graded against a dated attribute table. Outdated counts as wrong |
| Evidence Recall | Brand mentions with a supporting citation ÷ brand mentions | Tracked twice: any citation, and citations to your own site |
| Stability | Highest weekly Recall Rate minus lowest | Needs at least 4 weekly windows. Lower is steadier |
| Attribute Penetration | Median, across runs, of owned attributes surfaced ÷ attributes in the table | A median, so one unusually full answer can't lift the score |
| Source Dependency | Share of outside citations that come from the single most-cited domain | Your own site is excluded |

Several of these rules changed during review, and each change closed a specific loophole.

Counting linked mentions in Recall Rate matters for engines that cite a URL without writing the brand name in the answer. Excluding your own site from Source Dependency stops a brand from looking diversified just because the engine keeps citing its homepage. And Stability is a spread rather than an average: a brand that swings between high and low recall looks fine on a mean and unreliable on a range.

## Outdated is wrong, and the table needs a date

Association Accuracy only works if there's something to grade against. BERAP uses an owned attribute table: every fact you'd want a model to get right about the brand, each with a value, and the whole table stamped with an "as of" date.

If that sounds like an entity-attribute-value record, it is one. Koray Tuğberk GÜBÜR's [entity-attribute-value article on Holistic SEO](https://www.holisticseo.digital/seo-research-study/entity-attribute-value) (February 2023) lays out that structure for semantic SEO. BERAP adds the date and uses the table as an answer key.

![Sketch-note diagram for a made-up brand called Tallybird: an owned attribute table dated 1 August 2026 lists category invoicing software, free plan retired, starting plan Starter, integrations Xero and QuickBooks; three speech bubbles from a robot are graded, invoicing software correct with a green check, free plan for 3 users outdated and counted wrong with a red cross, integrates with Xero correct with a green check; a box reads Association Accuracy equals 2 over 3](/static/uploads/berap-fig3-association-grading.png)
*Figure 3. Grading one illustrative response. The free-plan claim was true once, so it's outdated, and outdated counts as wrong.*

Treating outdated as wrong is the strict choice, and it's deliberate. A buyer who acts on a retired plan has the same bad experience whether the fact was never true or stopped being true in March.

The date also protects the grader from itself. Without it, whoever grades the responses ends up judging against their own memory of the brand, which is the same problem the score is trying to measure.

## Stability needs weeks, not a snapshot

![Sketch-note bar chart of illustrative weekly Recall Rate for the Category to Brand family: week 1 at 62 percent, week 2 at 48 percent, week 3 at 70 percent, week 4 at 55 percent, with a red bracket marking the spread from 70 to 48 as 22 points and a note that lower is steadier](/static/uploads/berap-fig4-stability-spread.png)
*Figure 4. Illustrative Stability calculation. The average of these four weeks looks healthy; the 22-point spread shows how much it moves.*

A four-week minimum is a floor, not a target. With fewer windows, one unusual week decides the whole score.

## Worked example: Tallybird, Category to Brand, four weeks

Everything below is illustrative. Tallybird is a made-up invoicing tool, the same one used in the R2A worked example, and none of these figures come from a client or a real panel.

Recall Rate across four weekly windows comes in at 62%, 48%, 70% and 55%, so Stability is 22 points. Averaging those weeks would give you 58.75%, which hides the fact that in week 2 more than half the answers didn't mention Tallybird at all.

In one run, a response makes three gradable claims. It gets the category right and the Xero integration right, and it describes a free plan for three users that Tallybird retired. Association Accuracy for that response is 2 out of 3. The starting plan never came up, so it isn't graded, but it does show up in Attribute Penetration: across five runs, the answers surface 3, 2, 3, 1 and 2 of the table's 4 attributes, and the median gives a penetration of 2 out of 4.

Across the Category to Brand family, 40 responses mention Tallybird. 30 of them carry a supporting citation, and 8 cite Tallybird's own site, so Evidence Recall is 75% for any citation and 20% for own-site citations. Of the 22 citations to other sites, 11 point to the same review directory, a Source Dependency of 50%.

Read together, that's one story. The review directory still lists the free plan, it's carrying most of the outside citations, and the outdated association keeps coming back. On the R2A side that's a Web Corroboration failure. BERAP is what shows it's also shaping answers.

## Where BERAP isn't the right tool

For a brand too new to appear in training data, Recall Rate will sit near zero and there's little to grade. The [retrieval layers in R2A](/blog/get-cited-by-ai-search/) are the better place to start.

Personalised and logged-in answers are also out of reach. A panel run from clean sessions measures the default answer, not the one a returning user with history might get.

And BERAP describes what models say, not why they say it. A high Source Dependency tells you which domain to look at. It doesn't prove that domain caused the answer.

If you've run repeated-prompt panels of your own and landed on a different number of runs, I'd like to compare notes, because the 5-run setting is one of the parts graded Experimental.

---
Markdown twin of https://khadijazaman.com/frameworks/r2a/berap/, generated from the rendered page at build time. Cite the HTML URL. How to cite: https://khadijazaman.com/llms.txt
