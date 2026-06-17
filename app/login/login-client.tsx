"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/src/components/auth/auth-shell";

export default function LoginClient() {
  const router = useRouter();

  const [nextPath, setNextPath] = useState("/dashboard");
  const [email, setEmail] = useState("owner@tilla.test");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");

    if (next && next.startsWith("/")) {
      setNextPath(next);
    }
  }, []);

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await res.text();
      const json = responseText ? JSON.parse(responseText) : null;

      if (!res.ok || !json?.success) {
        throw new Error(json?.error ?? "Login failed");
      }

      router.push(nextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
  title="Sign in to TILLA-OS"
  subtitle="Access your dashboard, brand memory, governance engine, and marketplace."
>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleLogin();
        }}
      >
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Email
          </span>

          <input
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/30 focus:bg-black/40"
            value={email}
            type="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Password
          </span>

          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/30 focus:bg-black/40"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="group mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-white/10 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <a
          href="/register"
          className="block pt-2 text-center text-sm text-zinc-500 transition hover:text-white"
        >
          Create new workspace
        </a>
      </form>
    </AuthShell>
  );
}