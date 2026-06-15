import type { OutputPack } from "./output-pack-types";

type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateOutputPack(pack: unknown): ValidationResult {
  const errors: string[] = [];

  if (!pack || typeof pack !== "object") {
    return {
      valid: false,
      errors: ["Output pack must be an object."],
    };
  }

  const candidate = pack as Partial<OutputPack>;

  if (!candidate.meta) errors.push("Missing meta.");
  if (!candidate.toneLabels) errors.push("Missing toneLabels.");
  if (!candidate.auditLabels) errors.push("Missing auditLabels.");
  if (!candidate.decisionLabels) errors.push("Missing decisionLabels.");
  if (!candidate.promptSections) errors.push("Missing promptSections.");

  if (candidate.meta) {
    if (!candidate.meta.id) errors.push("Missing meta.id.");
    if (!candidate.meta.name) errors.push("Missing meta.name.");
    if (!candidate.meta.nativeName) errors.push("Missing meta.nativeName.");
    if (!candidate.meta.version) errors.push("Missing meta.version.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
