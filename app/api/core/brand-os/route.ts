import {
  acceptDecision,
  applyBrandInput,
  completeStudioStep,
  createBrandOSRepository,
  createMemoryBrandOSStorageAdapter,
  initializeBrandOS,
  recalculateBrandOS,
  recordDecisionOutcome,
  recordObservation,
} from "@/src/core/brand-os";

import { STUDIOS } from "@/src/core/brand-os/studios";
import { validateBrandOperatingState } from "@/src/core/brand-os/state-validation";
import type {
  BrandOperatingState,
  BrandOSRepositoryResult,
  DecisionImpact,
  StudioId,
} from "@/src/core/brand-os";
import {
  validateBrandOSInput,
  validateBrandOSUpdate,
} from "@/src/core/brand-os/validation";

type BrandOSOperation =
  | "initialize"
  | "applyBrandInput"
  | "completeStudioStep"
  | "acceptDecision"
  | "recordDecisionOutcome"
  | "recordObservation"
  | "recalculate";

type ApiMode = "repository" | "stateless";

interface ApiSuccess {
  ok: true;
  operation: BrandOSOperation;
  mode: ApiMode;
  result: unknown;
}

interface ApiFailure {
  ok: false;
  error: string;
  mode?: ApiMode;
  validationErrors?: unknown[];
  supportedOperations?: BrandOSOperation[];
}

const SUPPORTED_OPERATIONS: BrandOSOperation[] = [
  "initialize",
  "applyBrandInput",
  "completeStudioStep",
  "acceptDecision",
  "recordDecisionOutcome",
  "recordObservation",
  "recalculate",
];

type DecisionOutcomeUpdateStatus =
  | "in_progress"
  | "validated"
  | "failed"
  | "cancelled";

const DECISION_OUTCOME_STATUSES: DecisionOutcomeUpdateStatus[] = [
  "in_progress",
  "validated",
  "failed",
  "cancelled",
];

const routeStorageAdapter = createMemoryBrandOSStorageAdapter();
const routeRepository = createBrandOSRepository(routeStorageAdapter);

function jsonSuccess(
  operation: BrandOSOperation,
  mode: ApiMode,
  result: unknown,
): Response {
  return Response.json({
    ok: true,
    operation,
    mode,
    result,
  } satisfies ApiSuccess);
}

