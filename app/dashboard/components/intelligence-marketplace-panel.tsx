export function IntelligenceMarketplacePanel() {
  const packs = [
    {
      name: "Hospitality Intelligence Pack",
      type: "Industry",
      description:
        "Hotel, resort, guest experience, booking, service design, hospitality reasoning.",
      status: "Available",
    },
    {
      name: "Leather Goods Intelligence Pack",
      type: "Industry",
      description:
        "Leather craft, product collections, materials, pricing, artisan retail reasoning.",
      status: "Available",
    },
    {
      name: "Germany Market Intelligence Pack",
      type: "Market",
      description:
        "Germany-specific positioning, customer expectations, localization and market signals.",
      status: "Available",
    },
    {
      name: "Instagram Channel Intelligence Pack",
      type: "Channel",
      description:
        "Instagram content strategy, publishing cadence, creative formats and channel diagnostics.",
      status: "Available",
    },
    {
      name: "EU Compliance Pack",
      type: "Compliance",
      description:
        "EU commercial communication, claims, governance and compliance awareness.",
      status: "Available",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Marketplace
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-white">
          Intelligence Marketplace
        </h2>

        <p className="mt-3 max-w-3xl text-sm text-zinc-500">
          Intelligence Packs extend Brand OS reasoning capabilities.
          Languages are runtime settings and are not marketplace products.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {packs.map((pack) => (
          <div
            key={pack.name}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                {pack.type}
              </span>

              <span className="text-xs text-emerald-400">
                {pack.status}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              {pack.name}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              {pack.description}
            </p>

            <button
              type="button"
              className="mt-5 w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
            >
              View Pack
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}