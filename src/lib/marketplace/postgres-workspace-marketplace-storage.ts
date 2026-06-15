import type {
  MarketplacePackageType,
} from "./marketplace-package-types";

import type {
  MarketplaceEntitlement,
} from "./marketplace-entitlements";

import type {
  WorkspaceMarketplaceInstallation,
} from "./workspace-marketplace-types";

import { executeSql } from "../database/database-client";

function mapInstallation(
  row: any,
): WorkspaceMarketplaceInstallation {
  return {
    workspaceId: row.workspace_id,
    packageId: row.package_id,
    type: row.type as MarketplacePackageType,
    version: row.version,
    entitlement: row.entitlement as MarketplaceEntitlement,
    active: row.active,
    installedAt: row.installed_at,
  };
}

export async function upsertWorkspaceMarketplaceInstallation(
  installation: WorkspaceMarketplaceInstallation,
) {
  await executeSql(
    `
    INSERT INTO workspace_marketplace_installations (
      workspace_id,
      package_id,
      type,
      version,
      entitlement,
      active,
      installed_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (workspace_id, package_id)
    DO UPDATE SET
      type = EXCLUDED.type,
      version = EXCLUDED.version,
      entitlement = EXCLUDED.entitlement,
      active = EXCLUDED.active,
      installed_at = EXCLUDED.installed_at
    `,
    [
      installation.workspaceId,
      installation.packageId,
      installation.type,
      installation.version,
      installation.entitlement,
      installation.active,
      installation.installedAt,
    ],
  );
}

export async function getWorkspaceMarketplaceInstallation(
  workspaceId: string,
  packageId: string,
) {
  const result = await executeSql(
    `
    SELECT
      workspace_id,
      package_id,
      type,
      version,
      entitlement,
      active,
      installed_at
    FROM workspace_marketplace_installations
    WHERE workspace_id = $1
      AND package_id = $2
    LIMIT 1
    `,
    [workspaceId, packageId],
  );

  const row = result.rows[0];

  return row ? mapInstallation(row) : undefined;
}

export async function getWorkspaceMarketplaceInstallationsFromPostgres(
  workspaceId: string,
) {
  const result = await executeSql(
    `
    SELECT
      workspace_id,
      package_id,
      type,
      version,
      entitlement,
      active,
      installed_at
    FROM workspace_marketplace_installations
    WHERE workspace_id = $1
    ORDER BY installed_at ASC
    `,
    [workspaceId],
  );

  return result.rows.map(mapInstallation);
}

export async function deactivateWorkspaceMarketplacePackagesByType(
  workspaceId: string,
  type: MarketplacePackageType,
) {
  await executeSql(
    `
    UPDATE workspace_marketplace_installations
    SET active = false
    WHERE workspace_id = $1
      AND type = $2
    `,
    [workspaceId, type],
  );
}

export async function activateWorkspaceMarketplaceInstallation(
  workspaceId: string,
  packageId: string,
) {
  await executeSql(
    `
    UPDATE workspace_marketplace_installations
    SET active = true
    WHERE workspace_id = $1
      AND package_id = $2
    `,
    [workspaceId, packageId],
  );
}