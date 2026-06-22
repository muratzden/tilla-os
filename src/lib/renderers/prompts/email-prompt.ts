export function renderEmailPrompt(context: any) {
  const product = context.product ?? "Brand update";

  return {
    subject: `${product}: a clear brand story`,
    previewText:
      "A focused message built around positioning, trust and consistency.",

    body: [
      "Hello,",
      "",
      context.narrative ??
        "Every strong brand message should connect positioning, audience fit and evidence into one clear story.",
      "",
      context.material ? `Proof point: ${context.material}.` : null,
      context.color ? `Expression: ${context.color}.` : null,
      "",
      "You can review the full brand asset for more details.",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}