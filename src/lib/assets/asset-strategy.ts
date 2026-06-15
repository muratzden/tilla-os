import type { AssetType } from "./asset-types";

export function assetStrategy(intent: any): AssetType[] {
  switch (intent?.channel) {
    case "web":
    case "website":
      return ["product_page_hero", "product_description", "visual_prompt"];

    case "instagram":
      return ["instagram_post", "instagram_story", "visual_prompt"];

    case "email":
      return ["email_campaign"];

    default:
      return ["visual_prompt"];
  }
}
