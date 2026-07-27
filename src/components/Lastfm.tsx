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
    <a href={latestTrack.link} className="w-full max-w-full relative flex flex-col ">
      <div className="aspect-square w-full rounded ">
        <Halftone
          width="100%"
          height="100%"
          image={latestTrack.image}
          title={`${latestTrack.name} by ${latestTrack.artist}`}
          className="h-full w-full object-cover rounded"
        />
      </div>
      <div className="flex flex-col w-full min-w-0 p-1">
        <div className="flex items-center gap-1 min-w-0">
          <span className="shrink-0">⏵⏸</span>
          <span className="flex min-w-0 flex-1 items-center">
            <span className="shrink-0">[</span>
            <span className="relative flex-1 border-t border-dashed border-current">
              <span className="absolute left-[40%] -top-[0.7em]">|</span>
            </span>
            <span className="shrink-0">]</span>
          </span>
        </div>

        <div className="flex min-w-0 gap-1">
          <span className="shrink-0">Track:</span>
          <span className="min-w-0 overflow-hidden">
            <Wave text={latestTrack.name} />
          </span>
        </div>

        <div className="flex min-w-0 gap-1">
          <span className="shrink-0">Album:</span>
          <span className="min-w-0 overflow-hidden">
            <Wave text={latestTrack.album} />
          </span>
        </div>
        <div className="flex min-w-0 gap-1">
          <span className="shrink-0">Artist:</span>
          <span className="min-w-0 overflow-hidden">
            <Wave text={latestTrack.artist} />
          </span>
        </div>
      </div>
    </a>
  );
}
