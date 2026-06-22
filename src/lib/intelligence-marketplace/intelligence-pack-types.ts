export type IntelligencePackType =
  | "industry"
  | "market"
  | "channel"
  | "compliance"
  | "workflow"
  | "theme"
  | "personal_brand";

export type IntelligencePackEntitlement =
  | "free"
  | "purchased"
  | "licensed"
  | "enterprise";

export type IntelligencePackStatus =
  | "active"
  | "inactive"
  | "draft"
  | "deprecated";

export type IntelligencePack = {
  id: string;
  name: string;
  description: string;
  type: IntelligencePackType;
  version: string;
  entitlement: IntelligencePackEntitlement;
  status: IntelligencePackStatus;
  tags: string[];
  installed: boolean;
  active: boolean;
};

export type WorkspaceIntelligencePackState = {
  workspaceId: string;
  installedPacks: IntelligencePack[];
  activePackIds: string[];
};
