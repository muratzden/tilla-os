type Meaning = {
  category: string;
  intent: string;
  emotion: string;
};

export function decisionScoringEngine(meaning: Meaning) {
  const scores = [];

  // Executive luxury bias
  scores.push({
    label: "executive_luxury",
    score: scoreExecutive(meaning),
  });

  // Daily utility bias
  scores.push({
    label: "daily_utility",
    score: scoreDaily(meaning),
  });

  // Casual usage bias
  scores.push({
    label: "casual_use",
    score: scoreCasual(meaning),
  });

  return {
    scores,
    top: scores.sort((a, b) => b.score - a.score)[0],
  };
}

function scoreExecutive(m: Meaning) {
  let score = 0.5;

  if (m.category === "briefcase") score += 0.3;
  if (m.emotion.includes("confidence")) score += 0.2;

  return clamp(score);
}

function scoreDaily(m: Meaning) {
  let score = 0.4;

  if (m.intent.includes("artisan")) score += 0.2;

  return clamp(score);
}

function scoreCasual(m: Meaning) {
  let score = 0.3;

  if (m.category !== "briefcase") score += 0.2;

  return clamp(score);
}

function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}
