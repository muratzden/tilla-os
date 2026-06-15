import { getSceneVariants } from "./scene/scene-variants";
import { selectSceneVariant } from "./scene/variant-selector";

import { archetypeRegistry, ArchetypeName } from "./archetype-registry";

type ComposeSceneInput = {
  dna: any;

  archetype: {
    archetype: ArchetypeName;
    reason?: string[];
  };

  world: {
    worldKey?: string;
    environment: string;
    era: string;
    materials: string[];
    lightBehavior: string;
    soundscape: string;
    temperature: string;
    emotionalField: string;
  };

  channel?: string;
  seed?: number;
};

export function composeScene({
  dna,
  archetype,
  world,
  channel,
  seed,
}: ComposeSceneInput) {
  const archetypeName = archetype.archetype;
  const profile = archetypeRegistry[archetypeName];

  const variants = getSceneVariants(world.worldKey);

  const selectedVariant = selectSceneVariant(variants, {
    dna,
    channel,
    worldKey: world.worldKey,
    seed,
  });

  const fallbackSurface =
    world.materials.includes("walnut") ||
    world.materials.includes("aged_walnut") ||
    world.materials.includes("dark_walnut")
      ? "aged_walnut"
      : profile.surfaces[0];

  const fallbackProps = derivePropsFromWorld(world, profile.props);

  const fallbackLighting = deriveLightingFromWorld(
    world,
    profile.lighting.style,
  );

  return {
    archetype: archetypeName,

    sceneVariant: selectedVariant?.key ?? null,

    worldKey: world.worldKey,
    worldEnvironment: world.environment,
    worldEra: world.era,

    emotionalTone: selectedVariant?.emotionalTone ?? profile.mood,

    surface: selectedVariant?.surface ?? fallbackSurface,

    props: selectedVariant?.props ?? fallbackProps,

    lighting: selectedVariant?.lighting ?? fallbackLighting,

    lightingDirection:
      selectedVariant?.lightingDirection ?? profile.lighting.direction,

    contrast: profile.lighting.contrast,

    camera: selectedVariant?.camera ?? profile.camera.body,

    lens: selectedVariant?.lens ?? profile.camera.lens,

    composition: selectedVariant?.composition ?? "negative_space",

    palette: profile.colorPalette,

    worldMaterials: world.materials,

    emotionalField: world.emotionalField,
  };
}

function derivePropsFromWorld(
  world: ComposeSceneInput["world"],
  fallbackProps: readonly string[],
) {
  const props: string[] = [];

  if (world.materials.includes("paper")) {
    props.push("journal");
  }

  if (
    world.materials.includes("brass") ||
    world.materials.includes("brass_tools")
  ) {
    props.push("brass_pen");
  }

  if (world.environment === "private_study") {
    props.push("old_book");
  }

  if (world.environment === "executive_office") {
    props.push("document_folder");
  }

  if (world.environment === "minimal_studio") {
    props.push("linen_cloth");
  }

  const merged = [...props, ...fallbackProps];

  return Array.from(new Set(merged)).slice(0, 3);
}

function deriveLightingFromWorld(
  world: ComposeSceneInput["world"],
  fallbackLighting: string,
) {
  if (world.lightBehavior === "soft_window") {
    return "soft_window_light";
  }

  if (world.lightBehavior === "controlled_side_light") {
    return "controlled_studio_light";
  }

  if (world.lightBehavior === "soft_diffused") {
    return "diffused_daylight";
  }

  return fallbackLighting;
}
