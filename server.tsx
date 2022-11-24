import { serve } from "https://deno.land/std@0.162.0/http/server.ts";
import ReactDOMServer from "react-dom/server";
import App from "./app/app.tsx";
import { LangProvider } from "./app/lang.tsx";
import { jsResponse } from "./server/js-loader.ts";

serve(async (request: Request): Promise<Response> => {
	const method = request.method;
	let [preferredLang] = request.headers.get("accept-language")?.split(",") ??
		[];
	if (preferredLang.includes(";")) {
		[preferredLang] = preferredLang.split(";");
	}
	const { pathname } = new URL(request.url);

	console.log(method, pathname, preferredLang);

	if (pathname.endsWith("tsx") || pathname.endsWith("ts")) {
		return jsResponse(pathname);
	}

	const importMap = await Deno.readTextFile("./importMap.json");
	const clientScript = await Deno.readTextFile("./client.tsx");

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
				<LangProvider lang={preferredLang}>
					<App />
				</LangProvider>
			</div>
		</html>,
	);

	// Wait for suspense boundaries to settle
	// await stream.allReady;

	return new Response(
		stream,
		{
			headers: { "Content-Type": "text/html;charset=utf-8" },
		},
	);
});
