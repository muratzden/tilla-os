import {
  ManifestoDraft,
  ManifestoValidationResult,
} from "./manifesto-builder-types";

import { validateManifesto } from "./manifesto-validator";

export type ManifestoBuilderResult = {
  draft: ManifestoDraft;
  validation: ManifestoValidationResult;
};

export function buildManifesto(draft: ManifestoDraft): ManifestoBuilderResult {
  const validation = validateManifesto(draft);

  return {
    draft,
    validation,
  };
}
