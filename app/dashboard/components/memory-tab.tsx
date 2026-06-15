import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type MemoryTabProps = {
  pipeline: any;
  language?: OutputLanguage;
};

export function MemoryTab({ pipeline, language = "tr" }: MemoryTabProps) {
  const uiLanguage = language === "en" ? "en" : "tr";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, uiLanguage);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MemoryCard
          title={text("brandMemory")}
          mainLabel={text("totalDecisions")}
          mainValue={pipeline?.memory?.decisionMemory?.totalDecisions ?? 0}
          subLabel={text("averageConfidence")}
          subValue={pipeline?.memory?.decisionMemory?.averageConfidence ?? "-"}
        />

        <MemoryCard
          title={text("brandConsistency")}
          mainLabel={text("consistencyScore")}
          mainValue={pipeline?.consistency?.consistencyScore ?? "-"}
          subLabel={text("trend")}
          subValue={pipeline?.consistency?.trendDirection ?? "-"}
        />

        <DistributionCard
          title={text("archetypeMemory")}
          items={pipeline?.memory?.archetypeMemory}
          language={language}
        />

        <DistributionCard
          title={text("worldMemory")}
          items={pipeline?.memory?.worldMemory}
          language={language}
        />
      </section>
    </div>
  );
}

function MemoryCard({
  title,
  mainLabel,
  mainValue,
  subLabel,
  subValue,
}: {
  title: string;
  mainLabel: string;
  mainValue: any;
  subLabel: string;
  subValue: any;
}) {
  return (
    <div className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
      <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
        {title}
      </div>

      <div className="mt-6 text-xs uppercase tracking-widest text-zinc-400">
        {mainLabel}
      </div>

      <div className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-zinc-900">
        {mainValue}
      </div>

      <div className="mt-6 border-t border-[#e7e2d8] pt-5">
        <div className="text-xs uppercase tracking-widest text-zinc-400">
          {subLabel}
        </div>

        <div className="mt-2 text-lg font-medium text-zinc-900">{subValue}</div>
      </div>
    </div>
  );
}

function DistributionCard({
  title,
  items,
  language = "tr",
}: {
  title: string;
  items?: any[];
  language?: OutputLanguage;
}) {
  const uiLanguage = language === "en" ? "en" : "tr";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, uiLanguage);

  return (
    <div className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
      <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
        {title}
      </div>

      <div className="mt-5 space-y-3">
        {items?.length ? (
          items.map((item: any) => (
            <div
              key={item.key}
              className="rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-zinc-900">{item.key}</span>

                <span className="text-sm text-zinc-500">
                  {item.percentage}%
                </span>
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                {text("count")}: {item.count}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500">{text("noMemoryYet")}</p>
        )}
      </div>
    </div>
  );
}
