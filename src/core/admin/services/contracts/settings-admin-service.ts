import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/settings/settings-types";

export interface SettingsAdminService {
  getSystemSettings(): Promise<AdminSystemSettings>;

  getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings | null>;
}