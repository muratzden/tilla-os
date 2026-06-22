import type {
  AdminPackage,
  AdminWorkspacePackageInstallation,
} from "../../domain/package/package-types";

export interface PackageContract {
  listPackages(): Promise<AdminPackage[]>;

  installPackage(
    workspaceId: string,
    packageId: string,
  ): Promise<AdminWorkspacePackageInstallation>;

  activatePackage(
    workspaceId: string,
    packageId: string,
  ): Promise<void>;
}