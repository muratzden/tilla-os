import type { BrandOperatingState } from "./types";

export const CURRENT_BRAND_OS_SCHEMA_VERSION = "brand-os-state-v1";

export interface BrandOSSchemaMigrationError {
  path: string;
  code: string;
  message: string;
}

export interface BrandOSSchemaMigrationResult {
  ok: boolean;
  state?: BrandOperatingState;
  errors: BrandOSSchemaMigrationError[];
}

export function isSupportedBrandOSSchemaVersion(
  version: unknown,
): version is typeof CURRENT_BRAND_OS_SCHEMA_VERSION {
  return version === CURRENT_BRAND_OS_SCHEMA_VERSION;
}

export function migrateBrandOSState(
  state: unknown,
): BrandOSSchemaMigrationResult {
  if (!state || typeof state !== "object" || Array.isArray(state)) {
    return {
      ok: false,
      errors: [
        {
          path: "state",
          code: "invalid_type",
          message: "State must be an object before migration.",
        },
      ],
    };
  }

  const candidate = state as Record<string, unknown>;

  if (!("schemaVersion" in candidate)) {
    return {
      ok: false,
      errors: [
        {
          path: "schemaVersion",
          code: "required",
          message: "schemaVersion is required.",
        },
      ],
    };
  }

  if (!isSupportedBrandOSSchemaVersion(candidate.schemaVersion)) {
    return {
      ok: false,
      errors: [
        {
          path: "schemaVersion",
          code: "unsupported_schema_version",
          message: `Unsupported Brand OS schema version: ${String(candidate.schemaVersion)}.`,
        },
      ],
    };
  }

  return {
    ok: true,
    state: state as BrandOperatingState,
    errors: [],
  };
}
