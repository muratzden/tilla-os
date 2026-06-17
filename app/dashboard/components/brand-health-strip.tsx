"use client";

import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type UILanguage = "tr" | "en";

type BrandHealthStripProps = {
  readinessScore: number;
  uiLanguage: UILanguage;
};

export function BrandHealthStrip({
  readinessScore,
  uiLanguage,
}: BrandHealthStripProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <StatusItem
          label={getDashboardText("readiness", uiLanguage)}
          value={`${readinessScore}%`}
        />

        <StatusDivider />

        <StatusItem
          label={getDashboardText("governance", uiLanguage)}
          value={
            readinessScore >= 80
              ? getDashboardText("healthy", uiLanguage)
              : readinessScore >= 60
                ? getDashboardText("stable", uiLanguage)
                : getDashboardText("attention", uiLanguage)
          }
        />

        <StatusDivider />

        <StatusItem
          label={getDashboardText("memory", uiLanguage)}
          value={getDashboardText("active", uiLanguage)}
        />

        <StatusDivider />

        <StatusItem
          label={getDashboardText("alignment", uiLanguage)}
          value={
            readinessScore >= 80
              ? getDashboardText("aligned", uiLanguage)
              : getDashboardText("needsReview", uiLanguage)
          }
        />
      </div>
    </section>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-zinc-200">{value}</p>
    </div>
  );
}

function StatusDivider() {
  return <div className="hidden h-8 w-px bg-white/10 md:block" />;
}