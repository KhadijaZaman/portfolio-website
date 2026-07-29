// Shared data for every Markdown file in src/posts/
module.exports = {
  layout: "post.njk",
  permalink: (data) => `/blog/${data.page.fileSlug}/index.html`
};
