export const archetypeRegistry = {
  warm_heritage: {
    name: "Warm Heritage",

    narrative: ["honesty", "craft", "patina", "longevity", "human touch"],

    mood: "warm confidence",

    lighting: {
      style: "soft_window_light",
      direction: "left_side",
      contrast: "medium",
    },

    camera: {
      body: "Leica M11",
      lens: "50mm Summilux",
    },

    surfaces: ["aged_walnut", "raw_oak", "vintage_wood"],

    props: [
      "journal",
      "reading_glasses",
      "old_book",
      "fountain_pen",
      "linen_cloth",
    ],

    colorPalette: ["camel", "warm_brown", "tan", "ivory"],
  },

  quiet_power: {
    name: "Quiet Power",

    narrative: ["authority", "discipline", "restraint", "precision", "focus"],

    mood: "controlled confidence",

    lighting: {
      style: "directional_window_light",
      direction: "left_side",
      contrast: "high",
    },

    camera: {
      body: "Leica M11",
      lens: "50mm Summilux",
    },

    surfaces: ["dark_walnut", "charcoal_stone", "black_oak"],

    props: ["passport", "notebook", "fountain_pen", "watch"],

    colorPalette: ["black", "charcoal", "espresso", "graphite"],
  },

  modern_nomad: {
    name: "Modern Nomad",

    narrative: ["movement", "travel", "adaptability", "exploration"],

    mood: "calm adventure",

    lighting: {
      style: "natural_daylight",
      direction: "mixed",
      contrast: "medium",
    },

    camera: {
      body: "Leica Q3",
      lens: "28mm",
    },

    surfaces: ["travertine", "linen", "airport_lounge_table"],

    props: ["passport", "map", "camera", "journal"],

    colorPalette: ["sand", "camel", "olive", "stone"],
  },

  quiet_luxury: {
    name: "Quiet Luxury",

    narrative: [
      "restraint",
      "material honesty",
      "timelessness",
      "subtle refinement",
      "calm presence",
    ],

    mood: "quiet luxury",

    lighting: {
      style: "soft_diffused_light",
      direction: "left_side",
      contrast: "low",
    },

    camera: {
      body: "Leica M11",
      lens: "50mm Summilux",
    },

    surfaces: ["charcoal_stone", "matte_black_paper", "soft_linen"],

    props: ["linen_cloth", "matte_card", "small_notebook"],

    colorPalette: ["brown", "charcoal", "stone", "warm_neutral"],
  },
} as const;

export type ArchetypeName = keyof typeof archetypeRegistry;
