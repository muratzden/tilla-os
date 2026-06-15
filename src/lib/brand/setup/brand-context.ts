import { brandRegistry } from "./brand-registry";

export function getCurrentBrand() {
  return brandRegistry.find((brand) => brand.active) || null;
}
