import type { Metadata } from "next";
import { Search, Shield } from "lucide-react";
import { HeroGrid } from "@/components/player/HeroGrid";

export const metadata: Metadata = {
  title: "Heroes | ZA Esports Hub – Marvel Rivals South Africa",
  description: "Browse all Marvel Rivals heroes. View stats, roles, and find the best heroes for your playstyle.",
};

export default function HeroesPage() {
  return (
    <div className="section-container" style={{ padding: "40px 1.5rem 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "12px" }}>
          Marvel Rivals <span className="text-gradient">Heroes</span>
        </h1>
        <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "1.05rem" }}>
          Browse all heroes, view stats, and find your next main.
        </p>
      </div>

      <HeroGrid />
    </div>
  );
}
