import App from "./app/app.tsx";
import { createElement, startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { LangProvider } from "./app/lang.tsx";

requestIdleCallback(() => {
	startTransition(() => {
		console.timeEnd("❏ running client");
		hydrateRoot(
			document.getElementById("app"),
			createElement(StrictMode, {
				children: createElement(LangProvider, {
					lang: navigator.language,
					children: createElement(App),
				}),
			}),
		);
	});
});
