/*
Contribution Data Handler:

This script needs to do the following:
determine what week it is
for all days 6mo before today and the days remaining in the week:
	determine if there is contribution data for that day
	if so, add that data to return to calling template
	automatically fill the empty dates and those from the future 
	also, needs to insert labels into the week level if transition point falls in that week
*/

module.exports = {
	2023: {
		1: {
			1: {
				
			},
			3: {
				
			}
		}
	},
	2022: {
		12: {
			17: {
				"description": "Graduated from JMU",
				"level": "special",
				"icon": "",
				"picture": {
					"webp": "",
					"jpg": ""
				}
			}
		}
	}
}

// 1st: get the data from somewhere

// 2nd: get the current date
// const date = new Date()
// let day = date.getDate()
// let month = date.getMonth()
// let year = date.getYear()