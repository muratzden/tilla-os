import { productMeaningEngine } from "./product-meaning/engine";
import { brandKnowledge } from "../brand/brand-knowledge";
import { dynamicScoringEngine } from "./dynamic-scoring";
import { brandPersonality } from "../brand/brand-personality";
import { brandGovernor } from "../brand/brand-governor";
import { addBrandMemoryRecord } from "../brand/memory/memory-store";
import { createBrandMemorySummary } from "../brand/memory/memory-engine";
import { calculateBrandConsistency } from "../brand/memory/consistency-engine";
import { createMemoryInsights } from "../brand/memory/memory-insights";
import { adaptToChannel } from "../brand/channel-adapter";
import { artDirectionEngine } from "../brand/art-direction";
import { promptGovernor } from "../brand/prompt-governor";
import { generateContent } from "../content/content-generator";
import { buildProductTitle } from "../brand/product-title";
import { collectionEngine } from "../brand/collection-engine";
import { selectCollectionName } from "../brand/name-selector";
import { productDNA } from "../brand/product-dna";
import { interpretDNA } from "../brand/dna-interpreter";
import { narrativeEngine } from "../brand/narrative-engine";
import { selectArchetype } from "../brand/archetype-selector";
import { composeScene } from "../brand/scene-composer";
import { worldComposer } from "../brand/world/world-composer";
import { intentComposer } from "../brand/intent/intent-composer";
import { worldExplorer } from "../brand/world/world-explorer";
import { assetComposer } from "../assets/asset-composer";
import { assetStrategy } from "../assets/asset-strategy";
import { renderVisualPrompt } from "../renderers/visual-prompt-renderer";
import type { AssetType } from "../assets/asset-types";
import { createRenderContext } from "../renderers/render-context";
import {
  createProductSignature,
  createDeterministicSeed,
} from "@/src/lib/brand/identity/signature-engine";
import { buildDecisionGraph } from "../brand/decision/decision-graph";
import { buildRejectedAlternatives } from "../brand/decision/rejected-alternatives";
import { brandAdvisor } from "../brand/advisor/brand-advisor";
import { reasoningEngine } from "../brand/decision/reasoning-engine";
import { decisionConfidence } from "../brand/decision/decision-confidence";
import { constitutionCheck } from "../brand/constitution/constitution-check";
import { enforceConstitution } from "../brand/constitution/constitution-enforcement";
import { getConstitutionInfluence } from "../brand/constitution/constitution-influence";

import { getLocalizedText } from "../i18n/get-localized-text";

import { buildConstitution } from "../brand/constitution/build-constitution";
import { defaultBrandSetup } from "../brand/setup/brand-setup-defaults";
import { runConstitutionGovernance } from "../brand/constitution-governance/governance-engine";
import { buildAdvisorV2 } from "../brand/advisor/advisor-v2";
import { getLanguageRuntime } from "@/src/lib/i18n/language-registry";
import { createLanguageConfig } from "../i18n/language-config";
import type { OutputLanguage } from "../i18n/language";


