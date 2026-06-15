export type BrandDecisionInput = {
  task:
    | "product_copy"
    | "instagram_post"
    | "seo_description"
    | "photo_direction";

  productName: string;
};

export type BrandDecisionOutput = {
  approved: boolean;
  strategy: string;
  tone: string;
};
