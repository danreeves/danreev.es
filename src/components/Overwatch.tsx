import { z } from "zod/v4";

const OverwatchRatingSchema = z.object({
	role: z.string(),
	level: z.number(),
	roleIcon: z.string(),
	rankIcon: z.string(),
});

const OverwatchProfileSchema = z.object({
	name: z.string(),
	icon: z.string(),
	ratings: z.array(OverwatchRatingSchema).nullable().transform((value) => value ?? []),
});

async function getOverwatchProfile() {
	const battletag = Deno.env.get("OVERWATCH_BATTLETAG");
	if (!battletag) {
		return null;
	}

	try {
		const res = await fetch(
			`https://ow-api.com/v1/stats/pc/eu/${encodeURIComponent(battletag)}/complete`,
		);

		if (!res.ok) {
			return null;
		}

		const data = await res.json();
		return OverwatchProfileSchema.parse(data);
	} catch {
		return null;
	}
}

export async function Overwatch() {
	const profile = await getOverwatchProfile();

	if (!profile) {
		return null;
	}

	return (
		<div className="overwatch">
			<div className="overwatch-header">
				<img src={profile.icon} alt="" className="overwatch-icon" />
				<span>{profile.name}</span>
			</div>
			{profile.ratings.length === 0 ? (
				<p>No competitive ratings available.</p>
			) : (
				<ul className="overwatch-ratings">
					{profile.ratings.map((rating) => (
						<li key={rating.role} className="overwatch-rating">
							<img src={rating.rankIcon} alt={rating.role} />
							<span>
								{rating.role}: {rating.level}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
