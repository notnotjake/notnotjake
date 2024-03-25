const { DateTime } = require('luxon')
module.exports = function () {
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Get Data from ?
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	// Level: low, med, high, shipped, personal, special
	// ?Description: ~30 chars
	// ?Link: (any url)
	// ?Photo: bool
	// ?Icon: 
	//		https://large-assets.notnotjake.com/images/index/activity-img/life-event.svg
	//		https://large-assets.notnotjake.com/images/index/activity-img/fun.svg
	// 
	
	let data = {
		'2024': {
			'03': {
				'01': {
					"level": "special",
					"description": "DUNE 2 IMAX 1.43:1. Life changed.",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/fun.svg"
				},
				'03': {
					"level": "med"
				},
				'04': {
					"level": "high"
				},
				'05': {
					"level": "high"
				},
				'06': {
					"level": "special",
					"description": "Picked up new Aeron Chair",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/fun.svg"
				},
				'07': {
					"level": "high"
				},
				'08': {
					"level": "high"
				},
				'09': {
					"level": "med"
				},
				'11': {
					"level": "high"
				},
				'12': {
					"level": "high"
				},
				'13': {
					"level": "high"
				},
				'14': {
					"level": "low"
				},
				'15': {
					"level": "med"
				},
				'18': {
					"level": "med"
				},
				'19': {
					"level": "med"
				},
				'20': {
					"level": "med"
				},
				'21': {
					"level": "low"
				},
				'22': {
					"level": "low"
				},
				'23': {
					"level": "personal"
				},
				'24': {
					"level": "low"
				}
			},
			'02': {
				'01': {
					"level": "med"
				},
				'02': {
					"level": "low"
				},
				'03': {
					"level": "personal",
					"description": "Art group hangout"
				},
				'04': {
					"level": "personal",
					"description": "Family time"
				},
				'05': {
					"level": "med"
				},
				'06': {
					"level": "med"
				},
				'07': {
					"level": "low"
				},
				'08': {
					"level": "med"
				},
				'09': {
					"level": "med"
				},
				'10': {
					"level": "med"
				},
				'12': {
					"level": "med"
				},
				'13': {
					"level": "low"
				},
				'14': {
					"level": "med"
				},
				'15': {
					"level": "high"
				},
				'16': {
					"level": "med"
				},
				'18': {
					"level": "low"
				},
				'19': {
					"level": "high"
				},
				'20': {
					"level": "high"
				},
				'21': {
					"level": "high"
				},
				'22': {
					"level": "med"
				},
				'23': {
					"level": "low"
				},
				'24': {
					"level": "med"
				},
				'26': {
					"level": "med"
				},
				'28': {
					"level": "med"
				},
				'29': {
					"level": "high"
				}
			},
			'01': {
				'01': {
					"description":"HPY NW YR. Talked to a cow.",
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/fun.svg"
				},
				'02': {
					"level": "med"
				},
				'03': {
					"level": "high"
				},
				'04': {
					"level": "low"
				},
				'05': {
					"description": "Project Check-In",
					"level": "high"
				},
				'06': {
					"description": "got new workout stuff",
					"level": "personal"
				},
				'08': {
					"description": "loving my habits",
					"level": "med"
				},
				'09': {
					"level": "high"
				},
				'10': {
					"level": "high"
				},
				'11': {
					"description": "new art video",
					"level": "shipped"
				},
				'12': {
					"level": "high"
				},
				'15': {
					"level": "med"
				},
				'16': {
					"level": "high"
				},
				'17': {
					"description": "did podcast with friend",
					"level": "high"
				},
				'18': {
					"level": "low"
				},
				'19': {
					"level": "high"
				},
				'20': {
					"level": "high"
				},
				'21': {
					"level": "low"
				},
				'22': {
					"level": "med"
				},
				'23': {
					"level": "med"
				},
				'24': {
					"level": "med"
				},
				'25': {
					"level": "high"
				},
				'26': {
					"level": "personal"
				},
				'27': {
					"level": "personal"
				},
				'29': {
					"level": "high"
				},
				'30': {
					"level": "med"
				},
				'31': {
					"level": "low"
				}
			}
		},
		'2023': {
			'12': {
				'01': {
					'level': 'med'
				},
				'02': {
					'level': 'med'
				},
				'03': {
					'level': 'low'
				},
				'05': {
					'level': 'med'
				},
				'06': {
					'level': 'med'
				},
				'07': {
					'level': 'med'
				},
				'08': {
					'level': 'high'
				},
				'10': {
					'level': 'low'
				},
				'11': {
					'level': 'high'
				},
				'12': {
					'level': 'med'
				},
				'13': {
					'level': 'med'
				},
				'14': {
					'level': 'low'
				},
				'15': {
					'level': 'high'
				},
				'16': {
					'level': 'med'
				},
				'17': {
					'description': 'Saw the new Ghibli. Great!',
					'level': 'personal'
				},
				'18': {
					'level': 'med'
				},
				'19': {
					'level': 'med'
				},
				'20': {
					'level': 'med'
				},
				'21': {
					'level': 'high'
				},
				'22': {
					'level': 'personal'
				},
				'24': {
					"description": "1ST Time Midnight Mass",
					"level": "personal",
				},
				'25': {
					'description': 'I LOVE CHRISTMAS!!',
					'level': 'personal'
				},
				'26': {
					'description': 'FUN W FAM',
					'level': 'personal'
				},
				'27': {
					'description': 'is that a sore throat??',
					'level': 'low'
				},
				'28': {
					'description': 'oof i think im sick',
					'level': 'low'
				},
				'29': {
					'description': 'yep. def sick',
					'level': 'med'
				},
				'31': {
					'description': 'So Sick :('
				}
			},
			'11': {
				'01': {
					'level': 'med'
				},
				'02': {
					'level': 'high'
				},
				'03': {
					'level': 'high'
				},
				'06': {
					'level': 'med'
				},
				'07': {
					'level': 'low'
				},
				'08': {
					'level': 'med'
				},
				'09': {
					'description': 'talked to awesome dev',
					'level': 'high'
				},
				'10': {
					'level': 'high'
				},
				'11': {
					'level': 'med'
				},
				'14': {
					'level': 'personal'
				},
				'15': {
					'level': 'low'
				},
				'16': {
					'level': 'med'
				},
				'17': {
					'level': 'med'
				},
				'19': {
					'level': 'low'
				},
				'20': {
					'level': 'high'
				},
				'23': {
					'description': 'Thanksgiving w Fam',
					'level': 'personal'
				},
				'25': {
					'description': 'shipped client work',
					'level': 'shipped'
				},
				'27': {
					'level': 'med'
				},
				'28': {
					'level': 'med'
				},
				'29': {
					'level': 'low'
				},
				'30': {
					'level': 'high'
				}
			},
			'10': {
				'01': {
					'level': 'low'
				},
				'02': {
					'level': 'med'
				},
				'03': {
					'level': 'high'
				},
				'05': {
					'level': 'med'
				},
				'06': {
					'level': 'personal'
				},
				'07': {
					'level': 'med'
				},
				'08': {
					'level': 'high'
				},
				'09': {
					'level': 'low'
				},
				'10': {
					'level': 'low'
				},
				'11': {
					'level': 'med'
				},
				'12': {
					'level': 'low'
				},
				'14': {
					'level': 'personal'
				},
				'16': {
					'level': 'med'
				},
				'17': {
					'level': 'med'
				},
				'18': {
					'level': 'med'
				},
				'19': {
					'level': 'low'
				},
				'20': {
					'level': 'low'
				},
				'21': {
					'level': 'low'
				},
				'22': {
					'level': 'med'
				},
				'23': {
					'level': 'med'
				},
				'25': {
					'level': 'med'
				},
				'26': {
					'level': 'high'
				},
				'27': {
					'level': 'low'
				},
				'30': {
					'level': 'med'
				},
				'31': {
					'level': 'low'
				},
			},
			'09': {
				'01': {
					"level": "med"
				},
				'02': {
					"description":"exciting new project",
					"level": "high"
				},
				'03': {
					"description": "OBX last time",
					"level": "personal"
				},
				'04': {
					"description": "Goodbye OBX",
					"level": "personal"
				},
				'05': {
					"description": "Paddleboard fun",
					"level": "med"
				},
				'06': {
					"description": "Distracted",
					"level": "low"
				},
				'07': {
					"description": "Launched new site",
					"level": "shipped"
				},
				'08': {
					'level': 'high'
				},
				'09': {
					'level': 'med'
				},
				'12': {
					'level': 'high'
				},
				'13': {
					'level': 'med'
				},
				'14': {
					'level': 'med'
				},
				'15': {
					'level': 'low'
				},
				'16': {
					'level': 'low'
				},
				'17': {
					'level': 'low'
				},
				'18': {
					'level': 'med'
				},
				'19': {
					'level': 'high'
				},
				'20': {
					'level': 'high'
				},
				'23': {
					'level': 'personal'
				},
				'24': {
					'level': 'med'
				},
				'25': {
					'level': 'high'
				},
				'26': {
					'level': 'low'
				},
				'27': {
					'level': 'med'
				},
				'28': {
					'level': 'high'
				},
				'29': {
					'level': 'med'
				},
				'30': {
					'level': 'med'
				}
			},
			'08': {
				'01': {
					"description": "Feel shitty",
					"level": "low"
				},
				'02': {
					"description": "Lots of ideas",
					"level": "high"
				},
				'03': {
					"description": "ACTION!",
					"level": "high"
				},
				'04': {
					"description": "Great art fellowship",
					"level": "shipped"
				},
				'07': {
					"description": "Oppenheimer 15 70mm IMAX",
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/fun.svg"
				},
				'08': {
					"description": "worked. yawn.",
					"level": "low"
				},
				'09': {
					"description": "Design'in",
					"level": "med"
				},
				'10': {
					"description": "Cool new footer on posts",
					"level": "shipped"
				},
				'11': {
					"description": "Rushed graphic design job",
					"level": "shipped"
				},
				'12': {
					"description": "Fun @ OBX. New paddleboard",
					"level": "personal"
				},
				'13': {
					"description": "Fun @ OBX",
					"level": "personal"
				},
				'14': {
					"description": "Designing",
					"level": "med"
				},
				'15': {
					"description": "Ideas with client",
					"level": "high"
				},
				'16': {
					"description": "Web dev'ing",
					"level": "med"
				},
				'17': {
					"description": "Writing",
					"level": "med"
				},
				'18': {
					"description": "Web Dev for Client",
					"level": "med"
				},
				'19': {
					"description": "Learning Japanese",
					"level": "low"
				},
				'20': {
					"description": "Family Pool Party",
					"level": "personal"
				},
				'21': {
					"description": "Server maintenance 😬",
					"level": "high"
				},
				'22': {
					"description": "Improving server infra",
					"level": "med"
				},
				'23': {
					"description": "Nice site improvements",
					"level": "med"
				},
				'24': {
					"description": "Avg day",
					"level": "med"
				},
				'25': {
					"description": "work for friend",
					"level": "med"
				},
				'26': {
					"description": "a good convo",
					"level": "high"
				},
				'27': {
					"description": "planning",
					"level": "low"
				},
				'28': {
					"description": "lots accomplished",
					"level": "high"
				},
				'29': {
					"level": "med"
				},
				'30': {
					"description": "Running around town",
					"level": "high"
				},
				'31': {
					"level": "low"
				}
			},
			'07': {
				'01': {
					"description": "Family Pool Party",
					"level": "personal"
				},
				'15': {
					"description": "Start of Camp OBX :)",
					"level": "personal"
				},
				'16': {
					"description": "OBX Vacay",
					"level": "personal"
				},
				'17': {
					"description": "Maint Work",
					"level": "med"
				},
				'18': {
					"description": "OBX Vacay",
					"level": "personal"
				},
				'19': {
					"description": "I <3 OBX",
					"level": "personal"
				},
				'20': {
					"description": "Work catchup",
					"level": "med"
				},
				'21': {
					"description": "OBX Vacay",
					"level": "personal"
				},
				'22': {
					"description": "OBX Vacay",
					"level": "personal"
				},
				'23': {
					"description": "Moving out of apartment",
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/life-event.svg"
				},
				'24': {
					"description": "Been very Healthy",
					"level": "high"
				},
				'25': {
					"description": "New, Fresh Site",
					"level": "high"
				},
				'26': {
					"description": "Good day of work",
					"level": "med"
				},
				'27': {
					"description": "Planning..",
					"level": "low"
				},
				'28': {
					"description": "Great people",
					"level": "high"
				},
				'30': {
					"description": "Personal Projects Exploration",
					"level": "med"
				},
				'31': {
					"description": "Feel dead"
				},
			},
			'05': {
				'12': {
					"description": "New Goal Page",
					"level": "shipped",
					"link": "https://www.notnotjake.com/goal/"
				}
			},
			'03': {
				'03': {
					"description": "Hangin with friends",
					"level": "med"
				},
				'08': {
					"description": "Writing",
					"level": "med"
				},
				'16': {
					"description": "Celebrated aunt's 101 bday",
					"level": "special",
					"icon": "https://large-assets.notnotjake.com/images/index/activity-img/fun.svg",
					"photo": true
				},
				'17': {
					"description": "Tesla roadtrip",
					"level": "low",
					"photo": true
				},
				'18': {
					"description": "Met with client. Time with fam",
					"level": "med"
				}
			},
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
					"level": "personal"
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
					"level": "high",
					"link": "https://twitter.com/_notnotjake"
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
				},
				'26': {
					"description": "Worked on new web pages",
					"level": "low"
				},
				'27': {
					"description": "New site, new biz. Tech Help",
					"level": "shipped"
				},
				'28': {
					"level": "low"
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
	Here's what the outputted data should look like:
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
				day.link = data[xYear][xMonth][xDate].link
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