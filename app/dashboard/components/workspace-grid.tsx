"use client";

type WorkspaceTarget = "decision" | "brandHealth" | "studios" | "marketplace";

type WorkspaceGridProps = {
  activeTab: WorkspaceTarget | string;
  readinessScore: number;
  marketplaceUpdates: number;
  onNavigate: (tab: WorkspaceTarget) => void;
};

type WorkspaceItem = {
  title: string;
  description: string;
  symbol: string;
  target: WorkspaceTarget;
};

const primaryWorkspace: WorkspaceItem = {
  title: "Decision Engine",
  description:
    "Primary workspace for governed decisions, brand reasoning and operational direction.",
  symbol: "✦",
  target: "decision",
};

const secondaryWorkspaces: WorkspaceItem[] = [
  {
    title: "Governance Center",
    description:
      "Protect positioning consistency and constitutional integrity.",
    symbol: "◆",
    target: "brandHealth",
  },
  {
    title: "Studios",
    description: "Generate content, campaigns and operational outputs.",
    symbol: "✎",
    target: "studios",
  },
  {
    title: "Marketplace",
    description: "Install language packs, industry modules and workflows.",
    symbol: "▣",
    target: "marketplace",
  },
];

export function WorkspaceGrid({
  activeTab,
  readinessScore,
  marketplaceUpdates,
  onNavigate,
}: WorkspaceGridProps) {
  function getStatus(target: WorkspaceTarget) {
    if (target === "decision") {
      return {
        label: "PRIMARY",
        value: "Decision Engine Ready",
      };
    }

    if (target === "brandHealth") {
      return {
        label:
          readinessScore >= 80
            ? "HEALTHY"
            : readinessScore >= 60
              ? "STABLE"
              : "ATTENTION",
        value: `${readinessScore}% Readiness`,
      };
    }

    if (target === "studios") {
      return {
        label: "ACTIVE",
        value: "Content Studio Online",
      };
    }

    return {
      label: marketplaceUpdates > 0 ? "UPDATES" : "CURRENT",
      value:
        marketplaceUpdates > 0
          ? `${marketplaceUpdates} Updates Available`
          : "All Packages Current",
    };
  }

  return (
    <section className="mb-8 mt-8">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Workspace
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Operating System Modules
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-zinc-500">
          Decision Engine is the primary workspace. Governance, Studios and
          Marketplace support the operating system.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <WorkspaceCard
          item={primaryWorkspace}
          status={getStatus(primaryWorkspace.target)}
          isActive={activeTab === primaryWorkspace.target}
          onNavigate={onNavigate}
          variant="primary"
        />

        <div className="grid gap-5">
          {secondaryWorkspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.title}
              item={workspace}
              status={getStatus(workspace.target)}
              isActive={activeTab === workspace.target}
              onNavigate={onNavigate}
              variant="secondary"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkspaceCard({
  item,
  status,
  isActive,
  onNavigate,
  variant,
}: {
  item: WorkspaceItem;
  status: {
    label: string;
    value: string;
  };
  isActive: boolean;
  onNavigate: (tab: WorkspaceTarget) => void;
  variant: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(item.target)}
      className={`group relative overflow-hidden rounded-[2rem] text-left backdrop-blur-xl transition-all duration-300 ${
        variant === "primary" ? "min-h-[320px] p-7 md:p-8" : "min-h-[150px] p-5"
      } ${
        isActive
          ? "border border-white/30 bg-white/[0.08] shadow-[0_0_50px_rgba(255,255,255,0.07)]"
          : "border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex items-center justify-center rounded-2xl border ${
            variant === "primary" ? "h-14 w-14 text-2xl" : "h-11 w-11 text-lg"
          } ${
            isActive
              ? "border-white/20 bg-white/[0.08] text-white"
              : "border-white/10 bg-white/[0.04] text-zinc-300"
          }`}
        >
          {item.symbol}
        </div>

        <span
          className={`text-xl transition-all duration-300 ${
            isActive
              ? "text-white"
              : "text-zinc-600 group-hover:translate-x-1 group-hover:text-zinc-300"
          }`}
        >
          →
        </span>
      </div>

      <div className={variant === "primary" ? "mt-12" : "mt-5"}>
        <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          {variant === "primary" ? "Primary Workspace" : "Supporting Module"}
        </div>

        <h3
          className={
            variant === "primary"
              ? "text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl"
              : "text-lg font-semibold text-white"
          }
        >
          {item.title}
        </h3>

        <p
          className={
            variant === "primary"
              ? "mt-3 max-w-xl text-sm leading-7 text-zinc-400 md:text-base"
              : "mt-2 text-sm leading-6 text-zinc-500"
          }
        >
          {item.description}
        </p>
      </div>

      <div
        className={`mt-6 flex items-center justify-between gap-4 ${
          variant === "primary" ? "border-t border-white/10 pt-6" : ""
        }`}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Status
          </p>

          <p className="mt-1 text-sm text-zinc-300">{status.value}</p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.16em] text-zinc-300">
          {status.label}
        </div>
      </div>

      {isActive && (
        <div className="mt-4 inline-flex rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
          Active
        </div>
      )}
    </button>
  );
}
