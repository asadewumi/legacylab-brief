import feedPlugin from "@11ty/eleventy-plugin-rss";
import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin);

  // Assets and the CNAME are copied through untouched.
  eleventyConfig.addPassthroughCopy({ "src/assets": "/" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  // Every Brief, newest first. A new file in src/briefs is all it takes.
  eleventyConfig.addCollection("briefs", (api) =>
    api.getFilteredByGlob("src/briefs/*.md").sort((a, b) => b.data.number - a.data.number)
  );

  // Dates are written and displayed in Lagos time, because that is where the
  // Brief is edited and where most of its readers are.
  eleventyConfig.addFilter("readable", (d) =>
    DateTime.fromJSDate(d, { zone: "Africa/Lagos" }).toFormat("d LLLL yyyy")
  );
  eleventyConfig.addFilter("iso", (d) =>
    DateTime.fromJSDate(d, { zone: "Africa/Lagos" }).toISO()
  );
  eleventyConfig.addFilter("year", (d) =>
    DateTime.fromJSDate(d, { zone: "Africa/Lagos" }).toFormat("yyyy")
  );

  // Pads the number for display: 1 becomes 01.
  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
