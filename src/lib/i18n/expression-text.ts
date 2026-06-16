import type { OutputLanguage } from "@/src/lib/i18n/language";
import {
  getColorExpression as getOutputPackColorExpression,
  getColorExpressionDescription,
  getMaterialExpression as getOutputPackMaterialExpression,
  getMaterialExpressionDescription,
  getProductTypeExpression as getOutputPackProductTypeExpression,
  getProductTypeExpressionDescription,
  getChannelExpression as getOutputPackChannelExpression,
  getChannelExpressionDescription,
  getEnvironmentExpression as getOutputPackEnvironmentExpression,
  getEnvironmentExpressionDescription,
  getEmotionExpression as getOutputPackEmotionExpression,
  getEmotionExpressionDescription,
} from "@/src/lib/i18n/output-packs";

export function getMaterialText(
  material: string,
  language: OutputLanguage,
): string {
  return getOutputPackMaterialExpression(language, material);
}

export function getMaterialDescription(
  material: string,
  language: OutputLanguage,
): string {
  return getMaterialExpressionDescription(language, material);
}

export function getColorText(color: string, language: OutputLanguage): string {
  return getOutputPackColorExpression(language, color);
}

export function getColorDescription(
  color: string,
  language: OutputLanguage,
): string {
  return getColorExpressionDescription(language, color);
}

export function getProductTypeText(
  productType: string,
  language: OutputLanguage,
): string {
  return getOutputPackProductTypeExpression(language, productType);
}

export function getProductTypeDescription(
  productType: string,
  language: OutputLanguage,
): string {
  return getProductTypeExpressionDescription(language, productType);
}

export function getChannelText(
  channel: string,
  language: OutputLanguage,
): string {
  return getOutputPackChannelExpression(language, channel);
}

export function getChannelDescription(
  channel: string,
  language: OutputLanguage,
): string {
  return getChannelExpressionDescription(language, channel);
}

export function getEnvironmentText(
  environment: string,
  language: OutputLanguage,
): string {
  return getOutputPackEnvironmentExpression(language, environment);
}

export function getEnvironmentDescription(
  environment: string,
  language: OutputLanguage,
): string {
  return getEnvironmentExpressionDescription(language, environment);
}

export function getEmotionText(
  emotion: string,
  language: OutputLanguage,
): string {
  return getOutputPackEmotionExpression(language, emotion);
}

export function getEmotionDescription(
  emotion: string,
  language: OutputLanguage,
): string {
  return getEmotionExpressionDescription(language, emotion);
}

/**
 * Legacy compatibility exports.
 * Old call order: getXExpression(key, language)
 */
export function getMaterialExpression(
  material: string,
  language: OutputLanguage,
): string {
  return getMaterialText(material, language);
}

export function getColorExpression(
  color: string,
  language: OutputLanguage,
): string {
  return getColorText(color, language);
}

export function getProductTypeExpression(
  productType: string,
  language: OutputLanguage,
): string {
  return getProductTypeText(productType, language);
}

export function getChannelExpression(
  channel: string,
  language: OutputLanguage,
): string {
  return getChannelText(channel, language);
}

export function getEnvironmentExpression(
  environment: string,
  language: OutputLanguage,
): string {
  return getEnvironmentText(environment, language);
}

export function getEmotionExpression(
  emotion: string,
  language: OutputLanguage,
): string {
  return getEmotionText(emotion, language);
}
