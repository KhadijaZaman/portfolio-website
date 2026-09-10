/* Grounded answer endpoint for khadijazaman.com. No model in the loop.

   GET https://<worker>/?q=<question>
   Loads https://khadijazaman.com/answers.json (the direct-answer blocks the
   site publishes, one per page), scores each entry against the question by
   token overlap, and returns the best answer VERBATIM with its source URL.
   If nothing scores above the threshold it returns answer: null with a
   status and the closest page, never a guess.

   Deploy: cd answers-worker && npx wrangler deploy   (see README)
*/
const SITE = "https://khadijazaman.com";
const INDEX = SITE + "/answers.json";
const THRESHOLD = 0.34;
const STOP = new Set("the a an and or of to in on for is are do does did how what why who which where when i my me you your can with about it this that get be by from any some help need want tell show please her she his he does khadija zaman".split(" "));
const stem = (w) => w.replace(/(ies|ing|ed|s)$/, (m) => (m === "ies" ? "y" : ""));
const tokens = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9×\s-]/g, " ").split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)).map(stem);

let cache = { at: 0, data: null };
async function index() {
  if (cache.data && Date.now() - cache.at < 10 * 60 * 1000) return cache.data;
  const r = await fetch(INDEX, { cf: { cacheTtl: 600 } });
  if (!r.ok) throw new Error("answers.json unavailable: " + r.status);
  cache = { at: Date.now(), data: await r.json() };
  return cache.data;
}
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
function score(q, entry) {
  const qs = new Set(tokens(q));
  // A question made only of stop words ("who is khadija zaman") is matched on
  // the whole phrase against the page's own question instead.
  if (!qs.size) { const nq = norm(q), ne = norm(entry.question); return nq && (ne.includes(nq) || nq.includes(ne)) ? 1 : 0; }
  const qt = new Set(tokens(entry.question)), at = new Set(tokens(entry.answer + " " + entry.title));
  let hitQ = 0, hitA = 0;
  for (const w of qs) { if (qt.has(w)) hitQ++; else if (at.has(w)) hitA++; }
  // One shared word in the answer body is not grounding: require a hit on the
  // page's question, or at least two on its answer.
  if (hitQ < 1 && hitA < 2) return 0;
  return (hitQ * 1.0 + hitA * 0.5) / qs.size;   // share of the visitor's words the page's question and answer account for
}
const json = (body, status = 200) => new Response(JSON.stringify(body, null, 2), { status, headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "public, max-age=300", "x-grounding": "verbatim-from-answers.json; no-model" } });

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const q = (url.searchParams.get("q") || "").trim();
    if (!q) return json({ answer: null, status: "no_question", usage: "GET ?q=<question>", index: INDEX }, 400);
    let data; try { data = await index(); } catch (e) { return json({ answer: null, status: "index_unavailable", error: String(e.message) }, 503); }
    const ranked = data.answers.map((e) => ({ e, s: score(q, e) })).sort((a, b) => b.s - a.s);
    const best = ranked[0];
    if (!best || best.s < THRESHOLD) {
      return json({ answer: null, status: "no_grounded_answer", question: q, closest: best ? { url: best.e.url, question: best.e.question, score: +best.s.toFixed(2) } : null, note: "Nothing on khadijazaman.com answers this directly. Ask hello@khadijazaman.com." });
    }
    return json({ answer: best.e.answer, answers_question: best.e.question, source: best.e.url, selector: best.e.selector, modified: best.e.modified, score: +best.s.toFixed(2), question: q, grounding: "verbatim from " + INDEX + "; no model involved", cite_as: "Khadija Zaman, " + best.e.url });
  }
};