function jsonFailure(body: ApiFailure, status = 400): Response {
  return Response.json(body, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isOperation(value: unknown): value is BrandOSOperation {
  return (
    typeof value === "string" &&
    SUPPORTED_OPERATIONS.includes(value as BrandOSOperation)
  );
}

function isStudioId(value: unknown): value is StudioId {
  return (
    typeof value === "string" && STUDIOS.some((studio) => studio.id === value)
  );
}

function isDecisionOutcomeStatus(
  value: unknown,
): value is DecisionOutcomeUpdateStatus {
  return (
    typeof value === "string" &&
    DECISION_OUTCOME_STATUSES.includes(value as DecisionOutcomeUpdateStatus)
  );
}

function isDecisionImpact(value: unknown): value is DecisionImpact {
  if (!isRecord(value)) return false;

  return (
    typeof value.dimension === "string" &&
    ["increase", "decrease", "neutral"].includes(value.direction as string) &&
    ["low", "medium", "high"].includes(value.magnitude as string) &&
    typeof value.rationale === "string" &&
    value.rationale.trim().length > 0
  );
}

function getWorkspaceId(body: Record<string, unknown>): string | null {
  return typeof body.workspaceId === "string" &&
    body.workspaceId.trim().length > 0
    ? body.workspaceId.trim()
    : null;
}

async function readJson(
  request: Request,
): Promise<{ ok: true; body: unknown } | { ok: false; error: string }> {
  try {
    return {
      ok: true,
      body: await request.json(),
    };
  } catch {
    return {
      ok: false,
      error: "Invalid JSON body.",
    };
  }
}

function getRequiredState(
  body: Record<string, unknown>,
): BrandOperatingState | Response {
  if (!("state" in body)) {
    return jsonFailure({
      ok: false,
      mode: "stateless",
      error: "Missing state.",
      validationErrors: [
        {
          path: "state",
          code: "required",
          message: "state is required for this operation.",
        },
      ],
    });
  }

  const validation = validateBrandOperatingState(body.state);

  if (!validation.valid) {
    return jsonFailure({
      ok: false,
      mode: "stateless",
      error: "Invalid state.",
      validationErrors: validation.errors,
    });
  }

  return body.state as BrandOperatingState;
}

function repositoryResponse(
  operation: BrandOSOperation,
  result: BrandOSRepositoryResult,
): Response {
  if (!result.ok) {
    return jsonFailure(
      {
        ok: false,
        mode: "repository",
        error: result.error,
        validationErrors: result.errors,
      },
      400,
    );
  }

  return jsonSuccess(operation, "repository", result.result);
}

async function handleRepositoryOperation(
  operation: BrandOSOperation,
  workspaceId: string,
  payload: unknown,
): Promise<Response> {
  if (operation === "initialize") {
    const validation = validateBrandOSInput(payload);

    if (!validation.ok || !validation.value) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: validation.errors,
      });
    }

    return repositoryResponse(
      operation,
      await routeRepository.initializeWorkspaceState(
        workspaceId,
        validation.value,
      ),
    );
  }

  if (operation === "applyBrandInput") {
    const validation = validateBrandOSUpdate(payload);

    if (!validation.ok || !validation.value) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: validation.errors,
      });
    }

    return repositoryResponse(
      operation,
      await routeRepository.applyWorkspaceInput(workspaceId, validation.value),
    );
  }

  if (operation === "completeStudioStep") {
    if (!isRecord(payload)) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload",
            code: "invalid_type",
            message: "payload must be an object.",
          },
        ],
      });
    }

    if (!isStudioId(payload.studioId)) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.studioId",
            code: "invalid_type",
            message: "studioId is not supported.",
          },
        ],
      });
    }

    const validation = validateBrandOSUpdate(payload.output);

    if (!validation.ok || !validation.value) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: validation.errors,
      });
    }

    return repositoryResponse(
      operation,
      await routeRepository.completeWorkspaceStudioStep(workspaceId, {
        studioId: payload.studioId,
        output: validation.value,
      }),
    );
  }

  if (operation === "acceptDecision") {
    if (
      !isRecord(payload) ||
      typeof payload.decisionId !== "string" ||
      payload.decisionId.trim().length === 0
    ) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.decisionId",
            code: "required",
            message: "decisionId is required.",
          },
        ],
      });
    }

    return repositoryResponse(
      operation,
      await routeRepository.acceptWorkspaceDecision(
        workspaceId,
        payload.decisionId,
        typeof payload.selectedOptionId === "string" &&
          payload.selectedOptionId.trim().length > 0
          ? payload.selectedOptionId
          : undefined,
      ),
    );
  }

  if (operation === "recordDecisionOutcome") {
    if (
      !isRecord(payload) ||
      typeof payload.decisionId !== "string" ||
      payload.decisionId.trim().length === 0
    ) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.decisionId",
            code: "required",
            message: "decisionId is required.",
          },
        ],
      });
    }

    if (!isDecisionOutcomeStatus(payload.status)) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.status",
            code: "invalid_value",
            message: "status is not supported.",
          },
        ],
      });
    }

    if (
      "actualImpact" in payload &&
      payload.actualImpact !== undefined &&
      !isDecisionImpact(payload.actualImpact)
    ) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.actualImpact",
            code: "invalid_type",
            message: "actualImpact is invalid.",
          },
        ],
      });
    }

    return repositoryResponse(
      operation,
      await routeRepository.recordWorkspaceDecisionOutcome(workspaceId, {
        decisionId: payload.decisionId,
        status: payload.status,
        ...(typeof payload.evidence === "string" &&
        payload.evidence.trim().length > 0
          ? { evidence: payload.evidence }
          : {}),
        ...(isDecisionImpact(payload.actualImpact)
          ? { actualImpact: payload.actualImpact }
          : {}),
      }),
    );
  }

  if (operation === "recordObservation") {
    if (
      !isRecord(payload) ||
      typeof payload.observation !== "string" ||
      payload.observation.trim().length === 0
    ) {
      return jsonFailure({
        ok: false,
        mode: "repository",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.observation",
            code: "required",
            message: "observation is required.",
          },
        ],
      });
    }

    return repositoryResponse(
      operation,
      await routeRepository.recordWorkspaceObservation(workspaceId, {
        observation: payload.observation,
        ...(typeof payload.source === "string" &&
        payload.source.trim().length > 0
          ? { source: payload.source }
          : {}),
      }),
    );
  }

  return repositoryResponse(
    operation,
    await routeRepository.recalculateWorkspaceState(workspaceId),
  );
}

