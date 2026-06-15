import { resolveWorkspaceOutputPack } from "./resolve-workspace-output-pack";

export function getActiveOutputPack(
  workspaceId: string
) {
  return resolveWorkspaceOutputPack(workspaceId);
}