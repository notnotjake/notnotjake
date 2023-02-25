const { DateTime } = require('luxon')
module.exports = function () {
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Get Data from ?
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	let data = {
		'2023': {
			'02': {
				'07': {
					"description": "Shipped site for friend",
					"level": "shipped"
				},
				'17': {
					"level": "med"
				},
				'18': {
					"description": "Building for Client",
					"level": "high"
				},
				'20': {
					"description": "Shipped case study biz site",
					"level": "shipped"
				},
				'21': {
					"description": "I'm on Twitter 👋",
					"level": "low"
				},
				'22': {
					"description": "New Splash Screen 😍",
					"level": "high"
				},
				'23': {
					"description": "Work & Fun Today 👍",
					"level": "med"
				},
				'24': {
					"description": "Dark Mode is Here",
					"level": "low"
				},
				'25': {
					"description": "Shipped video for friend",
					"level": "shipped"
				}
			},
			'01': {
				'11': {
					"description": "Learned SvelteKit",
					"level": "low"
				},
				'12': {
					"description": "Lots of work on my website",
					"level": "med"
				},
				'13': {
					"description": "Good strategy lunch",
					"level": "low"
				},
				'15': {
					"description": "Lots of work on my website",
					"level": "med"
				},
				'16': {
					"description": "Work on my website",
					"level": "med"
				},
				'17': {
					"description": "Work for client",
					"level": "high"
				},
				'18': {
					"description": "Back at my apartment",
					"level": "low",
					"picture": {
						"webp": "https://large-assets.notnotjake.com/images/index/activity-img/2023-01-18.webp",
						"jpg": "https://large-assets.notnotjake.com/images/index/activity-img/2023-01-18.jpg"
					}
				},
				'19': {
					"description": "Lots of work on my website",
					"level": "med"
				}
			}
		},
		'2022': {
			'12': {
				'17': {
					"description": "Graduated from JMU. Finally.",
					"level": "high",
					"picture": {
						"webp": "https://large-assets.notnotjake.com/images/index/activity-img/2022-12-17.webp",
						"jpg": "https://large-assets.notnotjake.com/images/index/activity-img/2022-12-17.jpg"
					}
				}
			},
			'11': {
				'06': {
					"description": "Crashed and Hurt",
					"level": "high",
					"picture": {
						"webp": "https://large-assets.notnotjake.com/images/index/activity-img/2022-11-06.webp",
						"jpg": "https://large-assets.notnotjake.com/images/index/activity-img/2022-11-06.jpg"
					}
				},
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
	const local = DateTime.now()
	const today = local.setZone('America/New_York')
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
				day.description = 'Adventure Awaits!'
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