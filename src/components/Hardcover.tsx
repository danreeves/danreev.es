import { env } from "cloudflare:workers";
import { Halftone } from "./Halftone.tsx";

const proxy = (url: string) => `/api/proxy-image?url=${encodeURIComponent(url)}`;

async function getCurrentlyReading() {
  const query = `
    query CurrentlyReading {
      me {
        user_books(
          where: { status_id: { _eq: 2 } }
          order_by: { updated_at: desc }
          limit: 6
        ) {
          id
          book {
            title
            slug
            image {
              url
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.hardcover.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: env.HARDCOVER_API_KEY,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  return data.data?.me?.[0]?.user_books || [];
}

export async function Hardcover() {
  const books = await getCurrentlyReading();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-title text-3xl sm:text-5xl wrap-break-word title-fit" title="Reading">
        Reading
      </h2>
      {books.length === 0 ? (
        <p className="text-sm opacity-70">Nothing currently reading</p>
      ) : (
        <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {books.map((entry: any) => {
            const book = entry.book;
            return (
              <li key={entry.id}>
                <a
                  href={`https://hardcover.app/books/${book.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-2/3"
                >
                  {book.image?.url ? (
                    <Halftone
                      width="100%"
                      height="100%"
                      image={proxy(book.image.url)}
                      title={book.title}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <div className="h-full w-full bg-black/5" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
