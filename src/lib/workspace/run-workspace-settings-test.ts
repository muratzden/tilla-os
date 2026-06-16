import "dotenv/config";

import { ensureOwnerAccount } from "../auth/auth-service";

import {
  getWorkspaceBrandSetup,
  saveWorkspaceBrandSetup,
} from "./workspace-brand-setup-service";

async function runWorkspaceSettingsTest() {
  const owner = await ensureOwnerAccount(
    "workspace-settings@tilla.test",
    "123456",
    "Workspace Settings Test",
  );

  const brandSetup = {
    identity: {
      brandName: "Tilla Leather Craft",
      category: "Leather Goods",
      country: "TR",
      uiLanguage: "tr",
      contentLanguage: "tr",
      promptLanguage: "en",
    },

    positioning: {
      premiumLevel: "premium",
      marketPosition: "artisan",
      priceSegment: "upper",
    },

    audience: {
      primaryAudience: "Professionals",
    },

    voice: {
      tone: "calm",
      personality: "craftsman",
      communicationStyle: "honest",
    },

    visualDirection: {
      aesthetic: "quiet luxury",
      materials: ["leather"],
      colors: ["camel"],
    },

    values: {
      coreValues: ["craft", "honesty"],
      brandPromise: "Built to last",
      forbiddenDirections: ["fast fashion"],
    },

    manifesto: {
      founderStory: "Founder story",
      brandManifesto: "Manifesto",
    },
  } as const;

  await saveWorkspaceBrandSetup(owner.workspace.id, brandSetup as any);

  const loaded = await getWorkspaceBrandSetup(owner.workspace.id);

  console.log("Workspace Settings Test");

  console.log({
    passed: loaded?.identity.brandName === brandSetup.identity.brandName,

    workspaceId: owner.workspace.id,

    brandName: loaded?.identity.brandName,
  });
}

runWorkspaceSettingsTest().catch((error) => {
  console.error("Workspace Settings Test Failed");

  console.error(error);

  process.exit(1);
});
