import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";

export type WorkspaceSettings = {
  workspaceId: string;
  brandSetup?: BrandSetup;
  updatedAt: string;
};
