export function generateInstagramCaption(meaning: any, decision: any) {
  if (meaning.category === "briefcase") {
    return "Sessiz güven. El işçiliği deri evrak çantasında.";
  }

  return decision.outputText;
}
