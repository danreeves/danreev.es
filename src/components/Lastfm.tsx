import { Wave } from "./Wave.tsx";

async function getLatestLastFmTrack() {
	const latestListens = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dnrvs&api_key=${Deno.env.get(
			"LAST_FM_API_KEY",
		)}&format=json`,
	);
	const latestListensData = await latestListens.json();
	const latestTrack = latestListensData.recenttracks.track[0];
	return {
		artist: latestTrack.artist["#text"],
		name: latestTrack.name,
		album: latestTrack.album["#text"],
		image: latestTrack.image[1]["#text"] || latestTrack.image[0]["#text"],
		link: latestTrack.url,
	};
}

export async function Lastfm() {
	const latestTrack = await getLatestLastFmTrack();
	return (
		<div className="mr-4 w-75 border-2 border-black">
			<div className="animate-rotate relative m-1 aspect-square w-[calc(100%-10px)] overflow-hidden rounded-full border border-black/50 contrast-150 grayscale">
				<img
					src={latestTrack.image}
					alt={`${latestTrack.name} by ${latestTrack.artist}`}
					className="h-full w-full [image-rendering:pixelated]"
				/>
				<div className="absolute top-1/2 left-1/2 h-[20%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/50 bg-white"></div>
			</div>
			<div className="inline-block w-full overflow-hidden bg-black p-1 text-white">
				⏵⏸{"  "}
				<a href={latestTrack.link} className="text-white underline">
					<Wave text={`${latestTrack.name} by ${latestTrack.artist}`} />
				</a>
			</div>
		</div>
	);
}
