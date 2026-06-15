import type { OutputLanguage } from "@/src/lib/i18n/language";

export type OutputPackStatus = "core" | "installed" | "draft" | "disabled";

export type OutputPackSource = "system" | "imported" | "marketplace";



export type OutputPackMeta = {
  id: OutputLanguage;
  name: string;
  nativeName: string;
  description: string;
  status: OutputPackStatus;
  source: OutputPackSource;
  version: string;
};

export type OutputPackToneLabels = {
  restrained: string;
  premium: string;
  warm: string;
  direct: string;
  editorial: string;
};

export type OutputPackAuditLabels = {
  aligned: string;
  weak: string;
  risky: string;
  blocked: string;
};

export type OutputPackAuditText = {
  violations: {
    forbiddenDirection: string;
  };
  recommendations: {
    removeOrReframe: string;
    strengthenBrandSignal: string;
  };
  driftAnalysis: {
    aligned: string;
    fragmenting: string;
    shifting: string;
    partialDrift: string;
    critical: string;
  };
  governanceSignals: {
    forbiddenDirectionDetected: string;
    lowAlignment: string;
    consistencyNotStable: string;
  };
};
export type OutputPackGovernanceAuditText = {
  publishReadiness: {
    blocked: string;
    ready: string;
  };

  vetoRisk: {
    high: string;
    medium: string;
    low: string;
  };

  recommendations: {
    forbiddenDirectionDetected: string;
    corePrincipleConflict: string;
    governancePassed: string;
  };

  signals: {
    forbiddenDirectionDetected: string;
    corePrincipleConflict: string;
    governancePassed: string;
  };

  constitution: {
    approved: string;
    rejected: string;
  };
};

export type OutputPackDecisionLabels = {
  selected: string;
  rejected: string;
  recommended: string;
  notRecommended: string;
  publishReady: string;
  blocked: string;
};

export type OutputPackPromptSections = {
  visualPrompt: string;
  negativePrompt: string;
  artDirection: string;
  scene: string;
  material: string;
  lighting: string;
  composition: string;
};
export type OutputPackVisualPromptText = {
  subject: {
    premiumHandcraftedLeather: string;
    honestArtisanPhotography: string;
  };

  material: {
    visibleNaturalGrain: string;
    subtleSurfaceVariation: string;
    controlledHandmadeCharacter: string;
    notFactoryPerfect: string;
  };

  lighting: {
    controlledShadows: string;
    softHighlightDiscipline: string;
  };

  camera: {
    realisticEditorialProductPhotography: string;
  };

  composition: {
    premiumNegativeSpace: string;
    quietLuxuryProductPlacement: string;
    colorPalette: string;
  };

  atmosphere: {
    earnedConfidence: string;
    calmEuropeanArtisanLuxury: string;
  };

  microDetails: {
    title: string;
    handStitching: string;
    edgeBurnishing: string;
    naturalLeatherVariation: string;
    humanCraftEvidence: string;
    intentionalImperfection: string;
    materialTruth: string;
  };

  negativePrompt: string[];
};

export type OutputPackNarrativeText = {
  narrative: string;
  productLanguage: {
    opening: string;
    material: string;
    emotion: string;
  };
};

export type OutputPackNarrative = {
  warmHeritage: OutputPackNarrativeText;
  quietPower: OutputPackNarrativeText;
  default: OutputPackNarrativeText;
};

export type OutputPackAdvisor = {
  warnings: {
    archetypeConflict: string;
    worldConflict: string;
    consistencyWeakening: string;
  };

  opportunities: {
    archetypeReinforced: string;
    worldStrengthened: string;
    insufficientMemory: string;
  };

  actions: {
    reviewArchetypeDrift: string;
    compareWorldNarrative: string;
    pauseCampaignExpansion: string;
    expandDominantWorld: string;
  };
};

export type OutputPack = {
  meta: OutputPackMeta;
  toneLabels: OutputPackToneLabels;
  auditLabels: OutputPackAuditLabels;
  auditText: OutputPackAuditText;
  governanceAuditText: OutputPackGovernanceAuditText;
  decisionLabels: OutputPackDecisionLabels;
  promptSections: OutputPackPromptSections;
  visualPromptText: OutputPackVisualPromptText;
  narrative: OutputPackNarrative;
  expressions: OutputPackExpressions;
  semantic: OutputPackSemantic;
  advisor: OutputPackAdvisor;
  
};

export type OutputExpressionEntry = {
  label: string;
  description: string;
};

export type OutputPackSemantic = Record<string, OutputExpressionEntry>;

export type OutputPackExpressions = {
  materials: Record<string, OutputExpressionEntry>;
  colors: Record<string, OutputExpressionEntry>;

  productTypes: Record<string, OutputExpressionEntry>;
  channels: Record<string, OutputExpressionEntry>;
  environments: Record<string, OutputExpressionEntry>;
  emotions: Record<string, OutputExpressionEntry>;
};

