import "dotenv/config";

import {
  ensureOwnerAccount,
} from "../auth/auth-service";

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

async function runWorkspaceMarketplaceTest() {
  bootstrapMarketplace();

  const owner = await ensureOwnerAccount(
    "workspace-marketplace@tilla.test",
    "123456",
    "Workspace Marketplace Test",
  );

  const workspaceId = owner.workspace.id;

  await installWorkspaceMarketplacePackage(
    workspaceId,
    "restaurant-industry-pack",
    "industry",
    "0.1.0",
  );

  await activateWorkspaceMarketplacePackage(
    workspaceId,
    "restaurant-industry-pack",
  );

  const activeIndustry =
    await getActiveWorkspaceMarketplacePackageByType(
      workspaceId,
      "industry",
    );

  const activePayload =
    await getActiveWorkspaceIndustryPayload(
      workspaceId,
    );

  console.log(
    "Workspace Marketplace Test",
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
}

runWorkspaceMarketplaceTest().catch(
  (error) => {
    console.error(
      "Workspace Marketplace Test Failed",
    );

    console.error(error);

    process.exit(1);
  },
);