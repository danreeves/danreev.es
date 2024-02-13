import { frontMatter, render } from "../utils/md.ts";
import * as v from "$valibot";

function fileToParsedMd(file: Deno.DirEntry) {
  const fileContents = Deno.readTextFileSync(`./writing/${file.name}`);
  const fm = frontMatter(fileContents, v.object({ published: v.date() }));
  const data = { ...fm, slug: file.name.replace(/\.md$/, "") };
  return data;
}

export default async function Home() {
  const fileContents = await Deno.readTextFile("./pages/index.md");
  const dir = Array.from(Deno.readDirSync("./writing"));
  const posts = dir
    .map(fileToParsedMd)
    .toSorted((a, b) => Number(b.attrs.published) - Number(a.attrs.published));

  return (
    <>
      <title>Hello, planet!</title>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{
          __html: render(fileContents),
        }}
      />
      <h2>Notes</h2>
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
