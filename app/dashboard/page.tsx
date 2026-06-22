"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { KernelOutput } from "@/src/lib/brand-kernel/kernel-types";
import SplashScreen from "@/components/splash-screen";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";
import { getLanguagePack } from "@/src/lib/i18n/get-language-pack";
import { defaultBrandSetup } from "@/src/lib/brand/setup/brand-setup-defaults";
import { calculateBrandReadiness } from "@/src/lib/brand/setup/brand-readiness";
import { getBrandProfile } from "@/src/lib/brand/setup/brand-profile";

import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";
import { normalizeBrandSetup } from "@/src/lib/brand/setup/default-brand-setup";

import { FoundationTab } from "./components/foundation-tab";
import { ManifestoTab } from "./components/manifesto-tab";
import { OutputTab } from "./components/output-tab";

import { IntelligenceMarketplacePanel } from "./components/intelligence-marketplace-panel";


import { ActiveModuleShell } from "./components/active-module-shell";
import { MissionControlV2 } from "./components/mission-control-v2";
import type {
  BrandOperatingState,
  MissionControlState,
} from "@/src/core/brand-os/types";


type OutputLanguage = "tr" | "en" | "de";
type UILanguage = "tr" | "en";

type DashboardTab = "mission" | "foundation" | "manifesto" | "studios" | "marketplace";

type InputState = {
  type: string;
  material: string;
  color: string;
  size: string;
  channel: string;
  outputLanguage: OutputLanguage;
};

type AuthContextState = {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
  };
  workspace: {
    id: string;
    name: string;
  };
  membership: {
    role: string;
  };
};

const defaultInput: InputState = {
  type: "briefcase",
  material: "frisco",
  color: "camel",
  size: "13",
  channel: "web",
  outputLanguage: "en",
};

const desktopTabs: readonly DashboardTab[] = [
  "mission",
  "foundation",
  "manifesto",
  "studios",
  "marketplace",
];

const mobileTabs: readonly DashboardTab[] = [
  "mission",
  "foundation",
  "studios",
  "marketplace",
];

const tabIcons: Record<DashboardTab, string> = {
  mission: "◉",
  foundation: "◇",
  manifesto: "§",
  studios: "✎",
  marketplace: "▣",
};

export default function DashboardPage() {
  const [input, setInput] = useState<InputState>(defaultInput);
  const [uiLanguage, setUiLanguage] = useState<UILanguage>("en");
  const [brandSetup, setBrandSetup] = useState<BrandSetup>(defaultBrandSetup);
 
  const [activeTab, setActiveTab] = useState<DashboardTab>("mission");
  const [booting, setBooting] = useState(true);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authContext, setAuthContext] = useState<AuthContextState | null>(null);

const [missionControl, setMissionControl] =
  useState<MissionControlState | null>(null);

