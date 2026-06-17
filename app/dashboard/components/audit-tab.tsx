"use client";

import { useState } from "react";
import { getGovernanceText } from "@/src/lib/i18n/governance-text";
import { buildGovernanceWorkspace } from "@/src/lib/brand/governance/governance-workspace";
import type { OutputLanguage } from "@/src/lib/i18n/language";
import { GovernanceCenter } from "./governance-center";
import { ConstitutionInspector } from "./constitution-inspector";
import { DecisionVetoCenter } from "./decision-veto-center";
import { GovernanceSignalsTable } from "./governance-signals-table";

type AuditChannel =
  | "website"
  | "social_media"
  | "marketplace"
  | "email"
  | "advertising";

type AuditResult = {
  brandId: string;
  channel: AuditChannel;

  alignmentScore: number;
  constitutionAlignment: number;
  memoryAlignment: number;
  consistencyAlignment: number;

  driftLevel: string;
  brandDriftAnalysis: string;

  violations: {
    key: string;
    severity: string;
    message: string;
  }[];

  recommendations: {
    key: string;
    message: string;
  }[];

  channelScores: {
    channel: AuditChannel;
    score: number;
  }[];

  governanceSignals: {
    key: string;
    level: string;
    message: string;
  }[];

  governance: {
    governanceHealth: string;
    decisionVetoRisk: string;
    forbiddenDirectionExposure: number;
    corePrincipleConflicts: string[];
    governanceSignals: string[];
    recommendations: string[];
  };

  alignment: {
    alignmentScore: number;
    constitutionAlignment: number;
    memoryAlignment: number;
    consistencyAlignment: number;
    driftLevel: string;
    brandDriftAnalysis: string;
  };
  constitution?: {
    dominantPrinciple?: string;
    protectedPrinciples?: string[];
    forbiddenDirections?: string[];
  };
};

function getAlignmentLabel(score: number, language: OutputLanguage) {
  if (score >= 75) return getGovernanceText(language, "aligned");
  if (score >= 60) return getGovernanceText(language, "needsReview");
  return getGovernanceText(language, "atRisk");
}

