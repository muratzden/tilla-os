import { bootstrapMarketplace } from "./bootstrap-marketplace";

import { getMarketplacePayload } from "./marketplace-package-registry";

bootstrapMarketplace();

const language = getMarketplacePayload("de-marketplace");

const restaurant = getMarketplacePayload("restaurant-industry-pack");

const personal = getMarketplacePayload("personal-brand-founder-pack");

console.log("Marketplace Payload Test");

console.log({
  passed: !!language && !!restaurant && !!personal,

  languageType: language?.payload.type,

  restaurantType: restaurant?.payload.type,

  personalType: personal?.payload.type,
});
