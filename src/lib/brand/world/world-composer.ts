// src/lib/brand/world/world-composer.ts

import { worldRegistry } from "./world-registry";
import type { BrandWorld } from "./world-types";
import { selectWorldKeyByDiversity } from "./world-diversity";

type WorldComposerInput = {
  dna: any;
  archetype: {
    archetype?: string;
  };
  seed?: number;
  channel?: string;
  selectedWorld?: string;
};

function withWorldKey(worldKey: string, world: BrandWorld): BrandWorld {
  return {
    ...world,
    worldKey,
  };
}

export function worldComposer({
  dna,
  archetype,
  seed,
  channel,
  selectedWorld,
}: WorldComposerInput): BrandWorld {
  const selectedKey =
    selectedWorld ??
    selectWorldKeyByDiversity({
      dna,
      archetype: archetype?.archetype,
      seed,
      channel,
    });

  const world = worldRegistry[selectedKey as keyof typeof worldRegistry];

  if (!world) {
    throw new Error(`World not found in registry: ${selectedKey}`);
  }

  return withWorldKey(selectedKey, world);
}
