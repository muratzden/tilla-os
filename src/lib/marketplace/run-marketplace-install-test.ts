import {
  installMarketplacePackage,
  getInstalledPackage,
} from "./marketplace-installation-registry";

import {
  activateMarketplacePackage,
} from "./marketplace-activation";

installMarketplacePackage(
  "restaurant-industry-pack",
  "industry",
  "0.1.0"
);

activateMarketplacePackage(
  "restaurant-industry-pack"
);

const installed =
  getInstalledPackage(
    "restaurant-industry-pack"
  );

console.log(
  "Marketplace Installation Test"
);

console.log({
  passed:
    installed?.active === true,

  packageId:
    installed?.packageId,

  version:
    installed?.version,

  active:
    installed?.active,
});