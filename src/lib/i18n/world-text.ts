export type WorldKey =
  | "private_library"
  | "collector_office"
  | "writer_studio"
  | "quiet_residence";

const worldText = {
  private_library: {
    tr: "Özel Kütüphane",
    en: "Private Library",
  },

  collector_office: {
    tr: "Koleksiyoner Ofisi",
    en: "Collector Office",
  },

  writer_studio: {
    tr: "Yazar Stüdyosu",
    en: "Writer Studio",
  },

  quiet_residence: {
    tr: "Sessiz Yaşam Alanı",
    en: "Quiet Residence",
  },
} as const;

export function getWorldText(worldKey?: string, language: "tr" | "en" = "tr") {
  if (!worldKey) return "-";

  return worldText[worldKey as keyof typeof worldText]?.[language] ?? worldKey;
}
