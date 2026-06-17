import { normalizeBrandOSInput, normalizeBrandOSUpdate } from "./normalization";
import type { BrandOSUpdateInput, BrandSeedInput, ValidationIssue, ValidationResult } from "./types";

const MAX_TEXT_LENGTH = 240;
const MAX_ARRAY_ITEM_LENGTH = 160;
const MAX_ARRAY_LENGTH = 24;
const UPDATE_GROUPS = ["audience", "positioning", "trust", "authority", "offer", "channels", "growth"] as const;

function issue(field: string, code: ValidationIssue["code"], message: string, maxLength?: number): ValidationIssue {
  return { field, code, message, ...(maxLength ? { maxLength } : {}) };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateRequiredText(raw: unknown, field: string, maxLength: number, errors: ValidationIssue[]): void {
  if (typeof raw !== "string") {
    errors.push(issue(field, "invalid_type", `${field} must be a string.`));
    return;
  }

  const value = raw.replace(/\s+/g, " ").trim();

  if (value.length === 0) {
    errors.push(issue(field, "empty", `${field} cannot be empty.`));
  }

  if (value.length > maxLength) {
    errors.push(issue(field, "too_long", `${field} must be ${maxLength} characters or fewer.`, maxLength));
  }
}

function validateOptionalText(raw: unknown, field: string, errors: ValidationIssue[]): void {
  if (raw === null || raw === undefined) return;

  if (typeof raw !== "string") {
    errors.push(issue(field, "invalid_type", `${field} must be a string.`));
    return;
  }

  if (raw.replace(/\s+/g, " ").trim().length > MAX_TEXT_LENGTH) {
    errors.push(issue(field, "too_long", `${field} must be ${MAX_TEXT_LENGTH} characters or fewer.`, MAX_TEXT_LENGTH));
  }
}

function validateOptionalStringArray(raw: unknown, field: string, errors: ValidationIssue[]): void {
  if (raw === undefined) return;

  if (!Array.isArray(raw)) {
    errors.push(issue(field, "invalid_type", `${field} must be an array of strings.`));
    return;
  }

  if (raw.length > MAX_ARRAY_LENGTH) {
    errors.push(issue(field, "too_long", `${field} must include ${MAX_ARRAY_LENGTH} items or fewer.`, MAX_ARRAY_LENGTH));
  }

  raw.forEach((item, index) => {
    if (typeof item !== "string") {
      errors.push(issue(`${field}.${index}`, "invalid_type", `${field}.${index} must be a string.`));
      return;
    }

    if (item.replace(/\s+/g, " ").trim().length > MAX_ARRAY_ITEM_LENGTH) {
      errors.push(
        issue(
          `${field}.${index}`,
          "too_long",
          `${field}.${index} must be ${MAX_ARRAY_ITEM_LENGTH} characters or fewer.`,
          MAX_ARRAY_ITEM_LENGTH
        )
      );
    }
  });
}

function validateKnownFields(raw: Record<string, unknown>, allowed: readonly string[], path: string, errors: ValidationIssue[]): void {
  for (const key of Object.keys(raw)) {
    if (!allowed.includes(key)) {
      errors.push(issue(path ? `${path}.${key}` : key, "unknown_field", `${key} is not supported here.`));
    }
  }
}

export function validateBrandOSInput(raw: unknown): ValidationResult<BrandSeedInput> {
  const errors: ValidationIssue[] = [];

  if (!isRecord(raw)) {
    return {
      ok: false,
      errors: [issue("input", "invalid_type", "Input must be an object.")]
    };
  }

  validateKnownFields(raw, ["idea", "brandType"], "", errors);
  validateRequiredText(raw.idea, "idea", MAX_TEXT_LENGTH, errors);
  validateRequiredText(raw.brandType, "brandType", 80, errors);

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: normalizeBrandOSInput(raw as unknown as BrandSeedInput),
    errors: []
  };
}

export function validateBrandOSUpdate(raw: unknown): ValidationResult<BrandOSUpdateInput> {
  const errors: ValidationIssue[] = [];

  if (!isRecord(raw)) {
    return {
      ok: false,
      errors: [issue("update", "invalid_type", "Update must be an object.")]
    };
  }

  validateKnownFields(raw, UPDATE_GROUPS, "", errors);

  for (const group of UPDATE_GROUPS) {
    const value = raw[group];
    if (value === undefined) continue;

    if (!isRecord(value)) {
      errors.push(issue(group, "invalid_type", `${group} must be an object.`));
    }
  }

  const audience = raw.audience;
  if (isRecord(audience)) {
    validateKnownFields(audience, ["primary", "needs", "barriers", "desiredOutcome"], "audience", errors);
    validateOptionalText(audience.primary, "audience.primary", errors);
    validateOptionalStringArray(audience.needs, "audience.needs", errors);
    validateOptionalStringArray(audience.barriers, "audience.barriers", errors);
    validateOptionalText(audience.desiredOutcome, "audience.desiredOutcome", errors);
  }

  const positioning = raw.positioning;
  if (isRecord(positioning)) {
    validateKnownFields(positioning, ["category", "promise", "differentiators", "proofPoints"], "positioning", errors);
    validateOptionalText(positioning.category, "positioning.category", errors);
    validateOptionalText(positioning.promise, "positioning.promise", errors);
    validateOptionalStringArray(positioning.differentiators, "positioning.differentiators", errors);
    validateOptionalStringArray(positioning.proofPoints, "positioning.proofPoints", errors);
  }

  const trust = raw.trust;
  if (isRecord(trust)) {
    validateKnownFields(trust, ["signals", "gaps"], "trust", errors);
    validateOptionalStringArray(trust.signals, "trust.signals", errors);
    validateOptionalStringArray(trust.gaps, "trust.gaps", errors);
  }

  const authority = raw.authority;
  if (isRecord(authority)) {
    validateKnownFields(authority, ["themes", "evidence", "gaps"], "authority", errors);
    validateOptionalStringArray(authority.themes, "authority.themes", errors);
    validateOptionalStringArray(authority.evidence, "authority.evidence", errors);
    validateOptionalStringArray(authority.gaps, "authority.gaps", errors);
  }

  const offer = raw.offer;
  if (isRecord(offer)) {
    validateKnownFields(offer, ["core", "outcomes", "constraints"], "offer", errors);
    validateOptionalText(offer.core, "offer.core", errors);
    validateOptionalStringArray(offer.outcomes, "offer.outcomes", errors);
    validateOptionalStringArray(offer.constraints, "offer.constraints", errors);
  }

  const channels = raw.channels;
  if (isRecord(channels)) {
    validateKnownFields(channels, ["primary", "secondary", "experiments"], "channels", errors);
    validateOptionalStringArray(channels.primary, "channels.primary", errors);
    validateOptionalStringArray(channels.secondary, "channels.secondary", errors);
    validateOptionalStringArray(channels.experiments, "channels.experiments", errors);
  }

  const growth = raw.growth;
  if (isRecord(growth)) {
    validateKnownFields(growth, ["objectives", "loops", "constraints"], "growth", errors);
    validateOptionalStringArray(growth.objectives, "growth.objectives", errors);
    validateOptionalStringArray(growth.loops, "growth.loops", errors);
    validateOptionalStringArray(growth.constraints, "growth.constraints", errors);
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: normalizeBrandOSUpdate(raw as BrandOSUpdateInput),
    errors: []
  };
}
