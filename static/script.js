import { annotate } from "https://unpkg.com/rough-notation?module";

function log(...args) {
  console.log(...args.map((str) => `%c${str}`), "font-style: italic;");
}

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>");
}

document.body.classList.add("js");

const fakeLink = document.createElement("a");
fakeLink.innerHTML = "fake link";
document.body.appendChild(fakeLink);
const LINK_HEIGHT = fakeLink.getBoundingClientRect().height;
document.body.removeChild(fakeLink);

for (const link of document.querySelectorAll("a")) {
  const linkHeight = link.getBoundingClientRect().height;
  if (linkHeight !== LINK_HEIGHT) {
    // Link is on multiple lines
    link.innerHTML = wrapWords(link.textContent);

    for (const span of link.querySelectorAll("span")) {
      annotate(span, { type: "underline", padding: -4, animate: false }).show();
    }
  } else {
    // Link is on one line
    annotate(link, { type: "underline", padding: -4, animate: false }).show();
  }
}

for (const box of document.querySelectorAll("pre,img")) {
  if (!box.classList.contains("no-annotate")) {
    annotate(box, { type: "box", padding: 0, animate: false }).show();
  }
}

for (const hr of document.querySelectorAll("hr")) {
  annotate(hr, { type: "underline", padding: 0, animate: false }).show();
  hr.style.border = "none";
}

if ("performance" in window) {
  const pageNav = performance.getEntriesByType("navigation")[0];
  const totalTime = pageNav.responseEnd - pageNav.requestStart;
  log(`page load in ${totalTime.toFixed(0)}ms`);
}
