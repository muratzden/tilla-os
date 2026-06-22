export type BrandSignalCategory =
  | "identity"
  | "audience"
  | "belief"
  | "transformation"
  | "principles"
  | "positioning"
  | "values"
  | "direction"
  | "quality"
  | "trust"
  | "growth"
  | "constraint";

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
