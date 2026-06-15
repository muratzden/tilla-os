// src/lib/renderers/prompts/visual-prompt.ts

export function renderVisualPrompt(context: any) {
  return {
    positivePrompt: [
      `Ultra premium handcrafted leather ${context.product}`,
      context.material,
      context.color,
      context.environment,
      context.surface,
      context.lighting,
      context.lightingDirection,
      context.camera,
      context.lens,
      context.composition,
      context.atmosphere,
      context.styling,
      context.props?.length ? `props: ${context.props.join(", ")}` : null,
    ]
      .filter(Boolean)
      .join(", "),

    negativePrompt: [
      "text",
      "watermark",
      "logo distortion",
      "fake leather",
      "plastic texture",
      "cheap props",
      "clutter",
      "overexposed highlights",
      "oversaturated colors",
      "gold luxury clichés",
    ].join(", "),
  };
}
