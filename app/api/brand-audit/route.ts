import { NextResponse } from "next/server";

import { auditEngine } from "@/src/lib/brand/audit/audit-engine";
import { buildAuditSourceContext } from "@/src/lib/brand/audit/audit-source-builder";
import { calculateBrandConsistency } from "@/src/lib/brand/memory/consistency-engine";
import { getBrandMemoryRecords } from "@/src/lib/brand/memory/memory-store";
import { getBrandProfile } from "@/src/lib/brand/setup/brand-profile";
import { getBrandManifesto } from "@/src/lib/brand/manifesto/get-brand-manifesto";
import { buildConstitution } from "@/src/lib/brand/constitution/build-constitution";
import { defaultBrandSetup } from "@/src/lib/brand/setup/brand-setup-defaults";
import { runGovernanceAudit } from "@/src/lib/brand/governance-audit/governance-audit-engine";
import { integrateGovernanceAudit } from "@/src/lib/brand/governance-audit/governance-audit-integration";

export async function POST(request: Request) {
  const body = await request.json();

  const brandId = body.brandId ?? "tilla-leather";

  const brandProfile = getBrandProfile(brandId);

  const constitution = buildConstitution(brandId, defaultBrandSetup);

  const memoryRecords = getBrandMemoryRecords(brandId);

  const consistency = calculateBrandConsistency(memoryRecords);

  const manifesto = getBrandManifesto(brandId);

  const sourceContext = buildAuditSourceContext({
    brandId,

    manifesto: {
      principles: [...manifesto.principles],
      forbiddenDirections: [...manifesto.forbiddenDirections],
    },

    constitution: {
      principles: constitution.principles.map((principle) => principle.key),

      forbiddenDirections: [...constitution.forbiddenDirections],

      vetoWorlds: [],
    },

    memory: {
      totalDecisions: memoryRecords.length,
      dominantArchetype: consistency.dominantArchetype ?? undefined,
      dominantWorld: consistency.dominantWorld ?? undefined,
    },

    consistency: {
      consistencyScore: consistency.consistencyScore,
      consistencyLevel: consistency.consistencyLevel,
      trendDirection: consistency.trendDirection,
      dominantArchetype: consistency.dominantArchetype ?? undefined,
      dominantWorld: consistency.dominantWorld ?? undefined,
    },
  });

  const result = auditEngine({
    brandId,
    channel: body.channel,
    content: body.content,
    sourceContext,
  });

  const governanceAudit = runGovernanceAudit({
    input: {
      brandId,
      channel: body.channel,
      content: body.content,
    },
    constitution,
  });

  const integratedResult = integrateGovernanceAudit({
    auditResult: result,
    governanceAudit,
  });

  return NextResponse.json({
    ...integratedResult,

    constitution: {
      dominantPrinciple: constitution.principles[0]?.key ?? "unknown",

      protectedPrinciples: constitution.principles.map(
        (principle) => principle.key,
      ),

      forbiddenDirections: constitution.forbiddenDirections,
    },

    governanceAudit,
  });
}
