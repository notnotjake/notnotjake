module.exports = function(eleventyConfig) {
  
  // Return your Object options:
  return {
    dir: {
      input: "source",
      output: "public"
    }
  }
  
  // LiveReload when css updates (from SCSS)
  eleventyConfig.setBrowserSyncConfig({
    files: './public/**/*.css'
  })
  
  // Returns the current year at time of build
  eleventyConfig.addShortcode("year", () => {
	  return `${new Date().getFullYear()}`
  })
  
}