if ("performance" in window) {
  let pageNav = performance.getEntriesByType("navigation")[0];
  let totalTime = pageNav.responseEnd - pageNav.requestStart;
  console.log(`⌁ this page took ${totalTime.toFixed(2)}ms to load ⌁`);
}

console.log("hey: https://twitter.com/dnrvs");
console.log("src: https://github.com/danreeves/danreev.es");
console.log("have a nice day!");

let index = 1

Array.from(document.querySelectorAll('a:not(.anchor), .fake-link')).forEach(node => {
  if (index === 2) {
    node.classList.add('color-2')
  }

  if (index === 3) {
    node.classList.add('color-3')
  }

  index = index === 3 ? 1 : index + 1
})
