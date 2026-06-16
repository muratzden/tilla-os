import type { WorkspaceSettings } from "./workspace-settings-types";

import { executeSql } from "../database/database-client";

function mapWorkspaceSettings(row: any): WorkspaceSettings {
  return {
    workspaceId: row.workspace_id,
    brandSetup: row.brand_setup ?? undefined,
    updatedAt: row.updated_at,
  };
}

export async function getWorkspaceSettings(
  workspaceId: string,
): Promise<WorkspaceSettings | null> {
  const result = await executeSql(
    `
    SELECT workspace_id, brand_setup, updated_at
    FROM workspace_settings
    WHERE workspace_id = $1
    LIMIT 1
    `,
    [workspaceId],
  );

  const row = result.rows[0];

  return row ? mapWorkspaceSettings(row) : null;
}

export async function upsertWorkspaceSettings(
  settings: WorkspaceSettings,
): Promise<WorkspaceSettings> {
  await executeSql(
    `
    INSERT INTO workspace_settings (
      workspace_id,
      brand_setup,
      updated_at
    )
    VALUES ($1, $2, $3)
    ON CONFLICT (workspace_id)
    DO UPDATE SET
      brand_setup = EXCLUDED.brand_setup,
      updated_at = EXCLUDED.updated_at
    `,
    [settings.workspaceId, settings.brandSetup ?? null, settings.updatedAt],
  );

  return settings;
}
