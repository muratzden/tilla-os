type UILanguage = "tr" | "en";

type MissionControlProps = {
  readinessScore: number;
  uiLanguage: UILanguage;
};

type Diagnosis = {
  level: string;
  score: number;
  scoreLabel: string;
  summary: string;
  limits: string[];
  nextBestAction: string;
  actionDescription: string;
};

export function MissionControl({ readinessScore }: MissionControlProps) {
  const diagnosis = getDiagnosis(readinessScore);
  const normalizedScore = Math.min(Math.max(diagnosis.score, 0), 100);

  return (
    <section className="mx-auto mb-8 w-full max-w-5xl">
      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-zinc-600">
              Next Best Action
            </p>

            <h3 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-6xl">
              {diagnosis.nextBestAction}
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500 md:text-base">
              {diagnosis.actionDescription}
            </p>

            <button
              type="button"
              className="mt-8 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Generate Plan
            </button>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-zinc-600">
                  {diagnosis.scoreLabel}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <p className="text-4xl font-semibold tracking-[-0.08em] text-white">
                    {diagnosis.score}
                  </p>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
                    {diagnosis.level}
                  </span>
                </div>
              </div>

              <div className="max-w-lg">
                <p className="text-sm leading-7 text-zinc-500">
                  {diagnosis.summary}
                </p>
              </div>
            </div>

            <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width: `${normalizedScore}%`,
                }}
              />
            </div>

            <div className="mt-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-zinc-600">
                Why
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {diagnosis.limits.map((limit) => (
                  <div
                    key={limit}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400"
                  >
                    {limit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-zinc-600">
            Progress
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <ProgressItem label="Foundation" complete />
            <ProgressItem label="Manifesto" complete />
            <ProgressItem label="Memory" complete />
            <ProgressItem label="Content Plan" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressItem({
  label,
  complete = false,
}: {
  label: string;
  complete?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
          complete
            ? "bg-white text-zinc-950"
            : "border border-white/15 text-zinc-500"
        }`}
      >
        {complete ? "✓" : "○"}
      </span>

      <span className="text-xs text-zinc-400">{label}</span>
    </div>
  );
}

function getDiagnosis(score: number): Diagnosis {
  const foundationScore = Math.min(Math.max(score, 0), 100);
  const operationalScore = Math.min(82, Math.max(38, foundationScore - 18));

  if (foundationScore >= 80) {
    return {
      level: "Ready",
      score: operationalScore,
      scoreLabel: "Operational Score",
      summary:
        "The foundation is usable, but operational consistency still needs proof through publishing rhythm, content repetition, and market feedback.",
      limits: [
        "Content consistency",
        "Product storytelling",
        "Publishing frequency",
      ],
      nextBestAction: "Generate the next 7-day content plan.",
      actionDescription:
        "Turn the current brand foundation into a clear weekly execution plan with authority posts, product stories, and publishing rhythm.",
    };
  }

  if (foundationScore >= 55) {
    return {
      level: "Needs Focus",
      score: foundationScore,
      scoreLabel: "Foundation Score",
      summary:
        "The brand has usable structure, but missing foundation details will weaken decision quality.",
      limits: [
        "Incomplete foundation",
        "Unclear audience repetition",
        "Weak content direction",
      ],
      nextBestAction: "Complete missing foundation fields.",
      actionDescription:
        "Strengthen the brand base before generating campaigns, audits, or automated publishing decisions.",
    };
  }

  return {
    level: "Unstable",
    score: foundationScore,
    scoreLabel: "Foundation Score",
    summary:
      "The brand foundation is too incomplete. The system should prioritize setup before automation.",
    limits: [
      "Missing brand foundation",
      "No reliable decision context",
      "Automation risk is high",
    ],
    nextBestAction: "Finish the brand foundation setup.",
    actionDescription:
      "Create the minimum brand memory required before TILLA-OS starts making operational recommendations.",
  };
}