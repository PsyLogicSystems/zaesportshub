import { NextResponse, type NextRequest } from "next/server";

const BASE_URL = "https://marvelrivalsapi.com/api/v2";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const region   = searchParams.get("region")   ?? "";
    const platform = searchParams.get("platform") ?? "";
    const page     = searchParams.get("page")     ?? "1";

    const params = new URLSearchParams({ page });
    if (region)   params.set("region",   region);
    if (platform) params.set("platform", platform);

    const res = await fetch(`${BASE_URL}/leaderboard/player?${params.toString()}`, {
      headers: { "x-api-key": process.env.RIVALS_API_KEY || "" },
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch leaderboard", players: [] },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[leaderboard] error:", err);
    return NextResponse.json(
      { error: "Internal server error", players: [] },
      { status: 500 }
    );
  }
}
