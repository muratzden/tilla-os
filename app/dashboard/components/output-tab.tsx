import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";
import type { KernelOutput } from "@/src/lib/brand-kernel/kernel-types";

type KernelState = Partial<KernelOutput>;

type OutputTabProps = {
  kernel: KernelState | null;
  language?: OutputLanguage;
};

export function OutputTab({ kernel, language = "en" }: OutputTabProps) {
  const uiLanguage = language === "tr" ? "tr" : "en";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, uiLanguage);

  const manifestoTitle = kernel?.manifesto?.title ?? "Pending manifesto";
  const nextBestAction =
    kernel?.missionControl?.nextBestAction ??
    "Complete more foundation signals before generating a governed studio output.";

  const policies = kernel?.policies ?? [];
  const approvedSignals = kernel?.approvedSignals ?? [];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Kernel Studio
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
          {manifestoTitle}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {nextBestAction}
        </p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Constitution Policies
        </p>

        <div className="mt-4 space-y-3">
          {policies.length > 0 ? (
            policies.map((policy) => (
              <div
                key={policy.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-4"
              >
                <p className="text-sm font-medium text-white">
                  {policy.principle}
                </p>

                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Severity: {policy.severity}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500">
              No policies generated yet.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Approved Signals
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {approvedSignals.length > 0 ? (
            approvedSignals.map((signal) => (
              <div
                key={signal.id}
                className="rounded-2xl border border-white/10 bg-black/30 p-4"
              >
                <p className="text-sm font-medium text-white">
  {signal.id.replaceAll("_", " ")}
</p>

                <p className="mt-2 text-xs text-zinc-500">
                  Strength: {signal.strength}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500">
              No approved signals yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}