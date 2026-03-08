import { NextResponse } from "next/server";

const BASE_URL = "https://marvelrivalsapi.com/api/v1";

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/maps`, {
      headers: { "x-api-key": process.env.RIVALS_API_KEY || "" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch maps", maps: [] }, { status: res.status });
    }

    const data = await res.json();
    const maps = Array.isArray(data) ? data : data.maps ?? data.data ?? [];
    return NextResponse.json(maps);
  } catch (err) {
    console.error("[maps] error:", err);
    return NextResponse.json({ error: "Internal server error", maps: [] }, { status: 500 });
  }
}
