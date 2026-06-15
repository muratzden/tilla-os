"use client";

import { useState } from "react";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";
import type { OutputLanguage } from "@/src/lib/i18n/language";

import type { BrandType } from "@/src/lib/brand/setup/brand-type";
import { brandTypeDefinitions } from "@/src/lib/brand/setup/brand-type";
import { getManifestoQuestionsForBrandType } from "@/src/lib/brand/setup/manifesto-interview/manifesto-interview-defaults";
import type { GeneratedManifesto } from "@/src/lib/brand/setup/manifesto-interview/manifesto-generator";
import type { ManifestoAnswer } from "@/src/lib/brand/setup/manifesto-interview/manifesto-interview-types";
import {
  approveManifesto,
  lockManifesto,
  type ApprovedManifesto,
} from "@/src/lib/brand/setup/manifesto-interview/manifesto-approval";

export function ManifestoTab({
  brandId,
  language = "tr",
}: {
  brandId?: string;
  language?: OutputLanguage;
}) {
  const uiLanguage = language === "en" ? "en" : "tr";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, uiLanguage);

  const [brandType, setBrandType] = useState<BrandType>("product");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedManifesto, setGeneratedManifesto] =
    useState<GeneratedManifesto | null>(null);
  const [approvedManifesto, setApprovedManifesto] =
    useState<ApprovedManifesto | null>(null);

  const questions = getManifestoQuestionsForBrandType(brandType);

  function updateAnswer(questionId: string, value: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: value,
    }));
  }

  async function handleGenerateManifesto() {
    const interviewAnswers: ManifestoAnswer[] = questions.map((question) => ({
      questionId: question.id,
      answer: answers[question.id] ?? "",
    }));

    const response = await fetch("/api/manifesto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brandId: brandId ?? "tilla-leather",
        brandType,
        answers: interviewAnswers,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error ?? "manifesto_generation_failed");
    }

    setGeneratedManifesto(result.manifesto);
  }

  function handleApproveManifesto() {
    if (!generatedManifesto) return;
    setApprovedManifesto(approveManifesto(generatedManifesto));
  }

  function handleLockManifesto() {
    if (!approvedManifesto) return;
    setApprovedManifesto(lockManifesto(approvedManifesto));
  }

  const isLocked = approvedManifesto?.status === "locked";

  return (
    <section className="space-y-6 rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-6">
      <div>
        <h2 className="text-sm uppercase tracking-widest text-zinc-400">
          {text("manifestoInterview")}
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
          {text("manifestoInterviewDescription")}
        </p>
      </div>

      <label className="block">
        <span className="text-sm text-zinc-500">{text("brandType")}</span>

        <select
          value={brandType}
          disabled={isLocked}
          onChange={(event) => {
            setBrandType(event.target.value as BrandType);
            setAnswers({});
            setGeneratedManifesto(null);
            setApprovedManifesto(null);
          }}
          className="mt-2 w-full rounded-xl border border-[#e7e2d8] bg-white px-4 py-3 text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900"
        >
          {brandTypeDefinitions.map((definition) => (
            <option key={definition.type} value={definition.type}>
              {definition.label}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-4">
        {questions.map((question) => (
          <label
            key={question.id}
            className="block rounded-2xl border border-[#e7e2d8] bg-white p-5"
          >
            <span className="text-xs uppercase tracking-widest text-zinc-400">
              {question.category}
            </span>

            <span className="mt-2 block text-sm font-medium text-zinc-800">
              {question.question}
            </span>

            <textarea
              value={answers[question.id] ?? ""}
              disabled={isLocked}
              onChange={(event) =>
                updateAnswer(question.id, event.target.value)
              }
              rows={3}
              className="mt-3 w-full rounded-xl border border-[#e7e2d8] bg-[#fcfbf8] px-4 py-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={handleGenerateManifesto}
        disabled={isLocked}
        className="rounded-xl bg-zinc-900 px-5 py-3 font-medium text-white disabled:opacity-50"
      >
        {text("generateManifesto")}
      </button>

      {generatedManifesto && (
        <div className="space-y-5 rounded-2xl border border-[#e7e2d8] bg-white p-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">
              {text("manifestoStatus")}
            </div>

            <div className="mt-2 text-lg font-semibold text-zinc-900">
              {approvedManifesto
                ? `${approvedManifesto.status.toUpperCase()} / Version ${
                    approvedManifesto.version
                  }`
                : text("draftNotLocked")}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            {!approvedManifesto && (
              <button
                type="button"
                onClick={handleApproveManifesto}
                className="rounded-xl border border-[#e7e2d8] px-4 py-2 text-sm font-medium text-zinc-900"
              >
                {text("approveManifesto")}
              </button>
            )}

            {approvedManifesto?.status === "approved" && (
              <button
                type="button"
                onClick={handleLockManifesto}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
              >
                {text("lockManifesto")}
              </button>
            )}
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">
              {text("narrative")}
            </div>

            <div className="mt-4 rounded-xl border border-[#e7e2d8] bg-white p-4">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                {text("dominantPrinciple")}
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-zinc-900">
                    {generatedManifesto.dominantPrinciple.key ?? text("none")}
                  </span>

                  <span className="text-zinc-500">
                    {generatedManifesto.dominantPrinciple.score}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">{text("role")}</span>
                  <span className="text-zinc-900">
                    {generatedManifesto.dominantPrinciple.role}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">
                    {text("governancePriority")}
                  </span>
                  <span className="text-zinc-900">
                    {generatedManifesto.dominantPrinciple.governancePriority}
                  </span>
                </div>

                <div className="rounded-lg bg-zinc-50 p-3 text-sm text-zinc-600">
                  {generatedManifesto.dominantPrinciple.reason}
                </div>
              </div>
            </div>

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-600">
              {generatedManifesto.text}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#e7e2d8] bg-white p-4">
              <h4 className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
                {text("principles")}
              </h4>

              {generatedManifesto.principles.length > 0 ? (
                <ul className="space-y-1 text-sm text-zinc-700">
                  {generatedManifesto.principles.map((principle) => (
                    <li
                      key={principle}
                      className="flex items-center justify-between"
                    >
                      <span>{principle}</span>
                      <span className="text-zinc-400">
                        {generatedManifesto.principleScores.find(
                          (score) => score.key === principle,
                        )?.score ?? 0}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-400">
                  {text("noPrincipleSignals")}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-[#e7e2d8] bg-white p-4">
              <h4 className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
                {text("forbiddenDirections")}
              </h4>

              {generatedManifesto.forbiddenDirections.length > 0 ? (
                <ul className="space-y-1 text-sm text-zinc-700">
                  {generatedManifesto.forbiddenDirections.map((direction) => (
                    <li
                      key={direction}
                      className="flex items-center justify-between"
                    >
                      <span>{direction}</span>
                      <span className="text-zinc-400">
                        {generatedManifesto.forbiddenDirectionScores.find(
                          (score) => score.key === direction,
                        )?.score ?? 0}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-400">
                  {text("noForbiddenDirectionSignals")}
                </p>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-[#e7e2d8] bg-white p-4 md:col-span-2">
              <h4 className="mb-3 text-xs uppercase tracking-widest text-zinc-400">
                {text("generatedConstitution")}
              </h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ConstitutionList
                  title={text("corePrinciple")}
                  items={
                    generatedManifesto.constitution.corePrinciple
                      ? [generatedManifesto.constitution.corePrinciple]
                      : []
                  }
                  emptyText={text("noCorePrincipleDetected")}
                />

                <ConstitutionList
                  title={text("supportingPrinciples")}
                  items={generatedManifesto.constitution.supportingPrinciples}
                  emptyText={text("noSupportingPrinciplesDetected")}
                />

                <ConstitutionList
                  title={text("secondaryPrinciples")}
                  items={generatedManifesto.constitution.secondaryPrinciples}
                  emptyText={text("noSecondaryPrinciplesDetected")}
                />

                <ConstitutionList
                  title={text("forbiddenDirections")}
                  items={generatedManifesto.constitution.forbiddenDirections}
                  emptyText={text("noForbiddenDirectionsDetected")}
                />
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-zinc-400">
                  {text("decisionRules")}
                </p>

                <ul className="mt-2 space-y-2 text-sm text-zinc-700">
                  {generatedManifesto.constitution.decisionRules.length > 0 ? (
                    generatedManifesto.constitution.decisionRules.map(
                      (rule) => (
                        <li
                          key={rule.key}
                          className="rounded-lg bg-[#fcfbf8] p-3"
                        >
                          <span className="block text-xs uppercase tracking-widest text-zinc-400">
                            {rule.key}
                          </span>
                          <span>{rule.rule}</span>
                        </li>
                      ),
                    )
                  ) : (
                    <li className="text-zinc-400">
                      {text("noDecisionRulesGenerated")}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ConstitutionList({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-zinc-400">{title}</p>

      <ul className="mt-1 space-y-1 text-sm text-zinc-700">
        {items.length > 0 ? (
          items.map((item) => <li key={item}>{item}</li>)
        ) : (
          <li className="text-zinc-400">{emptyText}</li>
        )}
      </ul>
    </div>
  );
}
