import {
  recordWorkspaceLanguageInstall,
  recordWorkspaceLanguageVersionActivation,
  getWorkspaceLanguageState,
} from "./language-pack-storage";

import { rollbackLanguagePack } from "./rollback-language-pack";

export function runRollbackTest() {
  const workspaceId = `rollback-test-${Date.now()}`;

  recordWorkspaceLanguageInstall(workspaceId, {
    language: "de",
    packageId: "de-marketplace",
    version: "1.1.0",
    source: "marketplace",
    installedAt: new Date().toISOString(),
  });

  recordWorkspaceLanguageVersionActivation(workspaceId, {
    language: "de",
    packageId: "de-marketplace",
    version: "1.0.0",
    activatedAt: new Date().toISOString(),
  });

  recordWorkspaceLanguageVersionActivation(workspaceId, {
    language: "de",
    packageId: "de-marketplace",
    version: "1.1.0",
    activatedAt: new Date().toISOString(),
  });

  rollbackLanguagePack(workspaceId, "de");

  const state = getWorkspaceLanguageState(workspaceId);

  const currentVersion = state.installs?.de?.version;

  return {
    passed: currentVersion === "1.0.0",
    active: state.active,
    installed: state.installed,
    currentVersion,
    historyCount: state.versionHistory?.length ?? 0,
  };
}
