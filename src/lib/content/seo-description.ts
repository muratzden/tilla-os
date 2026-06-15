export function generateSeoDescription(meaning: any, knowledge: any) {
  if (meaning.category === "briefcase") {
    return "El yapımı hakiki deri evrak çantası. Sade tasarım, doğal deri dokusu ve profesyonel kullanım için premium deri işçiliği.";
  }

  return `El yapımı hakiki deri ${meaning.category}. Tilla Leather Craft tarafından sade, zamansız ve premium kullanım için üretilmiştir.`;
}
