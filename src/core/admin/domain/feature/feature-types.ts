export type AdminFeatureFlagStatus = "enabled" | "disabled";

export type AdminFeatureFlagScope = "global" | "workspace" | "user";

export interface AdminFeatureFlag {
  id: string;
  key: string;
  name: string;
  description?: string;
  status: AdminFeatureFlagStatus;
  scope: AdminFeatureFlagScope;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminFeatureFlagAssignment {
  featureFlagId: string;
  scope: AdminFeatureFlagScope;
  targetId?: string;
  enabled: boolean;
}