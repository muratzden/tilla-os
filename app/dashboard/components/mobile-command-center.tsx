type MobileCommandCenterProps = {
  brandName: string;
  brandCategory: string;
  readinessScore: number;
  activeOutputLanguage: string;
  workspaceName?: string;
  userEmail?: string;
  onOpenWorkspace: () => void;
};

const mobileStats = [
  {
    label: "Governance",
    value: "Protected",
    detail: "Rules active",
  },
  {
    label: "Memory",
    value: "Strong",
    detail: "Context loaded",
  },
  {
    label: "Audit",
    value: "Healthy",
    detail: "No critical issues",
  },
];

export function MobileCommandCenter({
  brandName,
  brandCategory,
  readinessScore,
  activeOutputLanguage,
  workspaceName,
  userEmail,
  onOpenWorkspace,
}: MobileCommandCenterProps) {
  return (
    <section className="md:hidden">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-600">
              TILLA-OS
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">
              Brand Health Center
            </h1>
          </div>

          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Live
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
            Current Brand
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            {brandName}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">{brandCategory}</p>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_0.8fr] gap-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
              Readiness
            </p>

            <p className="mt-3 text-5xl font-semibold tracking-[-0.07em] text-white">
              {readinessScore}
              <span className="text-xl text-zinc-600">%</span>
            </p>

            <p className="mt-2 text-xs text-zinc-500">Foundation strength</p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
              Output
            </p>

            <p className="mt-3 text-3xl font-semibold text-white">
              {activeOutputLanguage.toUpperCase()}
            </p>

            <p className="mt-2 text-xs text-zinc-500">Marketplace controlled</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {mobileStats.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border border-white/10 bg-black/20 p-3"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                {item.label}
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                {item.value}
              </p>

              <p className="mt-1 text-[11px] leading-4 text-zinc-600">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenWorkspace}
          className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-white/10 transition hover:bg-zinc-200"
        >
          Open Decision Workspace
        </button>
      </div>

      {(workspaceName || userEmail) && (
        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
            Workspace
          </p>

          {workspaceName && (
            <p className="mt-2 text-sm font-semibold text-white">
              {workspaceName}
            </p>
          )}

          {userEmail && (
            <p className="mt-1 truncate text-xs text-zinc-500">{userEmail}</p>
          )}
        </div>
      )}
    </section>
  );
}
