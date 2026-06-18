import type {
  MissionControlState,
  ScoreDimension,
} from "@/src/core/brand-os/types";

type MissionControlV2Props = {
  missionControl: MissionControlState;
};

const bottleneckLabels: Record<ScoreDimension, string> = {
  clarity: "Brand clarity is the current constraint.",
  audienceFit: "Audience fit needs sharper definition.",
  differentiation: "Differentiation is not yet strong enough.",
  trust: "Trust signals are underdeveloped.",
  authority: "Authority has not been proven strongly enough.",
  consistency: "Execution consistency is the current constraint.",
  growthReadiness: "Growth readiness is not yet stable.",
};

function getHealthLabel(score: number) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Stable";
  if (score >= 40) return "Fragile";
  return "Critical";
}

function getRisk(missionControl: MissionControlState) {
  if (missionControl.missingInputs.length > 0) {
    return `The brand may drift because these inputs are missing: ${missionControl.missingInputs.join(
      ", ",
    )}.`;
  }

  return "The main risk is making decisions without validating them against the brand constitution.";
}

function getOpportunity(missionControl: MissionControlState) {
  if (missionControl.expectedImpact.length > 0) {
    return missionControl.expectedImpact[0];
  }

  return missionControl.strategicFocus;
}

export function MissionControlV2({ missionControl }: MissionControlV2Props) {
  const brandHealth = missionControl.readinessScore;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Mission Control
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Executive Diagnosis
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            {missionControl.diagnosis}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 px-6 py-5 text-right">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
            Brand Health
          </p>

          <div className="mt-2 flex items-end justify-end gap-2">
            <span className="text-5xl font-semibold text-white">
              {brandHealth}
            </span>
            <span className="pb-2 text-sm text-zinc-600">/100</span>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            {getHealthLabel(brandHealth)}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DiagnosisBlock
          title="Bottleneck"
          value={bottleneckLabels[missionControl.bottleneck]}
        />

        <DiagnosisBlock title="Risk" value={getRisk(missionControl)} />

        <DiagnosisBlock
          title="Opportunity"
          value={getOpportunity(missionControl)}
        />

        <DiagnosisBlock
          title="Next Best Action"
          value={missionControl.nextBestAction}
          strong
        />
      </div>
    </section>
  );
}

function DiagnosisBlock({
  title,
  value,
  strong = false,
}: {
  title: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-5",
        strong
          ? "border-amber-300/25 bg-amber-300/[0.06]"
          : "border-white/10 bg-black/20",
      ].join(" ")}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-600">
        {title}
      </p>

      <p className="mt-3 text-sm leading-6 text-zinc-300">{value}</p>
    </div>
  );
}