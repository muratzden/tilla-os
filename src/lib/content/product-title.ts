export function generateProductTitle(meaning: any) {
  const category = String(meaning?.category ?? "offer")
    .replace(/[_-]+/g, " ")
    .trim();

  const normalizedCategory = category.length > 0 ? category : "offer";

  return `${toTitleCase(normalizedCategory)} Brand Asset`;
}

function toTitleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}
