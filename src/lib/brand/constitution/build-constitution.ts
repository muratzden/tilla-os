import type { BrandSetup } from "../setup/brand-setup-types";
import type { BrandConstitution } from "./constitution-types";
import { loadConstitution } from "../constitution-store/constitution-store";

export function buildConstitution(
  brandId: string,
  setup: BrandSetup,
): BrandConstitution {
  const generatedConstitution = loadConstitution(brandId);

  if (generatedConstitution) {
    return generatedConstitution;
  }

  return {
    brandId,

    principles: [
      {
        key: "human_craft",
        title: "Human Craft",
        description:
          "The brand values human handwork over industrial perfection.",
      },
      {
        key: "material_truth",
        title: "Material Truth",
        description:
          "The natural surface, texture, grain and patina of leather must be respected.",
      },
      {
        key: "controlled_variation",
        title: "Controlled Variation",
        description:
          "Small human differences in stitching, surface and form are accepted as signs of craft, not defects.",
      },
      {
        key: "character",
        title: "Character",
        description:
          "Products should express individuality, use, age and material presence.",
      },
      {
        key: "individuality",
        title: "Individuality",
        description:
          "Each product may belong to the same brand language without becoming identical.",
      },
      {
        key: "longevity",
        title: "Longevity",
        description:
          "The brand favors lasting ownership over seasonal trend consumption.",
      },
      {
        key: "ownership",
        title: "Ownership",
        description:
          "A product begins its real life when it leaves the artisan and gains the owner’s marks over time.",
      },
    ],

    forbiddenDirections: [
      "fast_fashion",
      "mass_production",
      "fake_perfection",
      "generic_luxury",
      "trend_chasing",
    ],

    decisionRules: [
      {
        key: "human_craft_over_industrial_perfection",
        rule: "Never describe handmade variation as defect or weakness.",
      },
      {
        key: "material_truth_before_visual_polish",
        rule: "Preserve leather texture, grain, patina and surface character in brand decisions.",
      },
      {
        key: "controlled_variation_is_not_error",
        rule: "Small differences in handmade production should be treated as controlled character, not inconsistency.",
      },
      {
        key: "longevity_over_trend",
        rule: "Avoid fast-fashion, disposable or trend-chasing language unless explicitly rejected by the system.",
      },
      {
        key: "ownership_after_workshop",
        rule: "Frame the product as something that gains meaning through ownership, use and time.",
      },
    ],

    manifesto: {
      short: "Human craft over industrial perfection.",
      long: "Tilla does not promise industrial perfection or identical repetition. It values handcraft, controlled human variation, material character, intention and ownership over time. Small differences in stitching, leather surface and form are not defects; they are proof of human craft. The brand standard is not flawlessness, but intention, control and character.",
    },
  };
}
