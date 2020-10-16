window.onload = function () {

  if ("performance" in window) {
	let pageNav = performance.getEntriesByType("navigation")[0];
	let totalTime = pageNav.responseEnd - pageNav.requestStart;
	console.log(`can you believe this page took ${totalTime.toFixed(2)}ms to load`);
  }

  console.log("hey https://twitter.com/dnrvs");
  console.log("src https://github.com/danreeves/danreev.es");
  console.log("ily");

  function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  let imgs = document.querySelectorAll('.cool-img')
  imgs.forEach(img => {
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
  })
}
