export type SceneVariantKey =
  | "desk_scene"
  | "writing_scene"
  | "arrival_scene"
  | "meeting_scene"
  | "travel_scene"
  | "studio_scene"
  | "workbench_scene"
  | "gallery_scene"
  | "library_scene"
  | "residence_scene";

export type SceneVariant = {
  key: SceneVariantKey;
  label: string;
  surface: string;
  props: string[];
  composition: string;
  camera?: string;
  lens?: string;
  lighting?: string;
  lightingDirection?: string;
  emotionalTone?: string;
};

export const sceneVariants: Record<string, SceneVariant[]> = {
  executive_heritage: [
    {
      key: "desk_scene",
      label: "Executive Desk Scene",
      surface: "aged_walnut",
      props: ["journal", "brass_pen", "old_book"],
      composition: "editorial_hero",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "soft_window_light",
      lightingDirection: "left_side",
      emotionalTone: "warm confidence",
    },
    {
      key: "writing_scene",
      label: "Private Writing Scene",
      surface: "dark_walnut",
      props: ["journal", "brass_pen", "reading_glasses"],
      composition: "negative_space",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "soft_window_light",
      lightingDirection: "left_side",
      emotionalTone: "quiet confidence",
    },
    {
      key: "meeting_scene",
      label: "Quiet Meeting Scene",
      surface: "dark_walnut",
      props: ["architectural_book", "brass_pen", "coffee_cup"],
      composition: "rule_of_thirds",
      camera: "Hasselblad X2D",
      lens: "80mm Hasselblad",
      lighting: "controlled_studio_light",
      lightingDirection: "top_left",
      emotionalTone: "controlled confidence",
    },
    {
      key: "library_scene",
      label: "Private Library Scene",
      surface: "aged_walnut",
      props: ["old_book", "reading_glasses", "journal"],
      composition: "asymmetrical",
      camera: "Leica M11",
      lens: "35mm Summicron",
      lighting: "low_evening_light",
      lightingDirection: "left_side",
      emotionalTone: "quiet heritage",
    },
  ],

  controlled_office: [
    {
      key: "desk_scene",
      label: "Controlled Office Desk Scene",
      surface: "dark_walnut",
      props: ["architectural_book", "brass_pen", "coffee_cup"],
      composition: "negative_space",
      camera: "Hasselblad X2D",
      lens: "80mm Hasselblad",
      lighting: "controlled_studio_light",
      lightingDirection: "top_left",
      emotionalTone: "controlled confidence",
    },
    {
      key: "meeting_scene",
      label: "Executive Meeting Scene",
      surface: "concrete",
      props: ["journal", "brass_pen"],
      composition: "rule_of_thirds",
      camera: "Phase One",
      lens: "100mm Macro",
      lighting: "diffused_daylight",
      lightingDirection: "left_side",
      emotionalTone: "quiet power",
    },
  ],

  modern_travel: [
    {
      key: "travel_scene",
      label: "Modern Travel Scene",
      surface: "linen",
      props: ["passport", "travel_ticket", "coffee_cup"],
      composition: "editorial_hero",
      camera: "Leica M11",
      lens: "35mm Summicron",
      lighting: "diffused_daylight",
      lightingDirection: "left_side",
      emotionalTone: "travel ready",
    },
    {
      key: "arrival_scene",
      label: "Arrival Scene",
      surface: "dark_walnut",
      props: ["passport", "travel_ticket"],
      composition: "negative_space",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "soft_window_light",
      lightingDirection: "right_side",
      emotionalTone: "quiet movement",
    },
  ],

  minimal_gallery: [
    {
      key: "gallery_scene",
      label: "Minimal Gallery Scene",
      surface: "concrete",
      props: ["architectural_book"],
      composition: "centered",
      camera: "Phase One",
      lens: "100mm Macro",
      lighting: "controlled_studio_light",
      lightingDirection: "top_left",
      emotionalTone: "modern restraint",
    },
    {
      key: "studio_scene",
      label: "Editorial Studio Scene",
      surface: "pale_wood",
      props: ["folded_linen"],
      composition: "negative_space",
      camera: "Hasselblad X2D",
      lens: "80mm Hasselblad",
      lighting: "diffused_daylight",
      lightingDirection: "left_side",
      emotionalTone: "quiet luxury",
    },
  ],

  artisan_workshop: [
    {
      key: "workbench_scene",
      label: "Artisan Workbench Scene",
      surface: "aged_walnut",
      props: ["leather_tools", "journal"],
      composition: "editorial_hero",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "soft_window_light",
      lightingDirection: "left_side",
      emotionalTone: "artisan heritage",
    },
    {
      key: "studio_scene",
      label: "Craft Studio Scene",
      surface: "dark_walnut",
      props: ["leather_tools", "folded_linen", "brass_pen"],
      composition: "asymmetrical",
      camera: "Hasselblad X2D",
      lens: "80mm Hasselblad",
      lighting: "warm_side_light",
      lightingDirection: "left_side",
      emotionalTone: "warm craft",
    },
  ],

  private_library: [
    {
      key: "library_scene",
      label: "Private Library Scene",
      surface: "aged_walnut",
      props: ["old_book", "reading_glasses", "journal"],
      composition: "asymmetrical",
      camera: "Leica M11",
      lens: "35mm Summicron",
      lighting: "soft_window_light",
      lightingDirection: "left_side",
      emotionalTone: "quiet reflection",
    },
    {
      key: "writing_scene",
      label: "Library Writing Scene",
      surface: "dark_walnut",
      props: ["journal", "fountain_pen", "old_book"],
      composition: "negative_space",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "soft_window_light",
      lightingDirection: "left_side",
      emotionalTone: "focused reflection",
    },
  ],

  collector_office: [
    {
      key: "meeting_scene",
      label: "Collector Office Scene",
      surface: "dark_walnut",
      props: ["archival_book", "brass_pen", "journal"],
      composition: "rule_of_thirds",
      camera: "Hasselblad X2D",
      lens: "80mm Hasselblad",
      lighting: "controlled_studio_light",
      lightingDirection: "top_left",
      emotionalTone: "earned confidence",
    },
    {
      key: "desk_scene",
      label: "Collector Desk Scene",
      surface: "dark_walnut",
      props: ["journal", "brass_pen", "reading_glasses"],
      composition: "negative_space",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "controlled_studio_light",
      lightingDirection: "left_side",
      emotionalTone: "quiet authority",
    },
  ],

  quiet_residence: [
    {
      key: "residence_scene",
      label: "Quiet Residence Scene",
      surface: "warm_wood",
      props: ["linen_cloth", "journal"],
      composition: "negative_space",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "diffused_daylight",
      lightingDirection: "left_side",
      emotionalTone: "calm belonging",
    },
  ],

  airport_lounge: [
    {
      key: "arrival_scene",
      label: "Airport Lounge Scene",
      surface: "stone",
      props: ["passport", "travel_ticket", "coffee_cup"],
      composition: "editorial_hero",
      camera: "Leica M11",
      lens: "35mm Summicron",
      lighting: "natural_daylight",
      lightingDirection: "left_side",
      emotionalTone: "calm transition",
    },
    {
      key: "travel_scene",
      label: "Departure Scene",
      surface: "stone",
      props: ["passport", "leather_notebook"],
      composition: "rule_of_thirds",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "natural_daylight",
      lightingDirection: "right_side",
      emotionalTone: "purposeful movement",
    },
  ],

  writer_studio: [
    {
      key: "writing_scene",
      label: "Writer Studio Scene",
      surface: "aged_walnut",
      props: ["journal", "ink_bottle", "reading_glasses"],
      composition: "negative_space",
      camera: "Leica M11",
      lens: "50mm Summilux",
      lighting: "warm_side_light",
      lightingDirection: "left_side",
      emotionalTone: "focused creation",
    },
    {
      key: "studio_scene",
      label: "Creative Studio Scene",
      surface: "dark_walnut",
      props: ["journal", "paper_stack", "fountain_pen"],
      composition: "asymmetrical",
      camera: "Hasselblad X2D",
      lens: "80mm Hasselblad",
      lighting: "warm_side_light",
      lightingDirection: "left_side",
      emotionalTone: "creative focus",
    },
  ],
};

export function getSceneVariants(worldKey?: string): SceneVariant[] {
  if (!worldKey) return [];

  return sceneVariants[worldKey] ?? [];
}

export function selectSceneVariant(input: {
  worldKey?: string;
  productType?: string;
  channel?: string;
  preferredVariant?: SceneVariantKey;
}) {
  const variants = getSceneVariants(input.worldKey);

  if (!variants.length) {
    return null;
  }

  if (input.preferredVariant) {
    const preferred = variants.find(
      (variant) => variant.key === input.preferredVariant,
    );

    if (preferred) return preferred;
  }

  if (input.channel === "web") {
    return (
      variants.find((variant) => variant.composition === "editorial_hero") ??
      variants[0]
    );
  }

  if (input.channel === "instagram") {
    return (
      variants.find((variant) => variant.composition === "asymmetrical") ??
      variants.find((variant) => variant.composition === "rule_of_thirds") ??
      variants[0]
    );
  }

  return variants[0];
}
