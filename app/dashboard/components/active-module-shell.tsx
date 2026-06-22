"use client";

import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type UILanguage = "tr" | "en";

type ActiveModuleShellProps = {
  title: string;
  description: string;
  uiLanguage: UILanguage;
  children: React.ReactNode;
};

export function ActiveModuleShell({
  title,
  description,
  uiLanguage,
  children,
}: ActiveModuleShellProps) {
  return (
    <section className="mt-6">
      <div className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.32em] text-zinc-600">
          {getDashboardText("currentModule", uiLanguage)}
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>

        <p className="mt-2 text-sm text-zinc-500">{description}</p>
      </div>

      {children}
    </section>
  );
}
