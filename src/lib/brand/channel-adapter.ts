export type BrandChannel = "web" | "product" | "instagram" | "packaging";

type ChannelInput = {
  text: string;
  channel?: BrandChannel;
  category?: string;
};

export function adaptToChannel(input: ChannelInput) {
  const channel = input.channel ?? "web";

  switch (channel) {
    case "instagram":
      return adaptInstagram(input.text);

    case "packaging":
      return adaptPackaging(input.text);

    case "product":
      return adaptProduct(input.text);

    case "web":
    default:
      return input.text;
  }
}

function adaptInstagram(text: string) {
  return shorten(text);
}

function adaptPackaging(text: string) {
  return shorten(text);
}

function adaptProduct(text: string) {
  return text;
}

function shorten(text: string) {
  return text.replace(/\s+/g, " ").trim();
}
