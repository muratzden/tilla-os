export const LANGUAGE_PACK_SCHEMA_VERSION = "1.0.0";

export const LANGUAGE_PACK_RUNTIME_VERSION = "1.0.0";

export const REQUIRED_LANGUAGE_PACK_ROOT_KEYS = [
  "manifest",
  "outputPack",
] as const;

export const REQUIRED_LANGUAGE_PACK_MANIFEST_KEYS = [
  "id",
  "name",
  "nativeName",
  "description",
  "languageCode",
  "source",
  "version",
] as const;

export const REQUIRED_LANGUAGE_PACK_VERSION_KEYS = [
  "schemaVersion",
  "packVersion",
  "minRuntimeVersion",
] as const;

export const REQUIRED_OUTPUT_PACK_ROOT_KEYS = [
  "meta",
  "toneLabels",
  "auditLabels",
  "auditText",
  "governanceAuditText",
  "decisionLabels",
  "promptSections",
  "visualPromptText",
  "narrative",
  "expressions",
  "semantic",
  "advisor",
] as const;