const [brandOSState, setBrandOSState] =
  useState<BrandOperatingState | null>(null);
  
  const text = getLanguagePack(uiLanguage);


  const brandReadiness = calculateBrandReadiness(
    normalizeBrandSetup(brandSetup),
  );

  const brandProfile = getBrandProfile(brandSetup);

  const kernelOutput = brandOSState?.kernel as Partial<KernelOutput> | null;
  const visibleTabs = isMobileNav ? mobileTabs : desktopTabs;

  const activeOutputLanguage = (
    brandSetup.identity.foundationLanguage === "tr" ||
    brandSetup.identity.foundationLanguage === "en" ||
    brandSetup.identity.foundationLanguage === "de"
      ? brandSetup.identity.foundationLanguage
      : "en"
  ) as OutputLanguage;

  function getTabLabel(tab: DashboardTab) {
    if (tab === "mission") {
      return "Mission Control";
    }

    if (tab === "foundation") {
      return getDashboardText("foundation", uiLanguage);
    }

    if (tab === "manifesto") {
      return getDashboardText("manifestoInterview", uiLanguage);
    }

    if (tab === "studios") {
      return getDashboardText("studios", uiLanguage);
    }

    return getDashboardText("marketplace", uiLanguage);
  }

  function getActiveModuleMeta(tab: DashboardTab) {
    switch (tab) {
      case "foundation":
        return {
          title: getDashboardText("foundation", uiLanguage),
          description: getDashboardText(
            "foundationModuleDescription",
            uiLanguage,
          ),
        };

      case "manifesto":
        return {
          title: getDashboardText("manifestoInterview", uiLanguage),
          description: getDashboardText(
            "manifestoModuleDescription",
            uiLanguage,
          ),
        };

      case "studios":
        return {
          title: getDashboardText("studios", uiLanguage),
          description: getDashboardText("studiosDescription", uiLanguage),
        };

      case "marketplace":
        return {
          title: getDashboardText("marketplace", uiLanguage),
          description: getDashboardText("marketplaceDescription", uiLanguage),
        };

      default:
        return {
          title: "Mission Control",
          description:
            "The next best action for building a stronger brand operating system.",
        };
    }
  }

  async function generate(nextInput = input) {
    try {
      const res = await fetch("/api/brand-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nextInput,
       
          interviewLanguage: brandSetup.identity.interviewLanguage,
          foundationLanguage: brandSetup.identity.foundationLanguage,
          promptLanguage: "en",
        }),
      });

      const json = await res.json();

      
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  }

  useEffect(() => {
    async function loadAuthContext() {
      try {
        const response = await fetch("/api/auth/me");
        const responseText = await response.text();
        const json = responseText ? JSON.parse(responseText) : null;

        if (response.ok && json?.authenticated) {
          setAuthContext(json);
        }
      } catch (error) {
        console.error("Auth context load failed", error);
      }
    }

    loadAuthContext();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  useEffect(() => {
    async function loadWorkspaceBrandSetup() {
      const response = await fetch("/api/workspace/brand-setup");

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      if (!result.brandSetup) {
        return;
      }

      const parsedSetup = result.brandSetup as BrandSetup;
      const normalizedSetup = normalizeBrandSetup(parsedSetup);

      setBrandSetup(normalizedSetup);
      setUiLanguage("en");
      setInput((currentInput) => ({
        ...currentInput,
        outputLanguage: "en",
      }));
    }

    loadWorkspaceBrandSetup();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    setIsMobileNav(isMobile);
  }, []);

  useEffect(() => {
    generate(defaultInput);
  }, []);
  
 useEffect(() => {
  async function loadBrandOSState() {
    try {
      const response = await fetch("/api/brand-os/state");

      if (!response.ok) {
        setMissionControl(null);
        return;
      }

      const result = await response.json();

      setBrandOSState(result.state ?? null);
setMissionControl(result.missionControl ?? null);
    } catch (error) {
      console.error("Brand OS state load failed", error);
      setBrandOSState(null);
setMissionControl(null);
    }
  }

  loadBrandOSState();
}, []);

  if (booting) {
    return <SplashScreen />;
  }
  
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-24rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-white/[0.07] blur-3xl" />
        <div className="absolute bottom-[-24rem] right-[-16rem] h-[40rem] w-[40rem] rounded-full bg-violet-500/[0.08] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%)]" />
      </div>

      <div
        className={`relative grid min-h-screen grid-cols-1 transition-all duration-300 ${
          sidebarCollapsed
            ? "md:grid-cols-[5rem_1fr]"
            : "md:grid-cols-[17rem_1fr]"
        }`}
      >
        <aside className="hidden border-r border-white/10 bg-black/40 px-5 py-6 backdrop-blur-xl md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <Image
                src="/brand/logo-mark.png"
                alt="TILLA-OS"
                width={42}
                height={42}
                priority
              />

              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-lg font-semibold tracking-[0.18em] text-white">
                    TILLA-OS
                  </h1>

                  <p className="text-xs text-zinc-500">
                    {getDashboardText("brandOperatingSystem", uiLanguage)}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSidebarCollapsed((current) => !current)}
              className="rounded-xl border border-white/10 px-2 py-1 text-xs text-zinc-500 transition hover:border-white/20 hover:text-white"
            >
              {sidebarCollapsed ? ">" : "<"}
            </button>
          </div>

          <nav className="mt-10 space-y-2">
            {desktopTabs.map((key) => (
              <button
                key={key}
                type="button"
                title={getTabLabel(key)}
                onClick={() => setActiveTab(key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  activeTab === key
                    ? "bg-white text-zinc-950"
                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                } ${sidebarCollapsed ? "justify-center px-0" : "text-left"}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-base">
                  {tabIcons[key]}
                </span>

                {!sidebarCollapsed && (
                  <span className="truncate">{getTabLabel(key)}</span>
                )}
              </button>
            ))}
          </nav>

          {authContext && !sidebarCollapsed && (
            <div className="absolute bottom-6 left-5 right-5 rounded-3xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">
                Workspace
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                {authContext.workspace.name}
              </p>

              <p className="mt-1 truncate text-xs text-zinc-500">
                {authContext.user.email}
              </p>

              <button
                type="button"
                onClick={logout}
                className="mt-4 w-full rounded-2xl border border-white/10 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:text-white"
              >
                {getDashboardText("logout", uiLanguage)}
              </button>
            </div>
          )}
        </aside>

        <section className="px-4 py-5 md:px-8 md:py-7 lg:px-10">
          <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-zinc-600">
                TILLA-OS
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                Mission Control
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
                The operating layer for brand direction, decisions, execution,
                and consistency.
              </p>
            </div>
          </header>

          {activeTab === "mission" && (
  <>
    {missionControl ? (
      <MissionControlV2 missionControl={missionControl} />
    ) : (
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-sm text-zinc-500">
        Loading Mission Control...
      </section>
    )}
  </>
)}

          {activeTab !== "mission" && (
            <>
              <div className="relative mb-5 flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.035] p-2 md:hidden">
                {visibleTabs.map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition ${
                      activeTab === key
                        ? "bg-white text-zinc-950"
                        : "text-zinc-500 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {getTabLabel(key)}
                  </button>
                ))}
              </div>

              <ActiveModuleShell
                title={getActiveModuleMeta(activeTab).title}
                description={getActiveModuleMeta(activeTab).description}
                uiLanguage={uiLanguage}
              >
                <section className="rounded-[2rem] border border-white/10 bg-zinc-950/60 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
                  {activeTab === "foundation" && (
                    <FoundationTab
                      
                      brandReadiness={brandReadiness}
                      brandProfile={brandProfile}
                      language={activeOutputLanguage}
                    />
                  )}

                  {activeTab === "manifesto" && (
                    <ManifestoTab kernel={brandOSState?.kernel ?? null} />
                  )}

                  {activeTab === "studios" && (
                    <OutputTab kernel={kernelOutput} language={activeOutputLanguage} />
                  )}

                  {activeTab === "marketplace" && <IntelligenceMarketplacePanel />}
                </section>
              </ActiveModuleShell>
            </>
          )}
        </section>
      </div>
    </main>
  );
}