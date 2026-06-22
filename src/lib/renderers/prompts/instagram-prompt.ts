export function renderInstagramPrompt(context: any) {
  const product = context.product ?? "brand asset";

  return {
    caption: [
      context.narrative,
      "",
      "Clear positioning. Consistent expression. Stronger brand memory.",
      product ? `Created for ${product}.` : null,
    ]
      .filter(Boolean)
      .join("\n"),

    hashtags: [
      "#BrandStrategy",
      "#BrandConsistency",
      "#BrandPositioning",
      "#ContentSystem",
      "#BrandOS",
    ],
  };
}
