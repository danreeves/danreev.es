import { render as gfmRender, Renderer } from "$gfm";
import { slugify } from "$slugify";

import { extract } from "https://deno.land/std@0.215.0/front_matter/any.ts";
import { test } from "https://deno.land/std@0.215.0/front_matter/test.ts";
import * as valibot from "$valibot";
import { glow } from "https://esm.sh/nue-glow@0.1.1";

class CustomRenderer extends Renderer {
  heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6): string {
    return `<h${level} id="${slugify(text)}">${text}</h${level}>`;
  }
  code(code: string, language?: string) {
    const html = glow(code, { language, numbered: true });
    return `<pre glow>${html}</pre>`;
  }
}

export function render(mdString: string) {
  return gfmRender(mdString, {
    renderer: new CustomRenderer(),
    disableHtmlSanitization: true,
  });
}

export function frontMatter<
  S extends valibot.BaseSchema,
  T = valibot.Output<S>
>(mdString: string, schema: S): { title: string; body: string; attrs: T } {
  if (test(mdString)) {
    const { body, attrs: unknownAttrs } = extract(mdString);
    const title = body.match(/^# (.*)/)?.[1] ?? "Untitled";
    const attrs = valibot.parse(schema, unknownAttrs);
    return {
      title,
      body,
      attrs,
    };
  } else {
    throw new Error("No front matter found");
  }
}
