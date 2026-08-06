// Build date (YYYY-MM-DD) — used for <lastmod> on static sitemap URLs.
// Regenerates each build so the sitemap reflects the latest deploy.
module.exports = () => new Date().toISOString().slice(0, 10);
