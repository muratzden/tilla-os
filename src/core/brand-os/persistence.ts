import { createMemoryBrandOSStorageAdapter } from "./storage-adapter";
import type { BrandOSStorageAdapter } from "./storage-adapter";

export type BrandOSPersistenceAdapter = BrandOSStorageAdapter;

export function createMemoryBrandOSPersistenceAdapter(): BrandOSPersistenceAdapter {
  return createMemoryBrandOSStorageAdapter();
}
