import App from "./app/app.tsx";
import { createElement, startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

requestIdleCallback(() => {
  startTransition(() => {
    console.timeEnd("❏ running client");
    hydrateRoot(
      document.getElementById("app"),
      createElement(StrictMode, {
        children: createElement(App),
      })
    );
  });
});
