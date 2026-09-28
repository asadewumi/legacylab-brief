const pad = (n) => String(n).padStart(2, "0");

export default {
  layout: "brief.njk",
  tags: "briefs",
  navHref: "/subscribe/",
  navLabel: "Subscribe",
  eleventyComputed: {
    permalink: (data) => `/brief-${pad(data.number)}/index.html`,
    pageTitle: (data) => `Brief #${pad(data.number)}: ${data.headline}`,
    pageDescription: (data) => data.standfirst,
    ogTitle: (data) => data.headline,
    ogDescription: (data) =>
      `Brief #${pad(data.number)} of The Legacy Lab Brief. Five things worth knowing, explained plainly.`,
    ogType: "article",
  },
};
