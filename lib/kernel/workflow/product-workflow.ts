import { classifyProduct } from "../product/classify";
import { buildProductPrompt } from "../prompt/builder";
import { generateScene } from "../visual/scene";

export function runProductWorkflow(productName: string) {
  const productType = classifyProduct(productName);
  const prompt = buildProductPrompt(productName);
  const visualScene = generateScene(productName);

  return {
    productName,
    productType,
    prompt,
    visualScene,
  };
}
