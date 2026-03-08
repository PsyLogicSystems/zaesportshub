import { NextResponse } from "next/server";

const BASE_URL = "https://marvelrivalsapi.com/api/v1";

export async function GET() {
  try {
    // Try /patches first, then /patch-notes as fallback
    for (const endpoint of ["/patches", "/patch-notes"]) {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { "x-api-key": process.env.RIVALS_API_KEY || "" },
        next: { revalidate: 1800 },
      });

      if (res.ok) {
        const data = await res.json();
        const patches = Array.isArray(data) ? data : data.patches ?? data.data ?? [];
        return NextResponse.json(patches);
      }
    }

    return NextResponse.json([]);
  } catch (err) {
    console.error("[patches] error:", err);
    return NextResponse.json([]);
  }
}
