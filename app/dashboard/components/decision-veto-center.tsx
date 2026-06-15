import type { GovernanceWorkspace } from "@/src/lib/brand/governance/governance-workspace";
import type { OutputLanguage } from "@/src/lib/i18n/language";

type DecisionVetoCenterProps = {
  workspace: GovernanceWorkspace;
  language?: OutputLanguage;
};

function t(language: OutputLanguage | undefined, tr: string, en: string) {
  return language === "en" ? en : tr;
}

export function DecisionVetoCenter({
  workspace,
  language = "tr",
}: DecisionVetoCenterProps) {
  const isBlocked =
    workspace.decisionVetoRisk === "high" ||
    workspace.decisionVetoRisk === "critical";

  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <h2 className="text-lg font-semibold text-neutral-100">
        {t(language, "Karar Veto Merkezi", "Decision Veto Center")}
      </h2>

      <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <p className="text-xs text-neutral-400">
          {t(language, "Veto Durumu", "Veto Status")}
        </p>

        <p className="mt-2 text-xl font-semibold text-neutral-100">
          {isBlocked
            ? t(language, "Engellendi", "Blocked")
            : t(language, "İzin Verildi", "Allowed")}
        </p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Nedenler", "Reasons")}
          </p>

          <ul className="mt-2 space-y-1 text-sm text-neutral-200">
            {workspace.conflicts.length > 0 ? (
              workspace.conflicts.map((conflict) => (
                <li key={conflict}>{conflict}</li>
              ))
            ) : (
              <li className="text-neutral-500">
                {t(
                  language,
                  "Çakışma tespit edilmedi",
                  "No conflicts detected",
                )}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Önerilen Düzeltmeler", "Recommended Fixes")}
          </p>

          <ul className="mt-2 space-y-1 text-sm text-neutral-200">
            {workspace.recommendations.length > 0 ? (
              workspace.recommendations.map((recommendation) => (
                <li key={recommendation}>{recommendation}</li>
              ))
            ) : (
              <li className="text-neutral-500">
                {t(language, "Öneri bulunamadı", "No recommendations")}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
