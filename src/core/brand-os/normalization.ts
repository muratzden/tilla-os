import type {
  AudienceProfile,
  AuthorityProfile,
  BrandOSUpdateInput,
  BrandSeedInput,
  ChannelProfile,
  GrowthProfile,
  OfferProfile,
  PositioningProfile,
  TrustProfile,
} from "./types";

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeNullableText(
  value: string | null | undefined,
): string | null {
  if (typeof value !== "string") return null;

  const normalized = normalizeText(value);
  return normalized.length > 0 ? normalized : null;
}

function normalizeArray(value: string[] | undefined): string[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const item of value) {
    if (typeof item !== "string") continue;

    const text = normalizeText(item);
    const key = text.toLocaleLowerCase();

    if (text.length > 0 && !seen.has(key)) {
      seen.add(key);
      normalized.push(text);
    }
  }

  return normalized;
}

function normalizePartialAudience(
  input: Partial<AudienceProfile>,
): Partial<AudienceProfile> {
  return {
    ...(input.primary !== undefined
      ? { primary: normalizeNullableText(input.primary) }
      : {}),
    ...(input.needs !== undefined
      ? { needs: normalizeArray(input.needs) }
      : {}),
    ...(input.barriers !== undefined
      ? { barriers: normalizeArray(input.barriers) }
      : {}),
    ...(input.desiredOutcome !== undefined
      ? { desiredOutcome: normalizeNullableText(input.desiredOutcome) }
      : {}),
  };
}

function normalizePartialPositioning(
  input: Partial<PositioningProfile>,
): Partial<PositioningProfile> {
  return {
    ...(input.category !== undefined
      ? { category: normalizeNullableText(input.category) }
      : {}),
    ...(input.promise !== undefined
      ? { promise: normalizeNullableText(input.promise) }
      : {}),
    ...(input.differentiators !== undefined
      ? { differentiators: normalizeArray(input.differentiators) }
      : {}),
    ...(input.proofPoints !== undefined
      ? { proofPoints: normalizeArray(input.proofPoints) }
      : {}),
  };
}

function normalizePartialTrust(
  input: Partial<TrustProfile>,
): Partial<TrustProfile> {
  return {
    ...(input.signals !== undefined
      ? { signals: normalizeArray(input.signals) }
      : {}),
    ...(input.gaps !== undefined ? { gaps: normalizeArray(input.gaps) } : {}),
  };
}

function normalizePartialAuthority(
  input: Partial<AuthorityProfile>,
): Partial<AuthorityProfile> {
  return {
    ...(input.themes !== undefined
      ? { themes: normalizeArray(input.themes) }
      : {}),
    ...(input.evidence !== undefined
      ? { evidence: normalizeArray(input.evidence) }
      : {}),
    ...(input.gaps !== undefined ? { gaps: normalizeArray(input.gaps) } : {}),
  };
}

function normalizePartialOffer(
  input: Partial<OfferProfile>,
): Partial<OfferProfile> {
  return {
    ...(input.core !== undefined
      ? { core: normalizeNullableText(input.core) }
      : {}),
    ...(input.outcomes !== undefined
      ? { outcomes: normalizeArray(input.outcomes) }
      : {}),
    ...(input.constraints !== undefined
      ? { constraints: normalizeArray(input.constraints) }
      : {}),
  };
}

function normalizePartialChannels(
  input: Partial<ChannelProfile>,
): Partial<ChannelProfile> {
  return {
    ...(input.primary !== undefined
      ? { primary: normalizeArray(input.primary) }
      : {}),
    ...(input.secondary !== undefined
      ? { secondary: normalizeArray(input.secondary) }
      : {}),
    ...(input.experiments !== undefined
      ? { experiments: normalizeArray(input.experiments) }
      : {}),
  };
}

function normalizePartialGrowth(
  input: Partial<GrowthProfile>,
): Partial<GrowthProfile> {
  return {
    ...(input.objectives !== undefined
      ? { objectives: normalizeArray(input.objectives) }
      : {}),
    ...(input.loops !== undefined
      ? { loops: normalizeArray(input.loops) }
      : {}),
    ...(input.constraints !== undefined
      ? { constraints: normalizeArray(input.constraints) }
      : {}),
  };
}

export function normalizeBrandOSInput(input: BrandSeedInput): BrandSeedInput {
  return {
    idea: normalizeText(input.idea),
    brandType: normalizeText(input.brandType),
  };
}

export function normalizeBrandOSUpdate(
  input: BrandOSUpdateInput,
): BrandOSUpdateInput {
  return {
    ...(input.audience
      ? { audience: normalizePartialAudience(input.audience) }
      : {}),
    ...(input.positioning
      ? { positioning: normalizePartialPositioning(input.positioning) }
      : {}),
    ...(input.trust ? { trust: normalizePartialTrust(input.trust) } : {}),
    ...(input.authority
      ? { authority: normalizePartialAuthority(input.authority) }
      : {}),
    ...(input.offer ? { offer: normalizePartialOffer(input.offer) } : {}),
    ...(input.channels
      ? { channels: normalizePartialChannels(input.channels) }
      : {}),
    ...(input.growth ? { growth: normalizePartialGrowth(input.growth) } : {}),
  };
}
