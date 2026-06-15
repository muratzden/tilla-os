export type BrandContext = {
  input: string;
  intent?: "product" | "content" | "brand" | "unknown";
  tone?: "artisan_premium" | "modern_luxury" | "minimal";
};
