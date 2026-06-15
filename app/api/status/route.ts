import { getMemory } from "@/lib/kernel/memory/store";
import { getBrandProfile } from "@/lib/kernel/memory/brand";

export async function GET() {
  const memory = getMemory();
  const brand = getBrandProfile();

  return Response.json({
    kernel: "active",
    brand: brand.brand,
    memoryRecords: memory.length,
    modules: {
      decisionEngine: true,
      memory: true,
      brandKnowledge: true,
      productIntelligence: true,
      gatekeeper: true,
      contentEngine: true,
      copyEngine: true,
    },
  });
}
