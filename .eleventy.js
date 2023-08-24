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
	
	/* FILTER: Time to Read
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addFilter("timeToRead", function ( content ) {
		content = content.replace(/(<([^>]+)>)/gi, '')
		let matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g)
		let count = matches !== null ? matches.length : 0
		
		const wpm = 200
		let mins = Math.round( count / wpm )
		return mins.toString()
	})

	/* Environment Production|Dev
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	module.exports = function() {
		return {
			environment: process.env.MY_ENVIRONMENT || "dev"
		}
	}
	/* SHORTCODE: Static Assets Linking
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addShortcode("asset", (linkRelative) => {
		console.log('test')
		if ( process.env.MY_ENVIRONMENT === "prod" ) {
			return `https://large-assets.notnotjake.com/${linkRelative}`
		}
		else {
			return `/static/${linkRelative}`
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