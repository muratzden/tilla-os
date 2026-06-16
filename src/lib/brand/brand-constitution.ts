import type { OutputLanguage } from "../i18n/language";
import { getOutputPack } from "../i18n/output-packs";

export const brandConstitution = {
  brand: "Tilla Leather Craft",

  corePrinciples: [
    "Perfection is not the goal",
    "Human variation is not a defect",
    "Craft over industrial uniformity",
    "Character over perfection",
    "Products continue after production",
    "Material honesty over artificial polish",
    "Quiet confidence over loud luxury",
  ],

  forbiddenClaims: [
    "perfect craftsmanship",
    "flawless stitching",
    "defect-free production",
    "luxury appearance",
    "perfect leather",
    "flawless leather",
    "mass production quality",
    "factory precision",
    "identical finish",
    "zero defect",
    "premium look",
  ],

  preferredLanguage: [
    "handcrafted",
    "human variation",
    "natural leather character",
    "material honesty",
    "quiet confidence",
    "designed to age",
    "built to develop patina",
    "crafted with restraint",
    "made by hand",
    "individual character",
  ],

  rejectionReason: {
    perfection:
      "Tilla does not claim industrial perfection. The brand values controlled human variation.",
    fakeLuxury:
      "Tilla avoids loud luxury language and surface-level premium claims.",
    industrialUniformity:
      "Tilla products are handmade and should not be described as identical or factory-perfect.",
  },
};

export function checkBrandConstitution(
  text: string,
  outputLanguage: OutputLanguage = "en",
) {
  const outputPack = getOutputPack(outputLanguage);
  const lowerText = text.toLowerCase();

  const violations = brandConstitution.forbiddenClaims.filter((claim) =>
    lowerText.includes(claim.toLowerCase()),
  );

  return {
    approved: violations.length === 0,
    violations,
    message:
      violations.length === 0
        ? outputPack.governanceAuditText.constitution.approved
        : outputPack.governanceAuditText.constitution.rejected,
  };
}
