export async function getArticles() {
  const files = [];
  for await (const dirEntry of Deno.readDir("./writing")) {
    files.push({
      path: "/writing/" + dirEntry.name.replace(".md", ""),
      published: "2022-01-01",
    });
  }
  return files;
}

export default async function Writing() {
  const posts = await getArticles();

  return (
    <ol>
      {posts.map((post) => (
        <li key={post.path}>
          <a href={post.path}>{post.path}</a>
        </li>
      ))}
    </ol>
  );
}
