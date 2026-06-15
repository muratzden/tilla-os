import type { BrandConstitution } from "../constitution/constitution-types";

const generatedConstitutionRegistry = new Map<string, BrandConstitution>();

export function saveGeneratedConstitution(
  constitution: BrandConstitution,
): void {
  generatedConstitutionRegistry.set(constitution.brandId, constitution);
}

export function getGeneratedConstitution(
  brandId: string,
): BrandConstitution | null {
  return generatedConstitutionRegistry.get(brandId) ?? null;
}

export function hasGeneratedConstitution(brandId: string): boolean {
  return generatedConstitutionRegistry.has(brandId);
}
