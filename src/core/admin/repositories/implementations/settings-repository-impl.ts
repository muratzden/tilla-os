import { getWorkspaceSettings } from "@/src/lib/workspace/workspace-settings-storage";

import type { SettingsAdminRepository } from "../contracts/settings-admin-repository";
import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/admin-settings";

export class SettingsRepositoryImpl implements SettingsAdminRepository {
  async getSystemSettings(): Promise<AdminSystemSettings> {
  return {
    maintenanceMode: false,
    registrationEnabled: true,
  };
}

  async getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings | null> {
    const settings = await getWorkspaceSettings(workspaceId);

    return settings as AdminWorkspaceSettings | null;
  }
}