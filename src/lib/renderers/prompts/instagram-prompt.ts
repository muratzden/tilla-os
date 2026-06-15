// src/lib/renderers/prompts/instagram-prompt.ts

export function renderInstagramPrompt(context: any) {
  return {
    caption: [
      context.narrative,
      "",
      "El işçiliğinin sessiz gücü.",
      context.product ? `${context.product} için tasarlandı.` : null,
    ]
      .filter(Boolean)
      .join("\n"),

    hashtags: [
      "#TillaLeather",
      "#HandcraftedLeather",
      "#QuietLuxury",
      "#LeatherCraft",
      "#MadeByHand",
    ],
  };
}
