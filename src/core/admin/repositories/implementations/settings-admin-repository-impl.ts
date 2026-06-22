import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/admin-settings";
import type { SettingsAdminRepository } from "../contracts/settings-admin-repository";

export class SettingsAdminRepositoryImpl implements SettingsAdminRepository {
  async getSystemSettings(): Promise<AdminSystemSettings> {
    return {
      maintenanceMode: false,
      registrationEnabled: true,
    };
  }

  async getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings | null> {
    return {
      workspaceId,
      status: "active",
    };
  }
}