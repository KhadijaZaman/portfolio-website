/* Blog categories. Each names one attribute of the site's central entity, AI
   search visibility, and carries an intro so the category page is a real hub,
   not a bare list. A post's `category` front matter must match a `title` here;
   a category page only exists once at least one post uses it. */
module.exports = [
  {
    title: "Engines",
    slug: "engines",
    intro: "How each AI search engine retrieves and cites sources. ChatGPT, Gemini, Perplexity, Google AI Overviews and AI Mode each run a different pipeline from query to cited answer, and each rewards different things on a page. These posts take one engine or one stage of the pipeline at a time, with figures from published studies rather than recalled practice."
  },
  {
    title: "Optimization",
    slug: "optimization",
    intro: "What to change on a site so AI engines retrieve it, cite it and describe it accurately. Passage retrievability, entity clarity, source authority, machine-readable structure and the difference between a citation and a mention. Each post ends with a check you can run on your own pages in under ten minutes."
  },
  {
    title: "Foundations",
    slug: "foundations",
    intro: "The SEO layer that AI search visibility is built on. Topic clusters, the central entity of a site, and how SEO, AEO and GEO sequence. Skip this layer and every optimization above it is applied to a site an engine never trusted in the first place."
  }
];
