export type AdminRoleId = "owner" | "admin" | "member";

export type AdminPermissionResource =
  | "workspace"
  | "package"
  | "feature"
  | "settings"
  | "user";

export type AdminPermissionAction =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "activate"
  | "deactivate"
  | "manage";

export interface AdminPermission {
  id: string;
  resource: AdminPermissionResource;
  action: AdminPermissionAction;
}

export interface AdminRole {
  id: AdminRoleId;
  name: string;
  permissions: AdminPermission[];
}