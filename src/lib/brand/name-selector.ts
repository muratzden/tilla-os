type NameSelectionInput = {
  category?: string;
  collection?: {
    key: string;
    names: string[];
  };
  intent?: string;
  emotion?: string;
  dnaSignature?: string;
};

export function selectCollectionName(input: NameSelectionInput) {
  const names = input.collection?.names ?? [];

  if (!names.length) {
    return "Tilla Atelier Piece";
  }

  const category = input.category ?? "";
  const intent = input.intent ?? "";
  const emotion = input.emotion ?? "";
  const dnaSignature = input.dnaSignature ?? "";

  const signature = [category, intent, emotion, dnaSignature].join(":");

  const index = stableIndex(signature, names.length);

  return names[index];
}

function stableIndex(value: string, length: number) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % length;
}
