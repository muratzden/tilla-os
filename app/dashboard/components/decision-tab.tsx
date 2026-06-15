import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type DecisionTabProps = {
  pipeline: any;
  uiLanguage: string;
  language?: OutputLanguage;
};

export function DecisionTab({
  pipeline,
  uiLanguage,
  language = "tr",
}: DecisionTabProps) {
  const resolvedUiLanguage = language === "en" ? "en" : "tr";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, resolvedUiLanguage);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          {text("decisionEngine")}
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-zinc-900">
          {text("worldSelection")}
        </h2>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            {text("worldAnalysis")}
          </div>

          <div className="mt-5 space-y-3">
            {pipeline?.worldExplorer?.map((world: any) => (
              <div
                key={world.key}
                className={`rounded-2xl border p-5 ${
                  pipeline?.world?.worldKey === world.key
                    ? "border-zinc-900 bg-[#f8f6f2]"
                    : "border-[#e7e2d8] bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-zinc-900">
                      {world.key}
                    </div>

                    <div className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
                      {pipeline?.world?.worldKey === world.key
                        ? text("selected")
                        : text("candidate")}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-semibold tracking-[-0.04em] text-zinc-900">
                      {world.score}
                    </div>

                    <div className="text-xs uppercase tracking-widest text-zinc-400">
                      {text("final")}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-600">
                  <Score
                    label={text("heritage")}
                    value={world.breakdown?.heritageFit}
                  />
                  <Score
                    label={text("craft")}
                    value={world.breakdown?.craftSignal}
                  />
                  <Score
                    label={text("material")}
                    value={world.breakdown?.materialWarmth}
                  />
                  <Score
                    label={text("campaign")}
                    value={world.breakdown?.campaignUsability}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            {text("decisionGraph")}
          </div>

          <div className="mt-6 space-y-4">
            <GraphStep label="DNA" value={pipeline?.decisionGraph?.archetype} />

            <div className="h-6 border-l border-[#d8d1c5] ml-4" />

            <div className="rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-4">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                {text("worldCandidates")}
              </div>

              <div className="mt-3 space-y-2">
                {pipeline?.decisionGraph?.worldCandidates?.map((world: any) => (
                  <div
                    key={world.key}
                    className={`flex justify-between rounded-xl border px-3 py-2 text-sm ${
                      world.key === pipeline?.decisionGraph?.selectedWorld
                        ? "border-zinc-900 bg-white font-medium text-zinc-900"
                        : "border-[#e7e2d8] bg-white text-zinc-600"
                    }`}
                  >
                    <span>{world.key}</span>
                    <span>{world.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-6 border-l border-[#d8d1c5] ml-4" />

            <GraphStep
              label={text("selectedWorld")}
              value={pipeline?.decisionGraph?.selectedWorld}
            />

            <GraphStep
              label={text("scene")}
              value={pipeline?.decisionGraph?.scene}
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          {text("rejectedAlternatives")}
        </div>

        <div className="mt-5 space-y-3">
          {pipeline?.rejectedAlternatives?.map((item: any) => (
            <div
              key={item.key}
              className="rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="font-semibold text-zinc-900">{item.key}</div>

                <div className="text-sm font-medium text-zinc-500">
                  {item.score}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                {item.lostBecause?.map((reason: string) => (
                  <div key={reason} className="text-sm leading-6 text-zinc-600">
                    • {reason}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Score({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border border-[#e7e2d8] bg-white p-3">
      <div className="text-[10px] uppercase tracking-widest text-zinc-400">
        {label}
      </div>

      <div className="mt-1 font-medium text-zinc-900">{value ?? "-"}</div>
    </div>
  );
}

function GraphStep({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl border border-[#e7e2d8] bg-white p-4">
      <div className="text-xs uppercase tracking-widest text-zinc-400">
        {label}
      </div>

      <div className="mt-2 font-semibold text-zinc-900">{value ?? "-"}</div>
    </div>
  );
}
