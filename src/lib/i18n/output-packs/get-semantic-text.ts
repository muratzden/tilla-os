import type { OutputExpressionEntry, OutputPack } from "./output-pack-types";

export function getSemanticText(
  pack: OutputPack,
  key: string,
): OutputExpressionEntry | undefined {
  return pack.semantic[key];
}
