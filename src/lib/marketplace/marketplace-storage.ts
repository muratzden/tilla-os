import fs from "fs";
import path from "path";

import type { InstalledMarketplacePackage } from "./marketplace-installation-types";

const STORAGE_FILE = path.join(
  process.cwd(),
  ".data",
  "marketplace-installations.json",
);

export function loadMarketplaceInstallations(): InstalledMarketplacePackage[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return [];
    }

    const raw = fs.readFileSync(STORAGE_FILE, "utf8");

    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMarketplaceInstallations(
  installations: InstalledMarketplacePackage[],
) {
  fs.mkdirSync(path.dirname(STORAGE_FILE), {
    recursive: true,
  });

  fs.writeFileSync(STORAGE_FILE, JSON.stringify(installations, null, 2));
}
