export const brandManifestoRegistry = {
  "tilla-leather": {
    narrative:
      "Human craft over industrial perfection. Tilla Leather values material truth, controlled variation, character, individuality, longevity and ownership.",

    principles: [
      "human_craft",
      "material_truth",
      "controlled_variation",
      "character",
      "individuality",
      "longevity",
      "ownership",
    ],

    forbiddenDirections: [
      "fast_fashion",
      "mass_production",
      "fake_perfection",
      "generic_luxury",
      "trend_chasing",
    ],
  },
} as const;

export type BrandManifestoId = keyof typeof brandManifestoRegistry;
