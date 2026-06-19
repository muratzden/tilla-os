import type { BrandSignal } from "../signals/types";

export type SignalRegistry = {
  signals: BrandSignal[];

  byId: Record<string, BrandSignal>;

  byCategory: Record<string, BrandSignal[]>;

  strongSignals: BrandSignal[];

  weakSignals: BrandSignal[];
};