import { BrandGraph } from "./brand-graph";
import { FounderSignal } from "./founder-signals";
import { ManifestoPrinciple } from "./manifesto-discovery-engine";
import { KernelMissionControl } from "./mission-control-engine";
import { BrandConstitution } from "./constitution-generator";
import { DecisionPolicy } from "./decision-policy-generator";


export interface KernelInput {
  rawAnswers: string[];
}

export interface KernelOutput {
  signals: FounderSignal[];

  graph: BrandGraph;

  manifesto: ManifestoPrinciple | null;
  
   constitution: BrandConstitution | null;
   
   policies: DecisionPolicy[];

  missionControl: KernelMissionControl;
  
}