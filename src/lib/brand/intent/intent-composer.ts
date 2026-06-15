import { intentRegistry, IntentChannel } from "./intent-registry";

type IntentComposerInput = {
  channel?: IntentChannel | string;
  productDNA?: any;
  archetype?: any;
  world?: any;
  scene?: any;
};

export function intentComposer(input: IntentComposerInput) {
  const channel = input.channel || "product_page";

  const baseIntent =
    intentRegistry[channel as IntentChannel] || intentRegistry.product_page;

  return {
    channel,
    ...baseIntent,
    archetypeHint: input.archetype?.archetype || input.scene?.archetype,
    worldEnvironment: input.world?.environment,
    emotionalTone: input.scene?.emotionalTone,
  };
}
