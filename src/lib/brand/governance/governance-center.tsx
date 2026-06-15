import type { GovernanceWorkspace } from "@/src/lib/brand/governance/governance-workspace";

type GovernanceCenterProps = {
  workspace: GovernanceWorkspace;
};

export function GovernanceCenter({ workspace }: GovernanceCenterProps) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <h2 className="text-lg font-semibold text-neutral-100">
        Governance Center
      </h2>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">Governance Health</p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {workspace.governanceHealth}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">Alignment Score</p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {workspace.alignmentScore}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">Decision Veto Risk</p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {workspace.decisionVetoRisk}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">Drift Level</p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {workspace.driftLevel}
          </p>
        </div>
      </div>
    </section>
  );
}
