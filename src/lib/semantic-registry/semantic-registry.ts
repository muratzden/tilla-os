import type { SemanticRegistry } from "./semantic-registry-types";

export const semanticRegistry: SemanticRegistry = {
  archetypes: {},

  worlds: {},

  scenes: {
    private_library: {
      id: "private_library",
      domain: "scenes",
      tags: ["library", "interior", "premium", "quiet"],
      status: "active",
    },

    private_study: {
      id: "private_study",
      domain: "scenes",
      tags: ["study", "interior", "timeless"],
      status: "active",
    },

    executive_office: {
      id: "executive_office",
      domain: "scenes",
      tags: ["office", "executive", "professional"],
      status: "active",
    },

    artisan_workshop: {
      id: "artisan_workshop",
      domain: "scenes",
      tags: ["workshop", "artisan", "craft"],
      status: "active",
    },

    minimal_gallery: {
      id: "minimal_gallery",
      domain: "scenes",
      tags: ["gallery", "minimal", "clean"],
      status: "active",
    },
  },

  styling: {
    artisan_heritage: {
      id: "artisan_heritage",
      domain: "styling",
      tags: ["craft", "heritage", "artisan"],
      status: "active",
    },

    quiet_luxury: {
      id: "quiet_luxury",
      domain: "styling",
      tags: ["luxury", "premium", "minimal"],
      status: "active",
    },

    executive_artisan: {
      id: "executive_artisan",
      domain: "styling",
      tags: ["executive", "professional", "craft"],
      status: "active",
    },

    quiet_power: {
      id: "quiet_power",
      domain: "styling",
      tags: ["power", "restraint", "premium"],
      status: "active",
    },

    modern_nomad: {
      id: "modern_nomad",
      domain: "styling",
      tags: ["travel", "modern", "mobility"],
      status: "active",
    },

    minimal_editorial: {
      id: "minimal_editorial",
      domain: "styling",
      tags: ["minimal", "editorial", "clean"],
      status: "active",
    },
  },

  shotTypes: {
    editorial_product: {
      id: "editorial_product",
      domain: "shotTypes",
      tags: ["editorial", "product", "photography"],
      status: "active",
    },

    editorial_hero: {
      id: "editorial_hero",
      domain: "shotTypes",
      tags: ["editorial", "hero", "photography"],
      status: "active",
    },
  },

 compositions: {
  premium_editorial: {
    id: "premium_editorial",
    domain: "compositions",
    tags: ["premium", "editorial", "composition"],
    status: "active",
  },

  hero_composition: {
    id: "hero_composition",
    domain: "compositions",
    tags: ["hero", "editorial", "premium"],
    status: "active",
  },
},
};