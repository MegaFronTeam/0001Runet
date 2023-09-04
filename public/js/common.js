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