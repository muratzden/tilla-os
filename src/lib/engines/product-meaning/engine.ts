export function productMeaningEngine(input: any) {
  return {
    category: inferCategory(input),
    intent: inferIntent(input),
    emotion: inferEmotion(input),
  };
}

function inferCategory(input: any) {
  return input?.type || "unknown_accessory";
}

function inferIntent(input: any) {
  return "artisan_premium_object";
}

function inferEmotion(input: any) {
  return "quiet_confidence";
}
