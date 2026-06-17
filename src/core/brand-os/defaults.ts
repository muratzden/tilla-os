import type {
  AudienceProfile,
  AuthorityProfile,
  BrandMemory,
  ChannelProfile,
  GrowthProfile,
  OfferProfile,
  PositioningProfile,
  TrustProfile
} from "./types";

export const DEFAULT_AUDIENCE: AudienceProfile = {
  primary: null,
  needs: [],
  barriers: [],
  desiredOutcome: null
};

export const DEFAULT_POSITIONING: PositioningProfile = {
  category: null,
  promise: null,
  differentiators: [],
  proofPoints: []
};

export const DEFAULT_TRUST: TrustProfile = {
  signals: [],
  gaps: ["Define credibility signals", "Clarify proof points"]
};

export const DEFAULT_AUTHORITY: AuthorityProfile = {
  themes: [],
  evidence: [],
  gaps: ["Choose authority themes", "Collect evidence"]
};

export const DEFAULT_OFFER: OfferProfile = {
  core: null,
  outcomes: [],
  constraints: []
};

export const DEFAULT_CHANNELS: ChannelProfile = {
  primary: [],
  secondary: [],
  experiments: []
};

export const DEFAULT_GROWTH: GrowthProfile = {
  objectives: [],
  loops: [],
  constraints: []
};

export function createDefaultMemory(now: string): BrandMemory {
  const unresolvedQuestions = [
    "Who is the primary audience?",
    "What outcome should the brand be known for?",
    "Which trust signals already exist?",
    "Which channel has the strongest strategic fit?"
  ];

  return {
    entries: [],
    events: [],
    observations: [],
    decisions: [],
    decisionOutcomes: [],
    scoreSnapshots: [],
    lifecycleTransitions: [],
    unresolvedQuestions,
    openQuestions: unresolvedQuestions,
    lastUpdatedAt: now
  };
}
