export function classifyProduct(title: string) {
  const text = title.toLowerCase();

  if (text.includes("wallet")) {
    return "wallet";
  }

  if (text.includes("card")) {
    return "cardholder";
  }

  if (text.includes("briefcase")) {
    return "briefcase";
  }

  if (text.includes("laptop")) {
    return "briefcase";
  }

  if (text.includes("strap")) {
    return "guitar_strap";
  }

  if (text.includes("belt")) {
    return "belt";
  }

  return "unknown";
}
