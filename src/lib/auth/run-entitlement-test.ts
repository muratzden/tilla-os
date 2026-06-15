import {
  ensureOwnerAccount,
} from "./auth-service";

import {
  grantMarketplaceEntitlement,
  getMarketplaceEntitlements,
  hasMarketplaceEntitlement,
} from "./entitlement-service";

const owner = ensureOwnerAccount(
  "owner@tilla.test",
  "123456",
  "Tilla Workspace",
);

grantMarketplaceEntitlement(
  owner.workspace.id,
  "restaurant-industry-pack",
);

const hasRestaurantPack =
  hasMarketplaceEntitlement(
    owner.workspace.id,
    "restaurant-industry-pack",
  );

const entitlements =
  getMarketplaceEntitlements(owner.workspace.id);

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