import * as v from "zod/v4";
import { frontMatter, render } from "../utils/md.ts";

export default function Post(props: { slug: string }) {
	const file = Deno.readTextFileSync(`./writing/${props.slug}.md`);
	const { title, body, attrs } = frontMatter(
		file,
		v.object({ published: v.date() }),
	);
	return (
		<>
			<title>{title}</title>
			<time
				dateTime={attrs.published.toISOString()}
				className="mb-4 block text-sm"
			>
				{attrs.published.toLocaleDateString("en-GB", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</time>
			<div
				className="prose mb-8 max-w-none"
				dangerouslySetInnerHTML={{ __html: render(body) }}
			/>
		</>
	);
}
