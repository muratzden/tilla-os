import type { GovernanceWorkspace } from "@/src/lib/brand/governance/governance-workspace";
import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getGovernanceText } from "@/src/lib/i18n/governance-text";

type GovernanceCenterProps = {
  workspace: GovernanceWorkspace;
  language?: OutputLanguage;
};

function t(language: OutputLanguage | undefined, tr: string, en: string) {
  return language === "en" ? en : tr;
}

export function GovernanceCenter({
  workspace,
  language = "tr",
}: GovernanceCenterProps) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <h2 className="text-lg font-semibold text-neutral-100">
        {t(language, "Yönetişim Merkezi", "Governance Center")}
      </h2>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Yönetişim Sağlığı", "Governance Health")}
          </p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {getGovernanceText(
              language,
              workspace.governanceHealth as Parameters<
                typeof getGovernanceText
              >[1],
            )}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Hizalama Skoru", "Alignment Score")}
          </p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {workspace.alignmentScore}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Karar Veto Riski", "Decision Veto Risk")}
          </p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {getGovernanceText(
              language,
              workspace.decisionVetoRisk as Parameters<
                typeof getGovernanceText
              >[1],
            )}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-xs text-neutral-400">
            {t(language, "Sapma Seviyesi", "Drift Level")}
          </p>
          <p className="mt-2 text-xl font-semibold text-neutral-100">
            {getGovernanceText(
              language,
              workspace.driftLevel as Parameters<typeof getGovernanceText>[1],
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
