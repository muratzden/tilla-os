import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="relative flex min-h-screen w-full items-center justify-center px-6 py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.10),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(120,90,255,0.10),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_22%,rgba(255,255,255,0.03))]" />

        <section className="relative w-full max-w-[440px]">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_80px_rgba(255,255,255,0.08)]">
              <span className="text-sm font-semibold tracking-[0.28em] text-white/80">
                T
              </span>
            </div>

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.38em] text-white/35">
              TILLA-OS
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white">
              {title}
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/45">
              {subtitle}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_120px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
            {children}
          </div>

          <p className="mt-8 text-center text-xs text-white/25">
            Brand Operating System · Mission Control
          </p>
        </section>
      </div>
    </main>
  );
}