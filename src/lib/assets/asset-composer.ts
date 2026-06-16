import type { AssetBlueprint, AssetType } from "./asset-types";
import { assetRegistry } from "./asset-registry";

type AssetComposerInput = {
  assetType: AssetType;
  dna?: {
    category?: string;
    material?: string;
    color?: string;
    size?: string;
  };
  archetype?: {
    archetype?: string;
    archetypeHint?: string;
  };
  world?: {
    atmosphere?: string;
    emotionalField?: string;
    environment?: string;
  };
  intent?: {
    emotionalTone?: string;
  };
};

export function assetComposer(input: AssetComposerInput): AssetBlueprint {
  const config = assetRegistry[input.assetType];

  if (!config) {
    throw new Error(`Unknown asset type: ${input.assetType}`);
  }

  return {
    type: input.assetType,

    productType: input.dna?.category,
    material: input.dna?.material,
    color: input.dna?.color,
    size: input.dna?.size,

    purposeKey: config.purposeKey,
    channel: config.channel,
    format: config.format,

    archetypeHint: input.archetype?.archetypeHint ?? input.archetype?.archetype,

    emotionalTone: input.intent?.emotionalTone ?? input.world?.emotionalField,

    atmosphere: input.world?.atmosphere ?? input.world?.emotionalField,

    environment: input.world?.environment,

    structure: config.structure,
    constraintKeys: config.constraintKeys,

    renderer: config.renderer,
  };
}
