import type { BrandEvent, BrandOperatingState } from "./types";

export interface BrandOSStorageAdapter {
  getState(workspaceId: string): Promise<BrandOperatingState | null>;
  saveState(workspaceId: string, state: BrandOperatingState): Promise<void>;
  appendEvents(workspaceId: string, events: BrandEvent[]): Promise<void>;
  getEvents(workspaceId: string): Promise<BrandEvent[]>;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

export function createMemoryBrandOSStorageAdapter(): BrandOSStorageAdapter {
  const states = new Map<string, BrandOperatingState>();
  const events = new Map<string, BrandEvent[]>();

  return {
    async getState(workspaceId: string): Promise<BrandOperatingState | null> {
      const state = states.get(workspaceId);
      return state ? clone(state) : null;
    },

    async saveState(workspaceId: string, state: BrandOperatingState): Promise<void> {
      states.set(workspaceId, clone(state));
    },

    async appendEvents(workspaceId: string, nextEvents: BrandEvent[]): Promise<void> {
      const existingEvents = events.get(workspaceId) ?? [];
      events.set(workspaceId, [...existingEvents, ...clone(nextEvents)]);
    },

    async getEvents(workspaceId: string): Promise<BrandEvent[]> {
      return clone(events.get(workspaceId) ?? []);
    }
  };
}
