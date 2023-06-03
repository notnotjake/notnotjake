const {DateTime} = require('luxon')


module.exports = function(eleventyConfig) {
	/* Watch CSS & JS files for changes
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.setServerOptions({
		watch: ['./public/css/**/*.css'],
		showAllHosts: true
	})
	/* Passthrough JavaScript folder
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addPassthroughCopy({
		"source/_assets/js": "js"
	})
	/* DEV Environment: Passthrough Static Assets
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	if ( process.env.MY_ENVIRONMENT !== "prod" ) {
		eleventyConfig.addPassthroughCopy({
			"static": "static"
		})
	}
	
	
	/* SHORTCODE: Prettify Page Dates
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addShortcode("prettyDate", function ( pageDate ) {
		let d = DateTime.fromJSDate(pageDate, {zone: 'America/New_York'}).toLocaleString(DateTime.DATE_MED)
		return d
	})
	/* SHORTCODE: Prettify Page Dates SHORT
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addFilter("prettyDateShort", function( xDate ) {
		
		let d = DateTime.fromJSDate(xDate, {zone: 'America/New_York'})
		d = d.toFormat('MMM d')
		return d
		
	})
	/* SHORTCODE: Current Year
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addShortcode("year", () => {
		return `${new Date().getFullYear()}`
	})
	

	/* Environment Production|Dev
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	module.exports = function() {
		return {
			environment: process.env.MY_ENVIRONMENT || "dev"
		}
	}
	/* SHORTCODE: Asset Links
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addShortcode("asset", (linkRelative, assetHost) => {
		if ( process.env.MY_ENVIRONMENT === "prod" ) {
			return `${assetHost}/${linkRelative}`
		}
		else {
			return `../_assets/${linkRelative}`
		}
	})
	
	
	/* Set input/output
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	return {
		dir: {
			input: "source",
			output: "public"
		}
	}
}