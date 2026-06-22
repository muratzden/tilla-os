import type { BrandSignal } from "../signals/types";
import type { BrandTension } from "../contradictions/types";

export type ConfidenceFactor = {
  id: string;
  label: string;
  impact: number;
};

export type KernelConfidenceReport = {
  score: number;

  signalCount: number;

  contradictionCount: number;

  strongSignals: BrandSignal[];

  weakSignals: BrandSignal[];

  tensions: BrandTension[];

  factors: ConfidenceFactor[];
};
