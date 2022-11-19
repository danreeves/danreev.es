import * as esbuild from "https://deno.land/x/esbuild@v0.15.13/wasm.js";

await esbuild.initialize({ worker: false });

const fileCache = new Map();

async function transform(path: string) {
	const { code } = await esbuild.transform(
		await Deno.readTextFile("." + path),
		{
			loader: "tsx",
			jsx: "automatic",
		},
	);
	return code;
}

export async function jsResponse(path: string) {
	let responseString = "";

	if (Deno.env.get("PROD") === "true" && fileCache.has(path)) {
		responseString = fileCache.get(path);
	} else {
		responseString = await transform(path);
		fileCache.set(path, responseString);
	}

	return new Response(responseString, {
		headers: { "Content-Type": "application/javascript;charset=utf-8" },
	});
}
