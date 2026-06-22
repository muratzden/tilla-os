import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/settings/settings-types";

export interface SettingsContract {
  getSystemSettings(): Promise<AdminSystemSettings>;

  getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings>;
}