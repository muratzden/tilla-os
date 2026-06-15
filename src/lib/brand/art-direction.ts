type ArtDirectionInput = {
  meaning: any;
  knowledge: any;
  world?: any;
  scene: any;
};

type ArtDirectionResult = {
  lighting: string;
  surface: string;
  camera: string;
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
  worldEnvironment?: string;
  worldMaterials?: string[];
};

export function artDirectionEngine({
  meaning,
  knowledge,
  world,
  scene,
}: ArtDirectionInput): ArtDirectionResult {
  const category = meaning.category;

  const base = {
    lighting: scene.lighting,
    lightingDirection: scene.lightingDirection,
    contrast: scene.contrast,
    surface: scene.surface,
    camera: scene.camera,
    emotionalTone:
      scene.emotionalTone ?? world?.emotionalField ?? "quiet_confidence",
    props: scene.props ?? [],
    palette: scene.palette ?? [],
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
      colors: scene.palette ?? [
        "camel",
        "deep_brown",
        "warm_beige",
        "charcoal",
      ],
      shotType: "editorial_product",
      composition: "negative_space",
    };
  }

  if (category === "wallet") {
    return {
      ...base,
      styling: "minimal_artisan",
      atmosphere: world?.emotionalField ?? "material_honesty",
      colors: scene.palette ?? ["cognac", "dark_brown", "stone"],
      shotType: "macro_detail",
      composition: "center_focus",
    };
  }

  if (category === "bag") {
    return {
      ...base,
      styling: "quiet_utility",
      atmosphere: world?.emotionalField ?? "everyday_confidence",
      colors: scene.palette ?? ["brown", "charcoal", "warm_neutral"],
      shotType: "editorial_product",
      composition: "negative_space",
    };
  }

  return {
    ...base,
    styling: "artisan_premium",
    atmosphere: world?.emotionalField ?? "quiet_confidence",
    colors: scene.palette ?? ["brown", "charcoal", "warm_neutral"],
    shotType: "editorial_product",
    composition: "negative_space",
  };
}
