import { SIGNAL_TAXONOMY } from "./signal-taxonomy";

const KEYWORD_TO_SIGNAL: Record<string, string[]> = {
  craft: ["craftsmanship"],
  handmade: ["craftsmanship"],
  quality: ["durability"],
  durable: ["durability"],
  "long-term": ["durability"],
  "long term": ["durability"],
  trust: ["trust"],
  premium: ["premium"],
  expensive: ["premium"],
  audience: ["audience"],
  customer: ["audience"],
  change: ["transformation"],
  transform: ["transformation"],
  different: ["differentiation"],
  unique: ["differentiation"],
  grow: ["growth"],
  scale: ["growth"],
  challenge: ["constraint"],
  problem: ["constraint"],
};

export function tagFounderText(text: string): string[] {
  const normalizedText = text.toLowerCase();

  const tags = Object.entries(KEYWORD_TO_SIGNAL).flatMap(
    ([keyword, signalIds]) => {
      if (!normalizedText.includes(keyword)) {
        return [];
      }

      return signalIds.filter((signalId) => SIGNAL_TAXONOMY[signalId]);
    },
  );

  return Array.from(new Set(tags));
}
