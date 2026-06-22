import { NextResponse } from "next/server";

import { auditEngine } from "@/src/lib/brand/audit/audit-engine";
import { buildAuditSourceContext } from "@/src/lib/brand/audit/audit-source-builder";
import { calculateBrandConsistency } from "@/src/lib/brand/memory/consistency-engine";
import { getBrandMemoryRecords } from "@/src/lib/brand/memory/memory-store";
import { getBrandProfile } from "@/src/lib/brand/setup/brand-profile";

export async function POST(request: Request) {
  const body = await request.json();

  const brandId = body.brandId ?? "default-brand";

  const brandProfile = getBrandProfile();

 

  const memoryRecords = getBrandMemoryRecords(brandId);

  const consistency = calculateBrandConsistency(memoryRecords);


  const sourceContext = buildAuditSourceContext({
    brandId,

        constitution: {
      principles: [],
      forbiddenDirections: [],
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

  return NextResponse.json({
  ...result,

  brandProfile,

  constitution: {
    dominantPrinciple: "policy_pending",

    protectedPrinciples: [],

    forbiddenDirections: [],
  },
});
}