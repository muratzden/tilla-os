import { BrandDecisionInput, BrandDecisionOutput } from "./types";

export function makeBrandDecision(
  input: BrandDecisionInput,
): BrandDecisionOutput {
  switch (input.task) {
    case "product_copy":
      return {
        approved: true,
        strategy: "timeless_craftsmanship",
        tone: "artisan_premium",
      };

    case "instagram_post":
      return {
        approved: true,
        strategy: "storytelling",
        tone: "artisan_premium",
      };

    case "seo_description":
      return {
        approved: true,
        strategy: "search_visibility",
        tone: "minimal",
      };

    case "photo_direction":
      return {
        approved: true,
        strategy: "quiet_luxury_editorial",
        tone: "artisan_premium",
      };

    default:
      return {
        approved: false,
        strategy: "unknown",
        tone: "unknown",
      };
  }
}
