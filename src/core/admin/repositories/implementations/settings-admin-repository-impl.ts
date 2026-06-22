import { getWorkspaceSettings } from "@/src/lib/workspace/workspace-settings-storage";

import type { SettingsAdminRepository } from "../contracts/settings-admin-repository";
import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/settings/settings-types";

export class SettingsAdminRepositoryImpl implements SettingsAdminRepository {
  async getSystemSettings(): Promise<AdminSystemSettings> {
    return {
      marketplaceEnabled: true,
      packageInstallationEnabled: true,
      featureFlagsEnabled: false,
      maintenanceMode: false,
    };
  }

  async getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings | null> {
    const settings = await getWorkspaceSettings(workspaceId);

    if (!settings) {
      return null;
    }

   return {
  workspaceId,
  defaultLanguage: "en",
  activeOutputLanguage: "en",
  marketplaceEnabled: true,
};
  }
}