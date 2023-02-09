export async function getArticles() {
	const files = [];
	for await (const dirEntry of Deno.readDir("./writing")) {
		files.push({
			path: "/writing/" + dirEntry.name.replace(".md", ""),
			published: "2022-01-01",
		});
	}
	return new Response(JSON.stringify({ data: files }), {
		headers: { "Content-Type": "application/json" },
	});
}
