import type {
  BrandLifecycleStage,
  BrandOperatingState,
  DecisionArea,
  IntelligencePackId,
  ScoreDimension,
  StudioId,
} from "./types";
import { isSupportedBrandOSSchemaVersion } from "./schema";

export interface StateValidationError {
  path: string;
  code: string;
  message: string;
}

export interface StateValidationResult {
  valid: boolean;
  errors: StateValidationError[];
}

const LIFECYCLE_STAGES: BrandLifecycleStage[] = [
  "idea",
  "foundation",
  "positioning",
  "trust_building",
  "authority_building",
  "growth",
  "optimization",
];

const SCORE_DIMENSIONS: ScoreDimension[] = [
  "clarity",
  "audienceFit",
  "differentiation",
  "trust",
  "authority",
  "consistency",
  "growthReadiness",
];

const DECISION_AREAS: DecisionArea[] = [
  "positioning",
  "audience",
  "offer",
  "trust",
  "authority",
  "content",
  "channel",
  "growth",
];
const STUDIO_IDS: StudioId[] = [
  "foundation",
  "positioning",
  "offer",
  "content",
  "authority",
  "campaign",
  "visual",
  "growth",
];
const PACK_IDS: IntelligencePackId[] = [
  "coffee",
  "dental",
  "hospitality",
  "restaurant",
  "saas",
  "creator",
  "local_service",
  "personal_brand",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function addError(
  errors: StateValidationError[],
  path: string,
  code: string,
  message: string,
): void {
  errors.push({ path, code, message });
}

function isMeaningfulString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateRecord(
  value: unknown,
  path: string,
  errors: StateValidationError[],
): value is Record<string, unknown> {
  if (!isRecord(value)) {
    addError(errors, path, "invalid_type", `${path} must be an object.`);
    return false;
  }

  return true;
}

function validateString(
  value: unknown,
  path: string,
  errors: StateValidationError[],
  allowNull = false,
): void {
  if (allowNull && value === null) return;

  if (!isMeaningfulString(value)) {
    addError(
      errors,
      path,
      "invalid_string",
      `${path} must be a meaningful string.`,
    );
  }
}

function validateStringArray(
  value: unknown,
  path: string,
  errors: StateValidationError[],
): void {
  if (!Array.isArray(value)) {
    addError(errors, path, "invalid_type", `${path} must be an array.`);
    return;
  }

  value.forEach((item, index) => {
    if (typeof item !== "string") {
      addError(
        errors,
        `${path}.${index}`,
        "invalid_type",
        `${path}.${index} must be a string.`,
      );
    }
  });
}

function validateProfile(
  value: unknown,
  path: string,
  fields: Array<{ key: string; kind: "nullableString" | "stringArray" }>,
  errors: StateValidationError[],
): void {
  if (!validateRecord(value, path, errors)) return;

  for (const field of fields) {
    const fieldPath = `${path}.${field.key}`;
    if (!(field.key in value)) {
      addError(errors, fieldPath, "required", `${fieldPath} is required.`);
      continue;
    }

    if (field.kind === "nullableString") {
      validateString(value[field.key], fieldPath, errors, true);
    } else {
      validateStringArray(value[field.key], fieldPath, errors);
    }
  }
}

function validateMemory(value: unknown, errors: StateValidationError[]): void {
  if (!validateRecord(value, "memory", errors)) return;

  for (const key of [
    "entries",
    "events",
    "observations",
    "decisions",
    "decisionOutcomes",
    "scoreSnapshots",
    "lifecycleTransitions",
    "unresolvedQuestions",
    "openQuestions",
  ]) {
    if (!Array.isArray(value[key])) {
      addError(
        errors,
        `memory.${key}`,
        "invalid_type",
        `memory.${key} must be an array.`,
      );
    }
  }

  validateString(value.lastUpdatedAt, "memory.lastUpdatedAt", errors);
}

function validateScoreDimension(
  value: unknown,
  path: string,
  errors: StateValidationError[],
): void {
  if (!validateRecord(value, path, errors)) return;

  if (typeof value.score !== "number" || value.score < 0 || value.score > 100) {
    addError(
      errors,
      `${path}.score`,
      "invalid_score",
      `${path}.score must be a number from 0 to 100.`,
    );
  }

  validateStringArray(value.reasons, `${path}.reasons`, errors);
  validateStringArray(value.missingInputs, `${path}.missingInputs`, errors);
  validateStringArray(value.evidence, `${path}.evidence`, errors);
  validateStringArray(value.penalties, `${path}.penalties`, errors);
}

function validateScore(value: unknown, errors: StateValidationError[]): void {
  if (!validateRecord(value, "score", errors)) return;

  for (const dimension of SCORE_DIMENSIONS) {
    if (!(dimension in value)) {
      addError(
        errors,
        `score.${dimension}`,
        "required",
        `score.${dimension} is required.`,
      );
      continue;
    }

    validateScoreDimension(value[dimension], `score.${dimension}`, errors);
  }
}

function validateMissionControl(
  value: unknown,
  errors: StateValidationError[],
): void {
  if (!validateRecord(value, "missionControl", errors)) return;

  if (typeof value.readinessScore !== "number") {
    addError(
      errors,
      "missionControl.readinessScore",
      "invalid_type",
      "readinessScore must be a number.",
    );
  }

  if (!SCORE_DIMENSIONS.includes(value.bottleneck as ScoreDimension)) {
    addError(
      errors,
      "missionControl.bottleneck",
      "invalid_value",
      "bottleneck must be a score dimension.",
    );
  }

  if (!STUDIO_IDS.includes(value.recommendedStudio as StudioId)) {
    addError(
      errors,
      "missionControl.recommendedStudio",
      "invalid_value",
      "recommendedStudio must be a studio id.",
    );
  }

  validateString(value.diagnosis, "missionControl.diagnosis", errors);
  validateString(value.nextBestAction, "missionControl.nextBestAction", errors);
  validateString(value.strategicFocus, "missionControl.strategicFocus", errors);
  validateStringArray(
    value.missingInputs,
    "missionControl.missingInputs",
    errors,
  );
  validateStringArray(value.actionPlan, "missionControl.actionPlan", errors);
  validateStringArray(
    value.expectedImpact,
    "missionControl.expectedImpact",
    errors,
  );

  if (!Array.isArray(value.rankedBottlenecks)) {
    addError(
      errors,
      "missionControl.rankedBottlenecks",
      "invalid_type",
      "rankedBottlenecks must be an array.",
    );
  }
}

function validateStudios(value: unknown, errors: StateValidationError[]): void {
  if (!Array.isArray(value)) {
    addError(errors, "studios", "invalid_type", "studios must be an array.");
    return;
  }

  value.forEach((studio, index) => {
    const path = `studios.${index}`;
    if (!validateRecord(studio, path, errors)) return;

    if (!STUDIO_IDS.includes(studio.id as StudioId)) {
      addError(
        errors,
        `${path}.id`,
        "invalid_value",
        `${path}.id must be a supported studio id.`,
      );
    }

    validateString(studio.name, `${path}.name`, errors);
    validateString(studio.purpose, `${path}.purpose`, errors);
    validateStringArray(studio.inputs, `${path}.inputs`, errors);
    validateStringArray(studio.outputs, `${path}.outputs`, errors);

    if (!Array.isArray(studio.decisionAreas)) {
      addError(
        errors,
        `${path}.decisionAreas`,
        "invalid_type",
        `${path}.decisionAreas must be an array.`,
      );
    } else {
      studio.decisionAreas.forEach((area, areaIndex) => {
        if (!DECISION_AREAS.includes(area as DecisionArea)) {
          addError(
            errors,
            `${path}.decisionAreas.${areaIndex}`,
            "invalid_value",
            "decision area is not supported.",
          );
        }
      });
    }
  });
}

function validateIntelligencePacks(
  value: unknown,
  errors: StateValidationError[],
): void {
  if (!Array.isArray(value)) {
    addError(
      errors,
      "intelligencePacks",
      "invalid_type",
      "intelligencePacks must be an array.",
    );
    return;
  }

  value.forEach((pack, index) => {
    const path = `intelligencePacks.${index}`;
    if (!validateRecord(pack, path, errors)) return;

    if (!PACK_IDS.includes(pack.id as IntelligencePackId)) {
      addError(
        errors,
        `${path}.id`,
        "invalid_value",
        `${path}.id must be a supported pack id.`,
      );
    }

    if (pack.status !== "metadata_only") {
      addError(
        errors,
        `${path}.status`,
        "invalid_value",
        `${path}.status must be metadata_only.`,
      );
    }

    validateString(pack.label, `${path}.label`, errors);
    validateStringArray(pack.appliesTo, `${path}.appliesTo`, errors);
    validateString(pack.description, `${path}.description`, errors);
  });
}

export function validateBrandOperatingState(
  state: unknown,
): StateValidationResult {
  const errors: StateValidationError[] = [];

  if (!validateRecord(state, "state", errors)) {
    return { valid: false, errors };
  }

  validateString(state.id, "id", errors);
  validateString(state.createdAt, "createdAt", errors);

  if (!("schemaVersion" in state)) {
    addError(errors, "schemaVersion", "required", "schemaVersion is required.");
  } else if (!isSupportedBrandOSSchemaVersion(state.schemaVersion)) {
    addError(
      errors,
      "schemaVersion",
      "unsupported_schema_version",
      "schemaVersion is not supported.",
    );
  }

  if (!LIFECYCLE_STAGES.includes(state.lifecycleStage as BrandLifecycleStage)) {
    addError(
      errors,
      "lifecycleStage",
      "invalid_value",
      "lifecycleStage must be a supported lifecycle stage.",
    );
  }

  if (validateRecord(state.brand, "brand", errors)) {
    validateString(state.brand.idea, "brand.idea", errors);
    validateString(state.brand.brandType, "brand.brandType", errors);
  }

  validateProfile(
    state.audience,
    "audience",
    [
      { key: "primary", kind: "nullableString" },
      { key: "needs", kind: "stringArray" },
      { key: "barriers", kind: "stringArray" },
      { key: "desiredOutcome", kind: "nullableString" },
    ],
    errors,
  );
  validateProfile(
    state.positioning,
    "positioning",
    [
      { key: "category", kind: "nullableString" },
      { key: "promise", kind: "nullableString" },
      { key: "differentiators", kind: "stringArray" },
      { key: "proofPoints", kind: "stringArray" },
    ],
    errors,
  );
  validateProfile(
    state.offer,
    "offer",
    [
      { key: "core", kind: "nullableString" },
      { key: "outcomes", kind: "stringArray" },
      { key: "constraints", kind: "stringArray" },
    ],
    errors,
  );
  validateProfile(
    state.channels,
    "channels",
    [
      { key: "primary", kind: "stringArray" },
      { key: "secondary", kind: "stringArray" },
      { key: "experiments", kind: "stringArray" },
    ],
    errors,
  );
  validateMemory(state.memory, errors);
  validateScore(state.score, errors);
  validateMissionControl(state.missionControl, errors);
  validateStudios(state.studios, errors);
  validateIntelligencePacks(state.intelligencePacks, errors);

  if (!Array.isArray(state.decisions)) {
    addError(
      errors,
      "decisions",
      "invalid_type",
      "decisions must be an array.",
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
