type MissionControlProps = {
  readinessScore: number;
};

const cards = [
  {
    id: "alignment",
    title: "Alignment",
    value: "89",
    status: "Aligned",
  },
  {
    id: "governance",
    title: "Governance",
    value: "Protected",
    status: "Active",
  },
  {
    id: "memory",
    title: "Memory",
    value: "Strong",
    status: "Loaded",
  },
];

export function MissionControl({
  readinessScore,
}: MissionControlProps) {
  return (
    <section className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Mission Control
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            Brand Health Center
          </h2>
        </div>

        <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 md:block">
          Governance Active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
            Brand Health
          </p>

          <div className="mt-5">
            <div className="text-5xl font-semibold tracking-[-0.08em] text-white">
              {readinessScore}
            </div>

            <div className="mt-2 text-sm text-zinc-500">
              Foundation Score
            </div>
          </div>
        </div>

        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
              {card.title}
            </p>

            <div className="mt-5">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-white">
                {card.value}
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                {card.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}