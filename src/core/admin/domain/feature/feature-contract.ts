import type {
  AdminFeatureFlag,
  AdminFeatureFlagAssignment,
} from "../../domain/feature/feature-types";

export interface FeatureContract {
  listFeatures(): Promise<AdminFeatureFlag[]>;

  assignFeature(
    assignment: AdminFeatureFlagAssignment,
  ): Promise<void>;
}