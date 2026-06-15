"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("owner@tilla.test");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Login failed");
      }

      router.push(nextPath);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-100">
      <section className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900/80 p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          TILLA-OS
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          Sign in
        </h1>

        <p className="mt-3 text-sm text-neutral-400">
          Access your workspace, dashboard, and marketplace packs.
        </p>

        <div className="mt-8 space-y-4">
          <input
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input
            type="password"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {error && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <a
            href="/register"
            className="block text-center text-sm text-neutral-500 hover:text-neutral-300"
          >
            Create new workspace
          </a>
        </div>
      </section>
    </main>
  );
}