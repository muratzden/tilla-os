const CORE_PRINCIPLE_CONFLICT_SIGNALS: Record<string, string[]> = {
  human_craft: [
    "factory",
    "fully automated",
    "mass-produced",
    "mass production",
    "machine perfect",
    "industrial perfection",
  ],

  material_truth: [
    "synthetic",
    "fake leather",
    "artificial leather",
    "imitation leather",
    "plastic",
  ],

  individuality: ["standardized", "identical", "uniform", "bulk", "generic"],

  longevity: [
    "disposable",
    "temporary",
    "short-lived",
    "cheap",
    "single season",
  ],
};

export function detectCorePrincipleConflicts(params: {
  content: string;
  principleKeys: string[];
}): string[] {
  const normalizedContent = params.content.toLowerCase();

  return params.principleKeys.filter((principleKey) => {
    const normalizedPrincipleKey = principleKey.toLowerCase();

    const signals =
      CORE_PRINCIPLE_CONFLICT_SIGNALS[normalizedPrincipleKey] ?? [];

    return signals.some((signal) => normalizedContent.includes(signal));
  });
}
