export type EvidenceReference = {
  answerId: string;
  excerpt: string;
};

export type SignalEvidence = {
  signalId: string;
  references: EvidenceReference[];
};
