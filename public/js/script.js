window.onload = function () {

  if ("performance" in window) {
	let pageNav = performance.getEntriesByType("navigation")[0];
	let totalTime = pageNav.responseEnd - pageNav.requestStart;
	console.log(`can you believe this page took ${totalTime.toFixed(2)}ms to load`);
  }

  console.log("hey https://twitter.com/dnrvs");
  console.log("src https://github.com/danreeves/danreev.es");

  function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  let supportsPixelated = CSS && CSS.supports && CSS.supports("image-rendering", "pixelated")

  if (!supportsPixelated) {
	let imgs = document.querySelectorAll(".cool-img")
	imgs.forEach(img => {
	  img.onload = function () {
		let canvas = document.createElement("CANVAS")
		canvas.className = "cool-img"
		canvas.width = img.width
		canvas.height = img.height
		insertAfter(canvas, img)

		let ctx = canvas.getContext("2d")
		ctx.msImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(img, 0, 0, img.width, img.height);

		img.parentElement.removeChild(img)
	  }
	  img.src=img.src
	})
  }

}

window.addEventListener("click", function(event) {
  let opened = Array.from(document.querySelectorAll(".album-img.expanded"))

  opened.forEach(function(node) {
	node.className = node.className.replace(" expanded", "")
  })
  enableScroll()

  if (event.target.className.includes("album-img") && !opened.length) {
	event.target.className = event.target.className + " expanded"
	disableScroll()
  }
})

// I got this from stackoverflow lol

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
	preventDefault(e);
	return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
	get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
