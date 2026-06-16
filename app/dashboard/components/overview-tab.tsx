import {
  getDashboardText,
  type DashboardTextKey,
} from "@/src/lib/i18n/dashboard-text";

type UILanguage = "tr" | "en";

function createText(uiLanguage: UILanguage) {
  return (key: DashboardTextKey) => getDashboardText(key, uiLanguage);
}

function getBrandHealthStatusKey(score: number): DashboardTextKey {
  if (score >= 85) return "brandHealthStatusHealthy";
  if (score >= 65) return "brandHealthStatusWarning";
  return "brandHealthStatusCritical";
}

function getDriftRiskKey(driftLevel: string | undefined): DashboardTextKey {
  if (driftLevel === "critical" || driftLevel === "high") {
    return "statusHigh";
  }

  if (driftLevel === "medium") {
    return "statusMedium";
  }

  return "statusLow";
}

function getPublishReadinessKey(
  blocked: boolean | undefined,
): DashboardTextKey {
  return blocked ? "statusBlocked" : "statusReady";
}

function getStatusLabelKey(value: string | undefined): DashboardTextKey | null {
  if (!value) return null;

  const normalized = value.toLowerCase();

  const keys: Record<string, DashboardTextKey> = {
    healthy: "brandHealthStatusHealthy",
    warning: "brandHealthStatusWarning",
    critical: "brandHealthStatusCritical",
    low: "statusLow",
    medium: "statusMedium",
    high: "statusHigh",
    ready: "statusReady",
    blocked: "statusBlocked",
    active: "statusActive",
    locked: "statusLocked",
    learning: "statusLearning",
    waiting: "statusWaiting",
    improving: "statusImproving",
    stable: "statusStable",
    declining: "statusDeclining",
  };

  return keys[normalized] ?? null;
}

function getStatusLabel(
  value: string | undefined,
  text: (key: DashboardTextKey) => string,
) {
  const key = getStatusLabelKey(value);

  return key ? text(key) : (value ?? "-");
}

type OverviewTabProps = {
  pipeline: any;
  uiLanguage?: UILanguage;
};

export function OverviewTab({ pipeline, uiLanguage = "tr" }: OverviewTabProps) {
  const text = createText(uiLanguage);

  const brandHealthScore = pipeline?.consistency?.consistencyScore ?? 0;

  const brandHealthStatus = text(getBrandHealthStatusKey(brandHealthScore));

  const driftRisk = text(getDriftRiskKey(pipeline?.audit?.driftLevel));

  const publishReadiness = text(
    getPublishReadinessKey(pipeline?.audit?.blocked),
  );

  return (
    <>
      <section className="mb-8 overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_32%)]" />

          <div className="relative px-6 py-7 md:px-8 md:py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.45em] text-emerald-400">
                  {text("brandHealth")}
                </div>

                <div className="mt-5 flex items-end gap-4">
                  <h2 className="text-6xl font-semibold tracking-[-0.08em] text-white sm:text-7xl md:text-8xl">
                    {brandHealthScore}
                  </h2>

                  <span className="mb-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                    {brandHealthStatus}
                  </span>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                  {uiLanguage === "en"
                    ? "Your brand is operating within governance boundaries. No critical risks are currently detected."
                    : "Markanız yönetişim sınırları içinde çalışıyor. Şu anda kritik bir risk tespit edilmedi."}
                </p>
              </div>

              <div className="grid min-w-[260px] grid-cols-1 gap-3">
                <StatusCard
                  label={text("governance")}
                  value={getStatusLabel(
                    pipeline?.audit?.governanceHealth ?? "healthy",
                    text,
                  )}
                />

                <StatusCard label={text("driftRisk")} value={driftRisk} />

                <StatusCard label={text("publish")} value={publishReadiness} />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Metric
                label={text("alignment")}
                value={
                  pipeline?.audit?.alignmentScore ??
                  pipeline?.consistency?.consistencyScore
                }
              />

              <Metric
                label={text("governance")}
                value={getStatusLabel(
                  pipeline?.audit?.governanceHealth ?? "healthy",
                  text,
                )}
              />

              <Metric
                label={text("memory")}
                value={pipeline?.audit?.memoryAlignment ?? "-"}
              />

              <Metric
                label={text("consistency")}
                value={pipeline?.consistency?.consistencyScore}
                subValue={getStatusLabel(
                  pipeline?.consistency?.consistencyLevel,
                  text,
                )}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">
                  {text("recommendedAction")}
                </div>

                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {pipeline?.advisorV2?.actions?.[0]?.action ??
                    pipeline?.brandAdvice?.nextAction ??
                    "-"}
                </p>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-zinc-400">
                {getStatusLabel(
                  pipeline?.consistency?.trendDirection ?? "waiting",
                  text,
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 text-white shadow-xl md:p-8">
          <div className="text-xs uppercase tracking-[0.35em] text-emerald-400">
            {text("brandBrain")}
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
            {text("systemStatus")}
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
            <HealthRow
              label="Manifesto"
              value={getStatusLabel("locked", text)}
            />

            <HealthRow
              label="Constitution"
              value={getStatusLabel("active", text)}
            />

            <HealthRow
              label={text("memory")}
              value={getStatusLabel("learning", text)}
            />

            <HealthRow
              label={text("governance")}
              value={getStatusLabel(
                pipeline?.audit?.governanceHealth ?? "healthy",
                text,
              )}
            />

            <HealthRow label="Audit" value={getStatusLabel("ready", text)} />
          </div>
        </div>
      </section>
    </>
  );
}

function Metric({
  label,
  value,
  subValue,
}: {
  label: string;
  value: any;
  subValue?: any;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs uppercase tracking-widest text-zinc-500">
        {label}
      </div>

      <div className="mt-3 text-xl font-semibold text-white">
        {value ?? "-"}
      </div>

      {subValue && (
        <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
          {subValue}
        </div>
      )}
    </div>
  );
}

function StatusCard({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </div>

      <div className="mt-2 text-lg font-medium text-white">{value ?? "-"}</div>
    </div>
  );
}

function HealthRow({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-zinc-400">
        {label}
      </div>

      <div className="mt-2 text-sm font-medium text-white">{value ?? "-"}</div>
    </div>
  );
}
