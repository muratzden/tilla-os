import type {
  BrandConstitutionV2,
  BrandInterviewV2,
  BrandManifestoV2,
} from "./setup-v2-types";

export type MissionControlBaseline = {
  brandHealth: number;
  bottleneck: string;
  risk: string;
  opportunity: string;
  nextBestAction: string;
};

function scoreCompleteness(values: Array<string | string[] | undefined>): number {
  const filled = values.filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value && value.trim().length > 0);
  }).length;

  return Math.round((filled / values.length) * 100);
}

export function generateMissionControlBaseline(input: {
  interview: BrandInterviewV2;
  manifesto: BrandManifestoV2;
  constitution: BrandConstitutionV2;
}): MissionControlBaseline {
  const { interview, manifesto, constitution } = input;

  const interviewScore = scoreCompleteness([
    interview.identity,
    interview.purpose,
    interview.transformation,
    interview.audience,
    interview.principles,
    interview.ambition,
    interview.constraints,
  ]);

  const manifestoScore = scoreCompleteness([
    manifesto.identity,
    manifesto.mission,
    manifesto.transformation,
    manifesto.audience,
    manifesto.principles,
    manifesto.vision,
  ]);

  const constitutionScore = scoreCompleteness([
    constitution.reject,
    constitution.prefer,
    constitution.productRules,
    constitution.marketingRules,
    constitution.customerRules,
    constitution.growthRules,
    constitution.boundaries,
  ]);

  const brandHealth = Math.round(
    interviewScore * 0.35 + manifestoScore * 0.3 + constitutionScore * 0.35,
  );

  const bottleneck =
    constitutionScore < 70
      ? "The brand has direction, but its operating rules are not strong enough yet."
      : manifestoScore < 70
        ? "The brand foundation exists, but the manifesto is still too weak to guide decisions."
        : interviewScore < 70
          ? "The interview data is incomplete, so diagnosis quality is limited."
          : "The foundation is usable. The next bottleneck is execution consistency.";

  const risk =
    brandHealth < 50
      ? "The brand may make inconsistent product, marketing, or growth decisions because its foundation is incomplete."
      : brandHealth < 75
        ? "The brand may look aligned on paper but drift during execution."
        : "The main risk is not strategy. The main risk is failing to act consistently with the declared foundation.";

  const opportunity =
    brandHealth < 50
      ? "Clarify the brand foundation before making new offers, campaigns, or positioning moves."
      : brandHealth < 75
        ? "Turn the foundation into stricter decision rules and visible customer-facing actions."
        : "Use the foundation to create sharper campaigns, product choices, and content decisions.";

  const nextBestAction =
    constitutionScore < 70
      ? "Strengthen the constitution by adding clearer reject rules, growth rules, and boundaries."
      : manifestoScore < 70
        ? "Rewrite the manifesto into a clearer operating narrative before creating campaigns."
        : interviewScore < 70
          ? "Complete the missing interview sections before trusting the diagnosis."
          : "Validate one real upcoming decision against the constitution and turn the result into an execution task.";

  return {
    brandHealth,
    bottleneck,
    risk,
    opportunity,
    nextBestAction,
  };
}