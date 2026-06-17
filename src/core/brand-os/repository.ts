import {
  acceptDecision,
  applyBrandInput,
  completeStudioStep,
  initializeBrandOS,
  recalculateBrandOS,
  recordDecisionOutcome,
  recordObservation
} from "./state-engine";
import { migrateBrandOSState } from "./schema";
import { validateBrandOperatingState } from "./state-validation";
import type { BrandOSStorageAdapter } from "./storage-adapter";
import type {
  BrandOSFailure,
  BrandOSRepositoryResult,
  BrandOSUpdateInput,
  DecisionImpact,
  BrandSeedInput,
  StateChangeResult,
  StudioId
} from "./types";

export interface WorkspaceObservationPayload {
  observation: string;
  source?: string;
}

export interface WorkspaceDecisionOutcomePayload {
  decisionId: string;
  status: "in_progress" | "validated" | "failed" | "cancelled";
  evidence?: string;
  actualImpact?: DecisionImpact;
}

export interface WorkspaceStudioStepPayload {
  studioId: StudioId;
  output: BrandOSUpdateInput;
}

export interface BrandOSRepository {
  getWorkspaceState(workspaceId: string): Promise<BrandOSRepositoryResult>;
  initializeWorkspaceState(workspaceId: string, input: BrandSeedInput): Promise<BrandOSRepositoryResult>;
  applyWorkspaceInput(workspaceId: string, payload: BrandOSUpdateInput): Promise<BrandOSRepositoryResult>;
  completeWorkspaceStudioStep(workspaceId: string, payload: WorkspaceStudioStepPayload): Promise<BrandOSRepositoryResult>;
  acceptWorkspaceDecision(workspaceId: string, decisionId: string, selectedOptionId?: string): Promise<BrandOSRepositoryResult>;
  recordWorkspaceDecisionOutcome(workspaceId: string, payload: WorkspaceDecisionOutcomePayload): Promise<BrandOSRepositoryResult>;
  recordWorkspaceObservation(workspaceId: string, payload: WorkspaceObservationPayload): Promise<BrandOSRepositoryResult>;
  recalculateWorkspaceState(workspaceId: string): Promise<BrandOSRepositoryResult>;
}

function fail(error: string, errors?: BrandOSFailure["errors"]): BrandOSFailure {
  return {
    ok: false,
    error,
    ...(errors ? { errors } : {})
  };
}

async function persistResult(
  adapter: BrandOSStorageAdapter,
  workspaceId: string,
  result: StateChangeResult
): Promise<BrandOSRepositoryResult> {
  await adapter.saveState(workspaceId, result.state);
  await adapter.appendEvents(workspaceId, result.events);

  return {
    ok: true,
    result
  };
}

async function loadValidState(adapter: BrandOSStorageAdapter, workspaceId: string) {
  const state = await adapter.getState(workspaceId);

  if (!state) {
    return fail("Workspace state not found.", [{ path: "workspaceId", code: "not_found", message: "Workspace state not found." }]);
  }

  const migration = migrateBrandOSState(state);

  if (!migration.ok || !migration.state) {
    return fail("Unsupported or invalid schema version.", migration.errors);
  }

  const validation = validateBrandOperatingState(migration.state);

  if (!validation.valid) {
    return fail("Workspace state validation failed.", validation.errors);
  }

  return {
    ok: true as const,
    state: migration.state
  };
}

export function createBrandOSRepository(adapter: BrandOSStorageAdapter): BrandOSRepository {
  return {
    async getWorkspaceState(workspaceId: string): Promise<BrandOSRepositoryResult> {
      const loaded = await loadValidState(adapter, workspaceId);

      if (!loaded.ok) {
        return loaded;
      }

      return persistResult(adapter, workspaceId, recalculateBrandOS(loaded.state));
    },

    async initializeWorkspaceState(workspaceId: string, input: BrandSeedInput): Promise<BrandOSRepositoryResult> {
      return persistResult(adapter, workspaceId, initializeBrandOS(input));
    },

    async applyWorkspaceInput(workspaceId: string, payload: BrandOSUpdateInput): Promise<BrandOSRepositoryResult> {
      const loaded = await loadValidState(adapter, workspaceId);

      if (!loaded.ok) {
        return loaded;
      }

      return persistResult(adapter, workspaceId, applyBrandInput(loaded.state, payload));
    },

    async completeWorkspaceStudioStep(workspaceId: string, payload: WorkspaceStudioStepPayload): Promise<BrandOSRepositoryResult> {
      const loaded = await loadValidState(adapter, workspaceId);

      if (!loaded.ok) {
        return loaded;
      }

      return persistResult(adapter, workspaceId, completeStudioStep(loaded.state, payload.studioId, payload.output));
    },

    async acceptWorkspaceDecision(
      workspaceId: string,
      decisionId: string,
      selectedOptionId?: string
    ): Promise<BrandOSRepositoryResult> {
      const loaded = await loadValidState(adapter, workspaceId);

      if (!loaded.ok) {
        return loaded;
      }

      return persistResult(adapter, workspaceId, acceptDecision(loaded.state, decisionId, selectedOptionId));
    },

    async recordWorkspaceDecisionOutcome(
      workspaceId: string,
      payload: WorkspaceDecisionOutcomePayload
    ): Promise<BrandOSRepositoryResult> {
      const loaded = await loadValidState(adapter, workspaceId);

      if (!loaded.ok) {
        return loaded;
      }

      return persistResult(adapter, workspaceId, recordDecisionOutcome(loaded.state, payload));
    },

    async recordWorkspaceObservation(workspaceId: string, payload: WorkspaceObservationPayload): Promise<BrandOSRepositoryResult> {
      const loaded = await loadValidState(adapter, workspaceId);

      if (!loaded.ok) {
        return loaded;
      }

      return persistResult(
        adapter,
        workspaceId,
        recordObservation(loaded.state, payload.observation, undefined, payload.source ? [payload.source] : [])
      );
    },

    async recalculateWorkspaceState(workspaceId: string): Promise<BrandOSRepositoryResult> {
      const loaded = await loadValidState(adapter, workspaceId);

      if (!loaded.ok) {
        return loaded;
      }

      return persistResult(adapter, workspaceId, recalculateBrandOS(loaded.state));
    }
  };
}
