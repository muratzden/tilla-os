/**
 * LEGACY SETUP CONSTITUTION GENERATOR
 *
 * This module is kept only for setup-v2 compatibility.
 * It is not the source of truth for Brand Constitution.
 *
 * Source of truth:
 * src/lib/brand-kernel/brand-kernel.ts
 * src/lib/brand-kernel/constitution-generator.ts
 */

import type { GeneratedManifesto } from "./manifesto-generator";

export type GeneratedConstitution = {
  reject: string[];
  prefer: string[];
  productRules: string[];
  marketingRules: string[];
  customerRules: string[];
  growthRules: string[];
  boundaries: string[];
};

function hasAny(source: string, keywords: string[]) {
  return keywords.some((keyword) => source.includes(keyword));
}

export function generateConstitution(
  manifesto: GeneratedManifesto,
): GeneratedConstitution {
  const source = [
    manifesto.identity,
    manifesto.mission,
    manifesto.transformation,
    manifesto.audience,
    manifesto.principles.join(" "),
    manifesto.vision,
  ]
    .join(" ")
    .toLowerCase();

  const reject: string[] = [];
  const prefer: string[] = [];
  const productRules: string[] = [];
  const marketingRules: string[] = [];
  const customerRules: string[] = [];
  const growthRules: string[] = [];
  const boundaries: string[] = [];

  if (hasAny(source, ["craft", "craftsmanship", "handmade", "artisan"])) {
    reject.push("Mass-production logic");
    prefer.push("Visible craftsmanship");

    productRules.push(
      "Products should make the human craft behind them visible.",
    );

    marketingRules.push(
      "Marketing should explain the making process, not only show the finished product.",
    );
  }

  if (hasAny(source, ["material", "honest", "honesty", "natural"])) {
    reject.push("Fake material claims");
    prefer.push("Material transparency");

    productRules.push(
      "Material choices must be clearly explainable and defensible.",
    );

    customerRules.push(
      "Customers should understand what they are buying and why it matters.",
    );
  }

  if (hasAny(source, ["durable", "durability", "long-lasting", "lasting"])) {
    reject.push("Disposable product thinking");
    prefer.push("Long-term product value");

    productRules.push(
      "Design decisions should prioritize durability over trend speed.",
    );

    marketingRules.push(
      "Messaging should emphasize long-term value instead of short-term novelty.",
    );
  }

  if (hasAny(source, ["premium", "quality", "better"])) {
    reject.push("Discount-driven positioning");
    prefer.push("Premium consistency");

    growthRules.push("Growth should not depend on constant discounting.");

    marketingRules.push("Visual language must support premium perception.");
  }

  if (hasAny(source, ["personal", "individual", "character", "memory"])) {
    reject.push("Generic brand expression");
    prefer.push("Products with character");

    productRules.push(
      "Product decisions should preserve individuality and emotional value.",
    );

    customerRules.push(
      "The customer experience should feel personal, not transactional.",
    );
  }

  productRules.push(
    "Do not expand the product range unless the new product strengthens the declared identity.",
  );

  marketingRules.push(
    "Every campaign must reinforce the manifesto instead of chasing random attention.",
  );

  customerRules.push(
    "The brand should attract the right customers and repel poor-fit customers.",
  );

  growthRules.push(
    "Short-term revenue should not compromise long-term positioning.",
  );

  boundaries.push("Do not violate declared principles for growth.");

  boundaries.push("Do not sacrifice trust for short-term gains.");

  return {
    reject: Array.from(new Set(reject)),
    prefer: Array.from(new Set(prefer)),
    productRules: Array.from(new Set(productRules)),
    marketingRules: Array.from(new Set(marketingRules)),
    customerRules: Array.from(new Set(customerRules)),
    growthRules: Array.from(new Set(growthRules)),
    boundaries: Array.from(new Set(boundaries)),
  };
}
