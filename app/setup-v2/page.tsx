// Legacy setup-v2 preview only.
// Do not use this generator as the Brand Constitution source of truth.

"use client";

import { useMemo, useState } from "react";

import {
  emptyBrandInterview,
  type BrandInterview,
} from "@/src/lib/setup/setup-v2-types";
import { generateManifesto } from "@/src/lib/setup/manifesto-generator";
import { interviewSections } from "@/src/lib/setup/interview-schema";
import { generateConstitution } from "@/src/lib/setup/constitution-generator";

import { validateDecisionAgainstFoundation } from "@/src/lib/setup/decision-validator";

const SETUP_V2_STORAGE_KEY = "tilla-os.setup-v2";

export default function SetupV2Page() {
  const [currentSection, setCurrentSection] = useState(0);
  const [interview, setInterview] =
    useState<BrandInterview>(emptyBrandInterview);

  const [decisionDraft, setDecisionDraft] = useState("");

  const activeSection = interviewSections[currentSection];

  const manifesto = useMemo(() => generateManifesto(interview), [interview]);

  const constitution = useMemo(
    () => generateConstitution(manifesto),
    [manifesto],
  );

  const validation = useMemo(
    () =>
      validateDecisionAgainstFoundation({
        decision: decisionDraft,
        manifesto,
        constitution,
      }),
    [decisionDraft, manifesto, constitution],
  );

  function updateField(sectionId: string, fieldId: string, value: string) {
    setInterview((current) => ({
      ...current,
      [sectionId]: {
        ...current[sectionId as keyof BrandInterview],
        [fieldId]: value,
      },
    }));
  }

  function getFieldValue(sectionId: string, fieldId: string) {
    const section = interview[sectionId as keyof BrandInterview] as Record<
      string,
      string
    >;

    return section[fieldId] ?? "";
  }

  async function saveFoundation() {
    const response = await fetch("/api/workspace/brand-setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identity: {
          brandName: interview.identity.brandName,
          category: interview.identity.category,
          description: interview.identity.description,
          offering: interview.identity.offering,
          stage: interview.identity.stage,
        },

        positioning: {
          category: interview.identity.category,
          marketPosition: interview.identity.description,
          offer: interview.identity.offering,
          coreOffer: interview.identity.offering,
          promise: manifesto.mission,
          valueProposition: manifesto.transformation,
          differentiators: [
            interview.purpose.reasonToExist,
            interview.purpose.obsession,
            interview.transformation.transformation,
          ].filter(Boolean),
          proofPoints: [
            interview.principles.defend,
            interview.principles.boundaries,
            interview.constraints.nonNegotiables,
          ].filter(Boolean),
          ambition: [
            interview.ambition.future,
            interview.ambition.legacy,
            interview.ambition.change,
          ].filter(Boolean),
          constraints: [
            interview.constraints.limitations,
            interview.constraints.fixedResources,
            interview.constraints.nonNegotiables,
          ].filter(Boolean),
        },

        audience: {
          primaryAudience: interview.audience.idealAudience,
          primary: interview.audience.idealAudience,
          targetAudience: interview.audience.bestCustomer,
          desiredOutcome: interview.transformation.transformation,
          transformation: interview.transformation.after,
          needs: [
            interview.transformation.before,
            interview.audience.bestCustomer,
          ].filter(Boolean),
          painPoints: [
            interview.purpose.obsession,
            interview.constraints.limitations,
          ].filter(Boolean),
          barriers: [
            interview.audience.notFor,
            interview.constraints.limitations,
          ].filter(Boolean),
        },

        voice: {
          authorityThemes: [
            interview.principles.defend,
            interview.purpose.obsession,
          ].filter(Boolean),
        },

        visualDirection: {
          channels: [],
        },

        values: {
          principles: [
            interview.principles.never,
            interview.principles.defend,
            interview.principles.boundaries,
          ].filter(Boolean),
          proofSignals: [
            interview.principles.defend,
            interview.constraints.nonNegotiables,
          ].filter(Boolean),
          trustSignals: [
            interview.purpose.reasonToExist,
            interview.principles.defend,
          ].filter(Boolean),
          ambition: [
            interview.ambition.future,
            interview.ambition.legacy,
            interview.ambition.change,
          ].filter(Boolean),
          constraints: [
            interview.constraints.limitations,
            interview.constraints.fixedResources,
            interview.constraints.nonNegotiables,
          ].filter(Boolean),
        },

        manifesto: {
          identity: manifesto.identity,
          mission: manifesto.mission,
          transformation: manifesto.transformation,
          audience: manifesto.audience,
          principles: manifesto.principles,
          vision: manifesto.vision,
        },

        constitution,
      }),
    });

    if (!response.ok) {
      window.alert("Foundation could not be saved.");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            TILLA-OS
          </p>

          <h1 className="mt-2 text-4xl font-semibold">Brand Interview</h1>

          <p className="mt-2 text-zinc-400">
            Build the foundation of your venture.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr_360px]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="mb-4 text-sm font-medium text-zinc-400">Progress</h2>

            <div className="space-y-2">
              {interviewSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full rounded-xl px-3 py-3 text-left transition ${
                    currentSection === index
                      ? "bg-white text-black"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Section {currentSection + 1} / {interviewSections.length}
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {activeSection.title}
              </h2>

              <p className="mt-2 text-zinc-400">{activeSection.description}</p>
            </div>

            <div className="space-y-5">
              {activeSection.fields.map((field) => (
                <div key={field.id}>
                  <label className="mb-2 block text-sm text-zinc-400">
                    {field.label}
                  </label>

                  {field.multiline ? (
                    <textarea
                      value={getFieldValue(activeSection.id, field.id)}
                      onChange={(event) =>
                        updateField(
                          activeSection.id,
                          field.id,
                          event.target.value,
                        )
                      }
                      className="h-32 w-full rounded-xl border border-zinc-800 bg-black p-4 text-sm text-white outline-none transition focus:border-zinc-500"
                    />
                  ) : (
                    <input
                      value={getFieldValue(activeSection.id, field.id)}
                      onChange={(event) =>
                        updateField(
                          activeSection.id,
                          field.id,
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-black p-4 text-sm text-white outline-none transition focus:border-zinc-500"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                disabled={currentSection === 0}
                onClick={() =>
                  setCurrentSection((section) => Math.max(section - 1, 0))
                }
                className="rounded-xl border border-zinc-800 px-4 py-3 text-sm text-zinc-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {currentSection === interviewSections.length - 1 ? (
                <button
                  onClick={saveFoundation}
                  className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black"
                >
                  Save Foundation
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentSection((section) =>
                      Math.min(section + 1, interviewSections.length - 1),
                    )
                  }
                  className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-black"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="mb-6 text-xl font-semibold">Foundation Preview</h2>

            <div className="space-y-6">
              <ManifestoBlock title="Identity" value={manifesto.identity} />
              <ManifestoBlock title="Mission" value={manifesto.mission} />
              <ManifestoBlock
                title="Transformation"
                value={manifesto.transformation}
              />
              <ManifestoBlock title="Audience" value={manifesto.audience} />
              <ManifestoBlock
                title="Principles"
                value={
                  manifesto.principles.length > 0
                    ? manifesto.principles.join(" ")
                    : "Principles have not been defined yet."
                }
              />
              <ManifestoBlock title="Vision" value={manifesto.vision} />

              <ManifestoBlock
                title="Reject"
                value={
                  constitution.reject.length > 0
                    ? constitution.reject.join(", ")
                    : "No rules generated yet."
                }
              />

              <ManifestoBlock
                title="Prefer"
                value={
                  constitution.prefer.length > 0
                    ? constitution.prefer.join(", ")
                    : "No rules generated yet."
                }
              />

              <ManifestoBlock
                title="Product Rules"
                value={constitution.productRules.join(" ")}
              />

              <ManifestoBlock
                title="Marketing Rules"
                value={constitution.marketingRules.join(" ")}
              />

              <ManifestoBlock
                title="Customer Rules"
                value={constitution.customerRules.join(" ")}
              />

              <ManifestoBlock
                title="Growth Rules"
                value={constitution.growthRules.join(" ")}
              />

              <ManifestoBlock
                title="Boundaries"
                value={constitution.boundaries.join(" ")}
              />

              <div className="border-t border-zinc-800 pt-6">
                <h3 className="mb-3 text-sm uppercase tracking-wider text-zinc-500">
                  Decision Check
                </h3>

                <textarea
                  value={decisionDraft}
                  onChange={(event) => setDecisionDraft(event.target.value)}
                  placeholder="Write a decision to test..."
                  className="h-28 w-full rounded-xl border border-zinc-800 bg-black p-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
                />

                <div className="mt-4 rounded-2xl border border-zinc-800 bg-black p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      Alignment Score
                    </span>

                    <span className="text-lg font-semibold text-white">
                      {validation.score}%
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {validation.summary}
                  </p>

                  {validation.warnings.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {validation.warnings.map((warning) => (
                        <p key={warning} className="text-sm text-red-300">
                          {warning}
                        </p>
                      ))}
                    </div>
                  )}

                  {validation.matchedRules.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                        Matched Rules
                      </p>

                      <div className="space-y-2">
                        {validation.matchedRules.slice(0, 3).map((rule) => (
                          <p
                            key={rule}
                            className="text-xs leading-5 text-zinc-400"
                          >
                            {rule}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManifestoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <h3 className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
        {title}
      </h3>

      <p className="text-sm leading-6 text-zinc-300">
        {value || `${title} has not been defined yet.`}
      </p>
    </div>
  );
}
