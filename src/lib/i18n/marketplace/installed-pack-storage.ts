import fs from "fs";
import path from "path";

import type {
  InstalledLanguagePackRepository,
} from "./marketplace-types";

const INSTALLED_PACKS_PATH = path.join(
  process.cwd(),
  ".data",
  "installed-language-packs.json"
);

function ensureInstalledPackStorage() {
  const dir = path.dirname(INSTALLED_PACKS_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(INSTALLED_PACKS_PATH)) {
    fs.writeFileSync(
      INSTALLED_PACKS_PATH,
      JSON.stringify({}, null, 2),
      "utf8"
    );
  }
}

export function loadInstalledLanguagePacks():
  InstalledLanguagePackRepository {
  ensureInstalledPackStorage();

  try {
    const raw = fs.readFileSync(
      INSTALLED_PACKS_PATH,
      "utf8"
    );

    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveInstalledLanguagePacks(
  repository: InstalledLanguagePackRepository
) {
  ensureInstalledPackStorage();

  fs.writeFileSync(
    INSTALLED_PACKS_PATH,
    JSON.stringify(repository, null, 2),
    "utf8"
  );
}