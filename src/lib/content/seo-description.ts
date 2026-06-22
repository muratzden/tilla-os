export function generateSeoDescription(meaning: any, knowledge: any) {
  const category = String(meaning?.category ?? "offer");
  const positioning = String(
    knowledge?.positioning ?? "clear category-specific positioning",
  );
  const audience = String(knowledge?.audience ?? "defined audience");

  return `${category} content built around ${positioning}, audience fit for ${audience}, and consistent brand trust.`;
}