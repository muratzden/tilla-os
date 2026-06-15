import type { GovernanceWorkspace } from "@/src/lib/brand/governance/governance-workspace";
import type { OutputLanguage } from "@/src/lib/i18n/language";

type GovernanceSignalsTableProps = {
  workspace: GovernanceWorkspace;
  language?: OutputLanguage;
};

function t(language: OutputLanguage | undefined, tr: string, en: string) {
  return language === "en" ? en : tr;
}

export function GovernanceSignalsTable({
  workspace,
  language = "tr",
}: GovernanceSignalsTableProps) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <h2 className="text-lg font-semibold text-neutral-100">
        {t(language, "Yönetişim Sinyalleri", "Governance Signals")}
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="px-3 py-3 text-xs font-medium text-neutral-400">
                {t(language, "Sinyal", "Signal")}
              </th>

              <th className="px-3 py-3 text-xs font-medium text-neutral-400">
                {t(language, "Seviye", "Severity")}
              </th>

              <th className="px-3 py-3 text-xs font-medium text-neutral-400">
                {t(language, "Kaynak", "Source")}
              </th>

              <th className="px-3 py-3 text-xs font-medium text-neutral-400">
                {t(language, "Etki", "Impact")}
              </th>
            </tr>
          </thead>

          <tbody>
            {workspace.governanceSignals.length > 0 ? (
              workspace.governanceSignals.map((signal, index) => (
                <tr
                  key={`${signal.signal}-${index}`}
                  className="border-b border-neutral-900"
                >
                  <td className="px-3 py-3 text-sm text-neutral-100">
                    {signal.signal}
                  </td>

                  <td className="px-3 py-3 text-sm text-neutral-300">
                    {signal.severity}
                  </td>

                  <td className="px-3 py-3 text-sm text-neutral-300">
                    {signal.source}
                  </td>

                  <td className="px-3 py-3 text-sm text-neutral-300">
                    {signal.impact}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-6 text-center text-sm text-neutral-500"
                >
                  {t(
                    language,
                    "Yönetişim sinyali bulunamadı",
                    "No governance signals available",
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
