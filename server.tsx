import { serve } from "https://deno.land/std@0.162.0/http/server.ts";
import ReactDOMServer from "react-dom/server";
import { ServerRoute } from "./app/common/router.tsx";
import App from "./app/app.tsx";
import { LangProvider } from "./app/lang.tsx";
import { cssResponse } from "./server/css-response.ts";
import { getPreferredLang } from "./server/get-preferred-lang.ts";
import { jsResponse } from "./server/js-loader.ts";
import { svgResponse } from "./server/svg-response.ts";

serve(async (request: Request): Promise<Response> => {
	const method = request.method;
	const preferredLang = getPreferredLang(request);
	const { pathname: path } = new URL(request.url);

	console.log(method, path, preferredLang);

	if (path.endsWith("tsx") || path.endsWith("ts")) {
		return jsResponse(path);
	}

	if (path.endsWith("css")) {
		return cssResponse(path);
	}

	if (path.endsWith("svg")) {
		return svgResponse(path);
	}

	const importMap = await Deno.readTextFile("./importMap.json");
	const clientScript = await Deno.readTextFile("./client.tsx");

	const stream = await ReactDOMServer.renderToReadableStream(
		<html>
			<title>hello, planet.</title>
			<link rel="stylesheet" href="/styles.css" />
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
				<ServerRoute.Provider value={path}>
					<LangProvider lang={preferredLang}>
						<App />
					</LangProvider>
				</ServerRoute.Provider>
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
