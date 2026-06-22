import type { DecisionPolicy } from "./decision-policy-generator";

export type DecisionAuditStatus = "pass" | "warning" | "fail";

export interface DecisionAuditResult {
  status: DecisionAuditStatus;

  score: number;

  matchedPolicies: DecisionPolicy[];

  conflicts: string[];

  recommendation: string;
}

const DECISION_KEYWORD_TO_TRIGGER: Record<string, string[]> = {
  fake: ["misleading_claim"],
  scarcity: ["fake_scarcity"],
  urgent: ["false_urgency"],
  urgency: ["false_urgency"],
  discount: ["price_war"],
  cheap: ["positioning_dilution"],
  hide: ["hide_process"],
  material: ["hide_materials"],
  scale: ["aggressive_scaling"],
  claim: ["unsupported_claim"],
};

function extractDecisionTriggers(decision: string): string[] {
  const normalizedDecision = decision.toLowerCase();

  const triggers = Object.entries(DECISION_KEYWORD_TO_TRIGGER).flatMap(
    ([keyword, mappedTriggers]) => {
      if (!normalizedDecision.includes(keyword)) {
        return [];
      }

      return mappedTriggers;
    },
  );

  return Array.from(new Set(triggers));
}

function severityPenalty(severity: DecisionPolicy["severity"]): number {
  if (severity === "high") {
    return 40;
  }

  if (severity === "medium") {
    return 20;
  }

  return 10;
}

function getStatus(score: number): DecisionAuditStatus {
  if (score < 50) {
    return "fail";
  }

  if (score < 80) {
    return "warning";
  }

  return "pass";
}

function createRecommendation(status: DecisionAuditStatus): string {
  if (status === "fail") {
    return "Do not proceed unless the decision is redesigned to satisfy the brand constitution.";
  }

  if (status === "warning") {
    return "Proceed only after reducing the conflict with the brand constitution.";
  }

  return "This decision appears aligned with the current brand constitution.";
}

export function auditDecisionAgainstPolicies(
  decision: string,
  policies: DecisionPolicy[],
): DecisionAuditResult {
  const triggers = extractDecisionTriggers(decision);

  const matchedPolicies = policies.filter((policy) =>
    policy.triggers.some((trigger) => triggers.includes(trigger)),
  );

  const totalPenalty = matchedPolicies.reduce((sum, policy) => {
    const matchedTriggerCount = policy.triggers.filter((trigger) =>
      triggers.includes(trigger),
    ).length;

    return sum + severityPenalty(policy.severity) * matchedTriggerCount;
  }, 0);

  const score = Math.max(0, 100 - totalPenalty);

  const status = getStatus(score);

  return {
    status,
    score,
    matchedPolicies,
    conflicts: matchedPolicies.map(
      (policy) =>
        `Decision conflicts with policy "${policy.id}" under principle "${policy.principle}".`,
    ),
    recommendation: createRecommendation(status),
  };
}
