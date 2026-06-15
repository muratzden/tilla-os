export type BrandChannel = "web" | "product" | "instagram" | "packaging";

type ChannelInput = {
  text: string;
  channel?: BrandChannel;
  category?: string;
};

export function adaptToChannel(input: ChannelInput) {
  const channel = input.channel ?? "web";
  const category = input.category ?? "parça";

  switch (channel) {
    case "instagram":
      return adaptInstagram(input.text, category);

    case "packaging":
      return adaptPackaging(category);

    case "product":
      return adaptProduct(input.text);

    case "web":
    default:
      return input.text;
  }
}

function adaptInstagram(text: string, category: string) {
  if (category === "briefcase") {
    return "Sessiz güven. El işçiliği deri evrak çantasında.";
  }

  return shorten(text);
}

function adaptPackaging(category: string) {
  if (category === "briefcase") {
    return "Zamanla karakter kazanan bir parça.";
  }

  return "Zamanla güzelleşen bir deri parça.";
}

function adaptProduct(text: string) {
  return text;
}

function shorten(text: string) {
  return text
    .replace("El işçiliğiyle şekillenen bu ", "")
    .replace("iş yaşamının sessiz güvenini taşır.", "sessiz güven taşır.")
    .trim();
}
