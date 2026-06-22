import type { MissionControlIntelligenceReport } from "@/src/lib/brand-kernel/mission-control-intelligence/mission-control-types";
import type { MissionControlIntelligenceState } from "../types";

function normalizeKernelIntelligence(
  kernelIntelligence: MissionControlIntelligenceReport,
): MissionControlIntelligenceState {
  return {
    score: kernelIntelligence.score,
    diagnosis: kernelIntelligence.diagnosis.map((item) => ({
      area: item.area,
      severity: item.severity,
      reason: item.reason,
    })),
    risks: kernelIntelligence.risks.map((item) => ({
      area: item.area,
      risk: item.risk,
      description: item.description,
    })),
    opportunities: kernelIntelligence.opportunities.map((item) => ({
      area: item.area,
      score: item.score,
      reason: item.reason,
    })),
    priorities: kernelIntelligence.priorities.map((item) => ({
      area: item.area,
      rank: item.rank,
      reason: item.reason,
    })),
    nextBestAction: kernelIntelligence.nextBestAction,
  };
}

function uniqueByReason<T extends { reason: string }>(items: T[]): T[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.reason.toLowerCase().trim();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function uniqueByDescription<T extends { description: string }>(
  items: T[],
): T[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.description.toLowerCase().trim();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

export function mergeMissionControlIntelligence(
  brandOSIntelligence?: MissionControlIntelligenceState,
  kernelIntelligence?: MissionControlIntelligenceReport,
): MissionControlIntelligenceState | undefined {
  if (!brandOSIntelligence && !kernelIntelligence) return undefined;
  if (brandOSIntelligence && !kernelIntelligence) return brandOSIntelligence;
  if (!brandOSIntelligence && kernelIntelligence)
    return normalizeKernelIntelligence(kernelIntelligence);

  if (!brandOSIntelligence || !kernelIntelligence) return undefined;

  const normalizedKernelIntelligence =
    normalizeKernelIntelligence(kernelIntelligence);

  return {
    score: Math.round(
      (brandOSIntelligence.score + normalizedKernelIntelligence.score) / 2,
    ),
    diagnosis: uniqueByReason([
      ...normalizedKernelIntelligence.diagnosis,
      ...brandOSIntelligence.diagnosis,
    ]),
    risks: uniqueByDescription([
      ...normalizedKernelIntelligence.risks,
      ...brandOSIntelligence.risks,
    ]),
    opportunities: uniqueByReason([
      ...normalizedKernelIntelligence.opportunities,
      ...brandOSIntelligence.opportunities,
    ]),
    priorities: uniqueByReason([
      ...normalizedKernelIntelligence.priorities,
      ...brandOSIntelligence.priorities,
    ]).map((priority, index) => ({
      ...priority,
      rank: index + 1,
    })),
    nextBestAction:
      normalizedKernelIntelligence.nextBestAction ||
      brandOSIntelligence.nextBestAction,
  };
}
