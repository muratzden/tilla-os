"use client";

import { useState } from "react";
import { getGovernanceText } from "@/src/lib/i18n/governance-text";
import type { OutputLanguage } from "@/src/lib/i18n/language";

type AuditChannel =
  | "website"
  | "social_media"
  | "marketplace"
  | "email"
  | "advertising";

type AuditResult = {
  alignment: {
    alignmentScore: number;
    constitutionAlignment: number;
    memoryAlignment: number;
    consistencyAlignment: number;
    brandDriftAnalysis: string;
  };
};

type AuditReportTabProps = {
  brandId?: string;
  language?: OutputLanguage;
};

export function AuditReportTab({
  brandId,
  language = "tr",
}: AuditReportTabProps) {
  const t = (key: Parameters<typeof getGovernanceText>[1]) =>
    getGovernanceText(language, key);

  const [channel, setChannel] = useState<AuditChannel>("website");

  const [content, setContent] = useState(
    "Handmade leather goods built around human craft, character and longevity.",
  );

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<AuditResult | null>(null);

  async function runAudit() {
    try {
      setLoading(true);

      const response = await fetch("/api/brand-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandId: brandId ?? "default-brand",
          channel,
          content,
        }),
      });

      const json = (await response.json()) as AuditResult;

      setResult(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 text-white">
      <div className="text-xs uppercase tracking-[0.35em] text-emerald-400">
        Audit Layer
      </div>

      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
        Audit Report
      </h2>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
        {language === "tr"
          ? "Marka içeriğini anayasa, hafıza ve tutarlılık sistemine göre denetle."
          : "Audit content against constitution, memory and consistency systems."}
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <label className="block">
            <span className="text-sm text-zinc-400">{t("channel")}</span>

            <select
              value={channel}
              onChange={(event) =>
                setChannel(event.target.value as AuditChannel)
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
            >
              <option value="website">Website</option>
              <option value="social_media">Social Media</option>
              <option value="marketplace">Marketplace</option>
              <option value="email">Email</option>
              <option value="advertising">Advertising</option>
            </select>
          </label>

          <label className="block md:col-span-3">
            <span className="text-sm text-zinc-400">{t("contentToAudit")}</span>

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={5}
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={runAudit}
          disabled={loading}
          className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-zinc-950"
        >
          {loading ? t("auditing") : t("runAudit")}
        </button>
      </div>

      {result && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                Alignment
              </div>

              <div className="mt-3 text-3xl font-semibold text-white">
                {result.alignment.alignmentScore}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                Constitution
              </div>

              <div className="mt-3 text-3xl font-semibold text-white">
                {result.alignment.constitutionAlignment}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                Memory
              </div>

              <div className="mt-3 text-3xl font-semibold text-white">
                {result.alignment.memoryAlignment}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                Consistency
              </div>

              <div className="mt-3 text-3xl font-semibold text-white">
                {result.alignment.consistencyAlignment}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs uppercase tracking-widest text-zinc-500">
              {t("brandDriftAnalysis")}
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {result.alignment.brandDriftAnalysis}
            </p>
          </div>
        </>
      )}
    </section>
  );
}
