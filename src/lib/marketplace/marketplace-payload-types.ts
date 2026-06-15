import type { MarketplaceManifest } from "./marketplace-manifest-types";

export type LanguageMarketplacePayload = {
  type: "language";
  languageCode: string;
  outputPackId: string;
};

export type IndustryMarketplacePayload = {
  type: "industry";
  industryId: string;
  industryName: string;
  defaultArchetypes: string[];
  defaultWorlds: string[];
  recommendedChannels: string[];
};

export type PersonalBrandMarketplacePayload = {
  type: "personal_brand";
  personaTypes: string[];
  contentPillars: string[];
  recommendedChannels: string[];
};

export type WorkflowMarketplacePayload = {
  type: "workflow";
  workflowId: string;
  steps: string[];
};

export type ComplianceMarketplacePayload = {
  type: "compliance";
  complianceId: string;
  rules: string[];
};

export type ThemeMarketplacePayload = {
  type: "theme";
  themeId: string;
  tokens: Record<string, string>;
};

export type MarketplacePayload =
  | LanguageMarketplacePayload
  | IndustryMarketplacePayload
  | PersonalBrandMarketplacePayload
  | WorkflowMarketplacePayload
  | ComplianceMarketplacePayload
  | ThemeMarketplacePayload;

export type MarketplacePackage<TPayload extends MarketplacePayload = MarketplacePayload> = {
  manifest: MarketplaceManifest;
  payload: TPayload;
};