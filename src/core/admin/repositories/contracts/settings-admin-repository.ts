import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/admin-settings";

export interface SettingsAdminRepository {
  getSystemSettings(): Promise<AdminSystemSettings>;

  getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings | null>;
}