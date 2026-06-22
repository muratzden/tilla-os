export interface AdminSystemSettings {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
}

export interface AdminWorkspaceSettings {
  workspaceId: string;
  status: "active" | "suspended" | "archived";
}