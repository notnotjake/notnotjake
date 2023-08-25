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
	/* SHORTCODE: Page Year
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addFilter("pageYear", function( xDate ) {
		let d = DateTime.fromJSDate(xDate, {zone: 'America/New_York'})
		d = d.toFormat('yyyy')
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
	/* COLLECTION: Posts by Year
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addCollection("postsByYear", (collection) => {
		let postsByYear = {}
		let posts = collection.getFilteredByGlob(["./source/posts/**/*.md"])
		posts.forEach( i => {
			let y =i.data.year
			if (!postsByYear[y]) {
				postsByYear[y] = new Array()
			}
			postsByYear[y].push( i )
		})
		console.log(postsByYear)
		return postsByYear
	});
	/* COLLECTION: List of Series
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addCollection("allSeries", (collection) => {
		let series = {}
		let posts = collection.getFilteredByGlob(["./source/posts/**/*.md"])
		posts.forEach( p => {
			if (p.data.series) {
				let s = p.data.series
				if (!series[s]) {
					series[s] = new Array()
				}
				series[s].push( p )
			}
		})
		console.log(series)
		return series
	});


	/* Set input/output
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	return {
		dir: {
			input: "source",
			output: "public"
		}
	}
}