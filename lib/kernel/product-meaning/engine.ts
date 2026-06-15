export function inferProductMeaning(productType: string) {
  switch (productType) {
    case "briefcase":
      return {
        identity: "professional",
        emotion: "confidence",
        narrative: "craftsmanship",
      };

    case "wallet":
      return {
        identity: "minimalist",
        emotion: "simplicity",
        narrative: "everyday_luxury",
      };

    default:
      return {
        identity: "artisan",
        emotion: "quality",
        narrative: "timeless_design",
      };
  }
}
