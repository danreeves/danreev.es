import { render as gfmRender, Renderer } from "@deno/gfm";
import slugify from "@sindresorhus/slugify";

import { extractYaml, test } from "@std/front-matter";
import { z } from "zod/v4";

class CustomRenderer extends Renderer {
	override heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6): string {
		return `<h${level} id="${
			slugify(text)
		}" title="${text}">${text}</h${level}>`;
	}
	override code(code: string, language?: string) {
		return `<pre><code ${
			language ? `language="${language}"` : ""
		}>${code}</code></pre>`;
	}
}

export function render(mdString: string) {
	return gfmRender(mdString, {
		renderer: new CustomRenderer(),
		disableHtmlSanitization: true,
	});
}

export function frontMatter<
	S extends z.ZodType,
>(
	mdString: string,
	schema: S,
): { title: string; body: string; attrs: z.infer<S> } {
	if (test(mdString)) {
		const { body, attrs: unknownAttrs } = extractYaml(mdString);
		const title = body.match(/^# (.*)/)?.[1] ?? "Untitled";
		const attrs = schema.parse(unknownAttrs);
		return {
			title,
			body,
			attrs,
		};
	} else {
		throw new Error("No front matter found");
	}
}
