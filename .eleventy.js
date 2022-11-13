module.exports = function(eleventyConfig) {
	// Watch CSS files for changes
	eleventyConfig.setBrowserSyncConfig({
	  files: './public/css/**/*.css'
	})
	
	// Dev/Prod Linking
	
	// the goal here is that i have a function which knows if running in prod or dev and then i give a relative link to the asset. then it completes the url based on the environment and based on the type of asset (large-assets or just assets)
	
	// to determine environment, environment variables will be used. the function will look at this var to determine which to use.
	// env vars will be set via the npm script. the server will use build:prod instead of build or run script which will pass the prod variable to this function to replace links
	module.exports = function() {
		return {
		environment: process.env.MY_ENVIRONMENT || "dev"
		}
	}
	
	eleventyConfig.addShortcode("asset", (linkRelative, assetHost) => {
        if ( process.env.MY_ENVIRONMENT === "prod" ) {
            return `${assetHost}/${linkRelative}`
        }
        else {
            return `../_assets/${linkRelative}`
        }
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