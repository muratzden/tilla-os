import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

const productCapabilities = [
  "Governance Engine",
  "Decision Intelligence",
  "Brand Memory",
  "AI Content Studio",
  "Marketplace Architecture",
  "Multi-Brand Foundation",
];

const productMetrics = [
  ["10+", "Core engines"],
  ["Postgres", "Persistent auth"],
  ["Multi", "Brand ready"],
  ["AI-native", "Architecture"],
];

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-20rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-[-16rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="hidden flex-col justify-between py-8 lg:flex">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-zinc-400 shadow-2xl shadow-black/30 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              TILLA-OS
            </div>

            <div className="mt-20 max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-zinc-500">
                Brand Operating System
              </p>

              <h2 className="mt-6 text-5xl font-semibold tracking-[-0.045em] text-white">
                Turn brand strategy into an operating system.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
                TILLA-OS connects brand identity, governance, memory, decision
                intelligence, and AI-assisted content production inside one
                investor-grade workspace.
              </p>

              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
                {productCapabilities.map((capability) => (
                  <div
                    key={capability}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-zinc-300 backdrop-blur"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-xs text-emerald-300">
                      ✓
                    </span>
                    {capability}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-600">
                Built for modern brands
              </p>

              <p className="text-xs text-zinc-600">Prototype environment</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {productMetrics.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur"
                >
                  <p className="text-lg font-semibold tracking-[-0.03em] text-white">
                    {value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center lg:hidden">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                TILLA-OS
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="rounded-[1.6rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
                  {eyebrow}
                </p>

                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">
                  {title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {description}
                </p>

                <div className="mt-8">{children}</div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-zinc-600">
              TILLA-OS prototype environment · Neon PostgreSQL Auth active
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
