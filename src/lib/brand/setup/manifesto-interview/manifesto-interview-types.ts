import type { BrandType } from "../brand-type";

export type ManifestoQuestionCategory =
  | "purpose"
  | "customer"
  | "quality"
  | "principles"
  | "forbidden_direction"
  | "legacy";

export type ManifestoQuestion = {
  id: string;
  brandType: BrandType;
  category: ManifestoQuestionCategory;
  question: string;
};

export type ManifestoAnswer = {
  questionId: string;
  answer: string;
};

export type ManifestoInterview = {
  brandId: string;
  brandType: BrandType;
  answers: ManifestoAnswer[];
};
