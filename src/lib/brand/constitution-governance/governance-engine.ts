import type { BrandConstitution } from "../constitution/constitution-types";
import { enforceBrandConstitution } from "./constitution-enforcement";
import type { ConstitutionGovernanceResult } from "./governance-types";

export function runConstitutionGovernance(params: {
  brandId: string;
  constitution: BrandConstitution;
  decisionText: string;
}): ConstitutionGovernanceResult {
  const { brandId, constitution, decisionText } = params;

  return enforceBrandConstitution({
    brandId,
    constitution,
    decisionText,
  });
}
