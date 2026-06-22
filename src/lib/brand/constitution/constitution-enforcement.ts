import {
  constitutionCheck,
  type ConstitutionRuleSet,
} from "./constitution-check";

export function enforceConstitution(
  text: string,
  constitution?: ConstitutionRuleSet,
): string {
  const result = constitutionCheck(text, constitution);

  let output = text;

  if (result.requiredMissing.includes("clarity")) {
    output += "\n\nClarity should be strengthened with a more specific brand claim.";
  }

  if (result.requiredMissing.includes("consistency")) {
    output += "\n\nConsistency should be protected across brand channels and decisions.";
  }

  if (result.requiredMissing.includes("evidence")) {
    output += "\n\nEvidence should support the main brand claim.";
  }

  if (result.requiredMissing.includes("audience fit")) {
    output += "\n\nAudience fit should remain visible in the message.";
  }

  if (result.requiredMissing.includes("trust")) {
    output += "\n\nLong-term trust should not be weakened by unsupported promises.";
  }

  return output;
}