function getHealthBadgeClass(value: string) {
  const normalizedValue = value.toLowerCase();

  if (normalizedValue === "critical" || normalizedValue === "high") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  if (normalizedValue === "warning" || normalizedValue === "medium") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function calculateBrandHealth(result: AuditResult) {
  return Math.round(
    result.alignment.alignmentScore * 0.4 +
      (result.governance.governanceHealth === "healthy" ? 100 : 60) * 0.3 +
      result.alignment.consistencyAlignment * 0.2 +
      result.alignment.memoryAlignment * 0.1,
  );
}

function ScoreCard({
  title,
  value,
  helper,
}: {
  title: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs uppercase tracking-widest text-zinc-500">
        {title}
      </div>

      <div className="mt-3 text-4xl font-semibold text-white">{value}</div>

      {helper && <p className="mt-2 text-sm text-zinc-400">{helper}</p>}
    </div>
  );
}

function HealthBadge({
  value,
  language,
}: {
  value: string;
  language: OutputLanguage;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-widest ${getHealthBadgeClass(
        value,
      )}`}
    >
      {getGovernanceText(
        language,
        value as Parameters<typeof getGovernanceText>[1],
      )}
    </span>
  );
}

export function AuditTab({
  brandId,
  language = "tr",
}: {
  brandId?: string;
  language?: OutputLanguage;
}) {
  const t = (key: Parameters<typeof getGovernanceText>[1]) =>
    getGovernanceText(language, key);

  const [channel, setChannel] = useState<AuditChannel>("website");
  const [content, setContent] = useState(
    "Handmade leather goods built around human craft, character and longevity.",
  );
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [toolOpen, setToolOpen] = useState(false);

  async function runAudit() {
    try {
      setLoading(true);

      const response = await fetch("/api/brand-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandId: brandId ?? "tilla-leather",
          channel,
          content,
        }),
      });

      const json = (await response.json()) as AuditResult;

      setResult(json);
    } catch (error) {
      console.error("Audit error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 text-white shadow-xl">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.35em] text-emerald-400">
            {t("brandGovernanceTitle")}
          </div>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            {t("governanceWorkspaceTitle")}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
            {t("governanceWorkspaceDescription")}
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-widest text-emerald-300">
          {t("governanceLayerLabel")}
        </div>
      </div>    

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <label className="block">
            <span className="text-sm text-zinc-400">{t("channel")}</span>

            <select
              value={channel}
              onChange={(event) =>
                setChannel(event.target.value as AuditChannel)
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="website">{t("channelWebsite")}</option>
<option value="social_media">{t("channelSocialMedia")}</option>
<option value="marketplace">{t("channelMarketplace")}</option>
<option value="email">{t("channelEmail")}</option>
<option value="advertising">{t("channelAdvertising")}</option>
            </select>
          </label>

          <label className="block md:col-span-3">
            <span className="text-sm text-zinc-400">{t("contentToAudit")}</span>

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={5}
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={runAudit}
          disabled={loading}
          className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-zinc-950 disabled:opacity-50"
        >
          {loading ? t("auditing") : t("runAudit")}
        </button>
      </div>

      {result &&
        (() => {
          const workspace = buildGovernanceWorkspace(result);

          return (
            <div className="mt-8 space-y-6">
              <GovernanceCenter workspace={workspace} language={language} />

              <ConstitutionInspector
                workspace={workspace}
                language={language}
              />

              <DecisionVetoCenter workspace={workspace} language={language} />

              <GovernanceSignalsTable
                workspace={workspace}
                language={language}
              />
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.35em] text-emerald-400">
                      {t("brandHealthTitle")}
                    </div>

                    <div className="mt-5 flex items-end gap-4">
                      <div className="text-7xl font-semibold tracking-[-0.08em] text-white">
                        {calculateBrandHealth(result)}
                      </div>

                      <HealthBadge
                        value={result.governance.governanceHealth}
                        language={language}
                      />
                    </div>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400">
                      {result.alignment.brandDriftAnalysis}
                    </p>
                  </div>

                  <div className="grid min-w-[260px] grid-cols-1 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                        {t("driftRiskLabel")}
                      </div>
                      <div className="mt-2 text-lg font-medium text-white">
                        {getGovernanceText(
                          language,
                          result.alignment.driftLevel as Parameters<
                            typeof getGovernanceText
                          >[1],
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                        {t("decisionVetoRiskLabel")}
                      </div>
                      <div className="mt-2 text-lg font-medium text-white">
                        {getGovernanceText(
                          language,
                          result.governance.decisionVetoRisk as Parameters<
                            typeof getGovernanceText
                          >[1],
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                       {t("exposureLabel")}
                      </div>
                      <div className="mt-2 text-lg font-medium text-white">
                        {result.governance.forbiddenDirectionExposure}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">
  {t("advancedAuditToolTitle")}
</div>

                    <p className="mt-1 text-xs text-zinc-500">
  {t("advancedAuditToolDescription")}
</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setToolOpen((current) => !current)}
                    className="rounded-xl border border-white/10 px-3 py-2 text-xs uppercase tracking-widest text-zinc-400"
                  >
                    {toolOpen ? t("hideLabel") : t("showLabel")}
                  </button>
                </div>

                {toolOpen && (
                  <div className="mt-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      <label className="block">
                        <span className="text-sm text-zinc-400">
                          {t("channel")}
                        </span>

                        <select
                          value={channel}
                          onChange={(event) =>
                            setChannel(event.target.value as AuditChannel)
                          }
                          className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="website">{t("channelWebsite")}</option>
<option value="social_media">{t("channelSocialMedia")}</option>
<option value="marketplace">{t("channelMarketplace")}</option>
<option value="email">{t("channelEmail")}</option>
<option value="advertising">{t("channelAdvertising")}</option>
                        </select>
                      </label>

                      <label className="block md:col-span-3">
                        <span className="text-sm text-zinc-400">
                          {t("contentToAudit")}
                        </span>

                        <textarea
                          value={content}
                          onChange={(event) => setContent(event.target.value)}
                          rows={5}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={runAudit}
                      disabled={loading}
                      className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-zinc-950 disabled:opacity-50"
                    >
                      {loading ? t("auditing") : t("runAudit")}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <ScoreCard
                  title={t("alignmentLabel")}
                  value={result.alignment.alignmentScore}
                  helper={getAlignmentLabel(
                    result.alignment.alignmentScore,
                    language,
                  )}
                />

                <ScoreCard
                  title={t("constitutionLabel")}
                  value={result.alignment.constitutionAlignment}
                />

                <ScoreCard
                  title={t("memoryLabel")}
                  value={result.alignment.memoryAlignment}
                />

                <ScoreCard
                  title={t("consistencyLabel")}
                  value={result.alignment.consistencyAlignment}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-xs uppercase tracking-widest text-zinc-500">
                    {t("violations")}
                  </div>

                  <div className="mt-4 space-y-3">
                    {result.violations.length === 0 && (
                      <p className="text-sm text-zinc-400">
                        {t("noViolationsDetected")}
                      </p>
                    )}

                    {result.violations.map((violation) => (
                      <div
                        key={violation.key}
                        className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="font-medium text-white">
                          {violation.key}
                        </div>

                        <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
                          {violation.severity}
                        </p>

                        <p className="mt-2 text-sm text-zinc-400">
                          {violation.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-xs uppercase tracking-widest text-zinc-500">
                    {t("governanceRecommendations")}
                  </div>

                  <div className="mt-4 space-y-3">
                    {result.governance.recommendations.length === 0 && (
                      <p className="text-sm text-zinc-400">
                        {t("noGovernanceRecommendations")}
                      </p>
                    )}

                    {result.governance.recommendations.map((recommendation) => (
                      <div
                        key={recommendation}
                        className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <p className="text-sm text-zinc-400">
                          {recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-xs uppercase tracking-widest text-zinc-500">
                    {t("corePrincipleConflicts")}
                  </div>

                  <div className="mt-4 space-y-3">
                    {result.governance.corePrincipleConflicts.length === 0 && (
                      <p className="text-sm text-zinc-400">
                        {t("noCorePrincipleConflicts")}
                      </p>
                    )}

                    {result.governance.corePrincipleConflicts.map(
                      (conflict) => (
                        <div
                          key={conflict}
                          className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                        >
                          <p className="text-sm text-zinc-400">{conflict}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-xs uppercase tracking-widest text-zinc-500">
                    {t("governanceSignals")}
                  </div>

                  <div className="mt-4 space-y-3">
                    {result.governance.governanceSignals.length === 0 && (
                      <p className="text-sm text-zinc-400">
                        {t("noGovernanceSignals")}
                      </p>
                    )}

                    {result.governance.governanceSignals.map((signal) => (
                      <div
                        key={signal}
                        className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <p className="text-sm text-zinc-400">{signal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </section>
  );
}
