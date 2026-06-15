type ArtDirectionInput = {
  meaning: any;
  knowledge?: any;
  world?: any;
  scene: any;
};

type ArtDirectionResult = {
  lighting: string;
  surface: string;
  camera: string;

  mood: string;
  emotionalTone: string;

  props: string[];
  styling: string;
  atmosphere: string;
  colors: string[];
  forbidden: string[];
  shotType: string;
  composition: string;

  lightingDirection?: string;
  contrast?: string;
  palette?: string[];
  lens?: string;

  worldEnvironment?: string;
  worldMaterials?: string[];
};

export function artDirectionEngine({
  meaning,
  world,
  scene,
}: ArtDirectionInput): ArtDirectionResult {
  const category = meaning?.category;

  const mood =
    scene?.mood ??
    scene?.emotionalTone ??
    world?.emotionalField ??
    "quiet_confidence";

  const emotionalTone = scene?.emotionalTone ?? world?.emotionalField ?? mood;

  const palette = getPalette(scene);

  const base = {
    lighting: scene?.lighting ?? "soft_window_light",
    lightingDirection: scene?.lightingDirection,
    contrast: scene?.contrast,
    surface: scene?.surface ?? "dark_wood",
    camera: scene?.camera ?? "Leica M11",
    lens: scene?.lens,

    mood,
    emotionalTone,

    props: scene?.props ?? [],
    palette,

    worldEnvironment: world?.environment,
    worldMaterials: world?.materials,

    forbidden: [
      "luxury_car",
      "gold_watch",
      "money",
      "discount_badges",
      "neon_colors",
      "fake_leather",
      "plastic_gloss",
      "cheap_props",
      "overstyled_luxury",
    ],
  };

  if (category === "briefcase") {
    return {
      ...base,
      styling: "executive_artisan",
      atmosphere: world?.emotionalField ?? "controlled_confidence",
      colors: palette.length
        ? palette
        : ["camel", "deep_brown", "warm_beige", "charcoal"],
      shotType: "editorial_product",
      composition: "negative_space",
    };
  }

  if (category === "wallet") {
    return {
      ...base,
      styling: "minimal_artisan",
      atmosphere: world?.emotionalField ?? "material_honesty",
      colors: palette.length ? palette : ["cognac", "dark_brown", "stone"],
      shotType: "macro_detail",
      composition: "center_focus",
    };
  }

  if (category === "bag") {
    return {
      ...base,
      styling: "quiet_utility",
      atmosphere: world?.emotionalField ?? "everyday_confidence",
      colors: palette.length ? palette : ["brown", "charcoal", "warm_neutral"],
      shotType: "editorial_product",
      composition: "negative_space",
    };
  }

  return {
    ...base,
    styling: "artisan_premium",
    atmosphere: world?.emotionalField ?? "quiet_confidence",
    colors: palette.length ? palette : ["brown", "charcoal", "warm_neutral"],
    shotType: "editorial_product",
    composition: "negative_space",
  };
}

function getPalette(scene: any): string[] {
  if (Array.isArray(scene?.palette) && scene.palette.length > 0) {
    return scene.palette;
  }

  return [];
}
