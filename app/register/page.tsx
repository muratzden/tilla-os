"use client";

import { useState } from "react";

import { AuthShell } from "@/src/components/auth/auth-shell";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          workspaceName,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Registration failed");
      }

      window.location.href = "/setup-v2";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Start your brand operating system with a dedicated workspace."
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void register();
        }}
      >
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Workspace name
          </span>
          <input
            value={workspaceName}
            onChange={(event) => setWorkspaceName(event.target.value)}
            placeholder="Tilla Workspace"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/30 focus:bg-black/40"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Email
          </span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="owner@example.com"
            type="email"
            autoComplete="email"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/30 focus:bg-black/40"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Password
          </span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 8 characters"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/30 focus:bg-black/40"
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
          className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-white/10 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating workspace..." : "Create workspace"}
        </button>

        <a
          href="/login"
          className="block pt-2 text-center text-sm text-zinc-500 transition hover:text-white"
        >
          Already have an account? Sign in
        </a>
      </form>
    </AuthShell>
  );
}
