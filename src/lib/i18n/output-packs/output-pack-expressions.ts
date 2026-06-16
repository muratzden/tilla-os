import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getOutputPack } from "./get-output-pack";

type ExpressionGroup =
  | "materials"
  | "colors"
  | "productTypes"
  | "channels"
  | "environments"
  | "emotions";

function getExpressionLabel(
  language: OutputLanguage,
  group: ExpressionGroup,
  key: string,
): string {
  const pack = getOutputPack(language);

  return pack.expressions[group][key]?.label ?? key;
}

function getExpressionDescription(
  language: OutputLanguage,
  group: ExpressionGroup,
  key: string,
): string {
  const pack = getOutputPack(language);

  return pack.expressions[group][key]?.description ?? "";
}

export function getMaterialExpression(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionLabel(language, "materials", key);
}

export function getColorExpression(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionLabel(language, "colors", key);
}

export function getProductTypeExpression(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionLabel(language, "productTypes", key);
}

export function getChannelExpression(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionLabel(language, "channels", key);
}

export function getEnvironmentExpression(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionLabel(language, "environments", key);
}

export function getEmotionExpression(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionLabel(language, "emotions", key);
}

export function getMaterialExpressionDescription(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionDescription(language, "materials", key);
}

export function getColorExpressionDescription(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionDescription(language, "colors", key);
}

export function getProductTypeExpressionDescription(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionDescription(language, "productTypes", key);
}

export function getChannelExpressionDescription(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionDescription(language, "channels", key);
}

export function getEnvironmentExpressionDescription(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionDescription(language, "environments", key);
}

export function getEmotionExpressionDescription(
  language: OutputLanguage,
  key: string,
): string {
  return getExpressionDescription(language, "emotions", key);
}
