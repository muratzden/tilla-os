import { installWorkspaceMarketplacePackage } from "./workspace-marketplace-registry";

import { grantMarketplaceEntitlement } from "@/src/lib/auth/entitlement-service";

const workspaceWithoutEntitlement = "workspace-without-entitlement-test";

const workspaceWithEntitlement = "workspace-with-entitlement-test";

let blockedWithoutEntitlement = false;

try {
  installWorkspaceMarketplacePackage(
    workspaceWithoutEntitlement,
    "restaurant-industry-pack",
    "industry",
    "1.0.0",
    "purchased",
  );
} catch {
  blockedWithoutEntitlement = true;
}

grantMarketplaceEntitlement(
  workspaceWithEntitlement,
  "restaurant-industry-pack",
);

installWorkspaceMarketplacePackage(
  workspaceWithEntitlement,
  "restaurant-industry-pack",
  "industry",
  "1.0.0",
  "purchased",
);

console.log("Marketplace Entitlement Test");

console.log({
  passed: blockedWithoutEntitlement,
  blockedWithoutEntitlement,
  installedWithEntitlement: true,
});
