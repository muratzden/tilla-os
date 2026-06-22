import type {
  AdminPermission,
  AdminRole,
} from "../../domain/permissions/permission-types";

export interface PermissionContract {
  listRoles(): Promise<AdminRole[]>;

  listPermissions(): Promise<AdminPermission[]>;
}