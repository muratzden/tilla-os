import type {
  AuditRecommendation,
  AuditViolation,
  BrandAuditResult,
} from "../audit/audit-types";
import type { GovernanceAuditResult } from "./governance-audit-types";
import type { OutputLanguage } from "@/src/lib/i18n/language";
import type { OutputPack } from "@/src/lib/i18n/output-packs/output-pack-types";
import { getLanguageRuntime } from "@/src/lib/i18n/language-registry";

function mapGovernanceSeverityToViolationSeverity(
  severity: GovernanceAuditResult["severity"],
): AuditViolation["severity"] {
  if (severity === "high") {
    return "high";
  }

  if (severity === "medium") {
    return "medium";
  }

  return "low";
}

function buildGovernanceViolations(
  governanceAudit: GovernanceAuditResult,
  outputPack: OutputPack,
): AuditViolation[] {
  return governanceAudit.violations.map((violation) => ({
    key: `governance:${violation}`,
    severity: mapGovernanceSeverityToViolationSeverity(
      governanceAudit.severity,
    ),
    message: `${outputPack.governanceAuditText.signals.forbiddenDirectionDetected}: ${violation}`,
  }));
}

function buildGovernanceRecommendations(
  governanceAudit: GovernanceAuditResult,
): AuditRecommendation[] {
  return governanceAudit.recommendations.map((recommendation, index) => ({
    key: `governance_recommendation_${index + 1}`,
    message: recommendation,
  }));
}

export function integrateGovernanceAudit(params: {
  auditResult: BrandAuditResult;
  governanceAudit: GovernanceAuditResult;
  outputLanguage?: OutputLanguage;
  brandId?: string;
}): BrandAuditResult {
  const {
    auditResult,
    governanceAudit,
    outputLanguage = "en",
    brandId = "tilla-leather",
  } = params;

  const languageRuntime = getLanguageRuntime({
    brandId,
    requestedOutputLanguage: outputLanguage,
  });

  const outputPack = languageRuntime.output;

  const alignmentScore = Math.min(
    auditResult.alignmentScore,
    governanceAudit.governanceAlignment,
  );

  const constitutionAlignment = Math.min(
    auditResult.constitutionAlignment,
    governanceAudit.constitutionAlignment,
  );

  const governanceViolations = buildGovernanceViolations(
    governanceAudit,
    outputPack,
  );

  const recommendations = [
    ...auditResult.recommendations,
    ...buildGovernanceRecommendations(governanceAudit),
  ];

  const violationMap = new Map<string, AuditViolation>();

  [...auditResult.violations, ...governanceViolations].forEach((violation) => {
    const normalizedKey = violation.key.replace("governance:", "");

    const existing = violationMap.get(normalizedKey);

    if (!existing || violation.severity === "high") {
      violationMap.set(normalizedKey, violation);
    }
  });

  const violations = [...violationMap.values()];

  const driftLevel =
    governanceAudit.governanceHealth === "critical"
      ? "critical"
      : governanceAudit.severity === "high"
        ? "high"
        : auditResult.driftLevel;

  const brandDriftAnalysis =
    governanceAudit.governanceHealth === "critical"
      ? outputPack.auditText.driftAnalysis.critical
      : auditResult.brandDriftAnalysis;

  const governanceHealthSignalMessage =
    governanceAudit.governanceHealth === "critical"
      ? outputPack.governanceAuditText.vetoRisk.high
      : governanceAudit.governanceHealth === "warning"
        ? outputPack.governanceAuditText.vetoRisk.medium
        : outputPack.governanceAuditText.vetoRisk.low;

  return {
    ...auditResult,

    alignmentScore,
    constitutionAlignment,

    driftLevel,
    brandDriftAnalysis,

    violations,
    recommendations,

    channelScores: [
      {
        channel: auditResult.channel,
        score: alignmentScore,
      },
    ],

    governanceSignals: [
      ...auditResult.governanceSignals,
      {
        key: "governance_audit_health",
        level:
          governanceAudit.governanceHealth === "critical"
            ? "critical"
            : governanceAudit.governanceHealth === "warning"
              ? "warning"
              : "info",
        message: governanceHealthSignalMessage,
      },
    ],
  };
}
