import { NextResponse } from "next/server";

const BASE_URL = "https://marvelrivalsapi.com/api/v1";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  try {
    const res = await fetch(`${BASE_URL}/heroes/${name}`, {
      headers: { "x-api-key": process.env.RIVALS_API_KEY || "" },
      next: { revalidate: 3600 },
    });
    if (!res.ok)
      return NextResponse.json({ error: "Hero not found" }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
