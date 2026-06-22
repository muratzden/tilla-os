import type { BrandSetup } from "../setup/brand-setup-types";
import type { BrandConstitution } from "./constitution-types";
import { loadConstitution } from "../constitution-store/constitution-store";

export function buildConstitution(
  brandId: string,
  _setup: BrandSetup,
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
        title: "Human Judgment",
        description:
          "The brand should make intentional decisions instead of relying on generic or automatic outputs.",
      },
      {
        key: "material_truth",
        title: "Evidence Truth",
        description:
          "The brand should support claims with real evidence, clear context and honest proof points.",
      },
      {
        key: "controlled_variation",
        title: "Controlled Adaptation",
        description:
          "The brand may adapt across channels, but variation should remain intentional and strategically controlled.",
      },
      {
        key: "character",
        title: "Distinct Character",
        description:
          "The brand should express a recognizable point of view instead of blending into generic category language.",
      },
      {
        key: "individuality",
        title: "Specificity",
        description:
          "The brand should serve a defined audience with specific positioning rather than trying to appeal to everyone.",
      },
      {
        key: "longevity",
        title: "Long-Term Trust",
        description:
          "The brand should protect long-term credibility over short-term attention or pressure tactics.",
      },
      {
        key: "ownership",
        title: "Strategic Ownership",
        description:
          "The brand should own its decisions, claims and promises across the full customer experience.",
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
        key: "human_judgment_over_generic_automation",
        rule: "Do not publish generic output without strategic review and brand-specific judgment.",
      },
      {
        key: "evidence_truth_before_claims",
        rule: "Do not make claims that are not supported by evidence, context or clear reasoning.",
      },
      {
        key: "controlled_adaptation_is_not_inconsistency",
        rule: "Adapt messages to channel and audience while preserving the core brand position.",
      },
      {
        key: "long_term_trust_over_short_term_noise",
        rule: "Avoid pressure tactics, exaggerated promises or attention-seeking moves that weaken trust.",
      },
      {
        key: "specificity_over_generic_appeal",
        rule: "Prefer specific audience fit and positioning over vague universal appeal.",
      },
    ],

    manifesto: {
      short: "Intentional brand decisions over generic execution.",
      long: "The brand operating system favors human judgment, evidence, controlled adaptation, distinct character, specificity, long-term trust and strategic ownership. Decisions should strengthen the brand foundation instead of creating vague positioning, unsupported claims or short-term noise.",
    },
  };
}
