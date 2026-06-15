import {
  bootstrapMarketplace,
} from "./bootstrap-marketplace";

import {
  installMarketplacePackage,
} from "./marketplace-installation-registry";

import {
  activateMarketplacePackage,
} from "./marketplace-activation";

import {
  getActiveIndustryPackage,
} from "./active-marketplace-packages";

import {
  getActiveIndustryPayload,
} from "./active-marketplace-payloads";

bootstrapMarketplace();

installMarketplacePackage(
  "restaurant-industry-pack",
  "industry",
  "0.1.0"
);

activateMarketplacePackage(
  "restaurant-industry-pack"
);

const activeIndustry =
  getActiveIndustryPackage();

const activeIndustryPayload =
  getActiveIndustryPayload();

console.log(
  "Active Package Resolution Test"
);

console.log({
  passed:
    activeIndustry?.packageId ===
      "restaurant-industry-pack" &&
    activeIndustryPayload?.type === "industry",

  activePackageId:
    activeIndustry?.packageId,

  activePackageType:
    activeIndustry?.type,

  activePayloadType:
    activeIndustryPayload?.type,
});