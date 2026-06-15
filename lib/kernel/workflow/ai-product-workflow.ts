import { buildProductPrompt } from "../prompt/builder";
import { generateAIResponse } from "../ai/provider";
import { validateGeneratedCopy } from "../gatekeeper/rules";
import { generateScene } from "../visual/scene";

export async function runAIProductWorkflow(productName: string) {
  const prompt = buildProductPrompt(productName);

  const aiResult = await generateAIResponse(prompt);

  const validation = validateGeneratedCopy(aiResult.output);

  const visualScene = generateScene(productName);

  return {
    productName,
    aiCopy: aiResult.output,
    validation,
    visualScene,
  };
}
