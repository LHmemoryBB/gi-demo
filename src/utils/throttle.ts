//防抖
export function debounce(fn: Function, delay = 200) {
	let timer: any;
	let immediate = true;
	return function (...args: any) {
		if (immediate) {
			fn.apply(this, args);
			immediate = false;
		} else {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				fn.apply(this, args);
				immediate = true;
			}, delay);
		}
	};
}
// 节流
export function throttle(fn: Function, interval: number,state: Boolean) {
	var last: any;
	var timer: any;
	var interval = interval || 200;
	return function() {
		var th = this;
		var args = arguments;
		var now = +new Date();
		if (last && now - last < interval) {
			clearTimeout(timer);
			timer = setTimeout(function() {
				last = now;
				fn.apply(th, args);
			}, interval);
		} else {
			last = now;
			if(state)fn.apply(th, args);
		}
	}
}
