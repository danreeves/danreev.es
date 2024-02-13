import { render } from "../utils/md.ts";

export default async function Home() {
  const fileContents = await Deno.readTextFile("./pages/contact.md");

  return (
    <>
      <title>Get in touch</title>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{
          __html: render(fileContents),
        }}
      />
    </>
  );
}
