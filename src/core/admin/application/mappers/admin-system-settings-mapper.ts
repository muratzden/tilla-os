import type { AdminSystemSettings } from "../../domain/settings/settings-types";
import type { AdminSystemSettingsDto } from "../dto/admin-system-settings-dto";

export function toAdminSystemSettingsDto(
  settings: AdminSystemSettings,
): AdminSystemSettingsDto {
  return {
    marketplaceEnabled: settings.marketplaceEnabled,
    packageInstallationEnabled: settings.packageInstallationEnabled,
    featureFlagsEnabled: settings.featureFlagsEnabled,
    maintenanceMode: settings.maintenanceMode,
  };
}