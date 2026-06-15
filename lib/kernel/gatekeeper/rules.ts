const forbiddenWords = [
  "cheap",
  "cheap leather",
  "mass production",
  "fast fashion",
  "low quality",
];

export function validateBrandText(text: string) {
  const normalized = text.toLowerCase();

  const violations = forbiddenWords.filter((word) => normalized.includes(word));

  return {
    approved: violations.length === 0,
    violations,
  };
}

export function validateGeneratedCopy(text: string) {
  const normalized = text.toLowerCase();

  const violations = forbiddenWords.filter((word) => normalized.includes(word));

  return {
    approved: violations.length === 0,
    violations,
  };
}
