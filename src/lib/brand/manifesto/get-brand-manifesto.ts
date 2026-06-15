import {
  BrandManifestoId,
  brandManifestoRegistry,
} from "./brand-manifesto-registry";

export function getBrandManifesto(brandId?: string) {
  const manifestoId = brandId as BrandManifestoId;

  return (
    brandManifestoRegistry[manifestoId] ??
    brandManifestoRegistry["tilla-leather"]
  );
}
