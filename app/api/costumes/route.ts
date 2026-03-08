import { NextResponse } from "next/server";
import { MISSING_HEROES } from "@/lib/missingHeroes";

const BASE_URL = "https://marvelrivalsapi.com/api/v1";

export async function GET() {
  try {
    // Attempt direct costumes endpoint
    const directRes = await fetch(`${BASE_URL}/costumes`, {
      headers: { "x-api-key": process.env.RIVALS_API_KEY || "" },
      next: { revalidate: 3600 },
    });

    if (directRes.ok) {
      const data = await directRes.json();
      return NextResponse.json(Array.isArray(data) ? data : data.costumes ?? []);
    }

    // Fallback: extract costumes from all hero data
    const heroRes = await fetch(`${BASE_URL}/heroes`, {
      headers: { "x-api-key": process.env.RIVALS_API_KEY || "" },
      next: { revalidate: 3600 },
    });

    type RawHero = { name?: string; id?: string | number; costumes?: unknown[] };
    type Costume = Record<string, unknown>;

    let liveHeroes: RawHero[] = [];

    if (heroRes.ok) {
      const heroData = await heroRes.json();
      liveHeroes = Array.isArray(heroData) ? heroData : heroData?.heroes ?? [];
    }

    const liveCostumes: Costume[] = liveHeroes.flatMap((hero) =>
      (hero.costumes ?? []).map((c) => ({
        ...(c as Costume),
        heroName: hero.name ?? "",
        heroId:   hero.id   ?? "",
      }))
    );

    const missingCostumes: Costume[] = MISSING_HEROES.flatMap((hero) =>
      hero.costumes.map((c) => ({
        ...c,
        heroName: hero.name,
        heroId:   hero.id,
      }))
    );

    return NextResponse.json([...liveCostumes, ...missingCostumes]);
  } catch (err) {
    console.error("[costumes] error:", err);
    // Return at least the manually curated costumes
    const fallback = MISSING_HEROES.flatMap((hero) =>
      hero.costumes.map((c) => ({ ...c, heroName: hero.name, heroId: hero.id }))
    );
    return NextResponse.json(fallback);
  }
}
