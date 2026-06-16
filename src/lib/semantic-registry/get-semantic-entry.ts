import { semanticRegistry } from "./semantic-registry";

import type { SemanticDomain, SemanticEntry } from "./semantic-registry-types";

export function getSemanticEntry(
  domain: SemanticDomain,
  id: string,
): SemanticEntry | undefined {
  return semanticRegistry[domain]?.[id];
}
