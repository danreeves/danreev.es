import { Wave } from "./Wave.tsx";
import { env } from "cloudflare:workers";
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
    image: latestTrack.image.at(2)["#text"],
    link: latestTrack.url,
  };
}

export async function Lastfm() {
  const latestTrack = await getLatestLastFmTrack();
  return (
    <a href={latestTrack.link} className="border-2 border-black  w-content max-w-full relative">
      <span className="absolute m-5 z-1 text-5xl font-title [-webkit-text-stroke:2px_white] text-transparent">
        LastFM
      </span>
      <div>
        <Halftone
          width={512}
          height={512}
          image={latestTrack.image}
          title={`${latestTrack.name} by ${latestTrack.artist}`}
        />
      </div>
      <div className="flex flex-col">
        <div>⏵⏸ [--------------------|-------------------------]</div>

        <div>
          Track: <Wave text={latestTrack.name} />
        </div>

        <div>
          Album: <Wave text={latestTrack.album} />
        </div>
        <div>
          Artist: <Wave text={latestTrack.artist} />
        </div>
      </div>
    </a>
  );
}
