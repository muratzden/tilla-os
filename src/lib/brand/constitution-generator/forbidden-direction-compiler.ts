export function compileForbiddenDirections(
  forbiddenDirections: string[],
): string[] {
  return [...new Set(forbiddenDirections)];
}
