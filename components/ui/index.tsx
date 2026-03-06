"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

/* ─── NEUMORPHIC CARD ─── */
export function Card({
  children,
  className,
  hover = true,
  ...props
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("neu-card", hover ? "" : "no-hover", className)} {...props}>
      {children}
    </div>
  );
}

/* ─── SECTION HEADING ─── */
export function SectionHeading({
  title,
  subtitle,
  gradient,
}: {
  title: string;
  subtitle?: string;
  gradient?: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: "48px" }}>
      <h2 style={{ fontFamily: "var(--font-heading), sans-serif" }}>
        {gradient ? (
          <>
            {title.split(gradient)[0]}
            <span className="text-gradient">{gradient}</span>
            {title.split(gradient)[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p style={{ marginTop: "12px", fontSize: "1.05rem", maxWidth: "600px", margin: "12px auto 0" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── BADGE ─── */
export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "teal" | "rose" | "lavender";
}) {
  const colors = {
    default: { bg: "var(--bg-elevated)", color: "var(--text-secondary)" },
    teal: { bg: "rgba(125,211,252,0.12)", color: "var(--accent-teal)" },
    rose: { bg: "rgba(249,168,212,0.12)", color: "var(--accent-rose)" },
    lavender: { bg: "rgba(192,132,252,0.12)", color: "var(--accent-lavender)" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        background: colors[variant].bg,
        color: colors[variant].color,
      }}
    >
      {children}
    </span>
  );
}

/* ─── SKELETON LOADER ─── */
export function Skeleton({
  width,
  height,
  borderRadius = "12px",
}: {
  width?: string;
  height?: string;
  borderRadius?: string;
}) {
  return (
    <div
      className="skeleton"
      style={{ width: width || "100%", height: height || "20px", borderRadius }}
    />
  );
}

/* ─── EMPTY STATE ─── */
export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      {Icon && <Icon size={48} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />}
      <h3 style={{ fontFamily: "var(--font-heading), sans-serif", marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto" }}>{description}</p>
    </div>
  );
}
