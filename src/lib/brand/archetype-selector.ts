import { ArchetypeName } from "./archetype-registry";

export function selectArchetype(dna: any): {
  archetype: ArchetypeName;
  reasonKeys: string[];
} {
  const material = dna.material?.toLowerCase() || "";
  const color = dna.color?.toLowerCase() || "";
  const type = dna.type?.toLowerCase() || "";
  const category = dna.category?.toLowerCase() || "";

  const reasonKeys: string[] = [];

  const isBriefcase =
    type.includes("briefcase") ||
    type.includes("laptop") ||
    category.includes("briefcase");

  const isTravel =
    type.includes("travel") ||
    type.includes("duffle") ||
    type.includes("passport") ||
    category.includes("travel");

  const isCrossbody =
    type.includes("crossbody") ||
    type.includes("shoulder") ||
    type.includes("sling") ||
    category.includes("crossbody") ||
    category.includes("shoulder") ||
    category.includes("sling");

  const isWallet =
    type.includes("wallet") ||
    type.includes("cardholder") ||
    category.includes("wallet");

  if (material === "frisco" && color === "camel") {
    reasonKeys.push("archetype.reason.frisco_camel_warm_heritage");

    return {
      archetype: "warm_heritage",
      reasonKeys,
    };
  }

  if (material === "crazy_horse" && color === "black") {
    reasonKeys.push("archetype.reason.crazy_horse_black_quiet_power");

    return {
      archetype: "quiet_power",
      reasonKeys,
    };
  }

  if (isTravel) {
    reasonKeys.push("archetype.reason.travel_modern_nomad");

    return {
      archetype: "modern_nomad",
      reasonKeys,
    };
  }

  if (isCrossbody || material === "crazy" || material === "crazy_horse") {
    reasonKeys.push("archetype.reason.crossbody_modern_nomad");

    return {
      archetype: "modern_nomad",
      reasonKeys,
    };
  }

  if (
    isBriefcase &&
    color === "black" &&
    ["tiana", "smooth", "plain"].includes(material)
  ) {
    reasonKeys.push("archetype.reason.black_tiana_quiet_power");

    return {
      archetype: "quiet_power",
      reasonKeys,
    };
  }

  if (isBriefcase) {
    reasonKeys.push("archetype.reason.briefcase_warm_heritage");

    return {
      archetype: "warm_heritage",
      reasonKeys,
    };
  }

  if (isWallet) {
    reasonKeys.push("archetype.reason.wallet_quiet_luxury");

    return {
      archetype: "quiet_luxury",
      reasonKeys,
    };
  }

  reasonKeys.push("archetype.reason.default_warm_heritage");

  return {
    archetype: "warm_heritage",
    reasonKeys,
  };
}