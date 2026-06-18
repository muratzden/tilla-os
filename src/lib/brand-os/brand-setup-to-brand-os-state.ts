import {
  applyBrandInput,
  initializeBrandOS,
} from "@/src/core/brand-os/state-engine";
import type { BrandOperatingState } from "@/src/core/brand-os/types";
import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";
import { normalizeBrandSetup } from "@/src/lib/brand/setup/default-brand-setup";

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

function textFromUnknown(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

function readString(record: unknown, key: string): string | null {
  if (!record || typeof record !== "object") return null;

  const value = (record as Record<string, unknown>)[key];

  return textFromUnknown(value);
}

function readList(record: unknown, key: string): string[] {
  if (!record || typeof record !== "object") return [];

  const value = (record as Record<string, unknown>)[key];

  return listFromUnknown(value);
}

export function createBrandOSStateFromBrandSetup(
  brandSetupInput: BrandSetup,
): BrandOperatingState {
  const brandSetup = normalizeBrandSetup(brandSetupInput);

  const identity = brandSetup.identity as unknown;
  const positioning = brandSetup.positioning as unknown;
  const audience = brandSetup.audience as unknown;
  const voice = brandSetup.voice as unknown;
  const visualDirection = brandSetup.visualDirection as unknown;
  const values = brandSetup.values as unknown;

  const brandIdea =
    readString(identity, "brandName") ||
    readString(identity, "name") ||
    readString(positioning, "marketPosition") ||
    "A new brand workspace";

  const brandType =
    readString(identity, "brandType") ||
    readString(positioning, "marketPosition") ||
    "brand";

  const initialized = initializeBrandOS({
    idea: brandIdea,
    brandType,
  });

  const primaryAudience =
    readString(audience, "primaryAudience") ||
    readString(audience, "primary") ||
    readString(audience, "targetAudience");

  const desiredOutcome =
    readString(audience, "desiredOutcome") ||
    readString(audience, "transformation");

  const category =
    readString(positioning, "category") ||
    readString(positioning, "marketPosition");

  const promise =
    readString(positioning, "promise") ||
    readString(positioning, "valueProposition");

  const coreOffer =
    readString(positioning, "offer") ||
    readString(positioning, "coreOffer");

  const updated = applyBrandInput(initialized.state, {
    audience: {
      primary: primaryAudience,
      needs: [
        ...readList(audience, "needs"),
        ...readList(audience, "painPoints"),
      ],
      barriers: [
        ...readList(audience, "barriers"),
        ...readList(audience, "objections"),
      ],
      desiredOutcome,
    },
    positioning: {
      category,
      promise,
      differentiators: [
        ...readList(positioning, "differentiators"),
        ...readList(positioning, "difference"),
      ],
      proofPoints: [
        ...readList(positioning, "proofPoints"),
        ...readList(values, "proofSignals"),
      ],
    },
    trust: {
      signals: [
        ...readList(values, "proofSignals"),
        ...readList(values, "trustSignals"),
      ],
    },
    authority: {
      themes: [
        ...readList(voice, "authorityThemes"),
        ...readList(values, "principles"),
      ],
      evidence: [
        ...readList(values, "proofSignals"),
        ...readList(positioning, "proofPoints"),
      ],
    },
    offer: {
      core: coreOffer,
      outcomes: listFromUnknown(desiredOutcome),
      constraints: [
        ...readList(values, "constraints"),
        ...readList(positioning, "constraints"),
      ],
    },
    channels: {
      primary: [
        ...readList(visualDirection, "channels"),
        ...readList(positioning, "channels"),
      ],
    },
    growth: {
      objectives: [
        ...readList(positioning, "ambition"),
        ...readList(values, "ambition"),
      ],
      constraints: [
        ...readList(values, "constraints"),
        ...readList(positioning, "constraints"),
      ],
    },
  });

  return updated.state;
}