import { getGovernanceText } from "@/src/lib/i18n/governance-text";
import type { OutputLanguage } from "@/src/lib/i18n/language";

type GovernanceViolation = {
  key: string;
  message: string;
  severity?: string;
};

type GovernanceResult = {
  status: string;
  allowed: boolean;
  governanceScore: number;
  violations: GovernanceViolation[];
  appliedRules: string[];
};

export function GovernanceTab({
  governance,
  language = "tr",
}: {
  governance: GovernanceResult | null;
  language?: OutputLanguage;
}) {
  const t = (key: Parameters<typeof getGovernanceText>[1]) =>
    getGovernanceText(language, key);

  if (!governance) {
    return (
      <section className="rounded-2xl border border-[#e7e2d8] bg-white p-5">
        <p className="text-sm text-zinc-500">
          {t("governanceResultUnavailable")}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-[#e7e2d8] bg-white p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          {t("governanceStatus")}
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
          {governance.status}
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#eee7dc] bg-[#fcfbf8] p-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              {t("allowed")}
            </p>

            <p className="mt-2 text-lg font-semibold">
              {governance.allowed ? t("yes") : t("no")}
            </p>
          </div>

          <div className="rounded-xl border border-[#eee7dc] bg-[#fcfbf8] p-4">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              {t("governanceScore")}
            </p>

            <p className="mt-2 text-lg font-semibold">
              {governance.governanceScore}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e7e2d8] bg-white p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          {t("appliedRules")}
        </p>

        {governance.appliedRules.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">{t("noAppliedRules")}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {governance.appliedRules.map((rule) => (
              <li
                key={rule}
                className="rounded-xl border border-[#eee7dc] bg-[#fcfbf8] p-3 text-sm"
              >
                {rule}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-[#e7e2d8] bg-white p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          {t("violations")}
        </p>

        {governance.violations.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">
            {t("noViolationsDetected")}
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {governance.violations.map((violation) => (
              <li
                key={violation.key}
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-900"
              >
                <strong>{violation.key}</strong>
                <p>{violation.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
