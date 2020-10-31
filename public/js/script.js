function log (...args) {
  console.log(...args.map(str=>`%c${str}`), "font-style: italic;")
}

let weatherReq = fetch("https://coolweather.glitch.me/truro,gb")

window.onload = async function () {

  if ("performance" in window) {
	let pageNav = performance.getEntriesByType("navigation")[0];
	let totalTime = pageNav.responseEnd - pageNav.requestStart;
	log(`; page load in ${totalTime.toFixed(0)}ms`);
  }

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

  log("; made at home")
  log("; N 50° 15.7917'");
  log("; W 5° 3.0625'");
  let weatherRes = await weatherReq
  let data = await weatherRes.json()
  if (data.weather) {
	log(`; enjoying the ${data.weather}`)
  }
}

window.addEventListener("click", function(event) {
  // Alway reenable scroll because it would suck to not be able to scroll
  enableScroll()
  if (window.matchMedia("(min-width: 700px)").matches) {
	let opened = Array.from(document.querySelectorAll(".album-img-cover"))

	opened.forEach(function(node) {
	  document.body.removeChild(node)
	})

	if (event.target.className.includes("album-img") && !opened.length) {
	  let newNode = event.target.cloneNode()
	  newNode.className = event.target.className + " expanded"
	  newNode.loading = "eager"

	  let cover = document.createElement("DIV")
	  cover.className = "album-img-cover"
	  cover.appendChild(newNode)

	  document.body.appendChild(cover)
	  disableScroll()
	}
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
