/* Eleventy config for khadijazaman.com
   - Home / About / Tools / Contact stay as hand-built static HTML (passthrough-copied)
   - The blog is generated from Markdown in src/posts/ through the shared layouts
   - The blog index and sitemap.xml are generated from the posts collection
*/
module.exports = function (eleventyConfig) {
  // Only treat Nunjucks + Markdown as templates; everything else is copied verbatim.
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  // Static pages & assets — copied through untouched.
  [
    "index.html", "about", "work", "tools", "contact",
    "css", "js", "admin", "static",
    "robots.txt", "site.webmanifest",
    "favicon.ico", "favicon.svg", "favicon-96x96.png",
    "apple-touch-icon.png",
    "web-app-manifest-192x192.png", "web-app-manifest-512x512.png"
  ].forEach((p) => eleventyConfig.addPassthroughCopy("src/" + p));

  // Date helpers (UTC-stable, no external dependency).
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  eleventyConfig.addFilter("readableDate", (d) => {
    const x = new Date(d);
    return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  // Blog posts, newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
