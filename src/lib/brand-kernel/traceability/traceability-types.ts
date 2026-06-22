export type ManifestoTrace = {
  sentenceId: string;
  sentence: string;
  signalIds: string[];
};

export type TraceabilityReport = {
  traces: ManifestoTrace[];
};
