gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)


/* Check for PREFERS-REDUCED-MOTION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
let prefersReducedMotion = false // Defaults to false
if ( window.matchMedia("(prefers-reduced-motion: reduce)").matches ) {
	prefersReducedMotion = true
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Splash (if visible)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
if ( !document.querySelector('#splash').classList.contains('hide') ) {
	
	document.querySelector('nav div.background').classList.remove('show')
	
	/* Scroll Hint Bounce (after 3.5s if under 10px scrolled)
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	gsap.delayedCall(3.1, () => {
		if ( document.documentElement.scrollTop < 10 && !document.querySelector('#splash').classList.contains('hide') && !prefersReducedMotion ) {
			// Scroll bounce
			gsap.to(window, {
				keyframes: [
					{scrollTo: '50', ease: 'Power1.easeOut', duration: 0.4},
					{scrollTo: '0', ease: 'Power3.easeIn', duration: 0.6}
				]
			})
		}
	})
	
	/* Scroll Handler: triggers at 250px scroll-y
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	function splashScroll (e) {
		let scrollTriggerY = 250
		let splashEndY = document.querySelector('#splash').offsetHeight
		
		if ( document.querySelector('#splash').classList.contains('hide') ) {
			window.removeEventListener('scroll', splashScroll)
			return
		}
		else if ( window.scrollY < scrollTriggerY ) {
			updateBodyBackground("#100068")
		}
		else if ( window.scrollY > scrollTriggerY && window.scrollY <= splashEndY ) {
			scrollPastSplash()
			console.log('a')
		}
		else {
			updateBodyBackground("#edf0f0")
		}
	}
	window.addEventListener('scroll', splashScroll)
	
	// Function for changing the theme-color/body color
	function updateBodyBackground ( arg ) {
		gsap.to('body', { background: arg, duration: 1})
	}
	
	// Function called by scroll handler
	function scrollPastSplash () {
		window.removeEventListener('scroll', splashScroll)
		
		const splashHeight = document.querySelector('#splash').offsetHeight * -1
		const scrollPos = document.documentElement.scrollTop
		let scrollTo = scrollPos + splashHeight
		
		// Scroll to current position minus splash element's height
		gsap.to(window, {
			scrollTo: {x: scrollTo, y: 0, autoKill: false, ease: 'power2.in'},
			duration: 1
		})
		
		// Move splash element off top, then hide
		gsap.to('#splash', {
			marginTop: splashHeight,
			duration: 1,
			onComplete: () => {
				document.querySelector('#splash').classList.add('hide')
				document.body.style.background = '#edf0f0'
				document.querySelector('nav div.background').classList.add('show')
				document.querySelectorAll('div.overscroll').forEach( (i) => {
					i.style.display = 'block'
				})
			}
		})
	}
}
/* Splash [End] */






