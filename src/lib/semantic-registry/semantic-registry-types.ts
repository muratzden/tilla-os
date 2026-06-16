export type SemanticDomain =
  | "archetypes"
  | "worlds"
  | "scenes"
  | "styling"
  | "shotTypes"
  | "compositions";

export type SemanticEntryStatus = "active" | "draft" | "deprecated";

export interface SemanticEntry {
  id: string;
  domain: SemanticDomain;

  tags?: string[];
  status?: SemanticEntryStatus;

  metadata?: Record<string, unknown>;
}

export type SemanticRegistry = Record<
  SemanticDomain,
  Record<string, SemanticEntry>
>;
