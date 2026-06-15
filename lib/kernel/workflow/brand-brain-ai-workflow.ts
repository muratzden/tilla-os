import { runBrandBrain } from "../brand-decision/brand-brain";
import { buildProductPrompt } from "../prompt/builder";
import { generateAIResponse } from "../ai/provider";

export async function runBrandBrainAIWorkflow(
  task: string,
  productName: string,
  productType: string,
) {
  const brain = runBrandBrain(task, productName, productType);

  const prompt = [
    "STRATEGY:",
    brain.decision.strategy,
    "",
    "TONE:",
    brain.decision.tone,
    "",
    "IDENTITY:",
    brain.meaning.identity,
    "",
    "EMOTION:",
    brain.meaning.emotion,
    "",
    "NARRATIVE:",
    brain.meaning.narrative,
    "",
    buildProductPrompt(productName),
  ].join("\n");

  const aiResult = await generateAIResponse(prompt);

  return {
    brain,
    aiCopy: aiResult.output,
  };
}
