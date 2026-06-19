export type BrandSignalCategory =
  | "identity"
  | "positioning"
  | "pricing"
  | "quality"
  | "production"
  | "trust"
  | "growth"
  | "audience"
  | "transformation"
  | "voice"
  | "values";

export interface BrandSignal {
  id: string;

  category: BrandSignalCategory;

  strength: number; // 0-1

  evidence: string[];
}

export interface FounderSignalInput {
  answer: string;
}

export interface FounderSignalExtractionResult {
  signals: BrandSignal[];
}