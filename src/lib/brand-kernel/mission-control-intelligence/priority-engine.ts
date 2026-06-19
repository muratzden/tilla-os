import type {
  MissionPriority,
  MissionRisk,
} from "./mission-control-types";

const SEVERITY_SCORE = {
  high: 3,
  medium: 2,
  low: 1,
} as const;

export function prioritizeMissionAreas(
  risks: MissionRisk[]
): MissionPriority[] {
  return risks
    .map((risk) => ({
      area: risk.area,
      severityScore:
        SEVERITY_SCORE[risk.risk],
      reason: risk.description,
    }))
    .sort(
      (a, b) =>
        b.severityScore -
        a.severityScore
    )
    .map((item, index) => ({
      area: item.area,
      rank: index + 1,
      reason: item.reason,
    }));
}