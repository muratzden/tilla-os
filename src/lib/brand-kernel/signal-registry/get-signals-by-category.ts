import type { SignalRegistry } from "./signal-registry-types";

export function getSignalsByCategory(
  registry: SignalRegistry,
  category: string,
) {
  return registry.byCategory[category] ?? [];
}
