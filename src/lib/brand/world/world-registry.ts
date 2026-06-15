import type { BrandWorld } from "./world-types";

export const worldRegistry: Record<string, BrandWorld> = {
  executive_heritage: {
    environment: "private_study",
    era: "timeless_contemporary",
    materials: ["aged_walnut", "paper", "brass", "leather"],
    lightBehavior: "soft_window",
    soundscape: "quiet_room",
    temperature: "warm",
    emotionalField: "quiet_confidence",
  },

  controlled_office: {
    environment: "executive_office",
    era: "contemporary_classic",
    materials: ["dark_walnut", "black_leather", "paper", "steel"],
    lightBehavior: "controlled_side_light",
    soundscape: "quiet_focus",
    temperature: "neutral_warm",
    emotionalField: "controlled_confidence",
  },

  modern_travel: {
    environment: "travel_lounge",
    era: "contemporary_global",
    materials: ["linen", "canvas", "leather", "stone"],
    lightBehavior: "natural_daylight",
    soundscape: "airport_ambience",
    temperature: "balanced",
    emotionalField: "calm_exploration",
  },

  minimal_gallery: {
    environment: "minimal_studio",
    era: "modern_timeless",
    materials: ["stone", "linen", "matte_black", "leather"],
    lightBehavior: "soft_diffused",
    soundscape: "silent_space",
    temperature: "neutral",
    emotionalField: "calm_precision",
  },

  artisan_workshop: {
    environment: "craft_workbench",
    era: "timeless_artisan",
    materials: ["raw_wood", "linen", "brass_tools", "leather", "cotton_thread"],
    lightBehavior: "warm_side_window",
    soundscape: "quiet_workshop",
    temperature: "warm",
    emotionalField: "honest_craft",
  },

  private_library: {
    environment: "private_library",
    era: "timeless_contemporary",
    materials: ["aged_walnut", "old_books", "paper", "leather", "linen"],
    lightBehavior: "soft_window",
    soundscape: "turning_pages",
    temperature: "warm",
    emotionalField: "quiet_reflection",
  },

  collector_office: {
    environment: "collector_office",
    era: "contemporary_classic",
    materials: [
      "dark_walnut",
      "brass",
      "archival_paper",
      "leather",
      "matte_steel",
    ],
    lightBehavior: "controlled_side_light",
    soundscape: "quiet_focus",
    temperature: "neutral_warm",
    emotionalField: "earned_confidence",
  },

  quiet_residence: {
    environment: "quiet_residence",
    era: "modern_timeless",
    materials: ["natural_linen", "warm_wood", "stone", "leather"],
    lightBehavior: "soft_diffused",
    soundscape: "quiet_home",
    temperature: "warm",
    emotionalField: "calm_belonging",
  },

  airport_lounge: {
    environment: "airport_lounge",
    era: "contemporary_global",
    materials: ["stone", "linen", "brushed_steel", "leather", "glass"],
    lightBehavior: "natural_daylight",
    soundscape: "distant_terminal",
    temperature: "balanced",
    emotionalField: "calm_transition",
  },

  writer_studio: {
    environment: "writer_studio",
    era: "timeless_artisan",
    materials: ["raw_wood", "paper", "ink", "linen", "leather"],
    lightBehavior: "warm_side_window",
    soundscape: "quiet_creation",
    temperature: "warm",
    emotionalField: "focused_creation",
  },
};
