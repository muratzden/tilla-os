import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type UILanguage = "tr" | "en";

type MissionControlProps = {
  readinessScore: number;
  uiLanguage: UILanguage;
};

export function MissionControl({
  readinessScore,
  uiLanguage,
}: MissionControlProps) {
  const cards = [
    {
      id: "alignment",
      title: getDashboardText("alignmentCard", uiLanguage),
      value: "89",
      status: getDashboardText("aligned", uiLanguage),
    },
    {
      id: "governance",
      title: getDashboardText("governanceCard", uiLanguage),
      value: getDashboardText("protected", uiLanguage),
      status: getDashboardText("activeStatus", uiLanguage),
    },
    {
      id: "memory",
      title: getDashboardText("memoryCard", uiLanguage),
      value: getDashboardText("strong", uiLanguage),
      status: getDashboardText("loaded", uiLanguage),
    },
  ];

  return (
    <section className="mb-5 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-5">
      <div className="grid gap-4 md:grid-cols-[1.3fr_repeat(4,1fr)] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-600">
            {getDashboardText("missionControl", uiLanguage)}
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white md:text-2xl">
            {getDashboardText("systemScoreboard", uiLanguage)}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            {getDashboardText("liveBrandOperatingStatus", uiLanguage)}
          </p>
        </div>

        <ScoreCard
          label={getDashboardText("brandHealthCard", uiLanguage)}
          value={String(readinessScore)}
          detail={getDashboardText("foundationScore", uiLanguage)}
          primary
        />

        {cards.map((card) => (
          <ScoreCard
            key={card.id}
            label={card.title}
            value={card.value}
            detail={card.status}
          />
        ))}
      </div>
    </section>
  );
}

function ScoreCard({
  label,
  value,
  detail,
  primary = false,
}: {
  label: string;
  value: string;
  detail: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        primary
          ? "border-white/20 bg-white/[0.07]"
          : "border-white/10 bg-black/20"
      }`}
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-600">
        {label}
      </p>

      <p
        className={`mt-3 font-semibold tracking-[-0.05em] text-white ${
          primary ? "text-4xl" : "text-2xl"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-zinc-500">{detail}</p>
    </div>
  );
}