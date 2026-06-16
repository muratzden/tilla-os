import type { MarketplacePackageType } from "./marketplace-package-types";

import type { MarketplaceEntitlement } from "./marketplace-entitlements";

import type { WorkspaceMarketplaceInstallation } from "./workspace-marketplace-types";

import { activationScope } from "./marketplace-activation-scope";

import { hasMarketplaceEntitlement } from "@/src/lib/auth/entitlement-service";

import {
  activateWorkspaceMarketplaceInstallation,
  deactivateWorkspaceMarketplacePackagesByType,
  getWorkspaceMarketplaceInstallation,
  getWorkspaceMarketplaceInstallationsFromPostgres,
  upsertWorkspaceMarketplaceInstallation,
} from "./postgres-workspace-marketplace-storage";

export async function installWorkspaceMarketplacePackage(
  workspaceId: string,
  packageId: string,
  type: MarketplacePackageType,
  version: string,
  entitlement: MarketplaceEntitlement = "free",
) {
  if (
    entitlement !== "free" &&
    !(await hasMarketplaceEntitlement(workspaceId, packageId))
  ) {
    throw new Error(
      `Workspace '${workspaceId}' does not have entitlement for package '${packageId}'`,
    );
  }

  const installation: WorkspaceMarketplaceInstallation = {
    workspaceId,
    packageId,
    type,
    version,
    entitlement,
    active: false,
    installedAt: new Date().toISOString(),
  };

  await upsertWorkspaceMarketplaceInstallation(installation);

  return installation;
}

export async function activateWorkspaceMarketplacePackage(
  workspaceId: string,
  packageId: string,
) {
  const installation = await getWorkspaceMarketplaceInstallation(
    workspaceId,
    packageId,
  );

  if (!installation) {
    throw new Error(
      `Package '${packageId}' is not installed for workspace '${workspaceId}'`,
    );
  }

  const scope = activationScope[installation.type];

  if (scope === "single") {
    await deactivateWorkspaceMarketplacePackagesByType(
      workspaceId,
      installation.type,
    );
  }

  await activateWorkspaceMarketplaceInstallation(workspaceId, packageId);
}

export async function getWorkspaceMarketplaceInstallations(
  workspaceId: string,
) {
  return getWorkspaceMarketplaceInstallationsFromPostgres(workspaceId);
}

export async function getActiveWorkspaceMarketplacePackages(
  workspaceId: string,
) {
  const installations = await getWorkspaceMarketplaceInstallations(workspaceId);

  return installations.filter((item) => item.active);
}

export async function getActiveWorkspaceMarketplacePackageByType(
  workspaceId: string,
  type: MarketplacePackageType,
) {
  const activePackages =
    await getActiveWorkspaceMarketplacePackages(workspaceId);

  return activePackages.find((item) => item.type === type);
}
