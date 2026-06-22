import type { CoverageReport } from "../coverage/coverage-types";
import type { KernelConfidenceReport } from "../confidence/confidence-types";
import type { MissingInformationReport } from "../missing-information/missing-information-types";
import type { ManifestoReadinessReport } from "../readiness/manifesto-readiness-types";

export type ManifestoGateReport = {
  coverage: CoverageReport;
  confidence: KernelConfidenceReport;
  readiness: ManifestoReadinessReport;
  missingInformation: MissingInformationReport;
};
