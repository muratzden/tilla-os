import type { IntelligencePack } from "./intelligence-pack-types";

export const intelligencePackCatalog: IntelligencePack[] = [
  {
    id: "hospitality-intelligence-pack",
    name: "Hospitality Intelligence Pack",
    description:
      "Adds hotel, accommodation, guest experience, service design, and hospitality-specific brand reasoning.",
    type: "industry",
    version: "1.0.0",
    entitlement: "purchased",
    status: "active",
    tags: ["hospitality", "hotel", "guest-experience", "service"],
    installed: false,
    active: false,
  },
  {
    id: "leather-goods-intelligence-pack",
    name: "Leather Goods Intelligence Pack",
    description:
      "Adds handmade leather goods, product craft, material, collection, and artisan retail reasoning.",
    type: "industry",
    version: "1.0.0",
    entitlement: "purchased",
    status: "active",
    tags: ["leather", "craft", "retail", "product-brand"],
    installed: false,
    active: false,
  },
  {
    id: "germany-market-intelligence-pack",
    name: "Germany Market Intelligence Pack",
    description:
      "Adds Germany-specific market expectations, positioning patterns, channel norms, and customer behavior signals.",
    type: "market",
    version: "1.0.0",
    entitlement: "purchased",
    status: "active",
    tags: ["germany", "market", "localization", "customer-behavior"],
    installed: false,
    active: false,
  },
  {
    id: "instagram-channel-intelligence-pack",
    name: "Instagram Channel Intelligence Pack",
    description:
      "Adds Instagram-specific content planning, creative formats, publishing rhythm, and channel diagnosis.",
    type: "channel",
    version: "1.0.0",
    entitlement: "purchased",
    status: "active",
    tags: ["instagram", "content", "social", "channel"],
    installed: false,
    active: false,
  },
  {
    id: "eu-compliance-pack",
    name: "EU Compliance Pack",
    description:
      "Adds EU-facing compliance awareness for claims, product communication, data, and commercial risk checks.",
    type: "compliance",
    version: "1.0.0",
    entitlement: "licensed",
    status: "active",
    tags: ["eu", "compliance", "risk", "governance"],
    installed: false,
    active: false,
  },
];
