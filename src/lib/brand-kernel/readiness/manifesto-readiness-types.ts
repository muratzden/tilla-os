export type ManifestoReadinessStatus = "READY" | "NEED_MORE_INFORMATION";

export type ManifestoReadinessReport = {
  status: ManifestoReadinessStatus;
  confidenceScore: number;
  reasons: string[];
  missingInformation: string[];
};