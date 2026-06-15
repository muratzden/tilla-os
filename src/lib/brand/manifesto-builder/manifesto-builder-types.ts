export type ManifestoDraft = {
  brandId: string;

  narrative: string;

  principles: string[];

  forbiddenDirections: string[];
};

export type ManifestoValidationResult = {
  valid: boolean;
  score: number;
  warnings: string[];
};
