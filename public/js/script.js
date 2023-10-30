import { annotate } from "https://unpkg.com/rough-notation?module";

function log(...args) {
  console.log(...args.map((str) => `%c${str}`), "font-style: italic;");
}

let links = document.querySelectorAll("a");

for (let link of links) {
  annotate(link, { type: "underline", padding: -4 }).show();
}

let boxes = document.querySelectorAll("pre,img");

for (let box of boxes) {
  annotate(box, { type: "box", padding: 0 }).show();
}

if ("performance" in window) {
  let pageNav = performance.getEntriesByType("navigation")[0];
  let totalTime = pageNav.responseEnd - pageNav.requestStart;
  log(`page load in ${totalTime.toFixed(0)}ms`);
}

log("made at home");
