import type { BrandSignal } from "../signals/types";
import type { EvidenceReference } from "../evidence/evidence-types";

export type FounderAnswer = {
  id: string;
  question: string;
  answer: string;
};

export type ExtractedSignal = {
  signal: BrandSignal;
  evidence: EvidenceReference[];
  rationale: string;
};

export type SignalExtractionReport = {
  extractedSignals: ExtractedSignal[];
};