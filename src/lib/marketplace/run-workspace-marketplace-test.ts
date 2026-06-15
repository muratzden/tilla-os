import {
  bootstrapMarketplace,
} from "./bootstrap-marketplace";

import {
  installWorkspaceMarketplacePackage,
  activateWorkspaceMarketplacePackage,
  getActiveWorkspaceMarketplacePackageByType,
} from "./workspace-marketplace-registry";

import {
  getActiveWorkspaceIndustryPayload,
} from "./workspace-marketplace-payloads";

bootstrapMarketplace();

const workspaceId =
  "workspace-marketplace-test";

installWorkspaceMarketplacePackage(
  workspaceId,
  "restaurant-industry-pack",
  "industry",
  "0.1.0"
);

activateWorkspaceMarketplacePackage(
  workspaceId,
  "restaurant-industry-pack"
);

const activeIndustry =
  getActiveWorkspaceMarketplacePackageByType(
    workspaceId,
    "industry"
  );

const activePayload =
  getActiveWorkspaceIndustryPayload(
    workspaceId
  );

console.log(
  "Workspace Marketplace Test"
);

console.log({
  passed:
    activeIndustry?.packageId ===
      "restaurant-industry-pack" &&
    activePayload?.type === "industry",

  workspaceId,

  activePackageId:
    activeIndustry?.packageId,

  activePackageType:
    activeIndustry?.type,

  activePayloadType:
    activePayload?.type,
});