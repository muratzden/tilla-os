"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");

  async function register() {
    setError("");

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
      setError(result.error ?? "Registration failed");
      return;
    }

    window.location.href = "/setup";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <section className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
          TILLA-OS
        </p>

        <h1 className="mb-2 text-2xl font-semibold text-white">
          Create workspace
        </h1>

        <p className="mb-8 text-sm text-zinc-400">
          Create your owner account and first brand workspace.
        </p>

        <div className="space-y-4">
          <input
            value={workspaceName}
            onChange={(event) => setWorkspaceName(event.target.value)}
            placeholder="Workspace name"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-400"
          />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            type="email"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-400"
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-400"
          />

          {error ? (
            <p className="rounded-xl border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={register}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
          >
            Create Workspace
          </button>

          <a
            href="/login"
            className="block text-center text-sm text-zinc-500 hover:text-zinc-300"
          >
            Already have an account? Login
          </a>
        </div>
      </section>
    </main>
  );
}