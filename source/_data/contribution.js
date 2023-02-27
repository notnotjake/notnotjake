const { DateTime } = require('luxon')
module.exports = function () {
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Get Data from ?
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	let data = {
		'2023': {
			'02': {
				'02': {
					"description": "Shot video for friend",
					"level": "high"	
				},
				'03': {
					"description": "Worked on video",
					"level": "low"
				},
				'04': {
					"description": "Medium",
					"level": "med"
				},
				'05': {
					"description": "High",
					"level": "high"
				},
				'07': {
					"description": "Shipped site for friend",
					"level": "shipped"
				},
				'08': {
					"description": "Medium",
					"level": "med"
				},
				'09': {
					"description": "Medium",
					"level": "med"
				},
				'10': {
					"description": "High",
					"level": "high"
				},
				'12': {
					"description": "Time with family",
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/fun.svg"
				},
				'13': {
					"level": "low"
				},
				'14': {
					"level": "med"
				},
				'15': {
					"level": "low"
				},
				'16': {
					"level": "med"
				},
				'17': {
					"level": "low"
				},
				'18': {
					"description": "I'm on Twitter 👋",
					"level": "high"
				},
				'20': {
					"description": "Shipped case study biz site",
					"level": "shipped"
				},
				'21': {
					"description": "",
					"level": "low",
					"photo": true
				},
				'22': {
					"description": "New Splash Screen 😍",
					"level": "high",
					"photo": true
				},
				'23': {
					"description": "Work & Fun Today 👍",
					"level": "med",
					"photo": true
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
					"photo": true
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
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/life-event.svg",
					"photo": true
				}
			},
			'11': {
				'06': {
					"description": "Crashed and Hurt",
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/fun.svg",
					"photo": true
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
				day.photo = data[xYear][xMonth][xDate].photo
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