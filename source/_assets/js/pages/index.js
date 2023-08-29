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
if ( document.querySelector('#splash').classList.contains('hide') ) {
	startNavScroll()
}
else {
	document.querySelector('nav div.background').classList.remove('show')
	
	/* Scroll Hint Bounce (after 3.5s if under 10px scrolled)
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	gsap.delayedCall(4.0, () => {
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
		let scrollTriggerY = 200
		let splashEndY = document.querySelector('#splash').offsetHeight
		
		if ( document.querySelector('#splash').classList.contains('hide') ) {
			startNavScroll()
			console.log('a')
			window.removeEventListener('scroll', splashScroll)
			return
		}
		else if ( window.scrollY < scrollTriggerY ) {
			updateBodyBackground("var(--splash-background-color)")
		}
		else if ( window.scrollY > scrollTriggerY && window.scrollY <= splashEndY ) {
			scrollPastSplash()
		}
		else {
			updateBodyBackground("var(--background-color-main)")
			startNavScroll()
		}
	}
	window.addEventListener('scroll', splashScroll)
	
	// Helper Function for changing the theme-color/body color
	function updateBodyBackground ( arg ) {
		gsap.to('body', { background: arg, duration: 1.2})
	}
	
	// Handles scrolling splash away - function called by scroll handler
	function scrollPastSplash () {
		window.removeEventListener('scroll', splashScroll)
		
		const splashHeight = document.querySelector('#splash').offsetHeight * -1
		const scrollPos = document.documentElement.scrollTop
		let scrollTo = scrollPos + splashHeight
		
		// Scroll to current position minus splash element's height
		gsap.to(window, {
			scrollTo: {x: scrollTo, y: 0, autoKill: false, ease: 'power2.in'},
			duration: 0.8
		})
		
		// Move splash element off top, then hide
		gsap.to('#splash', {
			marginTop: splashHeight,
			duration: 0.8,
			onComplete: () => {
				document.querySelector('#splash').classList.add('hide')
				updateBodyBackground('var(--background-color-main)')
				document.querySelector('nav div.background').classList.add('show')
				document.querySelectorAll('div.overscroll').forEach( (i) => {
					i.style.display = 'block'
				})
				startNavScroll()
			}
		})
	}
}
/* Splash [End] */



function startNavScroll () {
	document.querySelector('#scroll-collection-2').classList.remove('hide')
	
	const header = document.querySelector('nav')
	const headerScroller = document.querySelector('nav ul')
	const headerContent1 = document.querySelector('#scroll-collection-1')
	const headerContent2 = document.querySelector('#scroll-collection-2')
	
	const speed = 55 // Set the horiz. scroll speed for marquee
	const scrollEnd = headerContent1.offsetWidth + headerContent2.offsetWidth
	let scrollDuration = scrollEnd / speed
	
	
	/* On Load: Start scroll
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	// On load: start scrolling to end, after 2s delay
	headerScrollTimelineDefault = gsap.timeline()
	headerScrollTimelineDefault.to(headerScroller, {
		scrollTo: {y:0, x: 20, autoKill: true},
		duration: 1.3,
		delay: 1.2,
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
Timeline Details
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
		
		const cardHeight = document.querySelector('#timeline div.details-cards div.container').offsetHeight
		
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
		let photo = a.dataset.photo
		
		let targetSelector = document.querySelector('#timeline div.details-cards div.activity[data-date="' + date + '"]')
		let photoSelector = document.querySelector('#timeline div.details-cards div.activity[data-date="' + date + '"] picture')
		
		a.addEventListener('mouseenter', () => {
			targetSelector.classList.remove('hide')
			if ( a.dataset.photo ) {
				const prefixURL = 'https://large-assets.notnotjake.com/images/index/activity-img/'
				photoSelector.innerHTML = `
					<source srcset="${prefixURL}${date}.webp">
					<img src="${prefixURL}${date}.jpg">
				`
			}
		})
		a.addEventListener('mouseleave', () => {
			targetSelector.classList.add('hide')
		})
	})
})
/* Timeline Details [End] */





// function is_touch_enabled() {
// 	return ( 'ontouchstart' in window ) ||
// 		   ( navigator.maxTouchPoints > 0 ) ||
// 		   ( navigator.msMaxTouchPoints > 0 );
// }
// 
// if ( is_touch_enabled() ) {
// }