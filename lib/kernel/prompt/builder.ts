import { getBrandProfile } from "../memory/brand";

export function buildProductPrompt(productName: string) {
  const brand = getBrandProfile();

  return `
BRAND: ${brand.brand}

POSITIONING:
${brand.positioning}

TONE:
${brand.tone}

PRINCIPLES:
${brand.principles.join(", ")}

FORBIDDEN:
${brand.forbidden.join(", ")}

TASK:
Create premium product copy for:

${productName}
`;
}
