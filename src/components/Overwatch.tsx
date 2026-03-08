import z from "zod";

const HeroStatsSchema = z.object({
  timePlayed: z.string().optional(),
  gamesWon: z.number().optional(),
  gamesPlayed: z.number().optional(),
});

const TopHeroesSchema = z.record(HeroStatsSchema);

const ProfileSchema = z.object({
  icon: z.string(),
  name: z.string(),
  endorsement: z.number(),
  endorsementIcon: z.string(),
  title: z.string().optional(),
  quickPlayStats: z.object({ topHeroes: TopHeroesSchema }).optional(),
  competitiveStats: z.object({ topHeroes: TopHeroesSchema }).optional(),
  ratings: z
    .array(
      z.object({
        group: z.string(),
        tier: z.number().optional(),
        role: z.string(),
        rankIcon: z.string().optional(),
      }),
    )
    .optional(),
});

async function fetchOverwatchProfile() {
  const res = await fetch("https://www.owapi.eu/stats/pc/raindish-2130/complete");
  if (!res.ok) throw new Error("Failed to fetch Overwatch profile");
  const data = await res.json();
  return ProfileSchema.parse(data);
}

function getTopHeroesByWinRate(profile: z.infer<typeof ProfileSchema>) {
  const comp = profile.competitiveStats?.topHeroes || {};
  const heroes = Object.entries(comp)
    .map(([hero, data]) => ({
      hero,
      winPercentage:
        data.gamesPlayed && data.gamesPlayed > 0
          ? ((data.gamesWon ?? 0) / data.gamesPlayed) * 100
          : 0,
    }))
    .filter((h) => h.winPercentage > 0)
    .toSorted((a, b) => b.winPercentage - a.winPercentage)
    .slice(0, 3);
  return heroes;
}

const proxy = (url: string) => `/api/proxy-image?url=${encodeURIComponent(url)}`;

export async function Overwatch() {
  let profile: z.infer<typeof ProfileSchema>;
  try {
    profile = await fetchOverwatchProfile();
  } catch (e: any) {
    console.log(e);
    return <div>Error: {e.message}</div>;
  }

  const topHeroes = getTopHeroesByWinRate(profile);
  const compRanks = profile.ratings || [];

  return (
    <a
      href="https://overwatch.blizzard.com/en-us/career/raindish-2130"
      className=" p-5 border-2 border-black"
    >
      <div className="flex items-center gap-4 mb-4">
        <img src={proxy(profile.icon)} alt="Player Icon" className="w-16 h-16 " />
        <div>
          <div className="text-xl font-bold flex flex-row gap-2 items-center">
            {profile.name}
            <img
              src={proxy(profile.endorsementIcon)}
              alt={`Endorsement: ${profile.endorsement}`}
              className="w-6 h-6"
            />
          </div>

          <div>{profile.title}</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">Top Heroes by Win Rate</div>
        <ul>
          {topHeroes.map((h) => {
            // Add spaces before capital letters (except the first letter)
            const formattedHero = h.hero.replace(/([a-z])([A-Z])/g, "$1 $2");
            return (
              <li key={h.hero} className="flex justify-between items-center py-1">
                <span className="capitalize font-medium">{formattedHero}</span>
                <span>
                  <span className="text-green-500 font-bold">{h.winPercentage.toFixed(1)}%</span>{" "}
                  win rate
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-2">
        {compRanks.map((rank) => (
          <div key={rank.role} className="flex items-center gap-2">
            {rank.rankIcon && (
              <img
                src={proxy(rank.rankIcon)}
                alt={`${rank.group} (${rank.role})`}
                className="w-8 h-8"
              />
            )}
            <span className="font-semibold">
              {rank.group} <span className="capitalize">{rank.role}</span>
            </span>
          </div>
        ))}
      </div>
    </a>
  );
}
