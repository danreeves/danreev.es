import { Wave } from "./Wave.tsx";
import { Halftone } from "./Halftone.tsx";
import { XMLParser } from "fast-xml-parser";
import { Link } from "./Link.tsx";

const parser = new XMLParser({
  ignoreDeclaration: true,
});

async function getLatestLetterboxdFilm() {
  const res = await fetch("https://letterboxd.com/danreeves/rss/");
  const xmlText = await res.text();
  const rss = parser.parse(xmlText);

  // Get the first item (latest film)
  const items = rss.rss.channel.item;
  const item = Array.isArray(items) ? items[0] : items;

  const title = item.title;
  const link = item.link;

  // Extract image URL from description HTML
  let image = undefined;
  if (item.description) {
    const desc = item.description;
    const match = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) {
      // Replace -600-0-900- with -100-0-150- for lower res
      image = match[1]; //.replace(/-(\d+)-0-(\d+)-crop/, "-100-0-150-crop");
    }
  }

  return { title, link, image };
}

export async function Letterboxd() {
  const film = await getLatestLetterboxdFilm();
  return (
    <div className="mr-4 w-75 border-2 border-black">
      {film.image && (
        <div className="mb-2">
          <Halftone
            width={512}
            height={768}
            image={"https://api.cors.lol/?url=" + film.image.replace(/\?.+$/, "")}
            title={film.title}
          />
        </div>
      )}
      <div className="inline-block w-full overflow-hidden bg-black p-1 text-white">
        Watching{" "}
        <Link
          href={film.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
        >
          <Wave text={film.title} />
        </Link>
      </div>
    </div>
  );
}
