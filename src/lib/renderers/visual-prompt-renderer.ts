import { getOutputPack } from "@/src/lib/i18n/output-packs";
import { renderLanguage } from "./render-language";

type RenderInput = {
  assetBlueprint: any;
  scene: any;
  artDirection: any;
  world?: any;
  dnaInterpretation?: any;
};

function translate(dictionary: Record<string, string>, value?: string | null) {
  if (!value) return null;
  return dictionary[value] ?? value;
}

function translateList(
  dictionary: Record<string, string>,
  values?: string[] | null,
) {
  if (!Array.isArray(values)) return [];

  return values.map((value) => translate(dictionary, value)).filter(Boolean);
}

function getProductLabel(assetBlueprint: any) {
  return (
    assetBlueprint?.productType ??
    assetBlueprint?.type ??
    assetBlueprint?.product ??
    "leather product"
  );
}

function getMaterial(assetBlueprint: any) {
  return translate(renderLanguage.materials, assetBlueprint?.material);
}

function getColor(assetBlueprint: any) {
  return translate(renderLanguage.colors, assetBlueprint?.color);
}

function getPalette(scene: any, artDirection: any) {
  const palette = artDirection?.palette ?? scene?.palette ?? [];
  return translateList(renderLanguage.colors, palette);
}

function buildSection(title: string, lines: Array<string | null | undefined>) {
  const cleanLines = lines.filter(Boolean);

  if (!cleanLines.length) return null;

  return `${title}\n${cleanLines.join("\n")}`;
}

export function renderVisualPrompt({
  assetBlueprint,
  scene,
  artDirection,
  world,
  dnaInterpretation,
}: RenderInput) {
  if (assetBlueprint?.type !== "visual_prompt") {
    return null;
  }

  const outputPack = getOutputPack(assetBlueprint?.outputLanguage ?? "en");
  const sectionsText = outputPack.promptSections;
  const promptText = outputPack.visualPromptText;

  const product = getProductLabel(assetBlueprint);
  const material = getMaterial(assetBlueprint);
  const color = getColor(assetBlueprint);

  const environment = translate(
    renderLanguage.environments,
    world?.environment ??
      scene?.worldEnvironment ??
      artDirection?.worldEnvironment ??
      assetBlueprint?.environment,
  );

  const surface = translate(renderLanguage.surfaces, scene?.surface);

  const props = translateList(renderLanguage.props, scene?.props);

  const lighting = translate(
    renderLanguage.lighting,
    artDirection?.lighting ?? scene?.lighting,
  );

  const lightingDirection = translate(
    renderLanguage.directions,
    scene?.lightingDirection ?? artDirection?.lightingDirection,
  );

  const atmosphere = translate(
    renderLanguage.atmosphere,
    artDirection?.atmosphere,
  );

  const styling = translate(
    renderLanguage.styling,
    dnaInterpretation?.styling ?? artDirection?.styling,
  );

  const camera = translate(
    renderLanguage.cameras,
    scene?.camera ?? artDirection?.camera,
  );

  const lens = translate(
    renderLanguage.lenses,
    scene?.lens ?? artDirection?.lens,
  );

  const composition = translate(
    renderLanguage.composition,
    artDirection?.composition ?? scene?.composition,
  );

  const palette = getPalette(scene, artDirection);

  const sections = [
    buildSection(sectionsText.visualPrompt, [
      `${promptText.subject.premiumHandcraftedLeather} ${product}`,
      color && material ? `${color} ${material}` : (color ?? material),
      promptText.subject.honestArtisanPhotography,
    ]),

    buildSection(sectionsText.scene, [
      environment,
      surface ? `placed on ${surface}` : null,
      props.length ? `with ${props.join(", ")}` : null,
    ]),

    buildSection(sectionsText.material, [
      material,
      promptText.material.visibleNaturalGrain,
      promptText.material.subtleSurfaceVariation,
      promptText.material.controlledHandmadeCharacter,
      promptText.material.notFactoryPerfect,
    ]),

    buildSection(sectionsText.lighting, [
      lighting,
      lightingDirection,
      promptText.lighting.controlledShadows,
      promptText.lighting.softHighlightDiscipline,
    ]),

    buildSection(sectionsText.artDirection, [
      camera,
      lens,
      promptText.camera.realisticEditorialProductPhotography,
    ]),

    buildSection(sectionsText.composition, [
      composition,
      promptText.composition.premiumNegativeSpace,
      promptText.composition.quietLuxuryProductPlacement,
      palette.length
        ? `${promptText.composition.colorPalette}: ${palette.join(", ")}`
        : null,
    ]),

    buildSection(sectionsText.artDirection, [
      atmosphere,
      styling,
      promptText.atmosphere.earnedConfidence,
      promptText.atmosphere.calmEuropeanArtisanLuxury,
    ]),

    buildSection(promptText.microDetails.title, [
      promptText.microDetails.handStitching,
      promptText.microDetails.edgeBurnishing,
      promptText.microDetails.naturalLeatherVariation,
      promptText.microDetails.humanCraftEvidence,
      promptText.microDetails.intentionalImperfection,
      promptText.microDetails.materialTruth,
    ]),
  ].filter(Boolean);

  const positivePrompt = sections.join("\n\n");

  const negativePrompt = promptText.negativePrompt.join(", ");

  return {
    positivePrompt,
    negativePrompt,
  };
}
