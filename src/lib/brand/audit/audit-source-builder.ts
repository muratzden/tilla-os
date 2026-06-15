import { AuditSourceContext } from "./audit-types";

type BuildAuditSourceInput = {
  brandId: string;

  manifesto?: {
    principles?: string[];
    forbiddenDirections?: string[];
  };

  constitution?: {
    principles?: string[];
    forbiddenDirections?: string[];
    vetoWorlds?: string[];
  };

  memory?: {
    totalDecisions?: number;
    dominantArchetype?: string;
    dominantWorld?: string;
  };

  consistency?: {
    consistencyScore?: number;
    consistencyLevel?: string;
    trendDirection?: string;
    dominantArchetype?: string;
    dominantWorld?: string;
  };
};

export function buildAuditSourceContext(
  input: BuildAuditSourceInput,
): AuditSourceContext {
  return {
    brandId: input.brandId,

    manifesto: {
      principles: input.manifesto?.principles ?? [],
      forbiddenDirections: input.manifesto?.forbiddenDirections ?? [],
    },

    constitution: {
      principles: input.constitution?.principles ?? [],
      forbiddenDirections: input.constitution?.forbiddenDirections ?? [],
      vetoWorlds: input.constitution?.vetoWorlds ?? [],
    },

    memory: {
      totalDecisions: input.memory?.totalDecisions ?? 0,
      dominantArchetype: input.memory?.dominantArchetype,
      dominantWorld: input.memory?.dominantWorld,
    },

    consistency: {
      consistencyScore: input.consistency?.consistencyScore ?? 50,
      consistencyLevel: input.consistency?.consistencyLevel ?? "unknown",
      trendDirection: input.consistency?.trendDirection ?? "stable",
      dominantArchetype: input.consistency?.dominantArchetype,
      dominantWorld: input.consistency?.dominantWorld,
    },
  };
}
