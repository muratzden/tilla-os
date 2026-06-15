import type { LanguagePackSource } from "./language";
import type { SystemLanguage } from "./system-languages";

export type LanguagePack = {
  meta: {
    id: string;
    language: SystemLanguage;
    name: string;
    nativeName: string;
    version: string;
    source: LanguagePackSource;
  };

  dashboard: {
    appTitle: string;
    appSubtitle: string;

    navigation: {
      overview: string;
      foundation: string;
      manifesto: string;
      constitution: string;
      governance: string;
      audit: string;
      output: string;
      memory: string;
      settings: string;
    };

    actions: {
      generate: string;
      save: string;
      approve: string;
      lock: string;
      reset: string;
      import: string;
      export: string;
      test: string;
    };

    labels: {
      brand: string;
      brandId: string;
      category: string;
      channel: string;
      language: string;
      outputLanguage: string;
      status: string;
      score: string;
      risk: string;
      readiness: string;
    };

    statuses: {
      healthy: string;
      warning: string;
      critical: string;
      ready: string;
      blocked: string;
      low: string;
      medium: string;
      high: string;
    };
  };

  governance: {
    health: string;
    decisionVetoRisk: string;
    forbiddenDirectionExposure: string;
    corePrincipleConflicts: string;
    signals: string;
    recommendations: string;
    publishReadiness: string;
    blockedMessage: string;
    readyMessage: string;
  };

  alignment: {
    brandAlignment: string;
    alignmentScore: string;
    constitutionAlignment: string;
    memoryAlignment: string;
    consistencyAlignment: string;
    driftLevel: string;
    driftAnalysis: string;
  };

  brandSetup: {
    title: string;
    subtitle: string;
    currentBrand: string;
    brandProfile: string;
    brandReadiness: string;
    premiumLevel: string;
    tone: string;
    personality: string;
    aesthetic: string;
  };

  manifesto: {
    title: string;
    subtitle: string;
    interview: string;
    intelligence: string;
    dominantPrinciple: string;
    approval: string;
    locked: string;
    draft: string;
    approved: string;
  };

  constitution: {
    title: string;
    subtitle: string;
    generatedConstitution: string;
    corePrinciples: string;
    forbiddenDirections: string;
    decisionRules: string;
    enforcement: string;
  };

  audit: {
    title: string;
    subtitle: string;
    source: string;
    channelAudit: string;
    websiteAudit: string;
    socialAudit: string;
    marketplaceAudit: string;
    emailAudit: string;
    adAudit: string;
  };

  output: {
    title: string;
    subtitle: string;
    visualPrompt: string;
    negativePrompt: string;
    contentOutput: string;
    bilingualOutput: string;
  };

  languagePacks: {
    title: string;
    subtitle: string;
    installedPacks: string;
    importPack: string;
    marketplacePacks: string;
    activePack: string;
    packImported: string;
    invalidPack: string;
    missingKey: string;
  };
};
