import type { AdminCompositionRoot } from "../../admin-composition-root";
import type { AdminSystemSettingsDto } from "../../application/dto/admin-system-settings-dto";

import { toAdminSystemSettingsDto } from "../../application/mappers/admin-system-settings-mapper";

export async function getAdminSystemSettingsQuery(
  admin: AdminCompositionRoot,
): Promise<AdminSystemSettingsDto> {
  const settings =
    await admin.services.settingsAdminService.getSystemSettings();

  return toAdminSystemSettingsDto(settings);
}