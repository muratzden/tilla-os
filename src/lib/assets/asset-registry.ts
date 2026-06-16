import type { AssetRenderer, AssetType } from "./asset-types";

type AssetRegistryItem = {
  purposeKey: string;
  channel: string;
  format: string;
  structure: string[];
  constraintKeys: string[];
  renderer: AssetRenderer;
};

export const assetRegistry: Record<AssetType, AssetRegistryItem> = {
  instagram_post: {
    purposeKey: "asset.instagram_post.purpose",
    channel: "instagram",
    format: "feed_post",
    structure: ["hook", "product_context", "emotional_angle", "cta"],
    constraintKeys: [
      "asset.constraint.no_cheap_luxury_language",
      "asset.constraint.no_excessive_adjectives",
    ],
    renderer: "instagram_post",
  },

  instagram_story: {
    purposeKey: "asset.instagram_story.purpose",
    channel: "instagram",
    format: "story",
    structure: ["opening_frame", "detail_frame", "trust_frame", "cta_frame"],
    constraintKeys: [
      "asset.constraint.minimal_text",
      "asset.constraint.visual_first_logic",
    ],
    renderer: "instagram_story",
  },

  product_page_hero: {
    purposeKey: "asset.product_page_hero.purpose",
    channel: "website",
    format: "hero_section",
    structure: ["headline_role", "supporting_line_role", "visual_direction"],
    constraintKeys: [
      "asset.constraint.premium_ecommerce_tone",
      "asset.constraint.no_generic_sales_copy",
    ],
    renderer: "product_page_hero",
  },

  product_description: {
    purposeKey: "asset.product_description.purpose",
    channel: "website",
    format: "long_form_copy",
    structure: ["essence", "material", "function", "usage", "closing"],
    constraintKeys: [
      "asset.constraint.no_mass_production_claims",
      "asset.constraint.no_fake_luxury",
    ],
    renderer: "product_description",
  },

  visual_prompt: {
    purposeKey: "asset.visual_prompt.purpose",
    channel: "ai_visual",
    format: "image_prompt",
    structure: [
      "subject",
      "scene",
      "lighting",
      "camera",
      "atmosphere",
      "negative_prompt",
    ],
    constraintKeys: [
      "asset.constraint.no_watermark",
      "asset.constraint.no_fake_leather",
      "asset.constraint.no_glossy_plastic",
    ],
    renderer: "visual_prompt",
  },

  email_campaign: {
    purposeKey: "asset.email_campaign.purpose",
    channel: "email",
    format: "campaign_email",
    structure: [
      "subject_role",
      "opening",
      "product_story",
      "offer_or_reason",
      "cta",
    ],
    constraintKeys: [
      "asset.constraint.no_aggressive_discount_language",
      "asset.constraint.no_spam_tone",
    ],
    renderer: "email_campaign",
  },
};
