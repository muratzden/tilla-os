import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { BrandEvent, BrandOperatingState } from "./types";
import type { BrandOSStorageAdapter } from "./storage-adapter";

export interface JsonBrandOSStorageAdapterOptions {
  filePath: string;
}

interface JsonBrandOSStorageFile {
  states: Record<string, BrandOperatingState>;
  events: Record<string, BrandEvent[]>;
}

export class BrandOSJsonStorageError extends Error {
  readonly code: string;
  readonly path: string;

  constructor(code: string, path: string, message: string) {
    super(message);
    this.name = "BrandOSJsonStorageError";
    this.code = code;
    this.path = path;
  }
}

const EMPTY_STORE: JsonBrandOSStorageFile = {
  states: {},
  events: {},
};

function clone<T>(value: T): T {
  return structuredClone(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function assertStoreShape(
  value: unknown,
  filePath: string,
): JsonBrandOSStorageFile {
  if (!isRecord(value)) {
    throw new BrandOSJsonStorageError(
      "invalid_storage_shape",
      filePath,
      "Storage file must contain an object.",
    );
  }

  if (!isRecord(value.states)) {
    throw new BrandOSJsonStorageError(
      "invalid_storage_shape",
      "states",
      "Storage file states must be an object.",
    );
  }

  if (!isRecord(value.events)) {
    throw new BrandOSJsonStorageError(
      "invalid_storage_shape",
      "events",
      "Storage file events must be an object.",
    );
  }

  for (const [workspaceId, events] of Object.entries(value.events)) {
    if (!Array.isArray(events)) {
      throw new BrandOSJsonStorageError(
        "invalid_storage_shape",
        `events.${workspaceId}`,
        "Storage file events entries must be arrays.",
      );
    }
  }

  return value as unknown as JsonBrandOSStorageFile;
}

async function ensureParentFolder(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

async function writeStore(
  filePath: string,
  store: JsonBrandOSStorageFile,
): Promise<void> {
  await ensureParentFolder(filePath);

  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
  const serialized = `${JSON.stringify(store, null, 2)}\n`;

  await writeFile(tempPath, serialized, "utf8");
  await rename(tempPath, filePath);
}

async function readStore(filePath: string): Promise<JsonBrandOSStorageFile> {
  await ensureParentFolder(filePath);

  let raw: string;

  try {
    raw = await readFile(filePath, "utf8");
  } catch (error) {
    if (isRecord(error) && error.code === "ENOENT") {
      await writeStore(filePath, EMPTY_STORE);
      return clone(EMPTY_STORE);
    }

    throw error;
  }

  if (raw.trim().length === 0) {
    await writeStore(filePath, EMPTY_STORE);
    return clone(EMPTY_STORE);
  }

  try {
    return assertStoreShape(JSON.parse(raw), filePath);
  } catch (error) {
    if (error instanceof BrandOSJsonStorageError) {
      throw error;
    }

    throw new BrandOSJsonStorageError(
      "malformed_json",
      filePath,
      "Storage file contains malformed JSON.",
    );
  }
}

export function createJsonBrandOSStorageAdapter(
  options: JsonBrandOSStorageAdapterOptions,
): BrandOSStorageAdapter {
  return {
    async getState(workspaceId: string): Promise<BrandOperatingState | null> {
      const store = await readStore(options.filePath);
      const state = store.states[workspaceId];
      return state ? clone(state) : null;
    },

    async saveState(
      workspaceId: string,
      state: BrandOperatingState,
    ): Promise<void> {
      const store = await readStore(options.filePath);
      const nextStore: JsonBrandOSStorageFile = {
        states: {
          ...store.states,
          [workspaceId]: clone(state),
        },
        events: store.events,
      };

      await writeStore(options.filePath, nextStore);
    },

    async appendEvents(
      workspaceId: string,
      nextEvents: BrandEvent[],
    ): Promise<void> {
      const store = await readStore(options.filePath);
      const existingEvents = store.events[workspaceId] ?? [];
      const nextStore: JsonBrandOSStorageFile = {
        states: store.states,
        events: {
          ...store.events,
          [workspaceId]: [...existingEvents, ...clone(nextEvents)],
        },
      };

      await writeStore(options.filePath, nextStore);
    },

    async getEvents(workspaceId: string): Promise<BrandEvent[]> {
      const store = await readStore(options.filePath);
      return clone(store.events[workspaceId] ?? []);
    },
  };
}
