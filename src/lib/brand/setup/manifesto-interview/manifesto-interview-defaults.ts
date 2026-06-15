import type { BrandType } from "../brand-type";
import type { ManifestoQuestion } from "./manifesto-interview-types";

export const manifestoInterviewQuestions: ManifestoQuestion[] = [
  {
    id: "product-purpose",
    brandType: "product",
    category: "purpose",
    question: "Why should this product brand exist?",
  },
  {
    id: "product-customer",
    brandType: "product",
    category: "customer",
    question:
      "Why should customers choose this product instead of alternatives?",
  },
  {
    id: "product-quality",
    brandType: "product",
    category: "quality",
    question: "What does quality mean for this product brand?",
  },
  {
    id: "product-principles",
    brandType: "product",
    category: "principles",
    question: "Which principle should never be sacrificed for more sales?",
  },
  {
    id: "product-forbidden",
    brandType: "product",
    category: "forbidden_direction",
    question: "What kind of product brand should this never become?",
  },
  {
    id: "product-legacy",
    brandType: "product",
    category: "legacy",
    question:
      "What should customers remember about this product after years of use?",
  },

  {
    id: "service-purpose",
    brandType: "service",
    category: "purpose",
    question: "Why should this service brand exist?",
  },
  {
    id: "service-customer",
    brandType: "service",
    category: "customer",
    question: "What problem should this service solve for customers?",
  },
  {
    id: "service-quality",
    brandType: "service",
    category: "quality",
    question: "What does excellent service mean for this brand?",
  },
  {
    id: "service-principles",
    brandType: "service",
    category: "principles",
    question: "Which principle should never be sacrificed to satisfy a client?",
  },
  {
    id: "service-forbidden",
    brandType: "service",
    category: "forbidden_direction",
    question: "What kind of service provider should this brand never become?",
  },
  {
    id: "service-legacy",
    brandType: "service",
    category: "legacy",
    question: "What should clients remember after working with this brand?",
  },

  {
    id: "personal-purpose",
    brandType: "personal",
    category: "purpose",
    question: "Why should people pay attention to this person?",
  },
  {
    id: "personal-customer",
    brandType: "personal",
    category: "customer",
    question: "Who should this personal brand speak to?",
  },
  {
    id: "personal-quality",
    brandType: "personal",
    category: "quality",
    question: "What makes this person's voice trustworthy?",
  },
  {
    id: "personal-principles",
    brandType: "personal",
    category: "principles",
    question: "Which belief should this personal brand never betray?",
  },
  {
    id: "personal-forbidden",
    brandType: "personal",
    category: "forbidden_direction",
    question: "What kind of public image should this personal brand avoid?",
  },
  {
    id: "personal-legacy",
    brandType: "personal",
    category: "legacy",
    question: "What should people remember this person for?",
  },

  {
    id: "media-purpose",
    brandType: "media",
    category: "purpose",
    question: "Why should this media brand exist?",
  },
  {
    id: "media-customer",
    brandType: "media",
    category: "customer",
    question: "Who is this media brand creating content for?",
  },
  {
    id: "media-quality",
    brandType: "media",
    category: "quality",
    question: "What makes this content worth consuming?",
  },
  {
    id: "media-principles",
    brandType: "media",
    category: "principles",
    question:
      "Which editorial principle should never be sacrificed for attention?",
  },
  {
    id: "media-forbidden",
    brandType: "media",
    category: "forbidden_direction",
    question: "What kind of content brand should this never become?",
  },
  {
    id: "media-legacy",
    brandType: "media",
    category: "legacy",
    question:
      "What should the audience remember after following this brand for years?",
  },

  {
    id: "software-purpose",
    brandType: "software",
    category: "purpose",
    question: "Why should this software brand exist?",
  },
  {
    id: "software-customer",
    brandType: "software",
    category: "customer",
    question: "What user problem should this software solve?",
  },
  {
    id: "software-quality",
    brandType: "software",
    category: "quality",
    question: "What does quality mean in the product experience?",
  },
  {
    id: "software-principles",
    brandType: "software",
    category: "principles",
    question: "Which principle should never be sacrificed for faster growth?",
  },
  {
    id: "software-forbidden",
    brandType: "software",
    category: "forbidden_direction",
    question: "What kind of software company should this never become?",
  },
  {
    id: "software-legacy",
    brandType: "software",
    category: "legacy",
    question:
      "What should users remember after relying on this software for years?",
  },
];

export function getManifestoQuestionsForBrandType(
  brandType: BrandType,
): ManifestoQuestion[] {
  return manifestoInterviewQuestions.filter(
    (question) => question.brandType === brandType,
  );
}
