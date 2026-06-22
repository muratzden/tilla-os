import { runBrandKernel } from "./brand-kernel";

export async function runKernelDecision(input: any) {
  const rawAnswers = [
    input.type,
    input.material,
    input.color,
    input.size,
    input.channel,
  ].filter((value): value is string => Boolean(value));

  const kernel = await runBrandKernel({
    rawAnswers,
  });

  return {
    success: true,
    kernel,
    missionControl: kernel.missionControl,
  };
}