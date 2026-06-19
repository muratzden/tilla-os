import type {
  ExtractedSignal,
  FounderAnswer,
} from "./extraction-types";

function normalizeText(value: string): string {
  return value.toLowerCase().trim();
}

export function extractSignalsFromAnswer(
  answer: FounderAnswer,
): ExtractedSignal[] {
  const text = normalizeText(answer.answer);

  const extracted: ExtractedSignal[] = [];

  if (
    text.includes("who") ||
    text.includes("customer") ||
    text.includes("audience") ||
    text.includes("people") ||
    text.includes("serve")
  ) {
    extracted.push({
      signal: {
        id: `${answer.id}_audience`,
        category: "audience",
        strength: 0.75,
        evidence: [answer.answer],
      },
      evidence: [
        {
          answerId: answer.id,
          excerpt: answer.answer,
        },
      ],
      rationale:
        "The answer describes who the brand is trying to serve.",
    });
  }

  if (
    text.includes("believe") ||
    text.includes("refuse") ||
    text.includes("reject") ||
    text.includes("stand for")
  ) {
    extracted.push({
      signal: {
        id: `${answer.id}_belief`,
        category: "belief",
        strength: 0.85,
        evidence: [answer.answer],
      },
      evidence: [
        {
          answerId: answer.id,
          excerpt: answer.answer,
        },
      ],
      rationale:
        "The answer expresses a belief or rejection that can guide the brand.",
    });
  }

  if (
    text.includes("change") ||
    text.includes("transform") ||
    text.includes("become") ||
    text.includes("after choosing")
  ) {
    extracted.push({
      signal: {
        id: `${answer.id}_transformation`,
        category: "transformation",
        strength: 0.8,
        evidence: [answer.answer],
      },
      evidence: [
        {
          answerId: answer.id,
          excerpt: answer.answer,
        },
      ],
      rationale:
        "The answer describes the change the brand should create.",
    });
  }

  if (
    text.includes("never") ||
    text.includes("non-negotiable") ||
    text.includes("compromise") ||
    text.includes("principle")
  ) {
    extracted.push({
      signal: {
        id: `${answer.id}_principles`,
        category: "principles",
        strength: 0.8,
        evidence: [answer.answer],
      },
      evidence: [
        {
          answerId: answer.id,
          excerpt: answer.answer,
        },
      ],
      rationale:
        "The answer identifies a principle or non-negotiable boundary.",
    });
  }

  if (
    text.includes("we are") ||
    text.includes("brand is") ||
    text.includes("identity") ||
    text.includes("core")
  ) {
    extracted.push({
      signal: {
        id: `${answer.id}_identity`,
        category: "identity",
        strength: 0.8,
        evidence: [answer.answer],
      },
      evidence: [
        {
          answerId: answer.id,
          excerpt: answer.answer,
        },
      ],
      rationale:
        "The answer describes the brand's core identity.",
    });
  }

  return extracted;
}