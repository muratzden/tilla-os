export type ConstitutionPrinciple = {
  key: string;
  title: string;
  description: string;
};

export type ConstitutionDecisionRule = {
  key: string;
  rule: string;
};

export type GeneratedConstitution = {
  brandId: string;

  corePrinciple: string | null;

  supportingPrinciples: string[];

  secondaryPrinciples: string[];

  principles: ConstitutionPrinciple[];

  forbiddenDirections: string[];

  decisionRules: ConstitutionDecisionRule[];
};
