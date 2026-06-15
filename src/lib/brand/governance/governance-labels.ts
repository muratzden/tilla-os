import type { OutputLanguage } from "@/src/lib/i18n/language";

export function getGovernanceLabel(
  key: string,
  language: OutputLanguage = "tr",
): string {
  const labels: Record<string, { tr: string; en: string }> = {
    human_craft: {
      tr: "İnsan Eliyle Üretim",
      en: "Human Craft",
    },

    material_truth: {
      tr: "Malzeme Gerçekliği",
      en: "Material Truth",
    },

    controlled_variation: {
      tr: "Kontrollü Çeşitlilik",
      en: "Controlled Variation",
    },

    character: {
      tr: "Karakter",
      en: "Character",
    },

    individuality: {
      tr: "Bireysellik",
      en: "Individuality",
    },

    longevity: {
      tr: "Uzun Ömürlülük",
      en: "Longevity",
    },

    ownership: {
      tr: "Sahiplik",
      en: "Ownership",
    },

    fast_fashion: {
      tr: "Hızlı Moda",
      en: "Fast Fashion",
    },

    mass_production: {
      tr: "Seri Üretim",
      en: "Mass Production",
    },

    fake_perfection: {
      tr: "Sahte Kusursuzluk",
      en: "Fake Perfection",
    },

    generic_luxury: {
      tr: "Jenerik Lüks",
      en: "Generic Luxury",
    },

    trend_chasing: {
      tr: "Trend Takipçiliği",
      en: "Trend Chasing",
    },
  };

  const entry = labels[key];

  if (!entry) {
    return key;
  }

  return language === "en" ? entry.en : entry.tr;
}
