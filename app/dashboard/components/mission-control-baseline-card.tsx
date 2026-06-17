type Props = {
  brandHealth: number;
  bottleneck: string;
  risk: string;
  opportunity: string;
  nextBestAction: string;
};

export function MissionControlBaselineCard({
  brandHealth,
  bottleneck,
  risk,
  opportunity,
  nextBestAction,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.25em] text-white/40">
          Mission Control
        </div>

        <div className="mt-2 text-4xl font-semibold text-white">
          {brandHealth}%
        </div>

        <div className="text-sm text-white/50">
          Brand Health
        </div>
      </div>

      <div className="space-y-5">
        <section>
          <div className="text-xs uppercase tracking-wider text-white/40">
            Bottleneck
          </div>

          <p className="mt-1 text-sm text-white/80">
            {bottleneck}
          </p>
        </section>

        <section>
          <div className="text-xs uppercase tracking-wider text-white/40">
            Risk
          </div>

          <p className="mt-1 text-sm text-white/80">
            {risk}
          </p>
        </section>

        <section>
          <div className="text-xs uppercase tracking-wider text-white/40">
            Opportunity
          </div>

          <p className="mt-1 text-sm text-white/80">
            {opportunity}
          </p>
        </section>

        <section>
          <div className="text-xs uppercase tracking-wider text-emerald-400">
            Next Best Action
          </div>

          <p className="mt-1 text-sm text-white">
            {nextBestAction}
          </p>
        </section>
      </div>
    </div>
  );
}