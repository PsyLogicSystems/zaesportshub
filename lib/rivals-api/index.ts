/**
 * Marvel Rivals API Wrapper
 *
 * All API calls go through these functions — never call the API
 * directly from components. The API key is kept server-side only.
 */

const BASE_URL = "https://api.marvelrivals.com";
const API_KEY = process.env.RIVALS_API_KEY;

interface FetchOptions {
  endpoint: string;
  params?: Record<string, string>;
  /** Cache duration in seconds (default: 300 = 5 min) */
  cacheDuration?: number;
}

/**
 * Internal fetch helper. Adds auth headers and caching.
 */
async function apiFetch<T>({ endpoint, params, cacheDuration = 300 }: FetchOptions): Promise<T | null> {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val));
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: cacheDuration },
    });

    if (!res.ok) {
      console.error(`Rivals API error: ${res.status} ${res.statusText} — ${endpoint}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Rivals API fetch failed: ${endpoint}`, error);
    return null;
  }
}

// ─── PUBLIC API FUNCTIONS ──────────────────────────────

/** Fetch a player's overall stats by username */
export async function getPlayerStats(username: string) {
  return apiFetch({
    endpoint: `/player/${encodeURIComponent(username)}/stats`,
  });
}

/** Fetch a player's rank history across seasons */
export async function getPlayerRankHistory(username: string) {
  return apiFetch({
    endpoint: `/player/${encodeURIComponent(username)}/rank-history`,
  });
}

/** Fetch a player's stats for a specific hero */
export async function getHeroStats(username: string, hero: string) {
  return apiFetch({
    endpoint: `/player/${encodeURIComponent(username)}/hero/${encodeURIComponent(hero)}`,
  });
}

/** Fetch the global leaderboard, optionally filtered by season */
export async function getLeaderboard(season?: string) {
  return apiFetch({
    endpoint: "/leaderboard",
    params: season ? { season } : undefined,
    cacheDuration: 600, // 10 min cache for leaderboard
  });
}

/** Fetch list of all heroes with basic info */
export async function getHeroes() {
  return apiFetch({
    endpoint: "/heroes",
    cacheDuration: 3600, // 1 hour — hero list rarely changes
  });
}

/** Fetch detailed info for a single hero */
export async function getHeroDetail(heroId: string) {
  return apiFetch({
    endpoint: `/heroes/${encodeURIComponent(heroId)}`,
    cacheDuration: 3600,
  });
}
