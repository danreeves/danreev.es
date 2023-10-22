import { extract } from "https://deno.land/std@0.204.0/front_matter/any.ts";
import { is, date } from "https://deno.land/x/valibot/mod.ts";

type Post = { path: string; published: Date; title: string };

async function getArticles() {
  const files: Post[] = [];
  for await (const dirEntry of Deno.readDir("./writing")) {
    const str = await Deno.readTextFile("./writing/" + dirEntry.name);

    const fm = extract(str);

    const published = is(date(), fm.attrs.published)
      ? fm.attrs.published
      : new Date();

    const title = fm?.body?.match(/^#(.+)\r?\n/)?.[1]?.trim() || "";

    files.push({
      path: "/writing/" + dirEntry.name.replace(".md", ""),
      published,
      title,
    });
  }

  files.sort((a, b) => {
    return a.published > b.published ? -1 : 1;
  });

  return files;
}

export default async function Writing() {
  const posts = await getArticles();

  return (
    <ol className="writing-list">
      {posts.map((post) => (
        <li key={post.path}>
          <a href={post.path}>{post.title}</a>
        </li>
      ))}
    </ol>
  );
}
