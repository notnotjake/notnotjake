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
	
	
	/* COLLECTION: Posts by Years
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addCollection("postsByYear", (collection) => {
		let posts = collection.getFilteredByGlob(["./source/posts/**/*.md"])
		let result = {
			years: [], // Array of years in descending order
			posts: {} // Object of posts by year
		}
		posts.forEach( i => {
			let y = i.data.year
			// Years Array
			if (y && !result.years.includes(y)) {
				result.years.push(y)
			}
			// Posts by Year Object
			if (y && !result.posts[y]) {
				result.posts[y] = new Array()
			}
			result.posts[y].push( i )
		})
		result.years = result.years.sort().reverse() // Sort and reverse the years array
		return result
	});
	eleventyConfig.addCollection("postsYears", (collection) => {
		let posts = collection.getFilteredByGlob(["./source/posts/**/*.md"])
		let result = []
		posts.forEach( i => {
			if (i.data.year && !result.includes(i.data.year)) {
				result.push(i.data.year)
			}
		})
		result = result.sort().reverse() // Sort and reverse the years array
		return result
	});
	
	/* COLLECTION: Posts by Series
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	eleventyConfig.addCollection("postsBySeries", (collection) => {
		let posts = collection.getFilteredByGlob(["./source/posts/**/*.md"])
		let result = {
			series: [], // Array of series
			posts: {} // Object of posts by year
		}
		posts.forEach( i => {
			if ( i.data.series ) {
				let s = i.data.series
				// Series Array
				if (!result.series.includes(s)) {
					result.series.push(s)
				}
				// Posts by Year Object
				if (!result.posts[s]) {
					result.posts[s] = new Array()
				}
				result.posts[s].push(i)
			}
		})
		return result
	});
	eleventyConfig.addCollection("postsSeries", (collection) => {
		let posts = collection.getFilteredByGlob(["./source/posts/**/*.md"])
		let result = []
		posts.forEach( i => {
			if (i.data.series && !result.includes(i.data.series)) {
				result.push(i.data.series)
			}
		})
		return result
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