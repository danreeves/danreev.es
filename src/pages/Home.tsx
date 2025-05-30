import { frontMatter } from "../utils/md.ts";
import { z } from "zod/v4";

function fileToParsedMd(file: Deno.DirEntry) {
	const fileContents = Deno.readTextFileSync(`./writing/${file.name}`);
	const fm = frontMatter(fileContents, z.object({ published: z.date() }));
	const data = { ...fm, slug: file.name.replace(/\.md$/, "") };
	return data;
}

export function Home() {
	const dir = Array.from(Deno.readDirSync("./writing"));
	const posts = dir
		.map(fileToParsedMd)
		.toSorted((a, b) => Number(b.attrs.published) - Number(a.attrs.published));

	return (
		<>
			<title>Hello, planet!</title>
			<div class="home">
				<h1 title="Hello, planet">Hello, planet</h1>

				<p>
					I'm Dan Reeves, Frontend Tech Lead at{" "}
					<a href="https://treasuredata.com">Treasure Data</a>. I write a lot of
					React and TypeScript.
				</p>

				<p>I live in the UK but I've worked remote since 2017.</p>

				<p>
					I've been heavily involved in the{" "}
					<a href="https://vmf-docs.verminti.de/">Vermintide</a> and{" "}
					<a href="https://darkti.de/modding">Darktide</a>{" "}
					modding communities where I write a lot of{" "}
					<a href="https://github.com/danreeves?tab=repositories&q=mods&type=source&language=lua&sort=">
						lua
					</a>
					.
				</p>

				<p>
					Before all that, I worked on fullstack builds with php (WordPress) and
					python (Django), prototyping, ux testing, and much more for all
					variety of clients at <a href="https://fffunction.co/">fffunction</a>.
				</p>

				<p>
					Outside of programming, I enjoy film photography. You can see it{" "}
					<a href="https://dnrvs.photo">here</a>.
				</p>

				<p>
					Want to talk? <a href="/contact">Get in touch!</a>
				</p>
			</div>
			<h2 title="Blog">Blog</h2>
			<ol reversed>
				{posts.map((post) => (
					<li>
						<a href={`/writing/${post.slug}`}>{post.title}</a>
					</li>
				))}
			</ol>
		</>
	);
}
