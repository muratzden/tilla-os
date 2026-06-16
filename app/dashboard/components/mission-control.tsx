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

export function MissionControl({ readinessScore }: MissionControlProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-white/[0.065] to-white/[0.018] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-8">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-zinc-600">
            Mission Control
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">
            Brand Health Center
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
            Executive command layer for brand readiness, governance, memory and
            alignment.
          </p>
        </div>

        <div className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
          Governance Active
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
            Brand Health
          </p>

          <div className="mt-5">
            <div className="text-6xl font-semibold tracking-[-0.09em] text-white">
              {readinessScore}
            </div>

            <div className="mt-2 text-sm text-zinc-500">Foundation Score</div>
          </div>
        </div>

        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-[2rem] border border-white/10 bg-black/20 p-5 shadow-xl shadow-black/20 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
              {card.title}
            </p>

            <div className="mt-5">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-white">
                {card.value}
              </div>

              <div className="mt-2 text-sm text-zinc-500">{card.status}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
