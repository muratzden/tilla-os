import { activateLanguagePack } from "./activate-language-pack";
import { checkLanguagePackUpdate } from "./check-language-pack-update";
import { getActiveOutputPack } from "./get-active-output-pack";
import { installLanguagePack } from "./install-language-pack";
import { installMarketplacePack } from "./install-marketplace-pack";
import { purchaseLanguagePack } from "./language-pack-entitlements";
import { getWorkspaceLanguageState } from "./language-pack-storage";
import { searchMarketplace } from "./search-marketplace";
import { uninstallLanguagePack } from "./uninstall-language-pack";
import { updateLanguagePack } from "./update-language-pack";

export function runMarketplaceTest() {
  const workspaceId = `marketplace-core-test-${Date.now()}`;
  const marketplaceWorkspaceId = `marketplace-install-test-${Date.now()}`;
  const updateWorkspaceId = `marketplace-update-package-test-${Date.now()}`;

  let blockedWithoutPurchase = false;
  let blockedBeforeInstall = false;
  let marketplaceInstallPassed = false;
  let uninstallPassed = false;
  let updatePackagePassed = false;

  try {
    installLanguagePack(workspaceId, "tr");
  } catch {
    blockedWithoutPurchase = true;
  }

  purchaseLanguagePack(workspaceId, "tr");

  try {
    activateLanguagePack(workspaceId, "tr");
  } catch {
    blockedBeforeInstall = true;
  }

  installLanguagePack(workspaceId, "tr");
  activateLanguagePack(workspaceId, "tr");

  try {
    const installResult = installMarketplacePack(
      marketplaceWorkspaceId,
      "de-marketplace"
    );

    marketplaceInstallPassed =
      installResult.language === "de" &&
      installResult.source === "marketplace";
  } catch {
    marketplaceInstallPassed = false;
  }

  activateLanguagePack(marketplaceWorkspaceId, "de");

  const uninstallState = uninstallLanguagePack(
    marketplaceWorkspaceId,
    "de"
  );

  uninstallPassed =
    uninstallState.active === "en" &&
    !uninstallState.installed.includes("de");

  installMarketplacePack(
  updateWorkspaceId,
  "de-marketplace",
  "1.0.0"
);

  const updateBefore =
    checkLanguagePackUpdate("de");

  updateLanguagePack(updateWorkspaceId, "de");

  const updateAfter =
    checkLanguagePackUpdate("de");

  updatePackagePassed =
    updateBefore.installedVersion === "1.0.0" &&
    updateBefore.latestVersion === "1.1.0" &&
    updateBefore.updateAvailable === true &&
    updateAfter.installedVersion === "1.1.0" &&
    updateAfter.latestVersion === "1.1.0" &&
    updateAfter.updateAvailable === false;

  const state = getWorkspaceLanguageState(workspaceId);
  const activePack = getActiveOutputPack(workspaceId);
  const catalog = searchMarketplace("german");

  return {
    passed:
      blockedWithoutPurchase &&
      blockedBeforeInstall &&
      state.active === "tr" &&
      state.installed.includes("en") &&
      state.installed.includes("tr") &&
      Boolean(activePack) &&
      catalog.some((item) => item.languageCode === "de") &&
      marketplaceInstallPassed &&
      uninstallPassed &&
      updatePackagePassed,
    active: state.active,
    installed: state.installed,
    catalogCount: catalog.length,
    marketplaceInstallPassed,
    uninstallPassed,
    updatePackagePassed,
    updateBefore,
    updateAfter,
  };
}