import type { SignalRegistry } from "./signal-registry-types";

export function getSignalById(registry: SignalRegistry, signalId: string) {
  return registry.byId[signalId];
}
