import { serve } from "https://deno.land/std@0.162.0/http/server.ts";
import { transform } from "https://deno.land/x/esbuild@v0.15.13/mod.js";
import ReactDOMServer from "react-dom/server";

async function jsResponse(pathname: string) {
	const { code } = await transform(
		await Deno.readTextFile("." + pathname),
		{
			loader: "tsx",
			jsx: "automatic",
			minify: true,
		},
	);
	return new Response(code, {
		headers: { "Content-Type": "application/javascript;charset=utf-8" },
	});
}

serve(async (request: Request): Promise<Response> => {
	const method = request.method;
	const { pathname } = new URL(request.url);

	console.log(method, pathname);

	if (pathname.endsWith("tsx")) {
		return jsResponse(pathname);
	}

	const importMap = await Deno.readTextFile("./importMap.json");
	const clientScript = await Deno.readTextFile("./client.tsx");

	const { default: App } = await import("./app/app.tsx");

	const stream = await ReactDOMServer.renderToReadableStream(
		<html>
			<title>hello</title>
			<script
				dangerouslySetInnerHTML={{
					__html: `console.time("❏ running client");`,
				}}
			/>
			<script
				type="importmap"
				dangerouslySetInnerHTML={{ __html: importMap }}
			/>
			<script
				type="module"
				dangerouslySetInnerHTML={{ __html: clientScript }}
			/>
			<div id="app">
				<App />
			</div>
		</html>,
	);

	// Wait for suspense boundaries to settle
	await stream.allReady;

	return new Response(
		stream,
		{
			headers: { "Content-Type": "text/html;charset=utf-8" },
		},
	);
});
