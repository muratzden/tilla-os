import { executeSql } from "@/src/lib/database/database-client";
import type { BrandOperatingState } from "@/src/core/brand-os/types";

export async function getBrandOSState(
  workspaceId: string,
): Promise<BrandOperatingState | null> {
  const result = await executeSql(
    `
    SELECT state_json
    FROM brand_os_states
    WHERE workspace_id = $1
    LIMIT 1
    `,
    [workspaceId],
  );

  return (result.rows[0]?.state_json as BrandOperatingState | undefined) ?? null;
}

export async function saveBrandOSState(
  workspaceId: string,
  state: BrandOperatingState,
): Promise<void> {
  await executeSql(
    `
    INSERT INTO brand_os_states (workspace_id, state_json, updated_at)
    VALUES ($1, $2::jsonb, NOW())
    ON CONFLICT (workspace_id)
    DO UPDATE SET
      state_json = EXCLUDED.state_json,
      updated_at = NOW()
    `,
    [workspaceId, JSON.stringify(state)],
  );
}