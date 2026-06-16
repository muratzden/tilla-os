"use client";

type BrandHealthStripProps = {
  readinessScore: number;
};

export function BrandHealthStrip({ readinessScore }: BrandHealthStripProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <StatusItem label="Readiness" value={`${readinessScore}%`} />

        <StatusDivider />

        <StatusItem
          label="Governance"
          value={
            readinessScore >= 80
              ? "Healthy"
              : readinessScore >= 60
                ? "Stable"
                : "Attention"
          }
        />

        <StatusDivider />

        <StatusItem label="Memory" value="Online" />

        <StatusDivider />

        <StatusItem
          label="Alignment"
          value={readinessScore >= 80 ? "Aligned" : "Review"}
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
