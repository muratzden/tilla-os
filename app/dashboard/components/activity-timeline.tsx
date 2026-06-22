import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type UILanguage = "tr" | "en";

type ActivityTimelineProps = {
  uiLanguage: UILanguage;
};

export function ActivityTimeline({ uiLanguage }: ActivityTimelineProps) {
  const activities = [
    {
      time: getDashboardText("today", uiLanguage),
      title: getDashboardText("governanceCheckCompleted", uiLanguage),
      detail: getDashboardText("governanceCheckCompletedDetail", uiLanguage),
    },
    {
      time: getDashboardText("today", uiLanguage),
      title: getDashboardText("brandMemoryLoaded", uiLanguage),
      detail: getDashboardText("brandMemoryLoadedDetail", uiLanguage),
    },
    {
      time: getDashboardText("yesterday", uiLanguage),
      title: getDashboardText("marketplaceLanguageStateChecked", uiLanguage),
      detail: getDashboardText(
        "marketplaceLanguageStateCheckedDetail",
        uiLanguage,
      ),
    },
  ];

  return (
    <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            {getDashboardText("activity", uiLanguage)}
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">
            {getDashboardText("systemSignals", uiLanguage)}
          </h2>
        </div>

        <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500 md:inline-flex">
          {getDashboardText("liveWorkspace", uiLanguage)}
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {activities.map((activity, index) => (
          <div
            key={`${activity.title}-${index}`}
            className="rounded-2xl border border-white/10 bg-black/15 p-4"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-600">
              {activity.time}
            </p>

            <h3 className="mt-2 text-sm font-semibold text-white">
              {activity.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {activity.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
