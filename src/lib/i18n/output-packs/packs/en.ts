import type { OutputPack } from "../output-pack-types";

export const enOutputPack: OutputPack = {
  meta: {
    id: "en",
    name: "English Output Pack",
    nativeName: "English",
    description:
      "Default English output language pack for generated brand content.",
    status: "core",
    source: "system",
    version: "1.0.0",
  },
  toneLabels: {
    restrained: "Restrained",
    premium: "Premium",
    warm: "Warm",
    direct: "Direct",
    editorial: "Editorial",
  },
  auditLabels: {
    aligned: "Aligned",
    weak: "Weak",
    risky: "Risky",
    blocked: "Blocked",
  },

  auditText: {
    violations: {
      forbiddenDirection:
        "Content signals forbidden brand direction: {{value}}",
    },
    recommendations: {
      removeOrReframe: "Remove or reframe content that suggests {{value}}.",
      strengthenBrandSignal: "Strengthen the brand signal around {{value}}.",
    },
    driftAnalysis: {
      aligned:
        "Content is broadly aligned with the governing manifesto, constitution and current brand memory.",
      fragmenting:
        "Content may increase brand fragmentation because the current memory already shows inconsistent direction.",
      shifting:
        "Content should be reviewed carefully because the brand memory indicates a shifting direction.",
      partialDrift:
        "Content shows partial brand drift and should be adjusted before publication.",
      critical:
        "Content violates core governance rules and should not be published.",
    },
    governanceSignals: {
      forbiddenDirectionDetected: "Forbidden brand direction detected.",
      lowAlignment: "Brand alignment is below acceptable operating range.",
      consistencyNotStable: "Brand consistency trend is {{value}}.",
    },
  },

  decisionLabels: {
    selected: "Selected",
    rejected: "Rejected",
    recommended: "Recommended",
    notRecommended: "Not recommended",
    publishReady: "Ready to publish",
    blocked: "Blocked",
  },
  promptSections: {
    visualPrompt: "Visual Prompt",
    negativePrompt: "Negative Prompt",
    artDirection: "Art Direction",
    scene: "Scene",
    material: "Material",
    lighting: "Lighting",
    composition: "Composition",
  },
  visualPromptText: {
    subject: {
      premiumHandcraftedLeather: "Ultra premium handcrafted leather",
      honestArtisanPhotography: "honest artisan product photography",
    },

    material: {
      visibleNaturalGrain: "visible natural leather grain",
      subtleSurfaceVariation: "subtle pores and surface variation",
      controlledHandmadeCharacter: "controlled handmade character",
      notFactoryPerfect: "not factory-perfect, not identical, not sterile",
    },

    lighting: {
      controlledShadows: "controlled shadows",
      softHighlightDiscipline: "soft highlight discipline",
    },

    camera: {
      realisticEditorialProductPhotography:
        "realistic editorial product photography",
    },

    composition: {
      premiumNegativeSpace: "premium negative space",
      quietLuxuryProductPlacement: "quiet luxury product placement",
      colorPalette: "color palette",
    },

    atmosphere: {
      earnedConfidence: "earned confidence",
      calmEuropeanArtisanLuxury: "calm European artisan luxury",
    },

    microDetails: {
      title: "MICRO DETAILS",
      handStitching: "hand stitching",
      edgeBurnishing: "edge burnishing",
      naturalLeatherVariation: "natural leather variation",
      humanCraftEvidence: "human craft evidence",
      intentionalImperfection: "intentional imperfection",
      materialTruth: "material truth",
    },

    negativePrompt: [
      "text",
      "watermark",
      "logo distortion",
      "fake leather",
      "plastic texture",
      "synthetic shine",
      "cheap props",
      "clutter",
      "overexposed highlights",
      "oversaturated colors",
      "gold luxury cliches",
      "factory-perfect sterile surface",
      "mass-produced look",
      "low resolution",
      "cartoon style",
      "AI artifacts",
    ],
  },
  narrative: {
    warmHeritage: {
      narrative: "Objects that gain character through use.",
      productLanguage: {
        opening: "A leather piece that gains character over time.",
        material:
          "Its natural texture and warm tone turn signs of use into a personal story.",
        emotion: "Not showy; calm, honest and enduring.",
      },
    },

    quietPower: {
      narrative: "Confidence without display.",
      productLanguage: {
        opening: "A quiet but powerful presence.",
        material:
          "The dark leather surface combines with a clear form and controlled details.",
        emotion: "Nothing unnecessary; only function, balance and authority.",
      },
    },

    default: {
      narrative: "Quiet craftsmanship for everyday life.",
      productLanguage: {
        opening: "A timeless leather piece.",
        material: "Natural leather texture meets simple form and handcraft.",
        emotion: "Quiet, balanced and made to last.",
      },
    },
  },
  expressions: {
    materials: {
      frisco: {
        label: "Frisco",
        description: "Warm natural leather with visible character.",
      },
      tiana: {
        label: "Tiana",
        description: "Refined leather with a controlled quiet-luxury feeling.",
      },
      kansas: {
        label: "Kansas",
        description: "Strong, substantial leather with a functional character.",
      },
      crazy: {
        label: "Crazy",
        description:
          "Expressive leather that gains marks, patina and personal character over time.",
      },
    },
    colors: {
      black: {
        label: "Black",
        description: "Controlled, strong and timeless in expression.",
      },
      camel: {
        label: "Camel",
        description: "Warm, natural and heritage-oriented in tone.",
      },
      taba: {
        label: "Tan",
        description:
          "A warm tone that emphasizes craft and natural leather character.",
      },
      brown: {
        label: "Brown",
        description: "Classic, durable and long-lasting in leather language.",
      },
      burgundy: {
        label: "Burgundy",
        description:
          "Adds depth, character and a more distinguished appearance.",
      },
    },
    productTypes: {
      briefcase: {
        label: "briefcase",
        description:
          "A handcrafted leather briefcase that communicates order, confidence, and long-term use.",
      },
      tote: {
        label: "tote bag",
        description:
          "A clean and functional leather carry bag designed for everyday use.",
      },
      messenger: {
        label: "messenger bag",
        description:
          "A characterful shoulder bag designed for movement and practical daily carry.",
      },
      wallet: {
        label: "wallet",
        description:
          "A personal leather wallet that gains character through use and handling.",
      },
      belt: {
        label: "belt",
        description:
          "A simple, strong, and timeless leather belt made for long-term use.",
      },
      notebook_cover: {
        label: "notebook cover",
        description:
          "A handcrafted leather cover that accompanies the ritual of writing and note-taking.",
      },
      guitar_strap: {
        label: "guitar strap",
        description:
          "A handcrafted leather guitar strap suited for stage, studio, and long sessions.",
      },
    },

    channels: {
      website: {
        label: "website",
        description:
          "The primary sales channel where the product needs to feel clear, trustworthy, and ready to purchase.",
      },
      instagram: {
        label: "Instagram",
        description:
          "A visual social channel for expressing atmosphere, detail, and the feeling of craft.",
      },
      etsy: {
        label: "Etsy",
        description:
          "An international marketplace where handmade and customizable products are expected.",
      },
      amazon: {
        label: "Amazon",
        description:
          "A marketplace that requires clear, trust-focused product presentation for fast decision-making.",
      },
      wholesale: {
        label: "wholesale",
        description:
          "A channel for business or volume orders where clarity, trust, and production capacity matter.",
      },
    },

    environments: {
      studio: {
        label: "studio",
        description:
          "A controlled environment with clean light, clear composition, and visible product detail.",
      },
      workshop: {
        label: "workshop",
        description:
          "An environment that carries the making process, handwork, and real production traces.",
      },
      library: {
        label: "library",
        description: "A quiet, intellectual, and timeless premium atmosphere.",
      },
      office: {
        label: "office",
        description:
          "An environment that highlights professional use, order, and confidence.",
      },
      home: {
        label: "home environment",
        description:
          "An environment that shows the product through daily life, personal ritual, and warm use.",
      },
    },

    emotions: {
      confidence: {
        label: "confidence",
        description:
          "The feeling that the product is solid, honest, and made for long-term use.",
      },
      calm: {
        label: "calmness",
        description:
          "A controlled, balanced premium feeling without unnecessary showiness.",
      },
      heritage: {
        label: "heritage",
        description:
          "A sense of craft, tradition, and permanence carried through time.",
      },
      craftsmanship: {
        label: "craftsmanship",
        description:
          "The feeling of handwork, material knowledge, and visible production character.",
      },
      exclusivity: {
        label: "exclusivity",
        description:
          "A sense of distinction, personalization, and distance from mass production.",
      },
    },
  },
  semantic: {
    quiet_luxury: {
      label: "Quiet luxury",
      description: "Understated, refined and premium brand feeling",
    },
    artisan_heritage: {
      label: "Artisan heritage",
      description: "Human craft, mastery and traditional production feeling",
    },
    executive_artisan: {
      label: "Executive artisan",
      description: "Professional seriousness combined with craftsmanship",
    },
    quiet_power: {
      label: "Quiet power",
      description: "Strong premium presence without exaggeration",
    },
    modern_nomad: {
      label: "Modern nomad",
      description: "Movement, travel and contemporary utility feeling",
    },
    minimal_editorial: {
      label: "Minimal editorial",
      description: "Clean, restrained and editorial visual direction",
    },
    private_library: {
      label: "Quiet private library",
      description: "Calm, intellectual and trust-building interior scene",
    },
    private_study: {
      label: "Timeless private study",
      description: "Classic, thoughtful and refined study room scene",
    },
    executive_office: {
      label: "Quiet executive office",
      description: "Professional, controlled and trust-building office scene",
    },
    artisan_workshop: {
      label: "Refined artisan workshop",
      description: "Workshop scene carrying craft, material and human labor",
    },
    minimal_gallery: {
      label: "Minimal gallery",
      description:
        "Clean and restrained gallery scene that highlights the product",
    },
    editorial_product: {
      label: "Editorial product",
      description:
        "Shot type presenting the product with magazine-like aesthetics",
    },
    editorial_hero: {
      label: "Premium editorial hero composition",
      description:
        "Strong, premium and editorial composition for the main visual",
    },
    premium_editorial: {
      label: "Premium editorial composition",
      description: "Refined, elevated and publication-quality composition",
    },
    hero_composition: {
      label: "premium hero composition",
      description:
        "A composition that presents the main product with strong, restrained and premium visual hierarchy.",
    },
    leica_m11: {
      label: "Leica M11 editorial photography",
      description:
        "Premium, realistic and editorial product photography feeling.",
    },
    hasselblad_x2d: {
      label: "Hasselblad X2D medium format photography",
      description:
        "High-detail, refined and premium medium format visual quality.",
    },
    phase_one: {
      label: "Phase One commercial luxury photography",
      description: "High-end commercial product and luxury brand photography.",
    },
    canon_r5: {
      label: "Canon R5 professional product photography",
      description: "Realistic, sharp and professional product photography.",
    },
  },
  advisor: {
    warnings: {
      archetypeConflict: "Current decision conflicts with dominant archetype.",
      worldConflict: "Current world differs from dominant brand world.",
      consistencyWeakening: "Brand consistency is weakening.",
    },

    opportunities: {
      archetypeReinforced:
        "Current decision reinforces the dominant archetype.",
      worldStrengthened:
        "Current decision strengthens the dominant brand world.",
      insufficientMemory:
        "Not enough brand memory exists for strong advisory judgment yet.",
    },

    actions: {
      reviewArchetypeDrift:
        "Review archetype drift before expanding this direction.",
      compareWorldNarrative:
        "Compare this world against the dominant narrative environment.",
      pauseCampaignExpansion:
        "Pause major campaign expansion until consistency improves.",
      expandDominantWorld: "Expand campaign assets around the dominant world.",
    },
  },
  governanceAuditText: {
    publishReadiness: {
      blocked: "Publication blocked.",
      ready: "Ready to publish.",
    },

    constitution: {
      approved: "Approved by Brand Constitution.",
      rejected: "Rejected by Brand Constitution.",
    },

    vetoRisk: {
      high: "High veto risk detected.",
      medium: "Medium veto risk detected.",
      low: "Low veto risk.",
    },

    recommendations: {
      forbiddenDirectionDetected: "Forbidden brand direction detected.",
      corePrincipleConflict: "Core brand principle conflict detected.",
      governancePassed: "Content passed core governance rules.",
    },

    signals: {
      forbiddenDirectionDetected: "Forbidden direction detected.",
      corePrincipleConflict: "Core principle conflict detected.",
      governancePassed: "Governance validation passed.",
    },
  },
};
