import "./index.css";
import { Lastfm } from "./components/Lastfm.tsx";
import { Link } from "./components/Link.tsx";
import { Suspense } from "react";
import z from "zod";
import { Letterboxd } from "./components/Letterboxd.tsx";
import { Bsky } from "./components/Bsky.tsx";
import { Hardcover } from "./components/Hardcover.tsx";
import { Overwatch } from "./components/Overwatch.tsx";
import { Loading } from "./components/Loading.tsx";

const mdFiles = Object.entries(import.meta.glob("../writing/*.md", { eager: true }));

const MdFilesSchema = z.array(
  z.tuple([
    z.string(),
    z.object({
      attributes: z.object({
        published: z.string().transform((str) => new Date(str)),
        archived: z.boolean().default(false),
      }),
      html: z.string(),
    }),
  ]),
);

export function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <title>danreev.es</title>
      </head>
      <body className="font-body m-4 text-black bg-gradient-to-t from-gray-100 to-white">
        <div className="my-underline" />
        <App />

        <footer className="w-full text-4xl font-title max-w-200 mx-auto text-center py-4">
          This could be anywhere in the world
        </footer>
      </body>
    </html>
  );
}

function pathToSlug(path: string) {
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  return filename.replace(".md", "");
}

function extractTitleFromHtml(html: string) {
  const match = html.match(/<h1.*?>(.*?)<\/h1>/);
  if (match) {
    return match[1];
  }
  return "Untitled";
}

function App() {
  const posts = MdFilesSchema.parse(mdFiles)
    .filter(([_, file]) => !file.attributes.archived)
    .toSorted(([_1, a], [_2, b]) => Number(b.attributes.published) - Number(a.attributes.published))
    .map(([path, md]) => ({
      slug: pathToSlug(path),
      title: extractTitleFromHtml(md.html),
      published: md.attributes.published,
    }));

  return (
    <div className=" flex flex-col gap-2 w-full max-w-200 ml-auto mr-auto">
      <div>
        <div className="flex flex-col gap-2">
          <title>Hello, planet!</title>
          <h1 className="font-title text-4xl sm:text-6xl wrap-break-word " title="Hello, planet">
            Hello, planet
          </h1>
          <p>
            I'm Dan Reeves, Frontend Tech Lead at{" "}
            <Link href="https://treasuredata.com">Treasure Data</Link>. I write a lot of React and
            TypeScript.
          </p>
          <p>I live in the UK but I've worked remote since 2017.</p>

          <p>
            I've been heavily involved in the{" "}
            <Link href="https://vmf-docs.verminti.de/">Vermintide</Link> and{" "}
            <Link href="https://darkti.de/modding">Darktide</Link> modding communities where I write
            a lot of{" "}
            <Link href="https://github.com/danreeves?tab=repositories&q=mods&type=source&language=lua&sort=">
              lua
            </Link>
            .
          </p>
          <p>
            Before all that, I worked on fullstack builds with php (WordPress) and python (Django),
            prototyping, ux testing, and much more for all variety of clients at{" "}
            <Link href="https://fffunction.co/">fffunction</Link>.
          </p>

          <p>
            Outside of programming, I enjoy film photography. You can see it{" "}
            <Link href="https://dnrvs.photo">here</Link>.
          </p>
          <p>
            Want to talk? <Link href="/contact">Get in touch!</Link>
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        <div className="flex-1 min-w-0 flex">
          <Suspense fallback={<Loading label="Atmosphere" minHeightClass="min-h-[26rem]" />}>
            <Bsky />
          </Suspense>
        </div>
        <div className="w-full md:w-80 md:shrink-0 flex">
          <Suspense fallback={<Loading label="" media />}>
            <Lastfm />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<Loading label="" compact />}>
        <Letterboxd />
      </Suspense>

      <Suspense fallback={<Loading label="" minHeightClass="min-h-[20rem]" />}>
        <Hardcover />
      </Suspense>

      <Suspense fallback={<Loading label="" minHeightClass="min-h-[24rem]" />}>
        <Overwatch />
      </Suspense>

      <div className="flex flex-col gap-2">
        <h2 className="font-title text-3xl sm:text-5xl wrap-break-word" title="Blog">
          Blog
        </h2>
        <ol reversed>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`}>
                {post.published.toISOString().split("T")[0]} - {post.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
