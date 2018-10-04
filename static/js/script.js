if ("performance" in window) {
  let pageNav = performance.getEntriesByType("navigation")[0];
  let totalTime = pageNav.responseEnd - pageNav.requestStart;
  console.log(`⌁ this page took ${totalTime.toFixed(2)}ms to load ⌁`);
}

console.log("hey: https://twitter.com/dnrvs");
console.log("src: https://github.com/danreeves/danreev.es");
console.log("have a nice day!");
