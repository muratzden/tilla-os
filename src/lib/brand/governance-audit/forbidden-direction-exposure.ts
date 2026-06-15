import { forbiddenDirectionSignals } from "../constitution-governance/constitution-enforcement";

export function detectForbiddenDirectionExposure(
  content: string,
  forbiddenDirections: string[],
): string[] {
  const normalizedContent = content.toLowerCase();

  return forbiddenDirections.filter((direction) => {
    const normalizedDirection = direction.toLowerCase();

    const directMatch =
      normalizedContent.includes(normalizedDirection) ||
      normalizedContent.includes(normalizedDirection.replaceAll("_", " ")) ||
      normalizedContent.includes(normalizedDirection.replaceAll("_", "-"));

    const signalMatch =
      forbiddenDirectionSignals[normalizedDirection]?.some((signal) =>
        normalizedContent.includes(signal),
      ) ?? false;

    return directMatch || signalMatch;
  });
}
