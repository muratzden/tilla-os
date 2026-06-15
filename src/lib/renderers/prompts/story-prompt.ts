// src/lib/renderers/prompts/story-prompt.ts

export function renderStoryPrompt(context: any) {
  return {
    slides: [
      {
        type: "hook",
        text: "Makineden değil, elden çıkan karakter.",
      },
      {
        type: "detail",
        text: context.material
          ? `${context.material} dokusu her kullanımda daha kişisel hale gelir.`
          : "Her parça kullanım izleriyle kendi karakterini kazanır.",
      },
      {
        type: "cta",
        text: "Detayları keşfet.",
      },
    ],
  };
}
