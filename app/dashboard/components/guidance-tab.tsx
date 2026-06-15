import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type GuidanceTabProps = {
  pipeline: any;
  language?: OutputLanguage;
};

export function GuidanceTab({ pipeline, language = "tr" }: GuidanceTabProps) {
  const uiLanguage = language === "en" ? "en" : "tr";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, uiLanguage);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[#e7e2d8] bg-[#fcfbf8] p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
              {text("brandGuidance")}
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-zinc-900">
              {text("advisorRecommendations")}
            </h2>
          </div>

          <div className="rounded-full border border-[#e7e2d8] bg-white px-3 py-1 text-xs uppercase tracking-widest text-zinc-400">
            Advisor v2
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#e7e2d8] bg-white p-5">
          <div className="text-xs uppercase tracking-widest text-zinc-400">
            {text("primaryAction")}
          </div>

          <p className="mt-3 text-lg leading-8 text-zinc-900">
            {pipeline?.advisorV2?.actions?.[0]?.action ??
              pipeline?.brandAdvice?.nextAction ??
              "-"}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AdvisorList
          title={text("warnings")}
          emptyText={text("noWarnings")}
          items={pipeline?.advisorV2?.warnings}
          labelKey="severity"
          textKey="message"
        />

        <AdvisorList
          title={text("opportunities")}
          emptyText={text("noOpportunities")}
          items={pipeline?.advisorV2?.opportunities}
          labelKey="priority"
          textKey="message"
        />

        <AdvisorList
          title={text("actions")}
          emptyText={text("noActions")}
          items={pipeline?.advisorV2?.actions}
          labelKey="priority"
          textKey="action"
        />

        <AdvisorList
          title={text("governanceSignals")}
          emptyText={text("noGovernanceSignals")}
          items={pipeline?.advisorV2?.governanceSignals}
          labelKey="level"
          textKey="type"
        />
      </section>

      <section className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          {text("legacyBrandAdvisor")}
        </div>

        <div className="mt-5 rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-5">
          <div className="text-xs uppercase tracking-widest text-zinc-400">
            {text("recommendation")}
          </div>

          <p className="mt-3 text-base leading-7 text-zinc-900">
            {pipeline?.brandAdvice?.nextAction ?? "-"}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-5">
          <div className="text-xs uppercase tracking-widest text-zinc-400">
            {text("campaignOpportunity")}
          </div>

          <p className="mt-3 text-base leading-7 text-zinc-900">
            {pipeline?.brandAdvice?.campaignOpportunity ?? "-"}
          </p>
        </div>
      </section>
    </div>
  );
}

function AdvisorList({
  title,
  emptyText,
  items,
  labelKey,
  textKey,
}: {
  title: string;
  emptyText: string;
  items?: any[];
  labelKey: string;
  textKey: string;
}) {
  return (
    <div className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
      <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
        {title}
      </div>

      <div className="mt-5 space-y-3">
        {items?.length ? (
          items.map((item: any, index: number) => (
            <div
              key={`${title}-${index}`}
              className="rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-4 text-sm leading-6 text-zinc-700"
            >
              <span className="font-medium text-zinc-900">
                {item[labelKey]}
              </span>
              {": "}
              {item[textKey]}
            </div>
          ))
        ) : (
          <div className="text-sm leading-6 text-zinc-500">{emptyText}</div>
        )}
      </div>
    </div>
  );
}
