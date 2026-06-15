import "dotenv/config";

import {
  ensureOwnerAccount,
} from "./auth-service";

import {
  grantMarketplaceEntitlement,
  getMarketplaceEntitlements,
  hasMarketplaceEntitlement,
} from "./entitlement-service";

async function runEntitlementTest() {
  const owner = await ensureOwnerAccount(
    "owner@tilla.test",
    "123456",
    "Tilla Workspace",
  );

  await grantMarketplaceEntitlement(
    owner.workspace.id,
    "restaurant-industry-pack",
  );

  const hasRestaurantPack =
    await hasMarketplaceEntitlement(
      owner.workspace.id,
      "restaurant-industry-pack",
    );

  const entitlements =
    await getMarketplaceEntitlements(
      owner.workspace.id,
    );

  console.log("Entitlement Test");

  console.log({
    passed:
      hasRestaurantPack &&
      entitlements.some(
        (item) =>
          item.packageId ===
          "restaurant-industry-pack",
      ),
    workspaceId: owner.workspace.id,
    entitlementCount: entitlements.length,
    packageIds: entitlements.map(
      (item) => item.packageId,
    ),
  });
}

runEntitlementTest();