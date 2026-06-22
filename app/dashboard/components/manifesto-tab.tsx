"use client";

import type { BrandOperatingState } from "@/src/core/brand-os/types";

type KernelState = BrandOperatingState["kernel"];

export function ManifestoTab({ kernel }: { kernel: KernelState | null }) {
  const manifesto = kernel?.manifesto ?? null;
  const constitution = kernel?.constitution ?? null;
  const policies = kernel?.policies ?? [];
  const graph = kernel?.graph ?? null;

  if (!kernel || !manifesto) {
    return (
      <section className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div>
          <h2 className="text-sm uppercase tracking-widest text-zinc-400">
            Kernel Manifesto
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
            No kernel manifesto has been generated yet. Complete the brand
            setup first so TILLA-OS can generate the governing manifesto,
            constitution and decision policies from the core kernel.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div>
        <h2 className="text-sm uppercase tracking-widest text-zinc-400">
          Kernel Manifesto
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
          This screen reads directly from the Brand Kernel. Manifesto,
          constitution and policies are no longer generated from the legacy
          dashboard interview flow.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="text-xs uppercase tracking-widest text-zinc-500">
          Manifesto
        </div>

        <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-200">
          {JSON.stringify(manifesto, null, 2)}
        </pre>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="text-xs uppercase tracking-widest text-zinc-500">
          Constitution
        </div>

        <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-200">
          {JSON.stringify(constitution, null, 2)}
        </pre>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="text-xs uppercase tracking-widest text-zinc-500">
          Decision Policies
        </div>

        {policies.length > 0 ? (
          <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-200">
            {JSON.stringify(policies, null, 2)}
          </pre>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">
            No kernel policies generated yet.
          </p>
        )}
      </div>

      {graph && (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            Kernel Graph
          </div>

          <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-200">
            {JSON.stringify(graph, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}