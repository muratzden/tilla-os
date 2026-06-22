export type AdminSettingScope = "system" | "workspace";

export interface AdminSystemSettings {
  marketplaceEnabled: boolean;
  packageInstallationEnabled: boolean;
  featureFlagsEnabled: boolean;
  maintenanceMode: boolean;
}

export interface AdminWorkspaceSettings {
  workspaceId: string;
  defaultLanguage: string;
  activeOutputLanguage: string;
  marketplaceEnabled: boolean;
  updatedAt?: string;
}

export interface AdminSettingRecord {
  id: string;
  scope: AdminSettingScope;
  targetId?: string;
  key: string;
  value: unknown;
  updatedAt: string;
}