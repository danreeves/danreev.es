// import App from "./app/app.tsx";
// import { createElement, startTransition, StrictMode } from "react";
// import { hydrateRoot } from "react-dom/client";

// requestIdleCallback(() => {
//   startTransition(() => {
//     console.timeEnd("❏ running client");
//     hydrateRoot(
//       document.getElementById("app"),
//       createElement(StrictMode, {
//         children: createElement(App),
//       })
//     );
//   });
// });

import { annotate } from "rough-notation";

const els = document.querySelectorAll("a");
const animationDuration = 800;
let delay = 0;
const activeTypes = ["circle", "box"];

function oneOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

for (const el of els) {
  setTimeout(() => {
    const annotation = annotate(el, {
      type: el.className.includes("current") ? oneOf(activeTypes) : "underline",
      animationDuration,
    });
    annotation.show();
  }, delay);

  delay += animationDuration / 2;
}

const boxes = document.querySelectorAll(".box");
for (const box of boxes) {
  annotate(box, { type: "box", animate: 0 }).show();
}
const avatars = document.querySelectorAll(".avatar");
for (const av of avatars) {
  annotate(av, { type: "circle", animate: 0, padding: 0 }).show();
}
