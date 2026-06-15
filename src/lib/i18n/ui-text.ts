export type UILanguage = "tr" | "en" | "de";

export type UITextKey =
  | "currentBrand"
  | "readiness"
  | "workspace"
  | "overview"
  | "foundation"
  | "manifesto"
  | "governance"
  | "audit"
  | "decision"
  | "studios"
  | "more";

const uiText: Record<UILanguage, Record<UITextKey, string>> = {
  tr: {
    currentBrand: "Aktif Marka",
    readiness: "Hazırlık",
    workspace: "Çalışma Alanı",
    overview: "Genel Bakış",
    foundation: "Temel",
    manifesto: "Manifesto",
    governance: "Yönetişim",
    audit: "Denetim",
    decision: "Karar",
    studios: "Stüdyolar",
    more: "Daha Fazla",
  },
  en: {
    currentBrand: "Current Brand",
    readiness: "Readiness",
    workspace: "Workspace",
    overview: "Overview",
    foundation: "Foundation",
    manifesto: "Manifesto",
    governance: "Governance",
    audit: "Audit",
    decision: "Decision",
    studios: "Studios",
    more: "More",
  },
  de: {
    currentBrand: "Aktive Marke",
    readiness: "Bereitschaft",
    workspace: "Arbeitsbereich",
    overview: "Übersicht",
    foundation: "Grundlage",
    manifesto: "Manifest",
    governance: "Governance",
    audit: "Audit",
    decision: "Entscheidung",
    studios: "Studios",
    more: "Mehr",
  },
};

export function getUIText(language: UILanguage, key: UITextKey): string {
  return uiText[language]?.[key] ?? uiText.en[key];
}
