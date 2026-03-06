import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Articles | ZA Esports Hub – Marvel Rivals South Africa",
  description: "Stay up to date with South African esports news, Marvel Rivals patches, and community stories.",
};

const PLACEHOLDER_ARTICLES = [
  {
    slug: "welcome-to-za-esports-hub",
    title: "Welcome to ZA Esports Hub",
    excerpt: "Why we built this platform and what it means for the SA esports community.",
    date: "2026-03-01",
  },
  {
    slug: "marvel-rivals-sa-server-petition",
    title: "The Case for South African Servers",
    excerpt: "High ping is killing competitive play. Here's what we're doing about it.",
    date: "2026-02-28",
  },
  {
    slug: "season-3-meta-breakdown",
    title: "Season 3 Meta Breakdown",
    excerpt: "Which heroes are dominating the ranked ladder and why the meta shifted.",
    date: "2026-02-25",
  },
  {
    slug: "how-to-find-your-main",
    title: "How to Find Your Main in Marvel Rivals",
    excerpt: "A beginner's guide to choosing the right hero for your playstyle.",
    date: "2026-02-20",
  },
];

export default function ArticlesPage() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          News & <span className="text-gradient">Articles</span>
        </h1>
        <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "1.05rem" }}>
          SA esports news, game analysis, and community stories.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "760px", margin: "0 auto" }}>
        {PLACEHOLDER_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="neu-card"
            style={{ padding: "28px 28px", textDecoration: "none", color: "inherit", display: "block" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <Calendar size={14} style={{ color: "var(--text-muted)" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{article.date}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: "1.25rem", marginBottom: "8px" }}>
              {article.title}
            </h3>
            <p style={{ fontSize: "0.925rem" }}>{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
