import type { BrandType } from "../setup/brand-type";

export type PrincipleKey =
  | "human_craft"
  | "material_truth"
  | "longevity"
  | "individuality"
  | "service_excellence"
  | "trust"
  | "editorial_integrity"
  | "truth_over_attention"
  | "user_empowerment"
  | "simplicity"
  | "reliability"
  | "hospitality_warmth"
  | "community_impact";

export type PrincipleDefinition = {
  key: PrincipleKey;
  title: string;
  description: string;
  supportedBrandTypes: BrandType[];
  signals: string[];
};

export const principleRegistry: PrincipleDefinition[] = [
  {
    key: "human_craft",
    title: "Human Craft",
    description:
      "The brand values human intention, skill, and controlled imperfection over industrial sameness.",
    supportedBrandTypes: ["product", "service", "personal"],
    signals: [
      "handcraft",
      "handmade",
      "artisan",
      "craft",
      "human touch",
      "el yapımı",
      "zanaat",
      "ustalık",
    ],
  },
  {
    key: "material_truth",
    title: "Material Truth",
    description:
      "The brand respects the honest nature, texture, limits, and character of its materials.",
    supportedBrandTypes: ["product", "hospitality"],
    signals: [
      "natural material",
      "real material",
      "leather",
      "texture",
      "patina",
      "hakiki",
      "doğal",
      "malzeme",
    ],
  },
  {
    key: "longevity",
    title: "Longevity",
    description:
      "The brand prioritizes long-term value, durability, and meaningful use over short-term consumption.",
    supportedBrandTypes: [
      "product",
      "service",
      "personal",
      "software",
      "hospitality",
      "nonprofit",
    ],
    signals: [
      "long lasting",
      "durable",
      "timeless",
      "built to last",
      "uzun ömür",
      "kalıcı",
      "zamansız",
    ],
  },
  {
    key: "individuality",
    title: "Individuality",
    description:
      "The brand protects personal expression and avoids treating people or products as identical units.",
    supportedBrandTypes: ["product", "personal", "service"],
    signals: [
      "unique",
      "individual",
      "personal",
      "custom",
      "kişisel",
      "özel",
      "benzersiz",
    ],
  },
  {
    key: "service_excellence",
    title: "Service Excellence",
    description:
      "The brand treats service quality, care, and consistency as non-negotiable operating principles.",
    supportedBrandTypes: ["service", "hospitality"],
    signals: [
      "service",
      "care",
      "support",
      "experience",
      "hizmet",
      "destek",
      "deneyim",
    ],
  },
  {
    key: "trust",
    title: "Trust",
    description:
      "The brand earns confidence through honesty, consistency, and responsible behavior.",
    supportedBrandTypes: [
      "product",
      "service",
      "personal",
      "media",
      "software",
      "hospitality",
      "nonprofit",
    ],
    signals: [
      "trust",
      "honest",
      "transparent",
      "reliable",
      "güven",
      "dürüst",
      "şeffaf",
    ],
  },
  {
    key: "editorial_integrity",
    title: "Editorial Integrity",
    description:
      "The brand protects editorial judgment from manipulation, cheap attention, and careless publishing.",
    supportedBrandTypes: ["media", "personal"],
    signals: [
      "editorial",
      "journalism",
      "publishing",
      "content quality",
      "editoryal",
      "yayın",
      "içerik kalitesi",
    ],
  },
  {
    key: "truth_over_attention",
    title: "Truth Over Attention",
    description:
      "The brand values truth, usefulness, and substance more than reach, virality, or empty engagement.",
    supportedBrandTypes: ["media", "personal", "nonprofit"],
    signals: [
      "truth",
      "substance",
      "not clickbait",
      "meaningful content",
      "gerçek",
      "hakikat",
      "anlamlı içerik",
    ],
  },
  {
    key: "user_empowerment",
    title: "User Empowerment",
    description:
      "The brand helps users become more capable instead of making them dependent or confused.",
    supportedBrandTypes: ["software", "service", "nonprofit"],
    signals: [
      "empower",
      "enable",
      "control",
      "user first",
      "kullanıcı",
      "yetkinlik",
      "kontrol",
    ],
  },
  {
    key: "simplicity",
    title: "Simplicity",
    description:
      "The brand removes unnecessary complexity and protects clarity in experience and communication.",
    supportedBrandTypes: ["software", "service", "product"],
    signals: [
      "simple",
      "clear",
      "easy",
      "minimal",
      "sade",
      "basit",
      "anlaşılır",
    ],
  },
  {
    key: "reliability",
    title: "Reliability",
    description:
      "The brand must work consistently and be dependable under real-world conditions.",
    supportedBrandTypes: ["software", "service", "product"],
    signals: [
      "reliable",
      "stable",
      "dependable",
      "consistent",
      "güvenilir",
      "stabil",
      "tutarlı",
    ],
  },
  {
    key: "hospitality_warmth",
    title: "Hospitality Warmth",
    description:
      "The brand creates a sense of welcome, care, and emotional ease.",
    supportedBrandTypes: ["hospitality", "service"],
    signals: [
      "welcome",
      "warm",
      "guest",
      "comfort",
      "misafir",
      "sıcak",
      "konfor",
    ],
  },
  {
    key: "community_impact",
    title: "Community Impact",
    description:
      "The brand exists to create measurable benefit for a community or cause beyond itself.",
    supportedBrandTypes: ["nonprofit", "media", "personal"],
    signals: [
      "community",
      "impact",
      "cause",
      "mission",
      "topluluk",
      "fayda",
      "amaç",
    ],
  },
];

export function getPrinciplesForBrandType(
  brandType: BrandType,
): PrincipleDefinition[] {
  return principleRegistry.filter((principle) =>
    principle.supportedBrandTypes.includes(brandType),
  );
}
