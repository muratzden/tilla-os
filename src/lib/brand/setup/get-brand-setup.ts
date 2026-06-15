import { brandSetups } from "./brand-setups";

export function getBrandSetup(brandId?: string) {
  if (!brandId) {
    return brandSetups["tilla-leather"];
  }

  return (
    brandSetups[brandId as keyof typeof brandSetups] ||
    brandSetups["tilla-leather"]
  );
}
