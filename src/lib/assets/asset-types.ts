export type AssetType =
  | "visual_prompt"
  | "instagram_post"
  | "instagram_story"
  | "product_page_hero"
  | "product_description"
  | "email_campaign";

export type AssetRenderer = AssetType;

export type AssetBlueprint = {
  type: AssetType;

  productType?: string;
  material?: string;
  color?: string;
  size?: string;

  purposeKey: string;
  channel: string;
  format: string;

  emotionalTone?: string;
  atmosphere?: string;
  environment?: string;
  archetypeHint?: string;

  structure: string[];
  constraintKeys: string[];

  renderer: AssetRenderer;
};
