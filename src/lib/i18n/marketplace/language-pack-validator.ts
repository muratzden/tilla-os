import type {
  ImportedLanguagePack,
  LanguagePackValidationIssue,
  LanguagePackValidationResult,
} from "./marketplace-types";

import {
  LANGUAGE_PACK_RUNTIME_VERSION,
  LANGUAGE_PACK_SCHEMA_VERSION,
  REQUIRED_LANGUAGE_PACK_MANIFEST_KEYS,
  REQUIRED_LANGUAGE_PACK_ROOT_KEYS,
  REQUIRED_LANGUAGE_PACK_VERSION_KEYS,
  REQUIRED_OUTPUT_PACK_ROOT_KEYS,
} from "./language-pack-schema";

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function addMissingKeyIssues(
  target: Record<string, unknown>,
  requiredKeys: readonly string[],
  path: string,
  issues: LanguagePackValidationIssue[]
) {
  for (const key of requiredKeys) {
    if (!(key in target)) {
      issues.push({
        path: `${path}.${key}`,
        message: `Missing required key '${key}'`,
      });
    }
  }
}

export function validateLanguagePack(
  pack: unknown
): LanguagePackValidationResult {
  const issues: LanguagePackValidationIssue[] = [];

  if (!isObject(pack)) {
    return {
      valid: false,
      issues: [
        {
          path: "$",
          message: "Language pack must be an object",
        },
      ],
    };
  }

  addMissingKeyIssues(
    pack,
    REQUIRED_LANGUAGE_PACK_ROOT_KEYS,
    "$",
    issues
  );

  const manifest = pack.manifest;

  if (!isObject(manifest)) {
    issues.push({
      path: "$.manifest",
      message: "Manifest must be an object",
    });
  } else {
    addMissingKeyIssues(
      manifest,
      REQUIRED_LANGUAGE_PACK_MANIFEST_KEYS,
      "$.manifest",
      issues
    );

    const version = manifest.version;

    if (!isObject(version)) {
      issues.push({
        path: "$.manifest.version",
        message: "Manifest version must be an object",
      });
    } else {
      addMissingKeyIssues(
        version,
        REQUIRED_LANGUAGE_PACK_VERSION_KEYS,
        "$.manifest.version",
        issues
      );

      if (version.schemaVersion !== LANGUAGE_PACK_SCHEMA_VERSION) {
        issues.push({
          path: "$.manifest.version.schemaVersion",
          message: `Unsupported schema version '${String(
            version.schemaVersion
          )}'. Expected '${LANGUAGE_PACK_SCHEMA_VERSION}'`,
        });
      }

      if (version.minRuntimeVersion !== LANGUAGE_PACK_RUNTIME_VERSION) {
        issues.push({
          path: "$.manifest.version.minRuntimeVersion",
          message: `Unsupported runtime version '${String(
            version.minRuntimeVersion
          )}'. Expected '${LANGUAGE_PACK_RUNTIME_VERSION}'`,
        });
      }
    }
  }

  const outputPack = pack.outputPack;

  if (!isObject(outputPack)) {
    issues.push({
      path: "$.outputPack",
      message: "Output pack must be an object",
    });
  } else {
    addMissingKeyIssues(
      outputPack,
      REQUIRED_OUTPUT_PACK_ROOT_KEYS,
      "$.outputPack",
      issues
    );
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function assertValidLanguagePack(
  pack: unknown
): asserts pack is ImportedLanguagePack {
  const result = validateLanguagePack(pack);

  if (!result.valid) {
    throw new Error(
      result.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("\n")
    );
  }
}