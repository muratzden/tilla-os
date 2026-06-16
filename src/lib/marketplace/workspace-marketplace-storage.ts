import fs from "fs";
import path from "path";

import type { WorkspaceMarketplaceInstallation } from "./workspace-marketplace-types";

const STORAGE_FILE = path.join(
  process.cwd(),
  ".data",
  "workspace-marketplace-installations.json",
);

export function loadWorkspaceMarketplaceInstallations(): WorkspaceMarketplaceInstallation[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return [];
    }

    return JSON.parse(fs.readFileSync(STORAGE_FILE, "utf8"));
  } catch {
    return [];
  }
}

export function saveWorkspaceMarketplaceInstallations(
  installations: WorkspaceMarketplaceInstallation[],
) {
  fs.mkdirSync(path.dirname(STORAGE_FILE), { recursive: true });

  fs.writeFileSync(STORAGE_FILE, JSON.stringify(installations, null, 2));
}
