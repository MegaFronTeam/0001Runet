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
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		bodyScrollBar = Scrollbar.init(scroller, {
			// let bodyScrollBar = Scrollbar.init(document.body, {
			damping: 0.1,
			thumbMinSize: 20,
			delegateTo: document,
		});
	}
	ScrollTrigger.scrollerProxy(scroller, {
		scrollTop(value) {
			if (arguments.length) {
				bodyScrollBar.scrollTop = value;
			}
			return bodyScrollBar.scrollTop;
		},
	});
	bodyScrollBar.addListener(ScrollTrigger.update);


	gsap.utils.toArray("[data-aos]").forEach(aos => {


		const animate = aos.dataset.animate;
		function myfunction() {
			aos.classList.add(`aos-animate`);
			if (animate) {
				// aos.classList.toggle(animate);
			}
		};
		const rect = aos.getBoundingClientRect();
		ScrollTrigger.create({
			scroller: scroller,
			trigger: aos,
			start: 'top 90%',
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

	AOS.init({
		// mirror: true,
		duration: 800, // values from 0 to 3000, with step 50ms
		easing: 'ease-in-out',
		once: true,
	});

	var foot = gsap.timeline({

		scrollTrigger: {
			scroller,
			trigger: '.footer-wrap',
			start: 'top bottom',
			// endTrigger: "html",
			end: "bottom bottom",
			// markers: true, 
			// ease: "expo", 
			// toggleActions: "play none reverse none",
			scrub: 1,
			pinSpacing: false
		}

	})
	foot
		.from(".footer", {
			// delay: 0.1, // wait 0.2 seconds from the last scroll event before doing the snapping
			ease: "none",
			// duration: 10000,  
			y: "-200px"
		});

	let sections = document.querySelectorAll(".section--animate"); 
	for (const section of sections) {
		var up = gsap.timeline({ 
			scrollTrigger: {
				scroller,
				trigger: section,
				start: 'top bottom', 
				end: "bottom bottom", 
				scrub: 1,
				pinSpacing: false
			}

		})
		up
			.from(section.querySelector(".animate-block"), { 
				ease: "none",  y: 200
			})
			.to(section.querySelector(".animate-block"), { 
				ease: "none", y: -250
			});
		}

	function setAnimationStep(step, d1 = 1,y1 = 1,  y2 = 1, d2 = 2){ 
			var up = gsap.timeline({ 
				scrollTrigger: {
					scroller,
					trigger: '.sSteps',
					start: '20% bottom', 
					end: "bottom+=20% bottom", 
					scrub: 1.2 ,
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
		.to('.sSteps h2' , {
			ease: "none", y: 200
		}); 
		

	function setAnimationsFolkVote(step,   y1 = 1, y2 = 1, start='10%', end="80%") {
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
				ease: "none", y: -50 + y2
			});
	}
	setAnimationsFolkVote('.sFolkVote h2')
	setAnimationsFolkVote('.sFolkVote .before',  150, 200) 
	setAnimationsFolkVote('.sFolkVote__row-date',   50, 100, )
	setAnimationsFolkVote('.hands-block__item--3',  -400, 0, '60%', `86%`)
	setAnimationsFolkVote('.hands-block__item--2', -150, -100, '65%', `86%`)
	setAnimationsFolkVote('.hands-block__item--1', 100, -200, '70%', `86%`)

	var scene = document.getElementById('headElems');
	var parallaxInstance = new Parallax(scene, {
		scalarX: 20,
		scalarY: 20
	} );
	parallaxInstance.friction(0.2, 0.2);

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