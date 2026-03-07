import { XMLParser } from "fast-xml-parser";
import { Link } from "./Link.tsx";

const parser = new XMLParser({
  ignoreDeclaration: true,
});

async function getLatestLetterboxdFilm() {
  const res = await fetch("https://letterboxd.com/danreeves/rss/");
  const xmlText = await res.text();
  const rss = parser.parse(xmlText);

  return rss.rss.channel.item.slice(0, 6).map((item) => ({
    title: item.title,
    link: item.link,
  }));
}

export async function Letterboxd() {
  const films = await getLatestLetterboxdFilm();
  return (
    <div className="inline-block w-full overflow-hidden bg-black p-1 text-white">
      <span className="hidden">Watching on Letterboxd:</span>
      <div className="relative w-200  flex-row flex ">
        <ol className="flex-row gap-8 animate-marquee flex whitespace-nowrap">
          {films.map((film) => (
            <li key={film.link}>
              <Link
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline w-auto"
              >
                {film.title}
              </Link>
            </li>
          ))}
        </ol>
        <ol
          className="absolute top-0 ml-8 flex-row gap-8 animate-marquee-alt flex whitespace-nowrap"
          aria-hidden="true"
        >
          {films.map((film) => (
            <li key={film.link}>
              <Link
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline inline"
              >
                {film.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
