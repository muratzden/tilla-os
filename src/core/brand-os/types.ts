export type BrandLifecycleStage =
  | "idea"
  | "foundation"
  | "positioning"
  | "trust_building"
  | "authority_building"
  | "growth"
  | "optimization";

export type DecisionArea =
  | "positioning"
  | "audience"
  | "offer"
  | "trust"
  | "authority"
  | "content"
  | "channel"
  | "growth";

export type ScoreDimension =
  | "clarity"
  | "audienceFit"
  | "differentiation"
  | "trust"
  | "authority"
  | "consistency"
  | "growthReadiness";

export type StudioId =
  | "foundation"
  | "positioning"
  | "offer"
  | "content"
  | "authority"
  | "campaign"
  | "visual"
  | "growth";

export type IntelligencePackId =
  | "coffee"
  | "dental"
  | "hospitality"
  | "restaurant"
  | "saas"
  | "creator"
  | "local_service"
  | "personal_brand";

export type ValidationIssueCode =
  | "invalid_type"
  | "required"
  | "empty"
  | "too_long"
  | "unknown_field";

export type BrandEventType =
  | "initialized"
  | "input_applied"
  | "studio_completed"
  | "decision_proposed"
  | "decision_accepted"
  | "decision_rejected"
  | "decision_outcome_created"
  | "decision_outcome_updated"
  | "observation_recorded"
  | "score_recalculated"
  | "lifecycle_transitioned";

export type DecisionStatus = "proposed" | "accepted" | "rejected" | "superseded";

export type DecisionType = DecisionArea;

export interface BrandSeedInput {
  idea: string;
  brandType: string;
}

export interface ValidationIssue {
  field: string;
  code: ValidationIssueCode;
  message: string;
  maxLength?: number;
}

export interface ValidationResult<T> {
  ok: boolean;
  value?: T;
  errors: ValidationIssue[];
}

export interface BrandOSUpdateInput {
  audience?: Partial<AudienceProfile>;
  positioning?: Partial<PositioningProfile>;
  trust?: Partial<TrustProfile>;
  authority?: Partial<AuthorityProfile>;
  offer?: Partial<OfferProfile>;
  channels?: Partial<ChannelProfile>;
  growth?: Partial<GrowthProfile>;
}

export interface AudienceProfile {
  primary: string | null;
  needs: string[];
  barriers: string[];
  desiredOutcome: string | null;
}

export interface PositioningProfile {
  category: string | null;
  promise: string | null;
  differentiators: string[];
  proofPoints: string[];
}

export interface TrustProfile {
  signals: string[];
  gaps: string[];
}

export interface AuthorityProfile {
  themes: string[];
  evidence: string[];
  gaps: string[];
}

export interface OfferProfile {
  core: string | null;
  outcomes: string[];
  constraints: string[];
}

export interface ChannelProfile {
  primary: string[];
  secondary: string[];
  experiments: string[];
}

export interface GrowthProfile {
  objectives: string[];
  loops: string[];
  constraints: string[];
}

export interface MemoryEntry {
  id: string;
  type: "input" | "decision" | "observation" | "score" | "action" | "event" | "lifecycle";
  summary: string;
  createdAt: string;
  tags: string[];
}

export interface BrandEvent {
  id: string;
  type: BrandEventType;
  summary: string;
  createdAt: string;
  payload?: Record<string, unknown>;
}

export interface BrandObservation {
  id: string;
  summary: string;
  area?: DecisionArea | ScoreDimension;
  evidence?: string[];
  createdAt: string;
}

export interface ScoreDimensionResult {
  score: number;
  reasons: string[];
  missingInputs: string[];
  evidence: string[];
  penalties: string[];
}

export type BrandScore = Record<ScoreDimension, ScoreDimensionResult>;

export interface ScoreSnapshot {
  id: string;
  createdAt: string;
  readinessScore: number;
  dimensions: BrandScore;
}

