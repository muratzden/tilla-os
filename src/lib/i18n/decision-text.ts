export function getDecisionStrengthText(
  value?: string,
  language: "tr" | "en" = "tr",
) {
  const map = {
    strong: {
      tr: "Güçlü",
      en: "Strong",
    },

    moderate: {
      tr: "Orta",
      en: "Moderate",
    },

    weak: {
      tr: "Zayıf",
      en: "Weak",
    },
  } as const;

  return map[value as keyof typeof map]?.[language] ?? value ?? "-";
}

export function getConfidenceText(
  value?: string,
  language: "tr" | "en" = "tr",
) {
  const map = {
    low: {
      tr: "Düşük",
      en: "Low",
    },

    medium: {
      tr: "Orta",
      en: "Medium",
    },

    high: {
      tr: "Yüksek",
      en: "High",
    },
  } as const;

  return map[value as keyof typeof map]?.[language] ?? value ?? "-";
}

export function getRiskText(value?: string, language: "tr" | "en" = "tr") {
  const map = {
    low: {
      tr: "Düşük",
      en: "Low",
    },

    moderate: {
      tr: "Orta",
      en: "Moderate",
    },

    high: {
      tr: "Yüksek",
      en: "High",
    },
  } as const;

  return map[value as keyof typeof map]?.[language] ?? value ?? "-";
}
