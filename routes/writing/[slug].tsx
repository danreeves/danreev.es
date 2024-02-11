import { PageProps } from "$fresh/server.ts";
import * as v from "$valibot";
import { frontMatter, render } from "../../utils/md.ts";

export default function Post(props: PageProps) {
  const file = Deno.readTextFileSync(`./writing/${props.params.slug}.md`);
  const { title, body, attrs } = frontMatter(
    file,
    v.object({ published: v.date() }),
  );
  return (
    <>
      <title>{title}</title>
      <time datetime={attrs.published.toISOString()}>
        {attrs.published.toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div
        class="article"
        dangerouslySetInnerHTML={{ __html: render(body) }}
      />
    </>
  );
}
