import type { OutputLanguage } from "./language";

const decisionReasonText = {
  strongest_overall_world_fit: {
    tr: "genel dünya uyumu en güçlü aday",
    en: "strongest overall world fit",
  },

  strongest_heritage_environment: {
    tr: "miras ve kalıcılık hissi en güçlü ortam",
    en: "strongest heritage environment",
  },

  highest_memory_depth: {
    tr: "hafıza ve geçmiş duygusu en yüksek seçenek",
    en: "highest memory depth",
  },

  strong_campaign_flexibility: {
    tr: "kampanya kullanımı için güçlü esneklik",
    en: "strong campaign flexibility",
  },

  strong_ownership_signals: {
    tr: "sahiplenme ve kişisel kullanım sinyalleri güçlü",
    en: "strong ownership signals",
  },

  executive_positioning: {
    tr: "daha yönetici ve profesyonel konumlandırma",
    en: "executive positioning",
  },

  ownership_signal_strong: {
    tr: "sahiplenme ve kişisel kullanım sinyali güçlü",
    en: "ownership signal strong",
  },

  heritage_depth_lower: {
    tr: "miras derinliği seçilen alternatife göre daha zayıf",
    en: "heritage depth lower",
  },

  creative_signal_strong: {
    tr: "yaratıcı ifade sinyali güçlü",
    en: "creative signal strong",
  },

  campaign_flexibility_lower: {
    tr: "kampanya esnekliği seçilen alternatife göre daha düşük",
    en: "campaign flexibility lower",
  },

  weak_decision_strength: {
    tr: "karar gücü zayıf",
    en: "weak decision strength",
  },

  top_worlds_are_very_close: {
    tr: "en güçlü dünyalar birbirine çok yakın",
    en: "top worlds are very close",
  },

  high_signal_coverage: {
    tr: "sinyal kapsamı yüksek",
    en: "high signal coverage",
  },

  strong_craft_signal: {
    tr: "zanaat ve el işçiliği sinyali güçlü",
    en: "strong craft signal",
  },

  high_material_warmth: {
    tr: "malzeme sıcaklığı yüksek",
    en: "high material warmth",
  },

  lower_overall_score: {
    tr: "genel skor daha düşük",
    en: "lower overall score",
  },

  material_warmth_strong: {
    tr: "malzeme sıcaklığı güçlü",
    en: "material warmth strong",
  },

  heritage_fit_lower_by: {
    tr: "miras uyumu daha düşük:",
    en: "heritage fit lower by",
  },

  craft_signal_lower_by: {
    tr: "zanaat sinyali daha düşük:",
    en: "craft signal lower by",
  },

  material_warmth_lower_by: {
    tr: "malzeme sıcaklığı daha düşük:",
    en: "material warmth lower by",
  },

  campaign_usability_lower_by: {
    tr: "kampanya kullanılabilirliği daha düşük:",
    en: "campaign usability lower by",
  },
} as const;

type DecisionReasonKey = keyof typeof decisionReasonText;

export function getDecisionReasonText(
  key: string,
  outputLanguage: OutputLanguage = "tr",
) {
  const item = decisionReasonText[key as DecisionReasonKey];

  if (!item) {
    return key;
  }

  if (outputLanguage === "de") {
    return item.en;
  }

  return item[outputLanguage];
}
