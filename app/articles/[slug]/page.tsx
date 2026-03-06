import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px", maxWidth: "760px" }}>
      <Link
        href="/articles"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--text-secondary)",
          textDecoration: "none",
          fontSize: "0.9rem",
          marginBottom: "32px",
        }}
      >
        <ArrowLeft size={16} /> Back to Articles
      </Link>

      <article>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "16px" }}>
          {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "0.9rem" }}>
          Published on ZA Esports Hub
        </p>
        <div
          className="neu-card"
          style={{ padding: "40px 32px", lineHeight: "1.9", fontSize: "1rem" }}
        >
          <p style={{ marginBottom: "16px" }}>
            This article is coming soon. Content will be loaded from the Supabase articles table
            once articles are published through the platform.
          </p>
          <p>
            Check back soon for the latest SA esports news, game analysis, and community stories.
          </p>
        </div>
      </article>
    </div>
  );
}
