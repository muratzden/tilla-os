import { bootstrapMarketplace } from "./bootstrap-marketplace";
import {
  getFeaturedMarketplacePackages,
  getMarketplaceCatalog,
  getMarketplacePackagesByType,
  searchMarketplacePackages,
} from "./get-marketplace-catalog";

bootstrapMarketplace();

const catalog = getMarketplaceCatalog();
const featured = getFeaturedMarketplacePackages();
const languagePacks = getMarketplacePackagesByType("language");
const industryPacks = getMarketplacePackagesByType("industry");
const personalBrandPacks = getMarketplacePackagesByType("personal_brand");
const germanSearchResults = searchMarketplacePackages("German");
const restaurantSearchResults = searchMarketplacePackages("Restaurant");

console.log("Marketplace Core Test Result");
console.log({
  passed:
    catalog.length === 3 &&
    featured.length === 2 &&
    languagePacks.length === 1 &&
    industryPacks.length === 1 &&
    personalBrandPacks.length === 1 &&
    germanSearchResults.length === 1 &&
    restaurantSearchResults.length === 1,
  catalogCount: catalog.length,
  featuredCount: featured.length,
  languagePackCount: languagePacks.length,
  industryPackCount: industryPacks.length,
  personalBrandPackCount: personalBrandPacks.length,
  germanSearchResultCount: germanSearchResults.length,
  restaurantSearchResultCount: restaurantSearchResults.length,
});
