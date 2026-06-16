import type { OutputPack } from "@/src/lib/i18n/output-packs";
import { getOutputPack, resolveSemantic } from "@/src/lib/i18n/output-packs";

function semanticLabel(pack: OutputPack, key: string): string {
  return resolveSemantic(pack, key)?.label ?? key;
}

function expressionLabel(
  pack: OutputPack,
  group: keyof OutputPack["expressions"],
  key: string,
): string {
  return pack.expressions[group]?.[key]?.label ?? key;
}

export function createRenderLanguage(pack: OutputPack) {
  return {
    surfaces: {
      aged_walnut: "aged walnut workbench",
      dark_walnut: "dark walnut table",
      pale_wood: "raw pale wood table",
      black_stone: "dark stone surface",
      linen: "natural linen surface",
      concrete: "matte architectural concrete surface",
    },

    props: {
      journal: "artisan journal",
      brass_pen: "brass fountain pen",
      old_book: "aged hardcover book",
      reading_glasses: "vintage reading glasses",
      passport: "worn passport",
      coffee_cup: "minimal ceramic coffee cup",
      leather_tools: "subtle artisan leather tools",
      folded_linen: "folded natural linen cloth",
      architectural_book: "large architectural design book",
      travel_ticket: "discreet travel ticket",
    },

    lighting: {
      soft_window_light: "soft natural window light",
      controlled_studio_light: "controlled studio light",
      warm_side_light: "warm side light",
      diffused_daylight: "diffused daylight",
      low_evening_light: "low evening light",
    },

    directions: {
      left_side: "light entering from the left side",
      right_side: "light entering from the right side",
      top_left: "light falling from the upper left",
      backlight: "subtle backlight",
    },

    atmosphere: {
      quiet_confidence: "quiet confidence atmosphere",
      warm_confidence: "warm confidence atmosphere",
      quiet_luxury: `${semanticLabel(pack, "quiet_luxury")} atmosphere`,
      artisan_heritage: `${semanticLabel(pack, "artisan_heritage")} atmosphere`,
      modern_restraint: "modern restrained atmosphere",
      travel_ready: "quiet travel-ready atmosphere",
    },

    styling: {
      artisan_heritage: `${semanticLabel(pack, "artisan_heritage")} styling`,
      quiet_power: `${semanticLabel(pack, "quiet_power")} styling`,
      modern_nomad: `${semanticLabel(pack, "modern_nomad")} styling`,
      minimal_editorial: `${semanticLabel(pack, "minimal_editorial")} styling`,
      executive: `${semanticLabel(pack, "executive_artisan")} styling`,
    },

    cameras: {
      leica_m11: semanticLabel(pack, "leica_m11"),
      "Leica M11": semanticLabel(pack, "leica_m11"),

      hasselblad_x2d: semanticLabel(pack, "hasselblad_x2d"),
      "Hasselblad X2D": semanticLabel(pack, "hasselblad_x2d"),

      phase_one: semanticLabel(pack, "phase_one"),
      "Phase One": semanticLabel(pack, "phase_one"),

      canon_r5: semanticLabel(pack, "canon_r5"),
      "Canon R5": semanticLabel(pack, "canon_r5"),
    },

    lenses: {
      summilux_50: "50mm Leica Summilux lens",
      "50mm Summilux": "50mm Leica Summilux lens",

      summicron_35: "35mm Leica Summicron lens",
      "35mm Summicron": "35mm Leica Summicron lens",

      noctilux_50: "50mm Leica Noctilux lens",
      "50mm Noctilux": "50mm Leica Noctilux lens",

      hasselblad_80: "80mm Hasselblad portrait lens",
      "80mm Hasselblad": "80mm Hasselblad portrait lens",

      macro_100: "100mm macro product lens",
      "100mm Macro": "100mm macro product lens",
    },

    environments: {
      private_study: expressionLabel(pack, "environments", "private_study"),
      executive_office: expressionLabel(
        pack,
        "environments",
        "executive_office",
      ),
      artisan_workshop: expressionLabel(
        pack,
        "environments",
        "artisan_workshop",
      ),
      modern_travel: expressionLabel(pack, "environments", "modern_travel"),
      minimal_gallery: expressionLabel(pack, "environments", "minimal_gallery"),
      creative_studio: expressionLabel(pack, "environments", "creative_studio"),
      private_library: expressionLabel(pack, "environments", "private_library"),
    },
    materials: {
      frisco: expressionLabel(pack, "materials", "frisco"),
      crazy_horse: expressionLabel(pack, "materials", "crazy_horse"),
      nubuck: expressionLabel(pack, "materials", "nubuck"),
      suede: expressionLabel(pack, "materials", "suede"),
      vegetable_tanned: expressionLabel(pack, "materials", "vegetable_tanned"),
    },

    colors: {
      camel: expressionLabel(pack, "colors", "camel"),
      warm_brown: expressionLabel(pack, "colors", "warm_brown"),
      tan: expressionLabel(pack, "colors", "tan"),
      ivory: expressionLabel(pack, "colors", "ivory"),
      black: expressionLabel(pack, "colors", "black"),
      dark_brown: expressionLabel(pack, "colors", "dark_brown"),
      cognac: expressionLabel(pack, "colors", "cognac"),
      natural: expressionLabel(pack, "colors", "natural"),
    },

    composition: {
      negative_space: "generous negative space",
      centered: "centered composition",
      rule_of_thirds: "rule of thirds composition",
      asymmetrical: "balanced asymmetrical composition",
      close_up: "intimate close-up composition",
      hero_composition: semanticLabel(pack, "hero_composition"),
    },
  };
}

export const renderLanguage = createRenderLanguage(getOutputPack("en"));
