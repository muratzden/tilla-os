export interface GovernanceReport {
  readinessScore: number;

  confidenceScore: number;

  coverageScore: number;

  contradictionCount: number;

  missingAreas: string[];

  approvedSignalCount: number;

  recommendations: string[];
}
