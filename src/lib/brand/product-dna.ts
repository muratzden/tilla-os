export type ProductDNA = {
  category: string;
  material: string;
  color: string;
  size: string;
  useCase: string;
  character: string;
  signature: string;
};

export function productDNA(input: any): ProductDNA {
  const category = normalize(input.type ?? input.category ?? "unknown");
  const material = normalize(input.material ?? "unknown");
  const color = normalize(input.color ?? "unknown");
  const size = normalize(input.size ?? "unknown");
  const useCase = normalize(input.useCase ?? input.use_case ?? "daily_carry");

  const character = resolveCharacter({
    category,
    material,
    color,
    useCase,
  });

  const signature = [category, material, color, size, useCase, character].join(
    ":",
  );

  return {
    category,
    material,
    color,
    size,
    useCase,
    character,
    signature,
  };
}

function normalize(value: string) {
  return String(value).toLowerCase().trim().replace(/\s+/g, "_");
}

function resolveCharacter(input: {
  category: string;
  material: string;
  color: string;
  useCase: string;
}) {
  if (
    input.category === "briefcase" ||
    input.useCase.includes("office") ||
    input.useCase.includes("business")
  ) {
    return "controlled_confidence";
  }

  if (
    input.color.includes("black") ||
    input.color.includes("noir") ||
    input.color.includes("siyah")
  ) {
    return "quiet_power";
  }

  if (
    input.color.includes("camel") ||
    input.color.includes("tan") ||
    input.color.includes("taba")
  ) {
    return "warm_heritage";
  }

  if (
    input.material.includes("frisco") ||
    input.material.includes("crazy_horse")
  ) {
    return "rugged_elegance";
  }

  return "material_honesty";
}
