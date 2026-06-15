export function generateProductTitle(meaning: any) {
  if (meaning.category === "briefcase") {
    return "Yuuga Leather Briefcase";
  }

  if (meaning.category === "wallet") {
    return "Tilla Leather Wallet";
  }

  if (meaning.category === "bag") {
    return "Tilla Leather Bag";
  }

  return "Tilla Leather Piece";
}
