export function generateProductDescription(meaning: any, decision: any) {
  if (meaning.category === "briefcase") {
    return [
      "El işçiliğiyle üretilen bu deri evrak çantası, iş yaşamının sade ama güçlü ritmine eşlik eder.",
      "Doğal deri dokusu, zamanla kendine özgü bir karakter kazanır.",
      "Gösterişli değil; dengeli, sakin ve kalıcı bir duruş taşır.",
    ].join(" ");
  }

  return decision.outputText;
}
