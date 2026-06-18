import { runBrandKernel } from "../src/lib/brand-kernel/brand-kernel";

import { auditDecisionAgainstPolicies } from "../src/lib/brand-kernel/decision-audit-engine";

import { generateDecisionCorrection } from "../src/lib/brand-kernel/correction-engine";

async function main() {
  const result = await runBrandKernel({
    rawAnswers: [
      "We make handmade products with long-term quality.",
      "Our customers trust us because we focus on durable materials.",
      "We want to grow without becoming a cheap mass product.",
      "Our biggest challenge is explaining why premium quality matters.",
    ],
  });

  const decision =
    "Use fake scarcity and urgent discounts to sell faster.";

  const audit = auditDecisionAgainstPolicies(
    decision,
    result.policies,
  );

  const correction = generateDecisionCorrection(
    decision,
    audit,
  );

  console.log(
    JSON.stringify(
      {
        ...result,
        audit,
        correction,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});