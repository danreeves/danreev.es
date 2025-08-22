import { Wave } from "./Wave.tsx";

async function getLatestLastFmTrack() {
	const latestListens = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=dnrvs&api_key=${
			Deno.env.get("LAST_FM_API_KEY")
		}&format=json`,
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
		<div className="lastfm">
			<div className="cd">
				<img
					src={latestTrack.image}
					alt={`${latestTrack.name} by ${latestTrack.artist}`}
				/>
				<div className="hole"></div>
			</div>
			<div className="now-playing">
				⏵⏸{"  "}
				<a href={latestTrack.link}>
					<Wave text={`${latestTrack.name} by ${latestTrack.artist}`} />
				</a>
			</div>
		</div>
	);
}
