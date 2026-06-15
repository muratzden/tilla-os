export type ConstitutionPrincipleKey =
  | "human_craft"
  | "material_truth"
  | "controlled_variation"
  | "character"
  | "individuality"
  | "longevity"
  | "ownership";

export type ForbiddenDirectionKey =
  | "fast_fashion"
  | "mass_production"
  | "fake_perfection"
  | "generic_luxury"
  | "trend_chasing";

export type ConstitutionPrinciple = {
  key: ConstitutionPrincipleKey;
  title: string;
  description: string;
};

export type ConstitutionDecisionRule = {
  key: string;
  rule: string;
};

export type BrandConstitution = {
  brandId: string;
  principles: ConstitutionPrinciple[];
  forbiddenDirections: ForbiddenDirectionKey[];
  decisionRules: ConstitutionDecisionRule[];
  manifesto: {
    short: string;
    long: string;
  };
};
