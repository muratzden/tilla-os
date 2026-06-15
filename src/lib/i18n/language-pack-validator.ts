import type { LanguagePack } from "./language-pack-types";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasPath(source: Record<string, unknown>, path: string): boolean {
  const parts = path.split(".");
  let current: unknown = source;

  for (const part of parts) {
    if (!isObject(current)) return false;
    if (!(part in current)) return false;
    current = current[part];
  }

  return typeof current === "string";
}

export const requiredLanguagePackPaths = [
  "meta.id",
  "meta.language",
  "meta.name",
  "meta.nativeName",
  "meta.version",
  "meta.source",

  "dashboard.appTitle",
  "dashboard.appSubtitle",

  "dashboard.navigation.overview",
  "dashboard.navigation.foundation",
  "dashboard.navigation.manifesto",
  "dashboard.navigation.constitution",
  "dashboard.navigation.governance",
  "dashboard.navigation.audit",
  "dashboard.navigation.output",
  "dashboard.navigation.memory",
  "dashboard.navigation.settings",

  "dashboard.actions.generate",
  "dashboard.actions.save",
  "dashboard.actions.approve",
  "dashboard.actions.lock",
  "dashboard.actions.reset",
  "dashboard.actions.import",
  "dashboard.actions.export",
  "dashboard.actions.test",

  "dashboard.labels.brand",
  "dashboard.labels.brandId",
  "dashboard.labels.category",
  "dashboard.labels.channel",
  "dashboard.labels.language",
  "dashboard.labels.outputLanguage",
  "dashboard.labels.status",
  "dashboard.labels.score",
  "dashboard.labels.risk",
  "dashboard.labels.readiness",

  "dashboard.statuses.healthy",
  "dashboard.statuses.warning",
  "dashboard.statuses.critical",
  "dashboard.statuses.ready",
  "dashboard.statuses.blocked",
  "dashboard.statuses.low",
  "dashboard.statuses.medium",
  "dashboard.statuses.high",

  "governance.health",
  "governance.decisionVetoRisk",
  "governance.forbiddenDirectionExposure",
  "governance.corePrincipleConflicts",
  "governance.signals",
  "governance.recommendations",
  "governance.publishReadiness",
  "governance.blockedMessage",
  "governance.readyMessage",

  "alignment.brandAlignment",
  "alignment.alignmentScore",
  "alignment.constitutionAlignment",
  "alignment.memoryAlignment",
  "alignment.consistencyAlignment",
  "alignment.driftLevel",
  "alignment.driftAnalysis",

  "brandSetup.title",
  "brandSetup.subtitle",
  "brandSetup.currentBrand",
  "brandSetup.brandProfile",
  "brandSetup.brandReadiness",
  "brandSetup.premiumLevel",
  "brandSetup.tone",
  "brandSetup.personality",
  "brandSetup.aesthetic",

  "manifesto.title",
  "manifesto.subtitle",
  "manifesto.interview",
  "manifesto.intelligence",
  "manifesto.dominantPrinciple",
  "manifesto.approval",
  "manifesto.locked",
  "manifesto.draft",
  "manifesto.approved",

  "constitution.title",
  "constitution.subtitle",
  "constitution.generatedConstitution",
  "constitution.corePrinciples",
  "constitution.forbiddenDirections",
  "constitution.decisionRules",
  "constitution.enforcement",

  "audit.title",
  "audit.subtitle",
  "audit.source",
  "audit.channelAudit",
  "audit.websiteAudit",
  "audit.socialAudit",
  "audit.marketplaceAudit",
  "audit.emailAudit",
  "audit.adAudit",

  "output.title",
  "output.subtitle",
  "output.visualPrompt",
  "output.negativePrompt",
  "output.contentOutput",
  "output.bilingualOutput",

  "languagePacks.title",
  "languagePacks.subtitle",
  "languagePacks.installedPacks",
  "languagePacks.importPack",
  "languagePacks.marketplacePacks",
  "languagePacks.activePack",
  "languagePacks.packImported",
  "languagePacks.invalidPack",
  "languagePacks.missingKey",
];

export function validateLanguagePack(value: unknown): {
  valid: boolean;
  missing: string[];
  pack?: LanguagePack;
} {
  if (!isObject(value)) {
    return {
      valid: false,
      missing: ["root"],
    };
  }

  const missing = requiredLanguagePackPaths.filter(
    (path) => !hasPath(value, path),
  );

  if (missing.length > 0) {
    return {
      valid: false,
      missing,
    };
  }

  return {
    valid: true,
    missing: [],
    pack: value as LanguagePack,
  };
}
