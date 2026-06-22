import type { SettingsAdminRepository } from "../../repositories/contracts/settings-admin-repository";
import type { SettingsAdminService } from "../contracts/settings-admin-service";

export class SettingsAdminServiceImpl implements SettingsAdminService {
  constructor(private readonly settingsRepository: SettingsAdminRepository) {}

  async getSystemSettings() {
    return this.settingsRepository.getSystemSettings();
  }

  async getWorkspaceSettings(workspaceId: string) {
    return this.settingsRepository.getWorkspaceSettings(workspaceId);
  }
}