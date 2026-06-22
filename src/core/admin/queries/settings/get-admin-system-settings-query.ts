import type { AdminCompositionRoot } from "../../admin-composition-root";
import type { AdminSystemSettingsDto } from "../../application/dto/admin-system-settings-dto";
import { toAdminSystemSettingsDto } from "../../application/mappers/admin-system-settings-mapper";
import type { AdminQueryHandler } from "../contracts/admin-query-handler";

export const getAdminSystemSettingsQuery: AdminQueryHandler<
  AdminCompositionRoot,
  AdminSystemSettingsDto
> = async (admin) => {
  const settings =
    await admin.services.settingsAdminService.getSystemSettings();

  return toAdminSystemSettingsDto(settings);
};