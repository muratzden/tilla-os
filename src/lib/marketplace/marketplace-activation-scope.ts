import type {
  MarketplacePackageType,
} from "./marketplace-package-types";

export const activationScope: Record<
  MarketplacePackageType,
  "single" | "multiple"
> = {
  language: "single",

  industry: "single",

  personal_brand: "single",

  workflow: "multiple",

  compliance: "multiple",

  theme: "single",
};