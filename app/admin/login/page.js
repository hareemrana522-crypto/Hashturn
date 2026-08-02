"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const json = await res.json();
        setError(json.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F3F4F6",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#111827", marginBottom: "0.5rem" }}>
            HashTurn Admin
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
            Sign in to manage your website
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "0.75rem",
              background: "#FEF2F2",
              color: "#DC2626",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              marginBottom: "1.25rem",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151" }}>Username</label>
            <input
              type="text"
              name="username"
              required
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: "8px",
                border: "1.5px solid #D1D5DB",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151" }}>Password</label>
            <input
              type="password"
              name="password"
              required
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: "8px",
                border: "1.5px solid #D1D5DB",
                fontSize: "0.95rem",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              background: "#111827",
              color: "#fff",
              border: "none",
              padding: "0.75rem",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
