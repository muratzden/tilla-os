import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/settings/settings-types";

export interface SettingsAdminRepository {
  getSystemSettings(): Promise<AdminSystemSettings>;

  getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings | null>;
}