import { BrandGraph } from "./brand-graph";
import { FounderSignal } from "./founder-signals";
import { ManifestoPrinciple } from "./manifesto-discovery-engine";
import { KernelMissionControl } from "./mission-control-engine";
import { BrandConstitution } from "./constitution-generator";
import { DecisionPolicy } from "./decision-policy-generator";
import type { BrandSignal } from "./signals/types";
import type { SignalAggregationReport } from "./aggregation/aggregation-types";
import type { SignalValidationReport } from "./validation/signal-validation-types";
import type { ManifestoGateReport } from "./manifesto-gate/manifesto-gate-types";
import type { MissionControlIntelligenceReport } from "./mission-control-intelligence/mission-control-types";
export interface KernelInput {
  rawAnswers: string[];
}

export interface KernelOutput {
  signals: FounderSignal[];
  brandSignals: BrandSignal[];
  approvedSignals: BrandSignal[];

  aggregation: SignalAggregationReport;
  validation: SignalValidationReport;
    manifestoGate: ManifestoGateReport;

  missionControlIntelligence: MissionControlIntelligenceReport;

  graph: BrandGraph;

  manifesto: ManifestoPrinciple | null;

  constitution: BrandConstitution | null;

  policies: DecisionPolicy[];

  missionControl: KernelMissionControl;
}