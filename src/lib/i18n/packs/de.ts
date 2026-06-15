import type { LanguagePack } from "../language-pack-types";

export const dePack: LanguagePack = {
  meta: {
    id: "de",
    language: "de",
    name: "German",
    nativeName: "Deutsch",
    version: "1.0.0",
    source: "system",
  },

  dashboard: {
    appTitle: "TILLA-OS",
    appSubtitle: "System für Markenentscheidungen, Governance und Audit",

    navigation: {
      overview: "Übersicht",
      foundation: "Grundlage",
      manifesto: "Manifest",
      constitution: "Verfassung",
      governance: "Governance",
      audit: "Audit",
      output: "Ausgabe",
      memory: "Speicher",
      settings: "Einstellungen",
    },

    actions: {
      generate: "Generieren",
      save: "Speichern",
      approve: "Genehmigen",
      lock: "Sperren",
      reset: "Zurücksetzen",
      import: "Importieren",
      export: "Exportieren",
      test: "Testen",
    },

    labels: {
      brand: "Marke",
      brandId: "Marken-ID",
      category: "Kategorie",
      channel: "Kanal",
      language: "Sprache",
      outputLanguage: "Ausgabesprache",
      status: "Status",
      score: "Score",
      risk: "Risiko",
      readiness: "Bereitschaft",
    },

    statuses: {
      healthy: "Gesund",
      warning: "Warnung",
      critical: "Kritisch",
      ready: "Bereit",
      blocked: "Blockiert",
      low: "Niedrig",
      medium: "Mittel",
      high: "Hoch",
    },
  },

  governance: {
    health: "Governance-Gesundheit",
    decisionVetoRisk: "Entscheidungs-Veto-Risiko",
    forbiddenDirectionExposure: "Exposition gegenüber verbotenen Richtungen",
    corePrincipleConflicts: "Konflikte mit Kernprinzipien",
    signals: "Governance-Signale",
    recommendations: "Governance-Empfehlungen",
    publishReadiness: "Veröffentlichungsbereitschaft",
    blockedMessage:
      "Diese Ausgabe verletzt Marken-Governance-Regeln und sollte nicht veröffentlicht werden.",
    readyMessage:
      "Diese Ausgabe ist nach den Marken-Governance-Regeln erlaubt.",
  },

  alignment: {
    brandAlignment: "Markenausrichtung",
    alignmentScore: "Ausrichtungs-Score",
    constitutionAlignment: "Verfassungs-Ausrichtung",
    memoryAlignment: "Speicher-Ausrichtung",
    consistencyAlignment: "Konsistenz-Ausrichtung",
    driftLevel: "Drift-Level",
    driftAnalysis: "Marken-Drift-Analyse",
  },

  brandSetup: {
    title: "Marken-Setup",
    subtitle:
      "Definiert die Kernidentität und Entscheidungsgrundlage der Marke.",
    currentBrand: "Aktuelle Marke",
    brandProfile: "Markenprofil",
    brandReadiness: "Markenbereitschaft",
    premiumLevel: "Premium-Level",
    tone: "Ton",
    personality: "Persönlichkeit",
    aesthetic: "Ästhetik",
  },

  manifesto: {
    title: "Manifest",
    subtitle: "Definiert Absicht, Grenzen und Kernprinzipien der Marke.",
    interview: "Manifest-Interview",
    intelligence: "Manifest-Intelligenz",
    dominantPrinciple: "Dominantes Prinzip",
    approval: "Manifest-Genehmigung",
    locked: "Gesperrt",
    draft: "Entwurf",
    approved: "Genehmigt",
  },

  constitution: {
    title: "Markenverfassung",
    subtitle: "Verbindliche Entscheidungsregeln, generiert aus dem Manifest.",
    generatedConstitution: "Generierte Verfassung",
    corePrinciples: "Kernprinzipien",
    forbiddenDirections: "Verbotene Richtungen",
    decisionRules: "Entscheidungsregeln",
    enforcement: "Durchsetzung",
  },

  audit: {
    title: "Marken-Audit",
    subtitle: "Prüft die Kanalausrichtung gegenüber Manifest und Verfassung.",
    source: "Audit-Quelle",
    channelAudit: "Kanal-Audit",
    websiteAudit: "Website-Audit",
    socialAudit: "Social-Media-Audit",
    marketplaceAudit: "Marketplace-Audit",
    emailAudit: "E-Mail-Audit",
    adAudit: "Anzeigen-Audit",
  },

  output: {
    title: "Ausgabe",
    subtitle:
      "Inhalt und visuelle Richtung, generiert aus der Markenentscheidung.",
    visualPrompt: "Visueller Prompt",
    negativePrompt: "Negativer Prompt",
    contentOutput: "Inhaltsausgabe",
    bilingualOutput: "Zweisprachige Ausgabe",
  },

  languagePacks: {
    title: "Sprachpakete",
    subtitle:
      "Verwalte UI- und Ausgabesprachen über System- oder importierte Pakete.",
    installedPacks: "Installierte Pakete",
    importPack: "Sprachpaket importieren",
    marketplacePacks: "Paket-Marktplatz",
    activePack: "Aktives Paket",
    packImported: "Sprachpaket erfolgreich importiert.",
    invalidPack: "Ungültiges Sprachpaket.",
    missingKey: "Im Sprachpaket fehlt ein Schlüssel.",
  },
};
