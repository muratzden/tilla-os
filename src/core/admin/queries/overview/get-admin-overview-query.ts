import type { AdminCompositionRoot } from "../../admin-composition-root";
import type { AdminOverviewDto } from "../../application/dto/admin-overview-dto";
import type { AdminQueryHandler } from "../contracts/admin-query-handler";
import { getAdminSystemSettingsQuery } from "../settings/get-admin-system-settings-query";
import { getAdminUsersQuery } from "../users/get-admin-users-query";
import { getAdminWorkspaceQuery } from "../workspaces/get-admin-workspace-query";

export const getAdminOverviewQuery: AdminQueryHandler<
  AdminCompositionRoot,
  AdminOverviewDto,
  string
> = async (admin, workspaceId) => {
  const [systemSettings, users, workspace] = await Promise.all([
    getAdminSystemSettingsQuery(admin),
    getAdminUsersQuery(admin),
    getAdminWorkspaceQuery(admin, workspaceId),
  ]);

  return {
    systemSettings,
    users,
    workspace,
  };
};