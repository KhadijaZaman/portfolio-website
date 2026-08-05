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
    "about", "work", "tools", "contact",
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
  eleventyConfig.addFilter("rssDate", (d) => new Date(d).toUTCString());

  // Small array helpers for "read next" / "latest posts".
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("excludeUrl", (arr, url) => (arr || []).filter((p) => p.url !== url));
  eleventyConfig.addFilter("slugify", (s) =>
    String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  );
  // Posts sharing a category with the given post first, then the rest ("read next").
  eleventyConfig.addFilter("relatedByCategory", (posts, url, category) => {
    const same = (posts || []).filter((p) => p.url !== url && p.data.category === category);
    const rest = (posts || []).filter((p) => p.url !== url && p.data.category !== category);
    return same.concat(rest);
  });

  // Blog posts, newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  // Distinct categories with their posts (for /blog/category/<slug>/ pages).
  eleventyConfig.addCollection("categories", (api) => {
    const posts = api.getFilteredByGlob("src/posts/*.md");
    const map = new Map();
    posts.forEach((p) => {
      const c = p.data.category || "Uncategorized";
      if (!map.has(c)) map.set(c, []);
      map.get(c).push(p);
    });
    return Array.from(map, ([title, items]) => ({
      title,
      slug: String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
      posts: items.sort((a, b) => b.date - a.date)
    }));
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
