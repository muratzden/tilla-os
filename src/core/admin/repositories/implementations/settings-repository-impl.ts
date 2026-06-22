import type { SettingsContract } from "../../domain/settings/settings-contract";
import type {
  AdminSystemSettings,
  AdminWorkspaceSettings,
} from "../../domain/settings/settings-types";
import { getWorkspaceSettings } from "@/src/lib/workspace/workspace-settings-storage";

export class SettingsRepositoryImpl implements SettingsContract {
  async getSystemSettings(): Promise<AdminSystemSettings> {
    return {
      maintenanceMode: false,
      marketplaceEnabled: true,
      packageInstallationEnabled: true,
      featureFlagsEnabled: false,
    };
  }

  async getWorkspaceSettings(
    workspaceId: string,
  ): Promise<AdminWorkspaceSettings> {
    const settings = await getWorkspaceSettings(workspaceId);

    return settings as AdminWorkspaceSettings;
  }
}