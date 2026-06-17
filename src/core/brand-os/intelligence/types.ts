import type { BrandOperatingState, ScoreDimension, StudioId } from "../types";

export interface StrategicEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  missingEvidence: string[];
  recommendations: string[];
}

export interface BrandIntelligenceReport {
  audience: StrategicEvaluation;
  positioning: StrategicEvaluation;
  trust: StrategicEvaluation;
  authority: StrategicEvaluation;
  channels: StrategicEvaluation;
  growth: StrategicEvaluation;
  dimensionMap: Record<ScoreDimension, StrategicEvaluation[]>;
  recommendedFocus: {
    dimension: ScoreDimension;
    studio: StudioId;
    reason: string;
  };
}

export type BrandIntelligenceInput = Pick<
  BrandOperatingState,
  | "brand"
  | "audience"
  | "positioning"
  | "trust"
  | "authority"
  | "offer"
  | "channels"
  | "growth"
  | "memory"
>;

export function clampIntelligenceScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function hasMeaningfulText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length >= 4;
}

export function countWords(value: string | null | undefined): number {
  if (!hasMeaningfulText(value)) return 0;
  return value.trim().split(/\s+/g).length;
}

export function hasSpecificPhrase(value: string | null | undefined): boolean {
  return countWords(value) >= 4;
}

export function hasSharpSegment(value: string | null | undefined): boolean {
  if (!hasMeaningfulText(value) || !hasSpecificPhrase(value)) return false;
  const lower = value.toLocaleLowerCase();
  return ["who", "with", "for", "because", "without", "facing", "seeking"].some((marker) => lower.includes(marker));
}

export function hasGenericAudienceLanguage(value: string | null | undefined): boolean {
  if (!hasMeaningfulText(value)) return true;

  const lower = value.toLocaleLowerCase();
  return ["people who", "everyone", "anyone", "all businesses", "consumers", "users"].some((marker) => lower.includes(marker));
}

export function createEvaluation(input: StrategicEvaluation): StrategicEvaluation {
  return {
    score: clampIntelligenceScore(input.score),
    strengths: uniqueNonEmpty(input.strengths),
    weaknesses: uniqueNonEmpty(input.weaknesses),
    risks: uniqueNonEmpty(input.risks),
    missingEvidence: uniqueNonEmpty(input.missingEvidence),
    recommendations: uniqueNonEmpty(input.recommendations)
  };
}

export function uniqueNonEmpty(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const normalized = value.replace(/\s+/g, " ").trim();
    const key = normalized.toLocaleLowerCase();

    if (normalized.length > 0 && !seen.has(key)) {
      seen.add(key);
      output.push(normalized);
    }
  }

  return output;
}
