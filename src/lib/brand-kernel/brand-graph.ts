export interface GraphNode {
  confidence: number;
  signals: string[];
  summary: string;
}

export interface BrandGraph {
  identity: GraphNode;

  audience: GraphNode;

  transformation: GraphNode;

  positioning: GraphNode;

  beliefs: GraphNode;

  tensions: GraphNode;

  differentiators: GraphNode;

  trustSignals: GraphNode;

  objectives: GraphNode;

  growth: GraphNode;

  constraints: GraphNode;

  overallConfidence: number;
}