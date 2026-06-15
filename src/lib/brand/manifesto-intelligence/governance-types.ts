import type { BrandType } from "../setup/brand-type";
import type { ForbiddenDirectionKey } from "./forbidden-direction-registry";
import type { PrincipleKey } from "./principle-registry";

export type GovernanceExtractionInput = {
  brandId: string;
  brandType: BrandType;
  answers: {
    questionId: string;
    answer: string;
  }[];
};

export type GovernanceSignalMatch = {
  key: PrincipleKey | ForbiddenDirectionKey;
  matchedSignals: string[];
  score: number;
};

export type GovernanceSignals = {
  brandId: string;
  brandType: BrandType;
  principles: PrincipleKey[];
  forbiddenDirections: ForbiddenDirectionKey[];
  principleMatches: GovernanceSignalMatch[];
  forbiddenDirectionMatches: GovernanceSignalMatch[];
  principleScores: GovernanceScore[];
  forbiddenDirectionScores: GovernanceScore[];
};

export type GovernanceScore = {
  key: string;
  score: number;
};

export type GovernanceScoringResult = {
  principleScores: GovernanceScore[];
  forbiddenDirectionScores: GovernanceScore[];
};
