import type { BrandSignal } from "../signals/types";
import type { SignalEvidence } from "./evidence-types";

export type SignalWithEvidence = {
  signal: BrandSignal;
  evidence?: SignalEvidence;
};