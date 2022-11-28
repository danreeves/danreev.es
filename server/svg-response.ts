export async function svgResponse(path: string) {
	const responseString = await Deno.readTextFile("./public" + path);

	return new Response(responseString, {
		headers: { "Content-Type": "image/svg+xml;charset=utf-8" },
	});
}
