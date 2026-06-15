import { pickDeterministicVariant } from "@/src/lib/brand/identity/signature-engine";

type VariantInput = {
  dna?: {
    category?: string;
    type?: string;
    material?: string;
    color?: string;
    size?: string;
  };
  channel?: string;
  worldKey?: string;
  seed?: number;
};

export function selectSceneVariant<T>(
  variants: T[],
  input: VariantInput,
): T | null {
  if (!variants || variants.length === 0) {
    return null;
  }

  if (typeof input.seed === "number") {
    return pickDeterministicVariant(variants, input.seed);
  }

  return variants[0];
}
