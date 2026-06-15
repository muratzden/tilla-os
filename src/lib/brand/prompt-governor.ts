export type PromptGovernorInput = {
  positivePrompt: string;
  negativePrompt?: string[];
};

export type PromptGovernorResult = {
  approved: boolean;
  score: number;
  violations: string[];
  positivePrompt: string;
  negativePrompt: string[];
};

const forbiddenTerms = [
  "cheap",
  "sale",
  "discount",
  "flashy",
  "luxury car",
  "gold watch",
  "money",
  "cash",
  "neon",
  "hype",
  "viral",
];

export function promptGovernor(
  input: string | PromptGovernorInput,
): PromptGovernorResult {
  const positivePrompt =
    typeof input === "string" ? input : input.positivePrompt;

  const negativePrompt =
    typeof input === "string" ? [] : (input.negativePrompt ?? []);

  const normalized = positivePrompt.toLowerCase();

  const violations = forbiddenTerms.filter((term) => {
    const termIndex = normalized.indexOf(term);

    if (termIndex === -1) {
      return false;
    }

    const beforeTerm = normalized
      .slice(Math.max(0, termIndex - 8), termIndex)
      .trim();

    const isNegated =
      beforeTerm.endsWith("no") ||
      beforeTerm.endsWith("avoid") ||
      beforeTerm.endsWith("without");

    return !isNegated;
  });

  const score = Math.max(0, 100 - violations.length * 15);

  return {
    approved: violations.length === 0,
    score,
    violations,
    positivePrompt,
    negativePrompt,
  };
}
