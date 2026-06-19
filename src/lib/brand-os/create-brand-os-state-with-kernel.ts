import type { BrandOperatingState } from "@/src/core/brand-os/types";
import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";
import { runBrandKernel } from "@/src/lib/brand-kernel/brand-kernel";

import { createBrandOSStateFromBrandSetup } from "./brand-setup-to-brand-os-state";
import { extractFounderAnswersFromBrandSetup } from "./extract-founder-answers-from-brand-setup";

export async function createBrandOSStateWithKernel(
  brandSetup: BrandSetup,
): Promise<BrandOperatingState> {
  const rawAnswers = extractFounderAnswersFromBrandSetup(brandSetup);

  if (rawAnswers.length === 0) {
    return createBrandOSStateFromBrandSetup(brandSetup);
  }

  const kernelOutput = await runBrandKernel({
    rawAnswers,
  });

  return createBrandOSStateFromBrandSetup(
    brandSetup,
    kernelOutput.missionControlIntelligence,
  );
}