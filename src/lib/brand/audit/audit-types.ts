import type { SystemLanguage } from "@/src/lib/i18n/system-languages";
import type { OutputLanguage } from "@/src/lib/i18n/language";

export type AuditChannel =
  | "website"
  | "social_media"
  | "marketplace"
  | "email"
  | "advertising";

export type AuditDriftLevel =
  | "healthy"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type AuditViolationSeverity = "low" | "medium" | "high";

export type AuditViolation = {
  key: string;
  severity: AuditViolationSeverity;
  message: string;
};

export type AuditRecommendation = {
  key: string;
  message: string;
};

export type AuditChannelScore = {
  channel: AuditChannel;
  score: number;
};

export type AuditGovernanceSignal = {
  key: string;
  level: "info" | "warning" | "critical";
  message: string;
};

export type AuditSourceContext = {
  brandId: string;


  constitution: {
    principles: string[];
    forbiddenDirections: string[];
    vetoWorlds?: string[];
  };

  memory: {
    totalDecisions: number;
    dominantArchetype?: string;
    dominantWorld?: string;
  };

  consistency: {
    consistencyScore: number;
    consistencyLevel: string;
    trendDirection: string;
    dominantArchetype?: string;
    dominantWorld?: string;
  };
};

export type BrandAuditInput = {
  brandId: string;
  channel: AuditChannel;
  content: string;
  sourceContext: AuditSourceContext;
  uiLanguage?: SystemLanguage;
  outputLanguage?: OutputLanguage;
};

export type BrandAuditResult = {
  brandId: string;
  channel: AuditChannel;

  alignmentScore: number;
  constitutionAlignment: number;
  memoryAlignment: number;
  consistencyAlignment: number;

  driftLevel: AuditDriftLevel;
  brandDriftAnalysis: string;

  violations: AuditViolation[];
  recommendations: AuditRecommendation[];
  channelScores: AuditChannelScore[];
  governanceSignals: AuditGovernanceSignal[];
  governance: GovernanceSection;
  alignment: AlignmentSection;
};

export type GovernanceHealth = "healthy" | "warning" | "critical";

export type DecisionVetoRisk = "low" | "medium" | "high";

export type GovernanceSection = {
  governanceHealth: GovernanceHealth;
  decisionVetoRisk: DecisionVetoRisk;
  forbiddenDirectionExposure: number;
  corePrincipleConflicts: string[];
  governanceSignals: string[];
  recommendations: string[];
};

export type AlignmentSection = {
  alignmentScore: number;
  constitutionAlignment: number;
  memoryAlignment: number;
  consistencyAlignment: number;
  driftLevel: AuditDriftLevel;
  brandDriftAnalysis: string;
};
