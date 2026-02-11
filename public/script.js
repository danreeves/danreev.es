function log(...args) {
	console.log(...args.map((str) => `%c${str}`), "font-style: italic;");
}

if ("performance" in window) {
	const pageNav = performance.getEntriesByType("navigation")[0];
	const totalTime = pageNav.responseEnd - pageNav.requestStart;
	log(`page load in ${totalTime.toFixed(0)}ms`);
}

// be sure to specify the exact version
// or
// import { codeToHtml } from 'https://esm.run/shiki@3.0.0'

const codeBlocks = document.querySelectorAll("pre code[language]");
if (codeBlocks.length > 0) {
	import("https://esm.sh/shiki@3.0.0")
		.then(({ codeToHtml }) => {
			log(">>> shiki loaded");
			codeBlocks.forEach(async (el) => {
				const html = await codeToHtml(
					el.innerText,
					{
						theme: "github-light",
						lang: el.getAttribute("language"),
					},
				);
				el.parentElement.outerHTML = html;
			});
		});
}
