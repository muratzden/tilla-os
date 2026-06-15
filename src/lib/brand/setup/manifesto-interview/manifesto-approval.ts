import type { GeneratedManifesto } from "./manifesto-generator";

export type ManifestoStatus = "draft" | "approved" | "locked";

export type ApprovedManifesto = {
  version: number;

  status: ManifestoStatus;

  approvedAt: string;

  manifesto: GeneratedManifesto;
};

export function approveManifesto(
  manifesto: GeneratedManifesto,
): ApprovedManifesto {
  return {
    version: 1,

    status: "approved",

    approvedAt: new Date().toISOString(),

    manifesto,
  };
}

export function lockManifesto(
  approvedManifesto: ApprovedManifesto,
): ApprovedManifesto {
  return {
    ...approvedManifesto,
    status: "locked",
  };
}
