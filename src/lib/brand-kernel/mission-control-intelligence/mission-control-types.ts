export type MissionArea =
  | "identity"
  | "positioning"
  | "differentiation"
  | "authority"
  | "trust"
  | "content"
  | "audience"
  | "offer"
  | "quality"
  | "growth";

export type MissionSeverity = "low" | "medium" | "high";

export type MissionDiagnosis = {
  area: MissionArea;
  severity: MissionSeverity;
  reason: string;
};

export type MissionRisk = {
  area: MissionArea;
  risk: MissionSeverity;
  description: string;
};

export type MissionOpportunity = {
  area: MissionArea;
  score: number;
  reason: string;
};

export type MissionPriority = {
  area: MissionArea;
  rank: number;
  reason: string;
};

export type MissionControlIntelligenceReport = {
  score: number;
  diagnosis: MissionDiagnosis[];
  risks: MissionRisk[];
  opportunities: MissionOpportunity[];
  priorities: MissionPriority[];
  nextBestAction: string;
};