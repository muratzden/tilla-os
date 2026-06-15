import {
  ManifestoDraft,
  ManifestoValidationResult,
} from "./manifesto-builder-types";

export function validateManifesto(
  draft: ManifestoDraft,
): ManifestoValidationResult {
  const warnings: string[] = [];

  if (!draft.narrative.trim()) {
    warnings.push("Manifesto narrative is required.");
  }

  if (draft.principles.length < 3) {
    warnings.push("At least 3 manifesto principles are required.");
  }

  if (draft.forbiddenDirections.length < 1) {
    warnings.push("At least 1 forbidden direction is required.");
  }

  const score = Math.max(0, 100 - warnings.length * 25);

  return {
    valid: warnings.length === 0,
    score,
    warnings,
  };
}
