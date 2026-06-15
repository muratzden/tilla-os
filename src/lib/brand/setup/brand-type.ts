export type BrandType =
  | "product"
  | "service"
  | "personal"
  | "media"
  | "software"
  | "hospitality"
  | "nonprofit";

export type BrandTypeDefinition = {
  type: BrandType;
  label: string;
  description: string;
};

export const brandTypeDefinitions: BrandTypeDefinition[] = [
  {
    type: "product",
    label: "Product Brand",
    description: "A brand built around physical or digital products.",
  },
  {
    type: "service",
    label: "Service Brand",
    description:
      "A brand built around expertise, delivery, trust and client outcomes.",
  },
  {
    type: "personal",
    label: "Personal Brand",
    description:
      "A brand built around a person, reputation, voice and point of view.",
  },
  {
    type: "media",
    label: "Media Brand",
    description:
      "A brand built around content, audience, storytelling and attention.",
  },
  {
    type: "software",
    label: "Software Brand",
    description: "A brand built around software, platforms, systems or tools.",
  },
  {
    type: "hospitality",
    label: "Hospitality Brand",
    description:
      "A brand built around experience, place, service and atmosphere.",
  },
  {
    type: "nonprofit",
    label: "Nonprofit Brand",
    description:
      "A brand built around mission, public value, advocacy or social impact.",
  },
];

export function getBrandTypeDefinition(type: BrandType): BrandTypeDefinition {
  const definition = brandTypeDefinitions.find((item) => item.type === type);

  if (!definition) {
    return brandTypeDefinitions[0];
  }

  return definition;
}
