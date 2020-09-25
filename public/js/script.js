if ("performance" in window) {
  let pageNav = performance.getEntriesByType("navigation")[0];
  let totalTime = pageNav.responseEnd - pageNav.requestStart;
  console.log(`⌁ this page took ${totalTime.toFixed(2)}ms to load ⌁`);
}

console.log("hey: https://twitter.com/dnrvs");
console.log("src: https://github.com/danreeves/danreev.es");
console.log("have a nice day!");

if (document.querySelectorAll(".writing-list").length) {
  let times = Array.from(document.querySelectorAll(".writing-list time"))

  let lastTime
  times.forEach(node => {
    if (!lastTime) {
      lastTime = node
      return
    }

    if (lastTime.textContent === node.textContent) {
      let parent = node.parentElement
      let links = Array.from(parent.querySelectorAll('a'))
      let prevParent = lastTime.parentElement

      links.forEach(link => {
        prevParent.appendChild(link)
      })

      parent.remove()
    } else {
      lastTime = node
    }
  })
}
