import { worldNarrator } from "../brand/world/world-narrator";
import type { OutputLanguage } from "../i18n/language";
import { getLocalizedText } from "../i18n/get-localized-text";
import type { LanguageConfig } from "../i18n/language-config";

type ContentInput = {
  productName?: string;
  productTitle?: string;
  outputLanguage?: OutputLanguage;
  languageConfig?: LanguageConfig;
  narrative?: any;
  collection?: {
    name?: string;
  };
  dna?: {
    category?: string;
    material?: string;
    color?: string;
    size?: string;
  };
  dnaInterpretation?: {
    archetypeHint?: string;
    emotionalTone?: string;
    styling?: string;
    materialExpression?: string;
    colorExpression?: string;
  };
  archetype?: any;
  world?: any;
  scene?: any;
  artDirection?: any;
  intent?: any;
  assetBlueprint?: any;
};

const moodLanguage: Record<string, any> = {
  warm_heritage: {
    description: {
      tr: "Köklü değerleri, güven veren bir duruş ve tutarlı bir marka anlatımıyla birleştirir.",
      en: "Combines grounded values with a trusted presence and consistent brand narrative.",
    },
    instagram: {
      tr: "Köklü değerler, net duruş ve tutarlı bir marka anlatımı.",
      en: "Grounded values, clear presence and consistent brand narrative.",
    },
    seo: {
      tr: "Güven, süreklilik ve net konumlandırma üzerine kurulu marka içeriği.",
      en: "Brand content built around trust, continuity and clear positioning.",
    },
  },

  quiet_power: {
    description: {
      tr: "Sade, kontrollü ve net bir duruşla marka kararını görünür kılar.",
      en: "Makes the brand decision visible through a clear, controlled and focused presence.",
    },
    instagram: {
      tr: "Net duruş. Kontrollü ifade. Güven veren marka kararı.",
      en: "Clear presence. Controlled expression. A brand decision that builds trust.",
    },
    seo: {
      tr: "Net konumlandırma, kontrollü ifade ve güven veren marka iletişimi.",
      en: "Clear positioning, controlled expression and trusted brand communication.",
    },
  },

  quiet_luxury: {
    description: {
      tr: "Abartıya kaçmadan değer, güven ve tutarlı marka algısı üretir.",
      en: "Creates value, trust and consistent brand perception without relying on exaggeration.",
    },
    instagram: {
      tr: "Sakin ifade, net değer ve tutarlı marka algısı.",
      en: "Calm expression, clear value and consistent brand perception.",
    },
    seo: {
      tr: "Sade, güvenilir ve uzun vadeli marka algısını destekleyen içerik.",
      en: "Simple, trusted content that supports long-term brand perception.",
    },
  },
};

function resolveMoodLayer(archetypeHint?: string) {
  return moodLanguage[archetypeHint || ""] || moodLanguage.quiet_luxury;
}

function createHashtags(input: ContentInput) {
  const category = input.dna?.category
    ? String(input.dna.category).replace(/[^a-zA-Z0-9]/g, "")
    : "Brand";

  return [`#${category}`, "#BrandStrategy", "#BrandConsistency"]
    .filter(Boolean)
    .join(" ");
}

export function generateContent(input: ContentInput) {
  const outputLanguage = input.outputLanguage ?? "en";

  const contentLanguage =
    input.languageConfig?.contentLanguage ?? outputLanguage;

  const productName = input.productName || "Brand Offer";
  const productTitle = input.productTitle || `${productName} Brand Asset`;

  const dna = input.dna || {};
  const interpretation = input.dnaInterpretation || {};
  const narrative = input.narrative || {};
  const world = input.world || {};

  const moodLayer = resolveMoodLayer(interpretation.archetypeHint);

  const worldLine = world.environment ? worldNarrator(world) : "";

  const materialExpression =
    interpretation.materialExpression ||
    String(dna.material || "primary proof point");

  const colorExpression =
    interpretation.colorExpression ||
    String(dna.color || "brand expression");

  const opening =
    narrative.productLanguage?.opening ||
    getLocalizedText(moodLayer.description, contentLanguage);

  const productDescription = `
${productTitle}

${opening}

${narrative.productLanguage?.material || ""}

${narrative.productLanguage?.emotion || ""}

${worldLine}
`.trim();

  const instagramCaption = `${productTitle}

${narrative.productLanguage?.opening || getLocalizedText(moodLayer.instagram, contentLanguage)}

${narrative.productLanguage?.emotion || ""}

${getLocalizedText(
  {
    tr: `Kanıt: ${materialExpression}`,
    en: `Proof: ${materialExpression}`,
  },
  contentLanguage,
)}

${getLocalizedText(
  {
    tr: `İfade: ${colorExpression}`,
    en: `Expression: ${colorExpression}`,
  },
  contentLanguage,
)}

${createHashtags(input)}`;

  const seoDescription = `
${productTitle}.

${narrative.productLanguage?.opening || getLocalizedText(moodLayer.seo, contentLanguage)}

${narrative.productLanguage?.emotion || ""}

${getLocalizedText(
  {
    tr: "Bu içerik marka konumlandırması, güven ve tutarlılık ilkelerine göre oluşturulmuştur.",
    en: "This content is generated according to brand positioning, trust and consistency principles.",
  },
  contentLanguage,
)}
`.trim();

  return {
    productDescription,
    instagramCaption,
    seoDescription,
    productTitle,
    intent: input.intent,
    assetBlueprint: input.assetBlueprint,
  };
}