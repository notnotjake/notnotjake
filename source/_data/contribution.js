const { DateTime } = require('luxon')
module.exports = function () {
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Get Data from ?
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	let data = {
		'2023': {
			'01': {
				'01': {
					"description": "Testing Descriptions",
					"level": "high",
					"icon": "",
					"picture": {
						"webp": "",
						"jpg": ""
					}
				},
				'03': {
					"description": "Testing Descriptions",
					"level": "med",
					"icon": "",
					"picture": {
						"webp": "",
						"jpg": ""
					}
				},
				'19': {
					"description": "Testing Descriptions",
					"level": "special",
					"picture": {
						"webp": "",
						"jpg": ""
					}
				}
			}
		},
		'2022': {
			'12': {
				'17': {
					"description": "Graduated from JMU",
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/sentence-svg/made.svg",
					"picture": {
						"webp": "",
						"jpg": ""
					}
				}
			},
			'11': {
				'30': {
					"description": "Graduated from JMU",
					"level": "low",
					"icon": "",
					"picture": {
						"webp": "",
						"jpg": ""
					}
				}
			}
		}
	}
	
	
	
	
	/* 
	Here's what the data should look like:
	[
		{
			week: [
				{
					date: '2023-01-21',
					description: "Graduated from JMU",
					level: "special",
					icon: "",
					picture: {
						webp: "",
						jpg: ""
					}
				},
				{ ... }
			],
			label: '2023'
		},
		{ ... }
	]
	*/
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Prepare Data for Page
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	const dateFormat = 'yyyy-MM-dd'
	
	// Start from Sunday of this week:
	const today = DateTime.now()
	const currentWeekFull = DateTime.fromObject({
		weekYear: today.year,
		weekNumber: today.weekNumber
	})
	const currentWeekStart = currentWeekFull.startOf('week').minus({ days: 1 })
	
	let graph = []
	
	// For Each Week:
	for (let i = 0; i <= 52; i++) {
		const iWeekStart = currentWeekStart.minus({ week: i })
		const iWeekEnd = iWeekStart.plus({days: 7})
		
		let week = []
		for (let x = 6; x >= 0; x--) {
			let day = {}
			xDay = iWeekStart.plus({days: x})
			
			const xYear = xDay.toFormat('yyyy')
			const xMonth = xDay.toFormat('MM')
			const xDate = xDay.toFormat('dd')
			
			day.date = xDay.toFormat(dateFormat)
			day.dateShort = xDay.toFormat('MMM d')
			if (xDay > today) {
				day.level = 'future'
				day.description = ''
				day.icon = ''
				day.picture = ''
			}
			else if ( data[xYear]?.[xMonth]?.[xDate] ) {
				day.level = data[xYear][xMonth][xDate].level
				day.description = data[xYear][xMonth][xDate].description
				day.icon = data[xYear][xMonth][xDate].icon
				day.picture = data[xYear][xMonth][xDate].picture
			}
			else {
				day.level = ''
				day.description = 'zZzzz'
			}
			
			week.push(day)
		}
		
		let label = ""
		if (iWeekStart.year != iWeekEnd.year) {
			label =  yearLabel = iWeekEnd.year
		}
		else if ((iWeekStart.month != iWeekEnd.month) && (Math.abs(iWeekEnd.month % 2) ==1)) {
			label = monthLabel = iWeekEnd.toFormat('MMM')
		}
		
		graph.push({week, label})
	}
	
	return { graph, data }
}