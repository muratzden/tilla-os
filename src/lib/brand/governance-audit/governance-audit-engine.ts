import type { BrandConstitution } from "../constitution/constitution-types";
import { detectCorePrincipleConflicts } from "./core-principle-conflict";
import { detectForbiddenDirectionExposure } from "./forbidden-direction-exposure";
import { buildGovernanceRecommendations } from "./governance-recommendations";
import {
  calculateAuditSeverity,
  calculateDecisionVetoRisk,
  calculateGovernanceAlignment,
  calculateGovernanceHealth,
} from "./governance-health";
import type {
  GovernanceAuditInput,
  GovernanceAuditResult,
} from "./governance-audit-types";

export function runGovernanceAudit(params: {
  input: GovernanceAuditInput;
  constitution: BrandConstitution;
}): GovernanceAuditResult {
  const { input, constitution } = params;

  const principleKeys = constitution.principles.map(
    (principle) => principle.key,
  );

  const forbiddenDirectionExposure = detectForbiddenDirectionExposure(
    input.content,
    constitution.forbiddenDirections,
  );

  const corePrincipleConflicts = detectCorePrincipleConflicts({
    content: input.content,
    principleKeys,
  });

  const violations = [
    ...forbiddenDirectionExposure,
    ...corePrincipleConflicts.map((principle) => `conflict:${principle}`),
  ];

  const violationCount = violations.length;

  const governanceAlignment = calculateGovernanceAlignment(violationCount);

  const recommendations = buildGovernanceRecommendations({
    forbiddenDirectionExposure,
    corePrincipleConflicts,
  });

  return {
    brandId: input.brandId,
    channel: input.channel,

    constitutionAlignment: governanceAlignment,
    governanceAlignment,

    governanceHealth: calculateGovernanceHealth(violationCount),

    severity: calculateAuditSeverity(violationCount),

    decisionVetoRisk: calculateDecisionVetoRisk(violationCount),

    violations,
    forbiddenDirectionExposure,
    corePrincipleConflicts,

    recommendations,
  };
}
