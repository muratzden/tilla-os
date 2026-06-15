import { checkBrandConstitution } from "./brand-constitution";

const replacementMap: Record<string, string> = {
  "perfect craftsmanship": "carefully guided handcraft",
  "flawless stitching": "stitching shaped by the human hand",
  "luxury appearance": "quiet material presence",
  "perfect leather": "natural leather character",
  "flawless leather": "leather with natural variation",
  "defect-free production": "carefully controlled craftsmanship",
  "highest quality": "made with attention and restraint",
  "premium look": "timeless visual character",
};

export function brandGovernor({ text }: { text: string; context?: any }) {
  if (!text) {
    return {
      approved: false,
      rewrittenText: "",
      score: 0,
      violations: ["empty_text"],
      stage: "brand_governor",
    };
  }

  const violations: string[] = [];
  let output = text;

  for (const [forbidden, replacement] of Object.entries(replacementMap)) {
    if (output.toLowerCase().includes(forbidden.toLowerCase())) {
      violations.push(`rewritten:${forbidden}`);
      output = output.replace(new RegExp(forbidden, "gi"), replacement);
    }
  }

  const forbiddenWords = [
    "amazing",
    "best",
    "perfect",
    "discount",
    "cheap",
    "buy now",
    "limited time",
    "kaçırmayın",
    "hemen alın",
    "şimdi satın alın",
  ];

  for (const word of forbiddenWords) {
    if (output.toLowerCase().includes(word.toLowerCase())) {
      violations.push(`forbidden:${word}`);
      output = output.replace(new RegExp(word, "gi"), "");
    }
  }

  if (output.includes("!")) {
    violations.push("excessive_excitement");
    output = output.replace(/!/g, ".");
  }

  output = output.replace(/\s+/g, " ").trim();

  const constitutionCheck = checkBrandConstitution(output);

  if (!constitutionCheck.approved) {
    violations.push(
      ...constitutionCheck.violations.map(
        (violation) => `constitution:${violation}`,
      ),
    );
  }

  let score = 100 - violations.length * 10;
  if (score < 0) score = 0;

  return {
    approved: constitutionCheck.approved,
    rewrittenText: output,
    score,
    violations,
    constitution: constitutionCheck,
    stage: "brand_governor",
  };
}
