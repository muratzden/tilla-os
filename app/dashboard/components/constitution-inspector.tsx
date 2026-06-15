import type { GovernanceWorkspace } from "@/src/lib/brand/governance/governance-workspace";
import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getGovernanceLabel } from "@/src/lib/brand/governance/governance-labels";

type ConstitutionInspectorProps = {
  workspace: GovernanceWorkspace;
  language?: OutputLanguage;
};

function t(language: OutputLanguage | undefined, tr: string, en: string) {
  return language === "en" ? en : tr;
}

export function ConstitutionInspector({
  workspace,
  language = "tr",
}: ConstitutionInspectorProps) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <h2 className="text-lg font-semibold text-neutral-100">
        {t(language, "Anayasa Denetleyici", "Constitution Inspector")}
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Baskın İlke", "Dominant Principle")}
          </p>

          <p className="mt-2 text-lg font-semibold text-neutral-100">
            {getGovernanceLabel(workspace.dominantPrinciple, language)}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Korunan İlkeler", "Protected Principles")}
          </p>

          <ul className="mt-2 space-y-1 text-sm text-neutral-200">
            {workspace.protectedPrinciples.length > 0 ? (
              workspace.protectedPrinciples.map((principle) => (
                <li key={principle}>
                  {getGovernanceLabel(principle, language)}
                </li>
              ))
            ) : (
              <li className="text-neutral-500">
                {t(
                  language,
                  "Korunan ilke bulunamadı",
                  "No protected principles",
                )}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Yasaklı Yönler", "Forbidden Directions")}
          </p>

          <ul className="mt-2 space-y-1 text-sm text-neutral-200">
            {workspace.forbiddenDirections.length > 0 ? (
              workspace.forbiddenDirections.map((direction) => (
                <li key={direction}>
                  {getGovernanceLabel(direction, language)}
                </li>
              ))
            ) : (
              <li className="text-neutral-500">
                {t(
                  language,
                  "Yasaklı yön bulunamadı",
                  "No forbidden directions",
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
