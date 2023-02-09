export async function getArticles() {
	const files = [];
	for await (const dirEntry of Deno.readDir("./writing")) {
		files.push({
			path: "/writing/" + dirEntry.name.replace(".md", ""),
			published: new Date(),
		});
	}
	return new Response(JSON.stringify({ data: files }), {
		headers: { "Content-Type": "application/json" },
	});
}