export interface LifecycleRequirement {
  field: string;
  met: boolean;
  description: string;
}

export interface LifecycleTransition {
  id: string;
  from: BrandLifecycleStage;
  to: BrandLifecycleStage;
  reason: string;
  createdAt: string;
  blockers: string[];
}

export interface DecisionRecord {
  id: string;
  type: DecisionType;
  area: DecisionArea;
  question: string;
  options: string[];
  decisionOptions?: DecisionOption[];
  selectedOptionId?: string;
  selectedOption?: DecisionOption;
  recommendation: string;
  status: DecisionStatus;
  reasoning: string;
  confidence: number;
  createdAt: string;
  resolvedAt?: string;
  impact: string[];
  requiredInputs: string[];
  source?: "initial" | "intelligence" | "fallback";
  relatedBottleneck?: ScoreDimension;
  supersededBy?: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  strategy: string;
  tradeoffs: string[];
  risks: string[];
  expectedImpact: DecisionImpact;
}

export interface DecisionImpact {
  dimension: string;
  direction: "increase" | "decrease" | "neutral";
  magnitude: "low" | "medium" | "high";
  rationale: string;
}

export interface DecisionOutcome {
  decisionId: string;
  selectedOptionId?: string;
  expectedImpact: DecisionImpact;
  status: "pending" | "in_progress" | "validated" | "failed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  validationEvidence: string[];
  actualImpact?: DecisionImpact;
}

export interface BrandMemory {
  entries: MemoryEntry[];
  events: BrandEvent[];
  observations: BrandObservation[];
  decisions: DecisionRecord[];
  decisionOutcomes: DecisionOutcome[];
  scoreSnapshots: ScoreSnapshot[];
  lifecycleTransitions: LifecycleTransition[];
  unresolvedQuestions: string[];
  openQuestions: string[];
  lastUpdatedAt: string;
}

export interface MissionControlState {
  readinessScore: number;
  diagnosis: string;
  rankedBottlenecks: Array<{
    dimension: ScoreDimension;
    score: number;
    reasons: string[];
    missingInputs: string[];
  }>;
  bottleneck: ScoreDimension;
  nextBestAction: string;
  recommendedStudio: StudioId;
  strategicFocus: string;
  missingInputs: string[];
  actionPlan: string[];
  expectedImpact: string[];
}

export interface DecisionInput {
  area: DecisionArea;
  question?: string;
  options?: string[];
}

export type DecisionRecommendation = DecisionRecord;

export interface StudioDefinition {
  id: StudioId;
  name: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  decisionAreas: DecisionArea[];
}

export interface IntelligencePackDefinition {
  id: IntelligencePackId;
  label: string;
  appliesTo: string[];
  status: "metadata_only";
  description: string;
}

export interface BrandOperatingState {
  schemaVersion: string;
  id: string;
  createdAt: string;
  lifecycleStage: BrandLifecycleStage;
  brand: BrandSeedInput;
  audience: AudienceProfile;
  positioning: PositioningProfile;
  trust: TrustProfile;
  authority: AuthorityProfile;
  offer: OfferProfile;
  channels: ChannelProfile;
  growth: GrowthProfile;
  memory: BrandMemory;
  score: BrandScore;
  missionControl: MissionControlState;
  studios: StudioDefinition[];
  intelligencePacks: IntelligencePackDefinition[];
  decisions: DecisionRecord[];
}

export interface StateChangeResult {
  state: BrandOperatingState;
  events: BrandEvent[];
  scoreSnapshot: ScoreSnapshot;
  lifecycleTransition?: LifecycleTransition;
}

export interface BrandOSFailure {
  ok: false;
  error: string;
  errors?: Array<{ path: string; code: string; message: string }>;
}

export interface BrandOSSuccess {
  ok: true;
  result: StateChangeResult;
}

export type BrandOSRepositoryResult = BrandOSSuccess | BrandOSFailure;
