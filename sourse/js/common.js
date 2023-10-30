"use strict";

const $ = jQuery;





function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	gsap.registerPlugin(ScrollTrigger);

	let scroller = document.querySelector(".scroller"), tween;






	ScrollTrigger.defaults({
		toggleActions: "play none play none",
	});
	let bodyScrollBar;
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		bodyScrollBar = Scrollbar.init(scroller, {
			// let bodyScrollBar = Scrollbar.init(document.body, {
			damping: 0.2,
			thumbMinSize: 20,
			// delegateTo: document,
			// onlyScrollIfNeeded: true,
		});
	}
	$(document).on('click', '.arrow-up--js', function (e) {
		e.preventDefault();
		if (bodyScrollBar) {
			bodyScrollBar.scrollTo(0, 0, 800);
		}
		else {

			$('html, body').animate({ scrollTop: 0 }, 0);
		}
	})
	$(document).on('click', '.toggle-menu-mobile--js', function (e) {
		e.preventDefault();
		// bodyScrollBar.scrollTo(0,0,800);
	})
	if (bodyScrollBar) {
		ScrollTrigger.scrollerProxy(scroller, {
			scrollTop(value) {
				if (arguments.length) {
					bodyScrollBar.scrollTop = value;
				}
				return bodyScrollBar.scrollTop;
			},
		});

		bodyScrollBar.addListener(ScrollTrigger.update);
	}


	gsap.utils.toArray("[data-aos]").forEach(aos => {


		const animate = aos.dataset.animate;
		function myfunction() {
			aos.classList.add(`aos-animate`);
			if (animate) {
				aos.classList.toggle(animate);
			}
		};
		const rect = aos.getBoundingClientRect();
		ScrollTrigger.create({
			scroller: scroller,
			trigger: aos,
			start: 'top bottom',
			end: 'bottom +100 top',

			// markers: true,
			toggleActions: "play none none none",
			onEnter: () => myfunction(),
			// onLeave: () => myfunction(),
			// onLeaveBack: () => myfunction(),
			// onEnterBack: () => myfunction(),
			invalidateOnRefresh: true,
		});
	})

	let sections = document.querySelectorAll(".section--animate");
	for (const section of sections) {
		let aosElems = section.querySelectorAll('[ data-aos]');
		for (const el of aosElems) {
			el.setAttribute("data-aos-offset", '-150');
		}
		var up = gsap.timeline({
			scrollTrigger: {
				scroller,
				trigger: section,
				start: 'top bottom',
				end: "70% bottom",
				scrub: 1,
				pinSpacing: false
			}

		})
		up
			.from(section.querySelector(".animate-block"), {
				  y: 200
			})
			.to(section.querySelector(".animate-block"), {
				  y: -50
			});
	}

	// AOS.init({
	// 	// mirror: true,
	// 	// offset: 50,
	// 	duration: 800, // values from 0 to 3000, with step 50ms
	// 	easing: 'easeOutQuart',
	// 	once: true,
	// });

	// var foot = gsap.timeline({

	// 	scrollTrigger: {
	// 		scroller,
	// 		trigger: '.footer-wrap',
	// 		start: 'clamp(top  bottom)',
	// 		// endTrigger: "html",
	// 		end: "clamp( bottom)",
	// 		// markers: true, 
	// 		// ease: "expo", 
	// 		// toggleActions: "play none reverse none",
	// 		scrub: 1,
	// 		pinSpacing: false
	// 	}

	// })
	// foot
	// 	.from(".footer-wrap .footer", {
	// 		// delay: 0.1, // wait 0.2 seconds from the last scroll event before doing the snapping
	// 		ease: "none",
	// 		// duration: 10000,  
	// 		y: -200
	// 	}); 

	var foot = gsap.timeline({

		scrollTrigger: {
			scroller,
			trigger: '.footer-wrap',
			start: 'top bottom',
			end: 'bottom bottom',
			// endTrigger: '.footer-wrap',
			// end: '90% bottom',
			// markers: true,
			// toggleActions: "play none reverse none",
			scrub: true,
			
		}

	})
	foot
		.from(".footer", {
			ease: 'none', 
			// duration: .02,  
			y: '-80%' });


	var fixedBtns = gsap.timeline({

		scrollTrigger: {
			scroller,
			trigger: '.headerBlock',
			start: "clamp(bottom top)",
			end: "+=600%",
			// toggleActions: "play none none none",
			// endTrigger: scroller,
			scrub: 1,
			// pin: true,
			// markers: true,
			toggleClass: { targets: ".fixed-btn-wrap", className: "active" }
		}

	})

	// fixedBtns.to(".fixed-btn-wrap ", { toggleClass: "active" });


	function setAnimationStep(step, d1 = 1, y1 = 1, y2 = 1, d2 = 2) {
		var up = gsap.timeline({
			scrollTrigger: {
				scroller,
				trigger: '.sSteps',
				start: '20% bottom',
				end: "bottom+=20% bottom",
				scrub: 1.2,
				pinSpacing: false
			}
		})
		up
			.from(step, {
				ease: "none", y: 150 + y1
			})
			.to(step, {
				ease: "none", y: -150 + y2
			});
	}
	setAnimationStep(".sSteps__col:nth-child(1)")
	setAnimationStep(".sSteps__col:nth-child(2)", .8, 100, -200, .4)
	setAnimationStep(".sSteps__col:nth-child(3)", 1.5, 50, -150, 1)
	setAnimationStep(".sSteps__col:nth-child(4)", .6, 200, -220, .4)

	var titleStep = gsap.timeline({
		scrollTrigger: {
			scroller,
			trigger: '.sSteps',
			start: 'top bottom',
			end: "bottom top",
			scrub: 1,
			pinSpacing: false
		}

	})
	titleStep
		.from('.sSteps h2', {
			ease: "none", y: -150
		})
		.to('.sSteps h2', {
			ease: "none", y: 200
		});


	function setAnimationsFolkVote(step, y1 = 1, y2 = 1, start = '10%', end = "80%") {
		var up = gsap.timeline({
			scrollTrigger: {
				scroller,
				trigger: '.sFolkVote',
				start: `${start} bottom`,
				end: "bottom bottom",
				scrub: 1,
				pinSpacing: false
			}
		})
		up
			.from(step, {
				ease: "none", y: 50 + y1
			})
			.to(step, {
				ease: "none"
			})
			.to(step, {
				ease: "none", y: -50 + y2
			});
	}
	function setAnimationsHands(step, y1 = 1, y2 = 1, start = '10%', end = "80%") {
		var up = gsap.timeline({
			scrollTrigger: {
				scroller,
				trigger: '.sFolkVote',
				start: `${start} bottom`,
				end: "bottom bottom",
				scrub: 1,
				pinSpacing: false
			}
		})
		up
			.from(step, {
				ease: "none", y: y1
			})
			// .to(step, {
			// 	ease: "none" 	})
			.to(step, {
				ease: "none", y: y2
			});
	}
	setAnimationsFolkVote('.sFolkVote h2')
	setAnimationsFolkVote('.sFolkVote .before', 150, 50)
	setAnimationsFolkVote('.el--9 div', -50, 50,)
	setAnimationsFolkVote('.el--10 div', 10, 10,)
	setAnimationsFolkVote('.el--11 div', 20, 150,)
	setAnimationsFolkVote('.sFolkVote__row-date', 50, 100,)
	setAnimationsHands('.hands-block__item--3', -300, -100, '50%', `86%`)
	setAnimationsHands('.hands-block__item--2', -200, -200, '50%', `86%`)
	setAnimationsHands('.hands-block__item--1', -100, -300, '50%', `86%`)



	let scenes = [
		document.getElementById('headElems'),
		document.getElementById('headElemsBack'),
		document.getElementById('scene2'),
		document.getElementById('scene3'),
		document.getElementById('scene4'),
		// document.getElementById('scene404'),
	]
	for (const scene of scenes) {
		if (scene) {
			var parallaxInstance4 = new Parallax(scene, {
				scalarX: 30,
				scalarY: 30,
				precision: 10,
				selector: '.el',
				// pointerEvents: 'all'
			});
			parallaxInstance4.friction(0.4, 0.4);
		}
	}

	// const maxRot = 30;
	// function mouseMoveFunc(evt) {

	// 	for (const iterator of object) {
			
	// 	}
	// 	const maxX = gsap.getProperty(".bigText", "width") * 0.75;
		
	// 	const percent = gsap.utils.normalize(0, innerWidth, evt.pageX);
		
	// 	gsap.to('.el', {
	// 		duration: 0.2,
	// 		x: percent * maxX - maxX / 2,
	// 		rotationY: -(percent * maxRot - maxRot / 2),
	// 		overwrite: true
	// 	});
	// }

	// window.addEventListener("mousemove", mouseMoveFunc);
 
// window.addEventListener("mousemove", mouseMoveFunc);

	$(".select-wrap").each(function () {
		let self = $(this);
		self.find(".select-js").select2({
			dropdownParent: self,
		});
	})

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }