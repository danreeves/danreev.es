import { Lastfm } from "../components/Lastfm.tsx";
import { Letterboxd } from "../components/Letterboxd.tsx";
import { frontMatter } from "../utils/md.ts";
import { z } from "zod/v4";

function fileToParsedMd(file: Deno.DirEntry) {
	const fileContents = Deno.readTextFileSync(`./writing/${file.name}`);
	const fm = frontMatter(fileContents, z.object({ published: z.date() }));
	const data = { ...fm, slug: file.name.replace(/\.md$/, "") };
	return data;
}

export async function Home() {
	const dir = Array.from(Deno.readDirSync("./writing"));
	const posts = dir
		.map(fileToParsedMd)
		.toSorted((a, b) => Number(b.attrs.published) - Number(a.attrs.published));

	return (
		<>
			<title>Hello, planet!</title>
			<div className="mb-8">
				<h1 title="Hello, planet" className="">
					Hello, planet
				</h1>

				<p className="font-rx100 mb-4">
					I'm Dan Reeves, Frontend Tech Lead at{" "}
					<a
						href="https://treasuredata.com"
						className="text-black underline decoration-red-500"
					>
						Treasure Data
					</a>
					. I write a lot of React and TypeScript.
				</p>

				<Lastfm />

				<p className="mb-4">
					I live in the UK but I've worked remote since 2017.
				</p>

				<p className="mb-4">
					I've been heavily involved in the{" "}
					<a
						href="https://vmf-docs.verminti.de/"
						className="text-black underline decoration-red-500"
					>
						Vermintide
					</a>{" "}
					and{" "}
					<a
						href="https://darkti.de/modding"
						className="text-black underline decoration-red-500"
					>
						Darktide
					</a>{" "}
					modding communities where I write a lot of{" "}
					<a
						href="https://github.com/danreeves?tab=repositories&q=mods&type=source&language=lua&sort="
						className="text-black underline decoration-red-500"
					>
						lua
					</a>
					.
				</p>

				<Letterboxd />

				<p className="mb-4">
					Before all that, I worked on fullstack builds with php (WordPress) and
					python (Django), prototyping, ux testing, and much more for all
					variety of clients at{" "}
					<a
						href="https://fffunction.co/"
						className="text-black underline decoration-red-500"
					>
						fffunction
					</a>
					.
				</p>

				<p className="mb-4">
					Outside of programming, I enjoy film photography. You can see it{" "}
					<a
						href="https://dnrvs.photo"
						className="text-black underline decoration-red-500"
					>
						here
					</a>
					.
				</p>

				<p className="mb-4">
					Want to talk?{" "}
					<a
						href="/contact"
						className="text-black underline decoration-red-500"
					>
						Get in touch!
					</a>
				</p>
			</div>
			<h2 title="Blog" className="">
				Blog
			</h2>
			<ol reversed className="ml-6 list-decimal">
				{posts.map((post) => (
					<li>
						<a
							href={`/writing/${post.slug}`}
							className="text-black underline decoration-red-500"
						>
							{post.title}
						</a>
					</li>
				))}
			</ol>
		</>
	);
}
