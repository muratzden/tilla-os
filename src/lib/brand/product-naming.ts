export function generateProductName(input: {
  category?: string;
  collectionNames?: string[];
}) {
  const names = input.collectionNames ?? [];

  if (!names.length) {
    return "Tilla Atelier Piece";
  }

  return names[0];
}
