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
      tr: "Zamanla karakter kazanan, sıcak ve dürüst bir deri ifadesi taşır. Frisco dokusunun doğal yüzeyi, kullanım izleriyle birlikte kişisel bir patinaya dönüşür.",
      en: "A warm and honest leather expression that gains character over time. The natural Frisco texture develops a personal patina through use.",
    },

    instagram: {
      tr: "Sıcak camel tonu, yumuşak Frisco dokusu ve zamanla oluşacak doğal karakter.",
      en: "Warm camel tones, soft Frisco texture and natural character that develops over time.",
    },

    seo: {
      tr: "El yapımı Frisco camel deri evrak çantası. Zamanla patina kazanan sıcak, karakterli ve premium deri tasarım.",
      en: "Handcrafted Frisco camel leather briefcase. A premium leather design that develops character and patina over time.",
    },
  },

  quiet_power: {
    description:
      "Sade ama güçlü bir duruş için tasarlandı. Siyah deri yüzey, gereksiz detaylardan arınmış kontrollü bir otorite hissi verir.",
    instagram:
      "Gösterişsiz güç. Siyah deri, net form ve kontrollü bir premium duruş.",
    seo: "El yapımı siyah deri evrak çantası. Minimal, güçlü ve profesyonel premium tasarım.",
  },

  quiet_luxury: {
    description:
      "Sessiz lüks anlayışıyla tasarlanmış, zamansız ve dengeli bir deri parça. Fazla konuşmaz; malzemesi, formu ve işçiliğiyle kendini gösterir.",
    instagram: "Sessiz lüks, doğal deri ve zamansız bir form.",
    seo: "El yapımı premium deri çanta. Zamansız tasarım, sessiz lüks ve zanaatkâr işçilik.",
  },
};

function resolveMoodLayer(archetypeHint?: string) {
  return moodLanguage[archetypeHint || ""] || moodLanguage.quiet_luxury;
}

export function generateContent(input: ContentInput) {
  const outputLanguage = input.outputLanguage ?? "tr";

  const contentLanguage =
    input.languageConfig?.contentLanguage ?? outputLanguage;

  const productName = input.productName || "Tilla";
  const productTitle = input.productTitle || `${productName} Leather Piece`;

  const dna = input.dna || {};
  const interpretation = input.dnaInterpretation || {};
  const narrative = input.narrative || {};
  const world = input.world || {};

  const moodLayer = resolveMoodLayer(interpretation.archetypeHint);

  const worldLine = world.environment ? worldNarrator(world) : "";

  const materialExpression =
    interpretation.materialExpression || `${dna.material || "leather"} texture`;

  const colorExpression =
    interpretation.colorExpression || `${dna.color || "natural"} leather tone`;

  const productDescription = `
${productTitle}

${narrative.productLanguage?.opening || moodLayer.description}

${narrative.productLanguage?.material || ""}

${narrative.productLanguage?.emotion || ""}

`.trim();

  const instagramCaption = `${productTitle}

${narrative.productLanguage?.opening || getLocalizedText(moodLayer.instagram, contentLanguage)}

${narrative.productLanguage?.emotion || ""}

${getLocalizedText(
  {
    tr: `Malzeme: ${materialExpression}`,
    en: `Material: ${materialExpression}`,
  },
  contentLanguage,
)}

${getLocalizedText(
  {
    tr: `Renk: ${colorExpression}`,
    en: `Color: ${colorExpression}`,
  },
  contentLanguage,
)}

#TillaLeather #HandmadeLeather #LeatherCraft #QuietLuxury`;

  const seoDescription = `
${productTitle}.

${narrative.productLanguage?.opening || getLocalizedText(moodLayer.seo, contentLanguage)}

${narrative.productLanguage?.emotion || ""}

${getLocalizedText(
  {
    tr: "Tilla Leather Craft atölyesinde el yapımı olarak üretilmiştir.",
    en: "Handcrafted in the Tilla Leather Craft workshop.",
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
