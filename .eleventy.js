module.exports = function(eleventyConfig) {
  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: './public/css/**/*.css'
  })
  
  // Returns the current year at time of build
  eleventyConfig.addShortcode("year", () => {
	  return `${new Date().getFullYear()}`
  })
  
  // Return your Object options:
  return {
    dir: {
      input: "source",
      output: "public"
    }
  }
}