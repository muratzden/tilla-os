import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";
import { normalizeBrandSetup } from "@/src/lib/brand/setup/default-brand-setup";

function textFromUnknown(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

function listFromUnknown(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n|,|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function readString(record: unknown, key: string): string | null {
  if (!record || typeof record !== "object") return null;

  return textFromUnknown((record as Record<string, unknown>)[key]);
}

function readList(record: unknown, key: string): string[] {
  if (!record || typeof record !== "object") return [];

  return listFromUnknown((record as Record<string, unknown>)[key]);
}

function pushAnswer(
  answers: string[],
  label: string,
  value: string | null | undefined,
): void {
  if (!value) return;

  answers.push(`${label}: ${value}`);
}

function pushListAnswer(
  answers: string[],
  label: string,
  values: string[],
): void {
  if (values.length === 0) return;

  answers.push(`${label}: ${values.join(", ")}`);
}

export function extractFounderAnswersFromBrandSetup(
  brandSetupInput: BrandSetup,
): string[] {
  const brandSetup = normalizeBrandSetup(brandSetupInput);

  const identity = brandSetup.identity as unknown;
  const positioning = brandSetup.positioning as unknown;
  const audience = brandSetup.audience as unknown;
  const voice = brandSetup.voice as unknown;
  const visualDirection = brandSetup.visualDirection as unknown;
  const values = brandSetup.values as unknown;
  const manifesto = brandSetup.manifesto as unknown;

  const answers: string[] = [];

  pushAnswer(answers, "Brand name", readString(identity, "brandName"));
  pushAnswer(answers, "Brand type", readString(identity, "brandType"));

  pushAnswer(answers, "Market position", readString(positioning, "marketPosition"));
  pushAnswer(answers, "Category", readString(positioning, "category"));
  pushAnswer(answers, "Promise", readString(positioning, "promise"));
  pushAnswer(answers, "Value proposition", readString(positioning, "valueProposition"));
  pushAnswer(answers, "Core offer", readString(positioning, "offer") ?? readString(positioning, "coreOffer"));

  pushListAnswer(answers, "Differentiators", [
    ...readList(positioning, "differentiators"),
    ...readList(positioning, "difference"),
  ]);

  pushListAnswer(answers, "Proof points", [
    ...readList(positioning, "proofPoints"),
    ...readList(values, "proofSignals"),
  ]);

  pushAnswer(answers, "Primary audience", readString(audience, "primaryAudience") ?? readString(audience, "primary") ?? readString(audience, "targetAudience"));
  pushAnswer(answers, "Desired outcome", readString(audience, "desiredOutcome") ?? readString(audience, "transformation"));

  pushListAnswer(answers, "Audience needs", [
    ...readList(audience, "needs"),
    ...readList(audience, "painPoints"),
  ]);

  pushListAnswer(answers, "Audience barriers", [
    ...readList(audience, "barriers"),
    ...readList(audience, "objections"),
  ]);

  pushListAnswer(answers, "Authority themes", [
    ...readList(voice, "authorityThemes"),
    ...readList(values, "principles"),
  ]);

  pushListAnswer(answers, "Trust signals", [
    ...readList(values, "trustSignals"),
    ...readList(values, "proofSignals"),
  ]);

  pushListAnswer(answers, "Channels", [
    ...readList(visualDirection, "channels"),
    ...readList(positioning, "channels"),
  ]);

  pushListAnswer(answers, "Growth ambition", [
    ...readList(positioning, "ambition"),
    ...readList(values, "ambition"),
  ]);

  pushListAnswer(answers, "Constraints", [
    ...readList(values, "constraints"),
    ...readList(positioning, "constraints"),
  ]);

  pushAnswer(answers, "Manifesto", readString(manifesto, "statement") ?? readString(manifesto, "principle"));

  return Array.from(new Set(answers));
}