import { NextResponse } from "next/server";
import { MISSING_HEROES } from "@/lib/missingHeroes";

const BASE_URL = "https://marvelrivalsapi.com/api/v1";

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/heroes`, {
      headers: { "x-api-key": process.env.RIVALS_API_KEY || "" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return NextResponse.json(MISSING_HEROES);

    const apiData = await res.json();
    const rawHeroes: { name?: string; role?: unknown; id?: number | string }[] =
      Array.isArray(apiData) ? apiData : apiData?.heroes ?? [];

    // Deduplicate within the live API response itself (by lowercase name)
    const seenLive = new Set<string>();
    const liveHeroes = rawHeroes.filter((h) => {
      const key = (h.name ?? "").toLowerCase();
      if (!key || seenLive.has(key)) return false;
      seenLive.add(key);
      return true;
    });

    // Debug: log the unique role values the API is sending so we can verify
    const uniqueRoles = [...new Set(liveHeroes.map((h) => String(h.role ?? "MISSING")))];
    console.log("[heroes API] role values from upstream:", uniqueRoles);

    const liveNames = new Set(liveHeroes.map((h) => (h.name ?? "").toLowerCase()));

    const merged = [
      ...liveHeroes,
      ...MISSING_HEROES.filter((h) => !liveNames.has(h.name.toLowerCase())),
    ];

    merged.sort((a, b) => Number(a.id ?? 9999) - Number(b.id ?? 9999));

    return NextResponse.json(merged);
  } catch {
    return NextResponse.json(MISSING_HEROES);
  }
}