export function brandCore(input: any) {
  if (!input || typeof input !== "object") {
    return {
      success: false,
      error: "Invalid input",
    };
  }

const governanceBrandId = input.brandId ?? "tilla-leather";

const languageRuntime = getLanguageRuntime({
  brandId: governanceBrandId,
  uiLanguage: input.uiLanguage,
  requestedOutputLanguage: input.outputLanguage,
});

const outputLanguage = languageRuntime.activeOutputLanguage;
const outputPack = languageRuntime.output;

const languageConfig = createLanguageConfig(outputLanguage);

const uiLanguage = languageRuntime.meta.uiLanguage;

const contentLanguage = input.contentLanguage ?? outputLanguage;

const promptLanguage = input.promptLanguage ?? "en";

  const setup = defaultBrandSetup;

  const governanceConstitution = buildConstitution(governanceBrandId, setup);

  const decisionText = [
    input.type,
    input.material,
    input.color,
    input.size,
    input.channel,
  ]
    .filter(Boolean)
    .join(" ");

  const governance = runConstitutionGovernance({
    brandId: governanceBrandId,
    constitution: governanceConstitution,
    decisionText,
  });

  if (!governance.allowed) {
    return {
      success: false,
      blocked: true,
      reason: "constitution_governance_veto",
      brandContext: {
        brandId: governanceBrandId,
        uiLanguage,
        contentLanguage,
        promptLanguage,
      },
      constitution: governanceConstitution,
      governance,
    };
  }

  const dna = productDNA(input);
  const dnaInterpretation = interpretDNA({
    ...dna,
    outputLanguage,
  });

  const narrative = narrativeEngine({
    dnaInterpretation,
    outputLanguage,
  });

  const signature = createProductSignature({
    type: dna.category,
    material: dna.material,
    color: dna.color,
    size: dna.size,
  });

  const seed =
    typeof input.seed === "number"
      ? input.seed
      : createDeterministicSeed(signature, input.channel);

  const archetypeDecision = selectArchetype(dna);

  const meaning = productMeaningEngine(input);

  if (!meaning?.category) {
    return { success: false, error: "Meaning failed" };
  }

  const knowledge = brandKnowledge.getContext(meaning.category);

  if (!knowledge) {
    return { success: false, error: "Knowledge missing" };
  }

  const worldCandidates = worldExplorer(dna, archetypeDecision);

  const constitutionInfluence = getConstitutionInfluence(
    archetypeDecision?.archetype,
  );

  const adjustedWorldCandidates = worldCandidates
    .filter((candidate) => {
      return !constitutionInfluence.vetoWorlds.includes(candidate.key);
    })
    .map((candidate) => {
      const constitutionBonus =
        constitutionInfluence.worldBonuses[candidate.key] ?? 0;

      const constitutionPenalty =
        constitutionInfluence.worldPenalties[candidate.key] ?? 0;

      const constitutionReasons =
        constitutionInfluence.worldReasons[candidate.key]?.map((reason) =>
          getLocalizedText(reason, outputLanguage),
        ) ?? [];

      return {
        ...candidate,
        baseScore: candidate.score,
        constitutionBonus,
        constitutionPenalty,
        constitutionReasons,
        constitutionVetoed: false,
        score: candidate.score + constitutionBonus - constitutionPenalty,
      };
    });

  const constitutionRejectedWorlds = constitutionInfluence.vetoWorlds.map(
    (world) => ({
      world,
      reason: getLocalizedText(
        constitutionInfluence.vetoReasons?.[world],
        outputLanguage,
      ),
    }),
  );

  const world = worldComposer({
    dna,
    archetype: archetypeDecision,
    seed,
    channel: input.channel,
    selectedWorld: input.selectedWorld,
  });

  const scene = composeScene({
    dna,
    archetype: archetypeDecision,
    world,
    channel: input.channel,
    seed,
  });

  const decisionGraph = buildDecisionGraph({
    dna,
    archetype: archetypeDecision,
    worldCandidates: adjustedWorldCandidates,
    world,
    scene,
  });

  const legacyOutputLanguage = outputLanguage === "de" ? "en" : outputLanguage;

  const decisionIntelligence = reasoningEngine(
    adjustedWorldCandidates,
    legacyOutputLanguage,
  );

  const confidence = decisionConfidence({
    worldCandidates: adjustedWorldCandidates,
    decisionIntelligence,
    dna,
  });

  const brandAdvice = brandAdvisor({
  selectedWorld: decisionGraph.selectedWorld,
  decisionStrength: decisionIntelligence.decisionStrength,
  outputPack,
});

  const selectedCandidate = adjustedWorldCandidates[0];

  const rejectedAlternatives = buildRejectedAlternatives(
    adjustedWorldCandidates,
    selectedCandidate,
    legacyOutputLanguage,
  );

  const baseArtDirection = artDirectionEngine({
    meaning,
    knowledge,
    world,
    scene,
  });

  const artDirection = {
    ...baseArtDirection,
    styling: dnaInterpretation.styling,
    materialExpression: dnaInterpretation.materialExpression,
    colorExpression: dnaInterpretation.colorExpression,
  };

  const context = createRenderContext({
    dna,
    world,
    scene,
    artDirection,
  });

  const intent = intentComposer({
    channel: input.channel,
    productDNA: dna,
    archetype: archetypeDecision,
    world,
    scene,
  });

  const assetTypes = assetStrategy(intent);

  const selectedAssetType: AssetType =
    input.assetType ??
    assetTypes.find((type) => type === "visual_prompt") ??
    "visual_prompt";

  const assetBlueprint = assetComposer({
    assetType: selectedAssetType,
    dna,
    archetype: archetypeDecision,
    world,
    intent,
  });

  const visualPrompt = renderVisualPrompt({
    assetBlueprint,
    scene,
    artDirection,
    dnaInterpretation,
  });

  if (!visualPrompt) {
    return {
      success: false,
      error: `Renderer failed for asset type: ${assetBlueprint.type}`,
    };
  }

  const governedPrompt = promptGovernor({
    positivePrompt: visualPrompt.positivePrompt,
    negativePrompt: Array.isArray(visualPrompt.negativePrompt)
      ? visualPrompt.negativePrompt
      : [visualPrompt.negativePrompt],
  });

  const scoring = dynamicScoringEngine(meaning, knowledge);
  const top = scoring?.top;

  if (!top) {
    return { success: false, error: "Scoring failed" };
  }

  const personalityImpact = brandPersonality.evaluatePersonalityImpact({
    strategy: knowledge.positioning,
    context: knowledge.context,
    tone: { bias: knowledge.emotionBias },
  });

  const outputText =
    top.text ??
    createDecisionText({
      meaning,
      knowledge,
      top,
      outputLanguage,
    });

  const decision = {
    top,
    outputText,
    score: top.score ?? 0,
    personalityImpact,
  };

  const governed = brandGovernor({
    text: decision.outputText,
  });

  const collection = collectionEngine({
    category: meaning.category,
    positioning: knowledge.positioning,
    context: knowledge.context,
  });

  const productName = selectCollectionName({
    category: meaning.category,
    collection,
    intent: meaning.intent,
    emotion: meaning.emotion,
    dnaSignature: dna.signature,
  });

  const productTitle = buildProductTitle(productName, meaning.category);

  const adaptedText = adaptToChannel({
    text: governed.rewrittenText,
    channel: input.channel,
    category: meaning.category,
  });

  const finalDecision = {
    ...decision,
    outputText: adaptedText,
    brandScore: governed.score,
    violations: governed.violations,
  };

  const content = generateContent({
    productName,
    productTitle,
    outputLanguage,
    languageConfig,
    collection: {
      name: productName,
    },
    dna,
    dnaInterpretation,
    narrative,
    archetype: archetypeDecision,
    world,
    scene,
    artDirection,
    intent,
    assetBlueprint,
  });

  const finalContent = {
    ...content,
    productTitle,
  };

  content.productDescription = enforceConstitution(content.productDescription);

  content.instagramCaption = enforceConstitution(content.instagramCaption);

  content.seoDescription = enforceConstitution(content.seoDescription);

  const constitution = constitutionCheck(
    [
      visualPrompt?.positivePrompt,
      visualPrompt?.negativePrompt,
      content?.productDescription,
      content?.instagramCaption,
      content?.seoDescription,
      decision?.outputText,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const brandId =
    typeof input.brandId === "string" ? input.brandId : "tilla-leather";

  addBrandMemoryRecord({
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),

    brandId,

    productType: dna.category,
    material: dna.material,
    color: dna.color,
    size: dna.size,
    channel: input.channel,

    archetype: archetypeDecision?.archetype,
    selectedWorld: world?.worldKey,

    confidence: confidence?.confidence,
    confidenceLevel: confidence?.confidenceLevel,
    decisionMargin: undefined,
  });

  const memory = createBrandMemorySummary(brandId);

  const consistency = calculateBrandConsistency(memory.recentDecisions);

  const advisorV2 = buildAdvisorV2(
  {
    consistency,
    currentArchetype: archetypeDecision?.archetype,
    currentWorld: world?.worldKey,
  },
  outputPack
);

  const memoryInsights = createMemoryInsights(consistency);

  return {
    success: true,
    pipeline: {
      advisorV2,
      productName,
      productTitle,
      collection,
      dna,
      governance,
      identity: {
        signature,
        seed,
      },
      debug: {
        seed,
        archetype: archetypeDecision?.archetype,
        world: world?.worldKey,
        scene: scene?.sceneVariant,
        outputLanguage,
        languageConfig,
      },
      dnaInterpretation,
      narrative,
      archetype: archetypeDecision,
      worldExplorer: adjustedWorldCandidates,
      constitutionRejectedWorlds,
      world,
      scene,
      decisionGraph,
      decisionIntelligence,
      decisionConfidence: confidence,
      brandAdvice,
      rejectedAlternatives,
      meaning,
      knowledge,
      artDirection,
      assetStrategy: assetTypes,
      selectedAssetType,
      assetBlueprint,
      visualPrompt: {
        positivePrompt: governedPrompt.positivePrompt,
        negativePrompt: Array.isArray(governedPrompt.negativePrompt)
          ? governedPrompt.negativePrompt.join(", ")
          : governedPrompt.negativePrompt,
      },
      constitution,
      promptScore: governedPrompt.score,
      promptViolations: governedPrompt.violations,
      decision: finalDecision,
      content: finalContent,
      memory,
      consistency,
      memoryInsights,
    },
  };
}

function createDecisionText({
  meaning,
  knowledge,
  top,
  outputLanguage,
}: {
  meaning: any;
  knowledge: any;
  top: any;
  outputLanguage: OutputLanguage;
}) {
  const category = meaning.category;

  if (category === "briefcase") {
    return getLocalizedText(
      {
        tr: "El işçiliğiyle şekillenen bu deri evrak çantası, iş yaşamının sessiz güvenini taşır.",
        en: "This handcrafted leather briefcase carries the quiet confidence of professional life.",
      },
      outputLanguage,
    );
  }

  if (category === "bag") {
    return getLocalizedText(
      {
        tr: "Günlük ritme eşlik eden bu deri çanta, sade formu ve güçlü duruşuyla öne çıkar.",
        en: "This leather bag accompanies the rhythm of daily life with a calm form and strong presence.",
      },
      outputLanguage,
    );
  }

  if (category === "wallet") {
    return getLocalizedText(
      {
        tr: "Elde taşınan küçük bir nesne değil; zamanla karakter kazanan deri bir eşlikçi.",
        en: "Not just a small object carried by hand, but a leather companion that gains character over time.",
      },
      outputLanguage,
    );
  }

  return getLocalizedText(
    {
      tr: "El işçiliğiyle üretilen bu deri parça, sakin ve güçlü bir duruş taşır.",
      en: "This handcrafted leather piece carries a calm and confident presence.",
    },
    outputLanguage,
  );
}
