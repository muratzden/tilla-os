import { makeBrandDecision } from "./engine";
import { inferProductMeaning } from "../product-meaning/engine";
import { createArtDirection } from "../art-direction/engine";

export function runBrandBrain(
  task: string,
  productName: string,
  productType: string,
) {
  const decision = makeBrandDecision({
    task: task as any,
    productName,
  });

  const meaning = inferProductMeaning(productType);

  const artDirection = createArtDirection(meaning.identity, meaning.emotion);

  return {
    decision,
    meaning,
    artDirection,
  };
}
