import { constitutionCheck } from "./constitution-check";

export function enforceConstitution(text: string): string {
  const result = constitutionCheck(text);

  let output = text;

  if (result.requiredMissing.includes("controlled variation")) {
    output += "\n\ncontrolled variation is part of the product character";
  }

  if (result.requiredMissing.includes("individuality")) {
    output += "\n\nindividuality emerges through human craft";
  }

  if (result.requiredMissing.includes("longevity")) {
    output += "\n\nlongevity is part of the product promise";
  }

  if (result.requiredMissing.includes("ownership")) {
    output +=
      "\n\nownership begins when the product starts living with its owner";
  }

  return output;
}
