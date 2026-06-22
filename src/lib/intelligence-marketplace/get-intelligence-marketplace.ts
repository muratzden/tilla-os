import { intelligencePackCatalog } from "./intelligence-pack-catalog";

export function getIntelligenceMarketplace() {
  const packs = intelligencePackCatalog;

  return {
    packs,
    featured: packs.slice(0, 3),
    paid: packs.filter((pack) => pack.entitlement !== "free"),
    active: packs.filter((pack) => pack.active),
    installed: packs.filter((pack) => pack.installed),
  };
}
