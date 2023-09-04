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
			aos.classList.toggle(`aos-animate`);
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
			toggleActions: "play none reverse none",
			onEnter: () => myfunction(),
			// onLeave: () => myfunction(),
			onLeaveBack: () => myfunction(),
			// onEnterBack: () => myfunction(),
			invalidateOnRefresh: true,
		});
	})

	AOS.init({
		mirror: true,
		duration: 800, // values from 0 to 3000, with step 50ms
		easing: 'ease-in-out',
	});
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