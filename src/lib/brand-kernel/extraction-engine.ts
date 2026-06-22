import { FounderSignal } from "./founder-signals";
import { tagFounderText } from "./tagging-engine";

export async function extractSignals(
  answers: string[],
): Promise<FounderSignal[]> {
  return answers.map((answer, index) => ({
    id: `signal-${index}`,
    source: "setup",
    text: answer,
    importance: 0.5,
    tags: tagFounderText(answer),
  }));
}
