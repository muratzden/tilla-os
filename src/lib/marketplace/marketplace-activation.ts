import {
  getInstalledPackage,
  getInstalledPackages,
  saveInstalledPackages,
} from "./marketplace-installation-registry";

import { activationScope } from "./marketplace-activation-scope";

export function activateMarketplacePackage(packageId: string) {
  const installed = getInstalledPackage(packageId);

  if (!installed) {
    throw new Error(`Package '${packageId}' is not installed`);
  }

  const scope = activationScope[installed.type as keyof typeof activationScope];

  if (scope === "single") {
    const packages = getInstalledPackages();

    for (const pkg of packages) {
      if (pkg.type === installed.type) {
        pkg.active = false;
      }
    }
  }

  installed.active = true;

  saveInstalledPackages();
}

export function deactivateMarketplacePackage(packageId: string) {
  const installed = getInstalledPackage(packageId);

  if (!installed) {
    throw new Error(`Package '${packageId}' is not installed`);
  }

  installed.active = false;

  saveInstalledPackages();
}
