module.exports = function(eleventyConfig) {
  
  // Return your Object options:
  return {
    dir: {
      input: "source",
      output: "public"
    }
  }
  
  // LiveReload when css updates (from SCSS)
  eleventyConfig.addWatchTarget("source/_assets/scss")
  eleventyConfig.setWatchThrottleWaitTime(2000)
  
  // eleventyConfig.addWatchTarget('./source/_assets/scss/')
  // eleventyConfig.addPassthroughCopy('./source/_assets/css')
  
  // Returns the current year at time of build
  eleventyConfig.addShortcode("year", () => {
	  return `${new Date().getFullYear()}`
  })
  
}