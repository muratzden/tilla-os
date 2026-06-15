// src/lib/renderers/prompts/email-prompt.ts

export function renderEmailPrompt(context: any) {
  return {
    subject: context.product
      ? `${context.product} için sessiz bir zanaat hikâyesi`
      : "Tilla Leather’dan yeni bir zanaat hikâyesi",

    previewText:
      "Hakiki deri, el işçiliği ve zamansız kullanım için tasarlandı.",

    body: [
      "Merhaba,",
      "",
      context.narrative ??
        "Tilla Leather’da her ürün aynı tasarım niyetiyle başlar; fakat el işçiliği sayesinde kendi karakterini kazanır.",
      "",
      context.material
        ? `Bu parçada ${context.material} ifadesi öne çıkar.`
        : null,
      context.color ? `Renk karakteri: ${context.color}.` : null,
      "",
      "Detayları incelemek için koleksiyonu ziyaret edebilirsiniz.",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}
