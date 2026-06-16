import type { OutputPack } from "../output-pack-types";

export const deOutputPack: OutputPack = {
  meta: {
    id: "de",
    name: "German Output Pack",
    nativeName: "Deutsch",
    description: "German output language pack for generated brand content.",
    status: "core",
    source: "system",
    version: "1.0.0",
  },
  toneLabels: {
    restrained: "Zurückhaltend",
    premium: "Premium",
    warm: "Warm",
    direct: "Direkt",
    editorial: "Redaktionell",
  },
  auditLabels: {
    aligned: "Ausgerichtet",
    weak: "Schwach",
    risky: "Riskant",
    blocked: "Blockiert",
  },

  auditText: {
    violations: {
      forbiddenDirection:
        "Inhalt signalisiert eine verbotene Markenrichtung: {{value}}",
    },
    recommendations: {
      removeOrReframe:
        "Entferne oder formuliere Inhalte neu, die {{value}} nahelegen.",
      strengthenBrandSignal: "Stärke das Markensignal rund um {{value}}.",
    },
    driftAnalysis: {
      aligned:
        "Der Inhalt ist weitgehend mit Manifest, Constitution und aktuellem Markengedächtnis abgestimmt.",
      fragmenting:
        "Der Inhalt kann die Markenfragmentierung erhöhen, da das aktuelle Gedächtnis bereits eine inkonsistente Richtung zeigt.",
      shifting:
        "Der Inhalt sollte sorgfältig geprüft werden, da das Markengedächtnis eine Richtungsverschiebung anzeigt.",
      partialDrift:
        "Der Inhalt zeigt eine teilweise Markenabweichung und sollte vor der Veröffentlichung angepasst werden.",
      critical:
        "Der Inhalt verletzt grundlegende Governance-Regeln und sollte nicht veröffentlicht werden.",
    },
    governanceSignals: {
      forbiddenDirectionDetected: "Verbotene Markenrichtung erkannt.",
      lowAlignment:
        "Die Markenausrichtung liegt unterhalb des akzeptablen Arbeitsbereichs.",
      consistencyNotStable:
        "Der Markenkonsistenztrend ist nicht stabil: {{value}}.",
    },
  },

  decisionLabels: {
    selected: "Ausgewählt",
    rejected: "Abgelehnt",
    recommended: "Empfohlen",
    notRecommended: "Nicht empfohlen",
    publishReady: "Bereit zur Veröffentlichung",
    blocked: "Blockiert",
  },
  promptSections: {
    visualPrompt: "Visueller Prompt",
    negativePrompt: "Negativer Prompt",
    artDirection: "Art Direction",
    scene: "Szene",
    material: "Material",
    lighting: "Licht",
    composition: "Komposition",
  },
  visualPromptText: {
    subject: {
      premiumHandcraftedLeather: "Ultrapremium handgefertigtes Leder",
      honestArtisanPhotography: "ehrliche handwerkliche Produktfotografie",
    },

    material: {
      visibleNaturalGrain: "sichtbare natürliche Lederstruktur",
      subtleSurfaceVariation: "dezente Poren und Oberflächenvariationen",
      controlledHandmadeCharacter: "kontrollierter handgefertigter Charakter",
      notFactoryPerfect: "nicht fabrikperfekt, nicht identisch, nicht steril",
    },

    lighting: {
      controlledShadows: "kontrollierte Schatten",
      softHighlightDiscipline: "weiche kontrollierte Lichtakzente",
    },

    camera: {
      realisticEditorialProductPhotography:
        "realistische editoriale Produktfotografie",
    },

    composition: {
      premiumNegativeSpace: "hochwertiger Negativraum",
      quietLuxuryProductPlacement: "zurückhaltende Luxus-Produktplatzierung",
      colorPalette: "Farbpalette",
    },

    atmosphere: {
      earnedConfidence: "verdientes Selbstvertrauen",
      calmEuropeanArtisanLuxury: "ruhiger europäischer Handwerksluxus",
    },

    microDetails: {
      title: "MIKRODETAILS",
      handStitching: "Handnaht",
      edgeBurnishing: "Kantenpolitur",
      naturalLeatherVariation: "natürliche Ledervariation",
      humanCraftEvidence: "Spuren menschlicher Handarbeit",
      intentionalImperfection: "bewusste Unvollkommenheit",
      materialTruth: "Materialwahrheit",
    },

    negativePrompt: [
      "Text",
      "Wasserzeichen",
      "Logo-Verzerrung",
      "Kunstleder",
      "Plastikstruktur",
      "synthetischer Glanz",
      "billige Requisiten",
      "Unordnung",
      "überbelichtete Highlights",
      "übersättigte Farben",
      "goldene Luxusklischees",
      "fabrikperfekte sterile Oberfläche",
      "Massenproduktionslook",
      "niedrige Auflösung",
      "Cartoon-Stil",
      "AI-Artefakte",
    ],
  },
  narrative: {
    warmHeritage: {
      narrative: "Objekte, die durch Nutzung Charakter gewinnen.",
      productLanguage: {
        opening: "Ein Lederstück, das mit der Zeit Charakter gewinnt.",
        material:
          "Seine natürliche Struktur und der warme Ton verwandeln Gebrauchsspuren in eine persönliche Geschichte.",
        emotion: "Nicht laut; ruhig, ehrlich und beständig.",
      },
    },

    quietPower: {
      narrative: "Selbstvertrauen ohne Zurschaustellung.",
      productLanguage: {
        opening: "Eine ruhige, aber kraftvolle Präsenz.",
        material:
          "Die dunkle Lederoberfläche verbindet sich mit klarer Form und kontrollierten Details.",
        emotion: "Nichts Überflüssiges; nur Funktion, Balance und Autorität.",
      },
    },

    default: {
      narrative: "Ruhiges Handwerk für den Alltag.",
      productLanguage: {
        opening: "Ein zeitloses Lederstück.",
        material:
          "Natürliche Lederstruktur trifft auf klare Form und Handarbeit.",
        emotion: "Ruhig, ausgewogen und langlebig.",
      },
    },
  },
  expressions: {
    materials: {
      frisco: {
        label: "Frisco",
        description: "Warmes Naturleder mit sichtbarem Charakter.",
      },
      tiana: {
        label: "Tiana",
        description:
          "Raffiniertes Leder mit kontrolliertem Quiet-Luxury-Gefühl.",
      },
      kansas: {
        label: "Kansas",
        description:
          "Kräftiges, substanzvolles Leder mit funktionalem Charakter.",
      },
      crazy: {
        label: "Crazy",
        description:
          "Ausdrucksstarkes Leder, das mit der Zeit Spuren, Patina und persönlichen Charakter entwickelt.",
      },
    },
    colors: {
      black: {
        label: "Schwarz",
        description: "Kontrolliert, stark und zeitlos im Ausdruck.",
      },
      camel: {
        label: "Camel",
        description: "Warm, natürlich und traditionsorientiert im Ton.",
      },
      taba: {
        label: "Cognac",
        description:
          "Ein warmer Ton, der Handwerk und natürlichen Ledercharakter betont.",
      },
      brown: {
        label: "Braun",
        description: "Klassisch, robust und langlebig in der Ledersprache.",
      },
      burgundy: {
        label: "Burgunderrot",
        description: "Verleiht Tiefe, Charakter und eine edlere Erscheinung.",
      },
    },

    productTypes: {
      briefcase: {
        label: "Aktentasche",
        description:
          "Eine handgefertigte Leder-Aktentasche, die Ordnung, Vertrauen und langfristige Nutzung vermittelt.",
      },
      tote: {
        label: "Tragetasche",
        description:
          "Eine schlichte und funktionale Ledertasche für den täglichen Gebrauch.",
      },
      messenger: {
        label: "Umhängetasche",
        description:
          "Eine charaktervolle Schultertasche für Bewegung und praktisches tägliches Tragen.",
      },
      wallet: {
        label: "Geldbörse",
        description:
          "Eine persönliche Leder-Geldbörse, die durch Nutzung und Berührung Charakter gewinnt.",
      },
      belt: {
        label: "Gürtel",
        description:
          "Ein schlichter, robuster und zeitloser Ledergürtel für langfristige Nutzung.",
      },
      notebook_cover: {
        label: "Notizbuchhülle",
        description:
          "Eine handgefertigte Lederhülle, die das Schreiben und Notieren begleitet.",
      },
      guitar_strap: {
        label: "Gitarrengurt",
        description:
          "Ein handgefertigter Leder-Gitarrengurt für Bühne, Studio und lange Sessions.",
      },
    },

    channels: {
      website: {
        label: "Webseite",
        description:
          "Der primäre Verkaufskanal, in dem das Produkt klar, vertrauenswürdig und kaufbereit präsentiert werden muss.",
      },
      instagram: {
        label: "Instagram",
        description:
          "Ein visueller sozialer Kanal, der Atmosphäre, Details und handwerkliches Gefühl vermittelt.",
      },
      etsy: {
        label: "Etsy",
        description:
          "Ein internationaler Marktplatz, auf dem handgefertigte und personalisierbare Produkte erwartet werden.",
      },
      amazon: {
        label: "Amazon",
        description:
          "Ein Marktplatz, der eine klare, vertrauensorientierte Produktpräsentation für schnelle Entscheidungen erfordert.",
      },
      wholesale: {
        label: "Großhandel",
        description:
          "Ein Kanal für geschäftliche oder größere Bestellungen, bei dem Klarheit, Vertrauen und Produktionskapazität wichtig sind.",
      },
    },

    environments: {
      studio: {
        label: "Studio",
        description:
          "Eine kontrollierte Umgebung mit sauberem Licht, klarer Komposition und sichtbaren Produktdetails.",
      },
      workshop: {
        label: "Werkstatt",
        description:
          "Eine Umgebung, die Herstellungsprozess, Handarbeit und echte Produktionsspuren sichtbar macht.",
      },
      library: {
        label: "Bibliothek",
        description:
          "Eine ruhige, intellektuelle und zeitlose Premium-Atmosphäre.",
      },
      office: {
        label: "Büro",
        description:
          "Eine Umgebung, die professionelle Nutzung, Ordnung und Vertrauen hervorhebt.",
      },
      home: {
        label: "Zuhause",
        description:
          "Eine Umgebung, die das Produkt im Alltag, in persönlichen Ritualen und warmer Nutzung zeigt.",
      },
    },

    emotions: {
      confidence: {
        label: "Vertrauen",
        description:
          "Das Gefühl, dass das Produkt solide, ehrlich und für langfristige Nutzung gemacht ist.",
      },
      calm: {
        label: "Ruhe",
        description:
          "Ein kontrolliertes, ausgewogenes Premium-Gefühl ohne unnötige Lautstärke.",
      },
      heritage: {
        label: "Tradition",
        description:
          "Ein Gefühl von Handwerk, Herkunft und Beständigkeit über die Zeit.",
      },
      craftsmanship: {
        label: "Handwerkskunst",
        description:
          "Das Gefühl von Handarbeit, Materialwissen und sichtbarem Produktionscharakter.",
      },
      exclusivity: {
        label: "Exklusivität",
        description:
          "Ein Gefühl von Unterscheidung, Personalisierung und Distanz zur Massenproduktion.",
      },
    },
  },
  semantic: {
    quiet_luxury: {
      label: "Ruhiger Luxus",
      description:
        "Zurückhaltendes, raffiniertes und hochwertiges Markengefühl",
    },
    artisan_heritage: {
      label: "Handwerkstradition",
      description:
        "Menschliche Arbeit, Meisterschaft und traditionelle Herstellung",
    },
    executive_artisan: {
      label: "Handwerkliche Exzellenz",
      description:
        "Professionelle Ernsthaftigkeit verbunden mit Handwerkskunst",
    },
    quiet_power: {
      label: "Stille Kraft",
      description: "Starke Premium-Präsenz ohne Übertreibung",
    },
    modern_nomad: {
      label: "Moderner Nomade",
      description: "Bewegung, Reise und zeitgemäße Nutzung",
    },
    minimal_editorial: {
      label: "Minimal Editorial",
      description: "Klare, reduzierte und editoriale visuelle Richtung",
    },
    private_library: {
      label: "Ruhige Privatbibliothek",
      description:
        "Ruhige, intellektuelle und vertrauensbildende Innenraumszene",
    },
    private_study: {
      label: "Zeitloses privates Arbeitszimmer",
      description: "Klassische, durchdachte und raffinierte Arbeitszimmerszene",
    },
    executive_office: {
      label: "Ruhiges Executive Office",
      description:
        "Professionelle, kontrollierte und vertrauensbildende Büroszene",
    },
    artisan_workshop: {
      label: "Raffinierte Handwerkswerkstatt",
      description:
        "Werkstattszene mit Handwerk, Material und menschlicher Arbeit",
    },
    minimal_gallery: {
      label: "Minimale Galerie",
      description:
        "Klare und reduzierte Galerieszene, die das Produkt hervorhebt",
    },
    editorial_product: {
      label: "Editoriales Produktfoto",
      description:
        "Aufnahmeart, die das Produkt mit magazinartiger Ästhetik zeigt",
    },
    editorial_hero: {
      label: "Premium Editorial Hero Komposition",
      description:
        "Starke, hochwertige und editoriale Komposition für das Hauptbild",
    },
    premium_editorial: {
      label: "Premium Editorial Komposition",
      description:
        "Raffinierte, hochwertige Komposition in Publikationsqualität",
    },
    hero_composition: {
      label: "Premium-Hero-Komposition",
      description:
        "Eine Komposition, die das Hauptprodukt mit starker, zurückhaltender und hochwertiger visueller Hierarchie präsentiert.",
    },
    leica_m11: {
      label: "Leica M11 Editorial-Fotografie",
      description:
        "Hochwertige, realistische und editoriale Produktfotografie.",
    },
    hasselblad_x2d: {
      label: "Hasselblad X2D Mittelformat-Fotografie",
      description:
        "Detailreiche, raffinierte und hochwertige Mittelformat-Bildqualität.",
    },
    phase_one: {
      label: "Phase One kommerzielle Luxusfotografie",
      description:
        "Hochwertige kommerzielle Produkt- und Luxusmarkenfotografie.",
    },
    canon_r5: {
      label: "Canon R5 professionelle Produktfotografie",
      description: "Realistische, klare und professionelle Produktfotografie.",
    },
  },
  advisor: {
    warnings: {
      archetypeConflict:
        "Die aktuelle Entscheidung steht im Konflikt mit dem dominanten Archetyp.",
      worldConflict:
        "Die aktuelle Welt unterscheidet sich von der dominanten Markenwelt.",
      consistencyWeakening: "Die Markenkonsistenz wird schwächer.",
    },

    opportunities: {
      archetypeReinforced:
        "Die aktuelle Entscheidung stärkt den dominanten Archetyp.",
      worldStrengthened:
        "Die aktuelle Entscheidung stärkt die dominante Markenwelt.",
      insufficientMemory:
        "Es gibt noch nicht genügend Markengedächtnis für eine starke Beratungseinschätzung.",
    },

    actions: {
      reviewArchetypeDrift:
        "Überprüfe die Archetyp-Abweichung, bevor diese Richtung erweitert wird.",
      compareWorldNarrative:
        "Vergleiche diese Welt mit der dominanten narrativen Umgebung.",
      pauseCampaignExpansion:
        "Pausiere größere Kampagnenerweiterungen, bis sich die Konsistenz verbessert.",
      expandDominantWorld:
        "Erweitere die Kampagneninhalte rund um die dominante Welt.",
    },
  },
  governanceAuditText: {
    publishReadiness: {
      blocked: "Veröffentlichung blockiert.",
      ready: "Zur Veröffentlichung bereit.",
    },

    constitution: {
      approved: "Von der Markenverfassung genehmigt.",
      rejected: "Von der Markenverfassung abgelehnt.",
    },

    vetoRisk: {
      high: "Hohes Vetorisiko erkannt.",
      medium: "Mittleres Vetorisiko erkannt.",
      low: "Geringes Vetorisiko.",
    },

    recommendations: {
      forbiddenDirectionDetected: "Verbotene Markenrichtung erkannt.",
      corePrincipleConflict:
        "Konflikt mit einem zentralen Markenprinzip erkannt.",
      governancePassed: "Der Inhalt hat die Governance-Regeln bestanden.",
    },

    signals: {
      forbiddenDirectionDetected: "Verbotene Richtung erkannt.",
      corePrincipleConflict: "Konflikt mit einem Kernprinzip erkannt.",
      governancePassed: "Governance-Prüfung bestanden.",
    },
  },
};
