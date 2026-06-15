import { getBrandProfile } from "../memory/brand";

export function generateProductHeadline(productName: string) {
  const brand = getBrandProfile();

  return `${productName} | ${brand.positioning}`;
}
