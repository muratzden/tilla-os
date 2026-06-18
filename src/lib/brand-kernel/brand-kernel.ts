import { extractSignals } from "./extraction-engine";
import { populateBrandGraph } from "./graph-population-engine";
import { discoverManifesto } from "./manifesto-discovery-engine";
import { runKernelMissionControl } from "./mission-control-engine";
import { generateConstitution } from "./constitution-generator";
import { KernelInput, KernelOutput } from "./kernel-types";
import { generateDecisionPolicies } from "./decision-policy-generator";


export async function runBrandKernel(
  input: KernelInput,
): Promise<KernelOutput> {
  const signals = await extractSignals(input.rawAnswers);

  const graph = populateBrandGraph(signals);

  const manifesto = discoverManifesto(signals);
  
  const constitution = generateConstitution(manifesto);
  
  const policies =
  generateDecisionPolicies(
    constitution,
  );
  
  const missionControl = runKernelMissionControl(graph);

  return {
    signals,
    graph,
    manifesto,
	constitution,
	policies,
    missionControl,
  };
}