import type {
  LanguagePackValidationIssue,
  LanguagePackValidationResult,
} from "./marketplace-types";

const BROKEN_UTF8_PATTERNS = [
  "Ã¼",
  "Ãœ",
  "Ã¶",
  "Ã–",
  "Ã¤",
  "Ã„",
  "Ã§",
  "Ã‡",
  "Ä±",
  "Ä°",
  "ÅŸ",
  "Åž",
  "ÄŸ",
  "Äž",
];

function scanValue(
  value: unknown,
  path: string,
  issues: LanguagePackValidationIssue[]
) {
  if (typeof value === "string") {
    for (const pattern of BROKEN_UTF8_PATTERNS) {
      if (value.includes(pattern)) {
        issues.push({
          path,
          message: `Possible broken UTF-8 encoding detected: '${pattern}'`,
        });
      }
    }

    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      scanValue(item, `${path}[${index}]`, issues);
    });

    return;
  }

  if (value && typeof value === "object") {
    for (const [key, childValue] of Object.entries(value)) {
      scanValue(childValue, `${path}.${key}`, issues);
    }
  }
}

export function validateLanguagePackEncoding(
  pack: unknown
): LanguagePackValidationResult {
  const issues: LanguagePackValidationIssue[] = [];

  scanValue(pack, "$", issues);

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function assertValidLanguagePackEncoding(
  pack: unknown
) {
  const result = validateLanguagePackEncoding(pack);

  if (!result.valid) {
    throw new Error(
      result.issues
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join("\n")
    );
  }
}