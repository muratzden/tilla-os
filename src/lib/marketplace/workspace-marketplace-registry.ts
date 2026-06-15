import type {
  MarketplacePackageType,
} from "./marketplace-package-types";

import type {
  MarketplaceEntitlement,
} from "./marketplace-entitlements";

import type {
  WorkspaceMarketplaceInstallation,
} from "./workspace-marketplace-types";

import {
  loadWorkspaceMarketplaceInstallations,
  saveWorkspaceMarketplaceInstallations,
} from "./workspace-marketplace-storage";

import {
  activationScope,
} from "./marketplace-activation-scope";

import {
  hasMarketplaceEntitlement,
} from "@/src/lib/auth/entitlement-service";

let loaded = false;

const installations = new Map<
  string,
  WorkspaceMarketplaceInstallation
>();

function key(
  workspaceId: string,
  packageId: string,
) {
  return `${workspaceId}:${packageId}`;
}

function ensureLoaded() {
  if (loaded) {
    return;
  }

  for (const installation of loadWorkspaceMarketplaceInstallations()) {
    installations.set(
      key(
        installation.workspaceId,
        installation.packageId,
      ),
      installation,
    );
  }

  loaded = true;
}

function persist() {
  saveWorkspaceMarketplaceInstallations(
    Array.from(installations.values()),
  );
}

export function installWorkspaceMarketplacePackage(
  workspaceId: string,
  packageId: string,
  type: MarketplacePackageType,
  version: string,
  entitlement: MarketplaceEntitlement = "free",
) {
  ensureLoaded();

  if (
    entitlement !== "free" &&
    !hasMarketplaceEntitlement(
      workspaceId,
      packageId,
    )
  ) {
    throw new Error(
      `Workspace '${workspaceId}' does not have entitlement for package '${packageId}'`,
    );
  }

  installations.set(
    key(workspaceId, packageId),
    {
      workspaceId,
      packageId,
      type,
      version,
      entitlement,
      active: false,
      installedAt: new Date().toISOString(),
    },
  );

  persist();
}

export function activateWorkspaceMarketplacePackage(
  workspaceId: string,
  packageId: string,
) {
  ensureLoaded();

  const installation =
    installations.get(key(workspaceId, packageId));

  if (!installation) {
    throw new Error(
      `Package '${packageId}' is not installed for workspace '${workspaceId}'`,
    );
  }

  const scope = activationScope[installation.type];

  if (scope === "single") {
    for (const item of installations.values()) {
      if (
        item.workspaceId === workspaceId &&
        item.type === installation.type
      ) {
        item.active = false;
      }
    }
  }

  installation.active = true;

  persist();
}

export function getWorkspaceMarketplaceInstallations(
  workspaceId: string,
) {
  ensureLoaded();

  return Array.from(
    installations.values(),
  ).filter(
    (item) => item.workspaceId === workspaceId,
  );
}

export function getActiveWorkspaceMarketplacePackages(
  workspaceId: string,
) {
  return getWorkspaceMarketplaceInstallations(
    workspaceId,
  ).filter((item) => item.active);
}

export function getActiveWorkspaceMarketplacePackageByType(
  workspaceId: string,
  type: MarketplacePackageType,
) {
  return getActiveWorkspaceMarketplacePackages(
    workspaceId,
  ).find((item) => item.type === type);
}