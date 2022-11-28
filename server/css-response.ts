export async function cssResponse(path: string) {
	const responseString = await Deno.readTextFile("./public" + path);

	return new Response(responseString, {
		headers: { "Content-Type": "text/css;charset=utf-8" },
	});
}