function handleStatelessOperation(
  operation: BrandOSOperation,
  body: Record<string, unknown>,
): Response {
  if (operation === "initialize") {
    const validation = validateBrandOSInput(body.payload);

    if (!validation.ok || !validation.value) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: validation.errors,
      });
    }

    return jsonSuccess(
      operation,
      "stateless",
      initializeBrandOS(validation.value),
    );
  }

  const state = getRequiredState(body);

  if (state instanceof Response) {
    return state;
  }

  if (operation === "applyBrandInput") {
    const validation = validateBrandOSUpdate(body.payload);

    if (!validation.ok || !validation.value) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: validation.errors,
      });
    }

    return jsonSuccess(
      operation,
      "stateless",
      applyBrandInput(state, validation.value),
    );
  }

  if (operation === "completeStudioStep") {
    const payload = body.payload;

    if (!isRecord(payload)) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload",
            code: "invalid_type",
            message: "payload must be an object.",
          },
        ],
      });
    }

    if (!isStudioId(payload.studioId)) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.studioId",
            code: "invalid_type",
            message: "studioId is not supported.",
          },
        ],
      });
    }

    const validation = validateBrandOSUpdate(payload.output);

    if (!validation.ok || !validation.value) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: validation.errors,
      });
    }

    return jsonSuccess(
      operation,
      "stateless",
      completeStudioStep(state, payload.studioId, validation.value),
    );
  }

  if (operation === "acceptDecision") {
    const payload = body.payload;

    if (
      !isRecord(payload) ||
      typeof payload.decisionId !== "string" ||
      payload.decisionId.trim().length === 0
    ) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.decisionId",
            code: "required",
            message: "decisionId is required.",
          },
        ],
      });
    }

    return jsonSuccess(
      operation,
      "stateless",
      acceptDecision(
        state,
        payload.decisionId,
        typeof payload.selectedOptionId === "string" &&
          payload.selectedOptionId.trim().length > 0
          ? payload.selectedOptionId
          : undefined,
      ),
    );
  }

  if (operation === "recordDecisionOutcome") {
    const payload = body.payload;

    if (
      !isRecord(payload) ||
      typeof payload.decisionId !== "string" ||
      payload.decisionId.trim().length === 0
    ) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.decisionId",
            code: "required",
            message: "decisionId is required.",
          },
        ],
      });
    }

    if (!isDecisionOutcomeStatus(payload.status)) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.status",
            code: "invalid_value",
            message: "status is not supported.",
          },
        ],
      });
    }

    if (
      "actualImpact" in payload &&
      payload.actualImpact !== undefined &&
      !isDecisionImpact(payload.actualImpact)
    ) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.actualImpact",
            code: "invalid_type",
            message: "actualImpact is invalid.",
          },
        ],
      });
    }

    return jsonSuccess(
      operation,
      "stateless",
      recordDecisionOutcome(state, {
        decisionId: payload.decisionId,
        status: payload.status,
        ...(typeof payload.evidence === "string" &&
        payload.evidence.trim().length > 0
          ? { evidence: payload.evidence }
          : {}),
        ...(isDecisionImpact(payload.actualImpact)
          ? { actualImpact: payload.actualImpact }
          : {}),
      }),
    );
  }

  if (operation === "recordObservation") {
    const payload = body.payload;

    if (
      !isRecord(payload) ||
      typeof payload.observation !== "string" ||
      payload.observation.trim().length === 0
    ) {
      return jsonFailure({
        ok: false,
        mode: "stateless",
        error: "Validation failed.",
        validationErrors: [
          {
            field: "payload.observation",
            code: "required",
            message: "observation is required.",
          },
        ],
      });
    }

    return jsonSuccess(
      operation,
      "stateless",
      recordObservation(
        state,
        payload.observation,
        undefined,
        typeof payload.source === "string" && payload.source.trim().length > 0
          ? [payload.source]
          : [],
      ),
    );
  }

  return jsonSuccess(operation, "stateless", recalculateBrandOS(state));
}

export async function POST(request: Request): Promise<Response> {
  const parsed = await readJson(request);

  if (!parsed.ok) {
    return jsonFailure({ ok: false, error: parsed.error });
  }

  if (!isRecord(parsed.body)) {
    return jsonFailure({
      ok: false,
      error: "Request body must be an object.",
    });
  }

  const operation = parsed.body.operation;

  if (!isOperation(operation)) {
    return jsonFailure({
      ok: false,
      error: "Unknown operation.",
      supportedOperations: SUPPORTED_OPERATIONS,
    });
  }

  const workspaceId = getWorkspaceId(parsed.body);

  if (workspaceId) {
    return handleRepositoryOperation(
      operation,
      workspaceId,
      parsed.body.payload,
    );
  }

  return handleStatelessOperation(operation, parsed.body);
}

export function GET(): Response {
  return Response.json({
    name: "Brand OS Core",
    version: "3.3.0",
    modes: ["repository", "stateless"],
    supportedOperations: SUPPORTED_OPERATIONS,
  });
}
