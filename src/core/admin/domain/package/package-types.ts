export type AdminPackageType =
  | "language"
  | "intelligence"
  | "compliance"
  | "workflow"
  | "theme";

export type AdminPackageStatus =
  | "draft"
  | "published"
  | "deprecated"
  | "disabled";

export type AdminPackageInstallationStatus =
  | "installed"
  | "active"
  | "inactive"
  | "removed";

export interface AdminPackage {
  id: string;
  name: string;
  type: AdminPackageType;
  version: string;
  status: AdminPackageStatus;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminWorkspacePackageInstallation {
  workspaceId: string;
  packageId: string;
  version: string;
  status: AdminPackageInstallationStatus;
  installedAt: string;
  activatedAt?: string;
}