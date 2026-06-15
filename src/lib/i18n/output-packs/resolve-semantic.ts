import type {
  OutputExpressionEntry,
  OutputPack,
} from "./output-pack-types";

export function resolveSemantic(
  pack: OutputPack,
  key: string,
): OutputExpressionEntry | undefined {
  return pack.semantic[key];
}