const activities = [
  {
    time: "Today",
    title: "Governance check completed",
    detail: "Brand constitution and decision rules are active.",
  },
  {
    time: "Today",
    title: "Brand memory loaded",
    detail: "Workspace context is available for decision generation.",
  },
  {
    time: "Yesterday",
    title: "Marketplace language state checked",
    detail: "Output language packs are controlled through workspace settings.",
  },
  {
    time: "This week",
    title: "Decision engine initialized",
    detail: "Product, channel, material, and audience signals are ready.",
  },
];

export function ActivityTimeline() {
  return (
    <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Activity
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
            System Timeline
          </h2>
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
          Live workspace
        </span>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={`${activity.title}-${index}`} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-400" />

              {index < activities.length - 1 && (
                <div className="mt-2 h-full w-px bg-white/10" />
              )}
            </div>

            <div className="pb-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                {activity.time}
              </p>

              <h3 className="mt-1 text-sm font-semibold text-white">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-zinc-500">
                {activity.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}