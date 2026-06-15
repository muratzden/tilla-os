import { brandPersonality } from "../brand/brand-personality";

type Meaning = {
  category: string;
  intent: string;
  emotion: string;
};

type Knowledge = {
  positioning: string;
  emotionBias: string;
  context: string[];
};

type ScoreResult = {
  label: string;
  score: number;
  text: string;
};

export function dynamicScoringEngine(meaning: Meaning, knowledge: Knowledge) {
  const vectors: ScoreResult[] = [
    {
      label: "executive",
      score: computeExecutive(meaning, knowledge),
      text: createExecutiveText(meaning),
    },
    {
      label: "daily",
      score: computeDaily(meaning, knowledge),
      text: createDailyText(meaning),
    },
    {
      label: "casual",
      score: computeCasual(meaning),
      text: createCasualText(meaning),
    },
  ];

  const sorted = vectors.sort((a, b) => b.score - a.score);

  return {
    scores: sorted,
    top: sorted[0],
    explanation: {
      meaning,
      knowledge,
      model: "dynamic_weighted_reasoning_v0.4.1",
    },
  };
}

function computeExecutive(m: Meaning, k: Knowledge) {
  const personalityImpact = brandPersonality.evaluatePersonalityImpact({
    strategy: k.positioning,
    context: k.context,
    tone: { bias: k.emotionBias },
  });

  let score = 0.4;

  if (m.category === "briefcase") score += 0.25;
  if (m.emotion.includes("confidence")) score += 0.15;
  if (k.positioning.includes("executive")) score += 0.2;

  score += personalityImpact * 0.1;

  return clamp(score);
}

function computeDaily(m: Meaning, k: Knowledge) {
  let score = 0.3;

  if (m.intent.includes("artisan")) score += 0.2;
  if (k.emotionBias.includes("controlled")) score += 0.1;

  return clamp(score);
}

function computeCasual(m: Meaning) {
  let score = 0.2;

  if (m.category !== "briefcase") score += 0.2;

  return clamp(score);
}

function createExecutiveText(m: Meaning) {
  if (m.category === "briefcase") {
    return "El işçiliğiyle şekillenen bu deri evrak çantası, iş yaşamının sessiz güvenini taşır.";
  }

  return "El işçiliğiyle üretilen bu deri parça, sakin ve güçlü bir duruş taşır.";
}

function createDailyText(m: Meaning) {
  if (m.category === "briefcase") {
    return "Günlük kullanımın ritmine uyum sağlayan deri evrak çantası, sade formuyla öne çıkar.";
  }

  return "Günlük kullanıma eşlik eden bu deri parça, sade işleviyle karakter kazanır.";
}

function createCasualText(m: Meaning) {
  return "Rahat kullanıma uygun bu deri parça, doğal dokusuyla sade bir görünüm sunar.";
}

function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}
