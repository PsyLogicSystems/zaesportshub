"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  /** Sign in with Discord OAuth */
  async function handleDiscordLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/profile/setup`,
      },
    });
    if (error) {
      setMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  /** Sign in with email magic link */
  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/profile/setup`,
      },
    });
    setLoading(false);
    if (error) {
      setMessage("Could not send login link. Please try again.");
    } else {
      setMessage("Check your email for a login link!");
    }
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 1.5rem",
      }}
    >
      <div
        className="neu-card"
        style={{
          padding: "48px 36px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "2rem",
            marginBottom: "8px",
          }}
        >
          Welcome <span className="text-gradient">Back</span>
        </h1>
        <p style={{ marginBottom: "32px", fontSize: "0.95rem" }}>
          Sign in to your ZA Esports Hub account
        </p>

        {/* Discord button */}
        <button
          onClick={handleDiscordLogin}
          disabled={loading}
          className="btn-primary touch-target"
          style={{
            width: "100%",
            marginBottom: "16px",
            background: "#5865F2",
            gap: "10px",
          }}
        >
          <MessageCircle size={18} />
          Continue with Discord
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>or use email</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <Mail
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neu-inset"
              style={{ paddingLeft: "40px" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-secondary touch-target"
            style={{ width: "100%" }}
          >
            Send Magic Link
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Status message */}
        {message && (
          <p
            style={{
              marginTop: "16px",
              fontSize: "0.875rem",
              color: message.includes("Check") ? "var(--accent-teal)" : "var(--accent-rose)",
            }}
          >
            {message}
          </p>
        )}

        {/* Sign up link */}
        <p style={{ marginTop: "24px", fontSize: "0.875rem" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            style={{ color: "var(--accent-teal)", textDecoration: "none" }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
