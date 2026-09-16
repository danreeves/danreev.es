import z from "zod";
import { Halftone } from "./Halftone.tsx";

const HeroStatsSchema = z
  .object({
    timePlayed: z.string().optional(),
    gamesWon: z.number().optional(),
    gamesPlayed: z.number().optional(),
    winPercentage: z.number().optional(),
    heroPicture: z.string().optional(),
  })
  .passthrough();

const ProfileSchema = z.object({
  icon: z.string(),
  name: z.string(),
  endorsement: z.number(),
  endorsementIcon: z.string(),
  title: z.string().optional(),
  quickPlayStats: z
    .object({
      topHeroes: z.unknown(),
    })
    .optional(),
  competitiveStats: z
    .object({
      topHeroes: z.unknown(),
    })
    .optional(),
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
  const rawData = await res.json();
  const parsed = ProfileSchema.parse(rawData);

  // Normalize topHeroes: filter out string values and convert to HeroStatsSchema
  const normalizeTopHeroes = (topHeroes: unknown) => {
    if (!topHeroes || typeof topHeroes !== "object") return {};
    const result: Record<string, z.infer<typeof HeroStatsSchema>> = {};
    for (const [hero, heroData] of Object.entries(topHeroes as Record<string, unknown>)) {
      if (typeof heroData === "object" && heroData !== null) {
        result[hero] = HeroStatsSchema.parse(heroData);
      }
    }
    return result;
  };

  return {
    ...parsed,
    quickPlayStats: parsed.quickPlayStats
      ? { topHeroes: normalizeTopHeroes(parsed.quickPlayStats.topHeroes) }
      : undefined,
    competitiveStats: parsed.competitiveStats
      ? { topHeroes: normalizeTopHeroes(parsed.competitiveStats.topHeroes) }
      : undefined,
  };
}

function getTopHeroesByGamesPlayed(profile: z.infer<typeof ProfileSchema>) {
  const comp = profile.competitiveStats?.topHeroes || {};
  const heroes = Object.entries(comp)
    .map(([hero, data]) => {
      const gamesPlayed = typeof data === "object" ? (data.gamesPlayed ?? 0) : 0;
      const winPercentage = typeof data === "object" ? (data.winPercentage ?? 0) : 0;
      return {
        hero,
        gamesPlayed,
        winPercentage,
        timePlayed: typeof data === "object" ? data.timePlayed : undefined,
        heroPicture: typeof data === "object" ? data.heroPicture : data,
      };
    })
    .filter((h) => h.gamesPlayed > 0)
    .toSorted((a, b) => b.gamesPlayed - a.gamesPlayed)
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

  const topHeroes = getTopHeroesByGamesPlayed(profile);
  const compRanks = profile.ratings || [];

  return (
    <a
      href="https://overwatch.blizzard.com/en-us/career/raindish-2130"
      className="p-5 flex flex-col gap-4 bg-black rounded text-white"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-22 h-22">
            <Halftone
              width="100%"
              height="100%"
              image={proxy(profile.icon)}
              title="Player Icon"
              originalColors
              className="rounded"
            />
          </div>
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

            <div className="flex flex-wrap items-center gap-3">
              {compRanks.map((rank) => (
                <div key={rank.role} className="flex items-center gap-1 text-sm">
                  {rank.rankIcon && (
                    <img
                      src={proxy(rank.rankIcon)}
                      alt={`${rank.group} (${rank.role})`}
                      className="w-6 h-6"
                    />
                  )}
                  <span className="font-semibold">
                    {rank.group} <span className="capitalize">{rank.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-3">
          {topHeroes.map((h) => {
            // Add spaces before capital letters (except the first letter)
            const formattedHero = h.hero.replace(/([a-z])([A-Z])/g, "$1 $2");
            return (
              <li key={h.hero} className="flex overflow-hidden relative">
                {h.heroPicture && (
                  <Halftone
                    width="100%"
                    height="100%"
                    image={proxy(h.heroPicture)}
                    title={formattedHero}
                    className="rounde aspect-square rounded object-cover shrink-0"
                  />
                )}
                <div className="p-3  absolute top-0 left-0 uppercase font-body italic font-bold text-3xl leading-tight">
                  {formattedHero}
                </div>
                <div className="p-3 absolute bottom-0 right-0 uppercase text-right">
                  <div className="font-bold">{h.gamesPlayed} games played</div>
                  <span className="text-hot font-body italic text-3xl">
                    {h.winPercentage.toFixed(0)}%
                  </span>
                  <span className="font-bold"> win rate</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </a>
  );
}