/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Nav, Marquee
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
if ( !prefersReducedMotion ) {
	/* Only continues if Prefers-Reduced-Motion is OFF
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	document.querySelector('#scroll-collection-2').classList.remove('hide')
	
	const header = document.querySelector('nav')
	const headerScroller = document.querySelector('nav ul')
	const headerContent1 = document.querySelector('#scroll-collection-1')
	const headerContent2 = document.querySelector('#scroll-collection-2')
	
	const speed = 60 // Set the horiz. scroll speed for marquee
	const scrollEnd = headerContent1.offsetWidth + headerContent2.offsetWidth
	let scrollDuration = scrollEnd / speed

	
	/* On Load: Start scroll
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	// On load: start scrolling to end, after 2s delay
	let headerScrollTimelineDefault = gsap.timeline()
	headerScrollTimelineDefault.to(headerScroller, {
		scrollTo: {y:0, x: 20, autoKill: true},
		duration: 1.9,
		delay: 1.9,
		ease: 'power3.in'
	})
	headerScrollTimelineDefault.to(headerScroller, {
		scrollTo: {y: 0, x: scrollEnd, autoKill: true},
		duration: scrollDuration,
		ease: 'linear'
	})
	headerScrollTimelineDefault.play()
	
	let headerScrollControl = gsap.timeline() // Used by mouse enter/leave to reset the animation
	
	/* Hover: stop scrolling with ease-out
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	header.addEventListener('mouseenter', () => {
		console.log('Mouse Enter')
		
		headerScrollTimelineDefault.kill()
		
		headerScrollControl.kill()
		headerScrollControl.clear()
		
		let scrollEase = headerScroller.scrollLeft + 10
		headerScrollControl.to(headerScroller, {
				scrollTo: {x: scrollEase, y: 0, autoKill: true},
				duration: 0.8,
				ease: 'power3.out'
			})
		headerScrollControl.play()
	})
	/* Hover-Out: start up new scroller
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	headerScroller.addEventListener('mouseleave', () => {
		console.log('Mouse Exit')
		
		headerScrollControl.kill()
		headerScrollControl.clear()
		
		let scrollDistanceToEnd = scrollEnd - headerScroller.scrollLeft
		scrollDuration = scrollDistanceToEnd / speed
		
		headerScrollControl.to(headerScroller, {
			scrollTo: {x: scrollEnd, y: 0, autoKill: true},
			duration: scrollDuration,
			ease: 'linear'
		})
		headerScrollControl.play()
	})
	/* Finger-Up: when touch event ends, start up new scroller
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	headerScroller.addEventListener('touchend', () => {
		let scrollDistanceToEnd = scrollEnd - headerScroller.scrollLeft
		scrollDuration = scrollDistanceToEnd / speed
		
		gsap.delayedCall(0.5, () => {
			gsap.to(headerScroller, {
				scrollTo: {x: scrollEnd, y: 0, autoKill: true},
				duration: scrollDuration,
				ease: 'linear'
			})
		})
	})
}
/* Nav, Marquee [End] */





/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Graph Hover
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
document.querySelector('#timeline').addEventListener('mouseenter', () => {
	const activityCard = document.querySelector('#timeline div.details-cards')
	
	window.addEventListener('mousemove', (e) => {
		// Uses mouse position to place activity-card on x-axis
		const windowWidth = window.innerWidth
		const mouseX = e.clientX
		
		if ( mouseX < (windowWidth * 0.5) ) { // On Left Side
			const offsetX = mouseX + 30
			activityCard.style.left = offsetX + "px"
		}
		else if ( mouseX >= (windowWidth * 0.5) ) { // On Right Side
			const offsetX = mouseX - 190
			activityCard.style.left = offsetX + "px"
		}
		
		// Use mouse position to place activity card on y-axis
		const mouseY = e.clientY
		const offsetElement = document.querySelector('#timeline div.canvas').getBoundingClientRect().top
		const cardHeight = activityCard.offsetHeight
		
		if (cardHeight >= 50) {
			const offsetY = mouseY - offsetElement - (0.3 * cardHeight)
			const boundOffsetY = Math.min(Math.max(offsetY, (-offsetElement + 15)), 130)
			activityCard.style.top = boundOffsetY + "px"
		}
		else if (cardHeight < 50 && cardHeight > 3) {
			const offsetY = mouseY - offsetElement - 18
			activityCard.style.top = offsetY + "px"
		}
		
	})
	
	const graphDays = [...document.querySelectorAll('#timeline div.canvas a')]
	
	graphDays.forEach( (a) => {
		// get a's data-date
		let date = a.dataset.date
		let mockSelector = 'div.graph-hover div.activity[data-date="' + date + '"]'
		
		let targetElemDate = '01-05-23'
		let targetSelector = '#timeline div.details-cards div.activity[data-date="' + date + '"]'
		
		a.addEventListener('mouseenter', () => {
			document.querySelector(targetSelector).classList.remove('hide')
		})
		a.addEventListener('mouseleave', () => {
			document.querySelector(targetSelector).classList.add('hide')
		})
	})
})
/* Graph Hover [End] */







/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Showcase
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const showcase = document.querySelector('main div.scroll-container')
const showcaseContainer = document.querySelector('main')
const showcaseCards = document.querySelector('main div.card')

showcase.classList.add('js-scale')

let showcaseTimeline = gsap.timeline({
	scrollTrigger: {
		trigger: showcase,
		start: "top 65%",
		end: "center 55%",
		scrub: 0.5
	}
})
showcaseTimeline.to(showcase, {scale: 1}, 'showcase-start')
showcaseTimeline.to('main', {height: "60svh"}, 'showcase-start')			

// ScrollTrigger.create({
// 	trigger: showcase,
// 	start: "center center",
// 	onEnter: () => {
// 		console.log("entered")
// 	}
// })

// Keep the transform-origin correct
document.querySelector('main').addEventListener('scroll', () => {
	let scrollElementWidth = showcaseContainer.offsetWidth
	let elementWidth = showcase.getBoundingClientRect().width
	
	let scrollPosition = showcaseContainer.scrollLeft
	let scrollWidth = showcaseContainer.scrollWidth
	
	let scrollPercent = 100 * (scrollPosition / (scrollWidth - scrollElementWidth))
	
	
	// console.log(scrollPercent)
	
	// let scaleFactor = elementTrueWidth / elementWidth
	
	// showcase.style.transformOrigin = scrollPos
	
	if (scrollPercent > 95) {
		showcase.style.transformOrigin = "right"
	}
	else if (scrollPosition < 5) {
		showcase.style.transformOrigin = "left"
	}
	else {
		showcase.style.transformOrigin = scrollPercent
	}
	
})

/* Showcase */






/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Last Note
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
if ( !prefersReducedMotion ) {
	document.querySelector('#last-note div.container').classList.remove('hide')
	
	gsap.delayedCall(0.0, () => { wordCycle('div.last-note div.first-word p') })
	gsap.delayedCall(0.6, () => { wordCycle('div.last-note div.second-word p') })
	gsap.delayedCall(1.2, () => { wordCycle('div.last-note div.third-word p') })
	
	function wordCycle ( target ) {
		const move = document.querySelector('div.last-note p:nth-of-type(1)').offsetHeight
		const el = gsap.utils.toArray(target)
		const length = el.length
		
		el.forEach( ( p, i ) => {
			const pHeight = p.offsetHeight
			
			const hangTime = 4
			const moveSpeed = 1
			const nonoverlapDuration = moveSpeed + hangTime
			const stagger = i * nonoverlapDuration
			const delayBetween = (length * nonoverlapDuration) - nonoverlapDuration -1
			
			gsap.delayedCall(stagger, () => {
				gsap.timeline({repeat: -1})
					.to(p, {
						y: pHeight,
						opacity: 1,
						duration: moveSpeed
					}, 0)
					.to(p, {
						y: 2 * pHeight,
						opacity: 0,
						delay: hangTime,
						duration: 1
					}, '>')
					.to(p, {
						y: 0,
						opacity: 0,
						duration: delayBetween
					}, '>')
			})
		})
	}
}
/* Last Note [End] */





// function is_touch_enabled() {
// 	return ( 'ontouchstart' in window ) ||
// 		   ( navigator.maxTouchPoints > 0 ) ||
// 		   ( navigator.msMaxTouchPoints > 0 );
// }
// 
// if ( is_touch_enabled() ) {
// }