import type { AdminSystemSettingsDto } from "./admin-system-settings-dto";
import type { AdminUserDto } from "./admin-user-dto";
import type { AdminWorkspaceDto } from "./admin-workspace-dto";

export interface AdminOverviewDto {
  systemSettings: AdminSystemSettingsDto;
  users: AdminUserDto[];
  workspace: AdminWorkspaceDto | null;
}