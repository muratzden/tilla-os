import { BrandContext } from "../types/context";
import { saveDecision } from "../memory/store";

export function decide(context: BrandContext) {
  const input = context.input || "";

  let result = {
    approved: true,
    reason: "passed_rules",
  };

  if (input.length < 3) {
    result = { approved: false, reason: "too_short" };
  }

  if (input.toLowerCase().includes("spam")) {
    result = { approved: false, reason: "blocked_keyword" };
  }

  if (!context.intent) {
    result = { approved: true, reason: "no_intent_fallback" };
  }

  saveDecision({
    input,
    intent: context.intent,
    approved: result.approved,
    reason: result.reason,
    timestamp: Date.now(),
  });

  return result;
}
