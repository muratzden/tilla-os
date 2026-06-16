import { checkLanguagePackUpdate } from "./check-language-pack-update";
import { installMarketplacePack } from "./install-marketplace-pack";
import { updateLanguagePack } from "./update-language-pack";

export function runUpdateTest() {
  const workspaceId = `marketplace-update-test-${Date.now()}`;

  installMarketplacePack(workspaceId, "de-marketplace", "1.0.0");

  const beforeUpdate = checkLanguagePackUpdate("de");

  updateLanguagePack(workspaceId, "de");

  const afterUpdate = checkLanguagePackUpdate("de");

  return {
    passed:
      beforeUpdate.installed === true &&
      beforeUpdate.installedVersion === "1.0.0" &&
      beforeUpdate.latestVersion === "1.1.0" &&
      beforeUpdate.updateAvailable === true &&
      afterUpdate.installed === true &&
      afterUpdate.installedVersion === "1.1.0" &&
      afterUpdate.latestVersion === "1.1.0" &&
      afterUpdate.updateAvailable === false,
    beforeUpdate,
    afterUpdate,
  };
}
