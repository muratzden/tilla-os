import type { OutputPack } from "@/src/lib/i18n/output-packs/output-pack-types";

export type LanguagePackInstallSource =
  | "system"
  | "imported"
  | "marketplace";

export type LanguagePackVersion = {
  schemaVersion: string;
  packVersion: string;
  minRuntimeVersion: string;
};

export type LanguagePackSignature = {
  algorithm: "sha256";
  hash: string;
  signedAt: string;
  issuer: "tilla-marketplace";
};

export type ImportedLanguagePackManifest = {
  id: string;
  name: string;
  nativeName: string;
  description: string;
  languageCode: string;
  source: LanguagePackInstallSource;
  version: LanguagePackVersion;
  signature?: LanguagePackSignature;
};

export type ImportedLanguagePack = {
  manifest: ImportedLanguagePackManifest;
  outputPack: OutputPack;
};

export type InstalledLanguagePackRecord = {
  language: string;
  source: LanguagePackInstallSource;
  installedAt: string;
  version: string;
};

export type InstalledLanguagePackRepositoryRecord = {
  manifest: ImportedLanguagePackManifest;
  outputPack: OutputPack;
};

export type LanguagePackVersionRecord = {
  manifest: ImportedLanguagePackManifest;
  outputPack: OutputPack;
};

export type LanguagePackRegistryRecord = {
  latestVersion: string;
  versions: Record<string, LanguagePackVersionRecord>;
};

export type InstalledLanguagePackRepository =
  Record<string, LanguagePackRegistryRecord>;

export type WorkspaceLanguageInstallRecord = {
  language: string;
  packageId?: string;
  version?: string;
  source: LanguagePackInstallSource;
  installedAt: string;
};

export type WorkspaceLanguageVersionHistoryEntry = {
  language: string;
  packageId: string;
  version: string;
  activatedAt: string;
};

export type WorkspaceLanguageState = {
  installed: string[];
  active: string;
  installs?: Record<string, WorkspaceLanguageInstallRecord>;
  versionHistory?: WorkspaceLanguageVersionHistoryEntry[];
};

export type LanguagePackStorage = Record<
  string,
  {
    workspace: WorkspaceLanguageState;
  }
>;

export type LanguagePackValidationIssue = {
  path: string;
  message: string;
};

export type LanguagePackValidationResult = {
  valid: boolean;
  issues: LanguagePackValidationIssue[];
};