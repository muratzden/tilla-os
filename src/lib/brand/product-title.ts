const categoryLabels: Record<string, string> = {
  briefcase: "Briefcase",
  laptop_bag: "Laptop Bag",
  wallet: "Wallet",
  cardholder: "Card Holder",
  card_holder: "Card Holder",
  belt: "Belt",
  tote: "Tote Bag",
  guitar_strap: "Guitar Strap",
  accessory: "Atelier Piece",
};

export function buildProductTitle(productName: string, category?: string) {
  const label = category ? categoryLabels[category] : undefined;

  if (!label) {
    return productName;
  }

  return `${productName} ${label}`;
}
