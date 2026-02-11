import { Wave } from "./Wave.tsx";
import { env } from "cloudflare:workers";
import { Link } from "./Link.tsx";
import { Halftone } from "./Halftone.tsx";

async function getLatestLastFmTrack() {
  const latestListens = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dnrvs&api_key=${env.LAST_FM_API_KEY}&format=json`,
  );
  const latestListensData = await latestListens.json();
  const latestTrack = latestListensData.recenttracks.track[0];
  return {
    artist: latestTrack.artist["#text"],
    name: latestTrack.name,
    album: latestTrack.album["#text"],
    image: latestTrack.image.at(-1)["#text"],
    link: latestTrack.url,
  };
}

export async function Lastfm() {
  const latestTrack = await getLatestLastFmTrack();
  return (
    <div className="border-2 border-black  w-content max-w-1/4">
      <div>
        <Halftone
          // className="w-full"
          width={512}
          height={512}
          image={latestTrack.image}
          title={`${latestTrack.name} by ${latestTrack.artist}`}
        />
        <div></div>
      </div>
      <div className="flex flex-row">
        ⏵⏸{" "}
        <Link href={latestTrack.link} target="_blank" rel="noopener noreferrer">
          <Wave text={`${latestTrack.name} by ${latestTrack.artist}`} />
        </Link>
      </div>
    </div>
  );
}
