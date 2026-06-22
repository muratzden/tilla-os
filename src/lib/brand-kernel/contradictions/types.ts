import type { BrandSignal } from "../signals/types";

export type BrandTensionType =
  | "positioning_conflict"
  | "pricing_conflict"
  | "growth_conflict"
  | "quality_conflict"
  | "trust_conflict"
  | "identity_conflict";

export interface BrandTension {
  type: BrandTensionType;

  signalA: BrandSignal;
  signalB: BrandSignal;

  tension: number; // 0-1

  reason: string;
}

export interface ContradictionRule {
  signalA: string;
  signalB: string;

  type: BrandTensionType;

  weight: number; // 0-1

  reason: string;
}
