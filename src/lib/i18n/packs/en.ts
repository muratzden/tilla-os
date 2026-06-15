import type { LanguagePack } from "../language-pack-types";

export const enPack: LanguagePack = {
  meta: {
    id: "en",
    language: "en",
    name: "English",
    nativeName: "English",
    version: "1.0.0",
    source: "system",
  },

  dashboard: {
    appTitle: "TILLA-OS",
    appSubtitle: "Brand decision, governance and audit system",

    navigation: {
      overview: "Overview",
      foundation: "Foundation",
      manifesto: "Manifesto",
      constitution: "Constitution",
      governance: "Governance",
      audit: "Audit",
      output: "Output",
      memory: "Memory",
      settings: "Settings",
    },

    actions: {
      generate: "Generate",
      save: "Save",
      approve: "Approve",
      lock: "Lock",
      reset: "Reset",
      import: "Import",
      export: "Export",
      test: "Test",
    },

    labels: {
      brand: "Brand",
      brandId: "Brand ID",
      category: "Category",
      channel: "Channel",
      language: "Language",
      outputLanguage: "Output Language",
      status: "Status",
      score: "Score",
      risk: "Risk",
      readiness: "Readiness",
    },

    statuses: {
      healthy: "Healthy",
      warning: "Warning",
      critical: "Critical",
      ready: "Ready",
      blocked: "Blocked",
      low: "Low",
      medium: "Medium",
      high: "High",
    },
  },

  governance: {
    health: "Governance Health",
    decisionVetoRisk: "Decision Veto Risk",
    forbiddenDirectionExposure: "Forbidden Direction Exposure",
    corePrincipleConflicts: "Core Principle Conflicts",
    signals: "Governance Signals",
    recommendations: "Governance Recommendations",
    publishReadiness: "Publish Readiness",
    blockedMessage:
      "This output violates brand governance rules and should not be published.",
    readyMessage: "This output is allowed under the brand governance rules.",
  },

  alignment: {
    brandAlignment: "Brand Alignment",
    alignmentScore: "Alignment Score",
    constitutionAlignment: "Constitution Alignment",
    memoryAlignment: "Memory Alignment",
    consistencyAlignment: "Consistency Alignment",
    driftLevel: "Drift Level",
    driftAnalysis: "Brand Drift Analysis",
  },

  brandSetup: {
    title: "Brand Setup",
    subtitle: "Define the brand’s core identity and decision foundation.",
    currentBrand: "Current Brand",
    brandProfile: "Brand Profile",
    brandReadiness: "Brand Readiness",
    premiumLevel: "Premium Level",
    tone: "Tone",
    personality: "Personality",
    aesthetic: "Aesthetic",
  },

  manifesto: {
    title: "Manifesto",
    subtitle: "Defines the brand’s intent, boundaries and core principles.",
    interview: "Manifesto Interview",
    intelligence: "Manifesto Intelligence",
    dominantPrinciple: "Dominant Principle",
    approval: "Manifesto Approval",
    locked: "Locked",
    draft: "Draft",
    approved: "Approved",
  },

  constitution: {
    title: "Brand Constitution",
    subtitle: "Binding decision rules generated from the manifesto.",
    generatedConstitution: "Generated Constitution",
    corePrinciples: "Core Principles",
    forbiddenDirections: "Forbidden Directions",
    decisionRules: "Decision Rules",
    enforcement: "Enforcement",
  },

  audit: {
    title: "Brand Audit",
    subtitle:
      "Audits channel alignment against the manifesto and constitution.",
    source: "Audit Source",
    channelAudit: "Channel Audit",
    websiteAudit: "Website Audit",
    socialAudit: "Social Media Audit",
    marketplaceAudit: "Marketplace Audit",
    emailAudit: "Email Audit",
    adAudit: "Ad Audit",
  },

  output: {
    title: "Output",
    subtitle: "Content and visual direction generated from the brand decision.",
    visualPrompt: "Visual Prompt",
    negativePrompt: "Negative Prompt",
    contentOutput: "Content Output",
    bilingualOutput: "Bilingual Output",
  },

  languagePacks: {
    title: "Language Packs",
    subtitle:
      "Manage UI and output languages through system or imported packs.",
    installedPacks: "Installed Packs",
    importPack: "Import Language Pack",
    marketplacePacks: "Pack Marketplace",
    activePack: "Active Pack",
    packImported: "Language pack imported successfully.",
    invalidPack: "Invalid language pack.",
    missingKey: "The language pack has a missing key.",
  },
};
