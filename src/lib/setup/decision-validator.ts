import type { GeneratedConstitution } from "./constitution-generator";
import type { GeneratedManifesto } from "./manifesto-generator";

export type DecisionValidationResult = {
  score: number;
  status: "aligned" | "risky" | "misaligned";
  summary: string;
  matchedRules: string[];
  warnings: string[];
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function hasAny(source: string, keywords: string[]) {
  return keywords.some((keyword) => source.includes(keyword));
}

export function validateDecisionAgainstFoundation({
  decision,
  manifesto,
  constitution,
}: {
  decision: string;
  manifesto: GeneratedManifesto;
  constitution: GeneratedConstitution;
}): DecisionValidationResult {
  const normalizedDecision = normalize(decision);

  if (!normalizedDecision) {
    return {
      score: 0,
      status: "risky",
      summary: "No decision has been provided yet.",
      matchedRules: [],
      warnings: ["Write a decision to validate it against the foundation."],
    };
  }

  let score = 50;
  const warnings: string[] = [];
  const matchedRules: string[] = [];

  const negativeSignals = [
    {
      keywords: ["cheap", "cheaper", "low cost", "budget"],
      warning: "Conflicts with premium positioning.",
      penalty: 25,
    },
    {
      keywords: ["synthetic", "fake leather", "artificial"],
      warning: "Conflicts with material honesty.",
      penalty: 30,
    },
    {
      keywords: ["discount", "heavy discount", "sale"],
      warning: "Conflicts with premium consistency and long-term positioning.",
      penalty: 20,
    },
    {
      keywords: ["mass production", "mass-produced"],
      warning: "Conflicts with craftsmanship and small-batch logic.",
      penalty: 25,
    },
    {
      keywords: ["trend", "trendy", "fast fashion"],
      warning: "Conflicts with long-term product value.",
      penalty: 15,
    },
  ];

  negativeSignals.forEach((signal) => {
    if (hasAny(normalizedDecision, signal.keywords)) {
      score -= signal.penalty;
      warnings.push(signal.warning);
    }
  });

  const positiveSignals = [
    {
      keywords: ["handmade", "craft", "craftsmanship"],
      rule: "Supports visible craftsmanship.",
      bonus: 15,
    },
    {
      keywords: ["material honesty", "honest material", "natural material"],
      rule: "Supports material transparency.",
      bonus: 15,
    },
    {
      keywords: ["limited", "small batch", "limited collection"],
      rule: "Supports controlled product expansion.",
      bonus: 12,
    },
    {
      keywords: ["durable", "long-term", "long lasting", "lasting value"],
      rule: "Supports long-term product value.",
      bonus: 12,
    },
    {
      keywords: ["premium", "quality"],
      rule: "Supports premium consistency.",
      bonus: 10,
    },
    {
      keywords: ["personal", "character", "emotional value"],
      rule: "Supports products with character.",
      bonus: 10,
    },
  ];

  positiveSignals.forEach((signal) => {
    if (hasAny(normalizedDecision, signal.keywords)) {
      score += signal.bonus;
      matchedRules.push(signal.rule);
    }
  });

  const allRules = [
    ...constitution.productRules,
    ...constitution.marketingRules,
    ...constitution.customerRules,
    ...constitution.growthRules,
  ];

  allRules.forEach((rule) => {
    const ruleWords = normalize(rule)
      .split(/\s+/)
      .filter((word) => word.length > 7);

    if (ruleWords.some((word) => normalizedDecision.includes(word))) {
      matchedRules.push(rule);
    }
  });

  if (matchedRules.length === 0 && warnings.length === 0) {
    warnings.push(
      "This decision is too generic. It does not clearly support the manifesto.",
    );
    score -= 10;
  }

  score = Math.max(0, Math.min(100, score));

  const status = score >= 75 ? "aligned" : score >= 45 ? "risky" : "misaligned";

  const summary =
    status === "aligned"
      ? "This decision appears aligned with the current manifesto and constitution."
      : status === "risky"
        ? "This decision may be useful, but it needs stronger alignment with the foundation."
        : "This decision conflicts with the current foundation and should be reconsidered.";

  return {
    score,
    status,
    summary,
    matchedRules: Array.from(new Set(matchedRules)),
    warnings: Array.from(new Set(warnings)),
  };
}
