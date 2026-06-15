export type ProductIdentityInput = {
  type?: string;
  material?: string;
  color?: string;
  size?: string;
  channel?: string;
};

export function createProductSignature(input: ProductIdentityInput): string {
  return [
    normalize(input.type),
    normalize(input.material),
    normalize(input.color),
    normalize(input.size),
  ]
    .filter(Boolean)
    .join("-");
}

export function createDeterministicSeed(
  signature: string,
  channel?: string,
): number {
  const source = `${signature}:${normalize(channel) || "default"}`;

  let hash = 0;

  for (let i = 0; i < source.length; i++) {
    hash = (hash << 5) - hash + source.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function pickDeterministicVariant<T>(items: T[], seed: number): T {
  if (!items.length) {
    throw new Error("Cannot select deterministic variant from empty list");
  }

  return items[seed % items.length];
}

function normalize(value?: string): string {
  return value ? value.toLowerCase().trim().replace(/\s+/g, "-") : "";
}
