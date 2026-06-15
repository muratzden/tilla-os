import { getBrandProfile } from "../memory/brand";

export function generateCopy(productName: string) {
  const brand = getBrandProfile();

  return {
    headline: `${productName}`,
    subheadline: `Crafted for those who value ${brand.principles[0]}.`,
    summary: `${productName} reflects the values of ${brand.brand}: ${brand.principles.join(", ")}.`,
  };
}
