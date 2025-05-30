import { Hono } from "hono";
import { serveStatic } from "hono/deno";

import { Home } from "./pages/Home.tsx";
import { App } from "./components/App.tsx";
import { Contact } from "./pages/Contact.tsx";
import Post from "./pages/Writing.tsx";

const app = new Hono();

app.use("/*", serveStatic({ root: "./static" }));

app.get("/", (c) => {
	return c.html(
		<App>
			<Home />
		</App>,
	);
});

app.get("/contact", (c) => {
	return c.html(
		<App>
			<Contact />
		</App>,
	);
});

app.get("/writing/:slug", (c) => {
	return c.html(
		<App>
			<Post slug={c.req.param("slug")} />
		</App>,
	);
});

Deno.serve(app.fetch);
