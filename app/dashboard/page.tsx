"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SplashScreen from "@/components/splash-screen";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";
import { getLanguagePack } from "@/src/lib/i18n/get-language-pack";
import { defaultBrandSetup } from "@/src/lib/brand/setup/brand-setup-defaults";
import { calculateBrandReadiness } from "@/src/lib/brand/setup/brand-readiness";
import { getBrandProfile } from "@/src/lib/brand/setup/brand-profile";
import { getCurrentBrand } from "@/src/lib/brand/setup/brand-context";
import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";
import { OverviewTab } from "./components/overview-tab";
import { FoundationTab } from "./components/foundation-tab";
import { DecisionTab } from "./components/decision-tab";
import { ManifestoTab } from "./components/manifesto-tab";
import { OutputTab } from "./components/output-tab";
import { AuditTab } from "./components/audit-tab";
import { AuditReportTab } from "./components/audit-report-tab";
import { LanguageMarketplacePanel } from "./components/language-marketplace-panel";
import { MissionControl } from "./components/mission-control";
import { ActivityTimeline } from "./components/activity-timeline";
import { MobileCommandCenter } from "./components/mobile-command-center";
import { normalizeBrandSetup } from "@/src/lib/brand/setup/default-brand-setup";
import { WorkspaceGrid } from "./components/workspace-grid";

import { ActiveModuleShell } from "./components/active-module-shell";

type OutputLanguage = "tr" | "en" | "de";
type UILanguage = "tr" | "en";

type DashboardTab =
  | "overview"
  | "foundation"
  | "manifesto"
  | "decision"
  | "brandHealth"
  | "audit"
  | "studios"
  | "marketplace";

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

type MarketplaceState = {
  active: string;
  installed: string[];
  installedLanguages: {
    language: string;
    packageId?: string;
    source: string;
    installedAt: string | null;
    currentVersion: string;
    latestVersion: string;
    updateAvailable: boolean;
    active: boolean;
  }[];
  updates: {
    language: string;
    packageId?: string;
    source: string;
    installedAt: string | null;
    currentVersion: string;
    latestVersion: string;
    updateAvailable: boolean;
    active: boolean;
  }[];
  versionHistory: any[];
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
  "overview",
  "brandHealth",
  "audit",
  "decision",
  "studios",
  "foundation",
  "manifesto",
  "marketplace",
];

const mobileTabs: readonly DashboardTab[] = [
  "overview",
  "brandHealth",
  "audit",
  "decision",
  "studios",
  "marketplace",
];

const moreTabs: readonly DashboardTab[] = ["foundation", "manifesto"];

const tabIcons: Record<DashboardTab, string> = {
  overview: "◉",
  foundation: "◇",
  manifesto: "§",
  brandHealth: "◆",
  audit: "◌",
  decision: "✦",
  studios: "✎",
  marketplace: "▣",
};

export default function DashboardPage() {
  const [input, setInput] = useState<InputState>(defaultInput);
  const [uiLanguage, setUiLanguage] = useState<UILanguage>("en");
  const [brandSetup, setBrandSetup] = useState<BrandSetup>(defaultBrandSetup);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [booting, setBooting] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authContext, setAuthContext] = useState<AuthContextState | null>(null);

  const [languageMarketplace, setLanguageMarketplace] =
    useState<MarketplaceState>({
      active: "en",
      installed: ["en"],
      installedLanguages: [],
      updates: [],
      versionHistory: [],
    });

  const text = getLanguagePack(uiLanguage);
  const currentBrand = getCurrentBrand();

  const brandReadiness = calculateBrandReadiness(
    normalizeBrandSetup(brandSetup),
  );

  const brandProfile = getBrandProfile(currentBrand?.id);
  const pipeline = data?.pipeline;
  const visibleTabs = isMobileNav ? mobileTabs : desktopTabs;
  const activeOutputLanguage = (
  brandSetup.identity.foundationLanguage === "tr" ||
brandSetup.identity.foundationLanguage === "en" ||
brandSetup.identity.foundationLanguage === "de"
  ? brandSetup.identity.foundationLanguage
  : "en"
) as OutputLanguage;
  function getTabLabel(tab: DashboardTab) {
    if (tab === "overview") {
      return getDashboardText("overview", uiLanguage);
    }

    if (tab === "foundation") {
      return getDashboardText("foundation", uiLanguage);
    }

    if (tab === "manifesto") {
      return getDashboardText("manifestoInterview", uiLanguage);
    }

    if (tab === "brandHealth") {
      return getDashboardText("governanceCenter", uiLanguage);
    }

    if (tab === "audit") {
      return getDashboardText("auditCenter", uiLanguage);
    }

    if (tab === "decision") {
      return getDashboardText("decisionEngine", uiLanguage);
    }

    if (tab === "studios") {
      return getDashboardText("studios", uiLanguage);
    }

    return getDashboardText("marketplace", uiLanguage);
  }
     function getActiveModuleMeta(tab: DashboardTab) {
    switch (tab) {
      case "decision":
        return {
          title: getDashboardText("decisionEngine", uiLanguage),
          description: getDashboardText(
            "decisionEngineDescription",
            uiLanguage,
          ),
        };

      case "brandHealth":
        return {
          title: getDashboardText("governanceCenter", uiLanguage),
          description: getDashboardText(
            "governanceCenterDescription",
            uiLanguage,
          ),
        };

      case "audit":
        return {
          title: getDashboardText("auditCenter", uiLanguage),
          description: getDashboardText("auditCenterDescription", uiLanguage),
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

      default:
        return {
          title: getDashboardText("overview", uiLanguage),
          description: getDashboardText("overviewDescription", uiLanguage),
        };
    }
  }

  async function generate(nextInput = input) {
    try {
      setLoading(true);

      const res = await fetch("/api/brand-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nextInput,
          brandId: currentBrand?.id,
          interviewLanguage: brandSetup.identity.interviewLanguage,
foundationLanguage: brandSetup.identity.foundationLanguage,
		            promptLanguage: "en",
        }),
      });

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
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

    if (!isMobile) {
      setWorkspaceOpen(true);
    }
  }, []);

  useEffect(() => {
    generate(defaultInput);
  }, []);

  async function loadMarketplace() {
    try {
      const response = await fetch("/api/language-marketplace");

      if (!response.ok) {
        console.error("Language marketplace request failed", response.status);
        return;
      }

      const json = await response.json();

      if (!json?.active || !Array.isArray(json?.installed)) {
        console.error("Invalid language marketplace payload", json);
        return;
      }

      setLanguageMarketplace(json);
    } catch (error) {
      console.error("Language marketplace load failed", error);
    }
  }

  useEffect(() => {
    loadMarketplace();
  }, []);

  if (booting) {
    return <SplashScreen />;
  }

  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-20rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute bottom-[-20rem] right-[-12rem] h-[36rem] w-[36rem] rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div
        className={`relative grid min-h-screen grid-cols-1 transition-all duration-300 ${
          sidebarCollapsed
            ? "md:grid-cols-[5rem_1fr]"
            : "md:grid-cols-[17rem_1fr]"
        }`}
      >
        <aside className="hidden border-r border-white/10 bg-black/30 px-5 py-6 backdrop-blur-xl md:block">
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

          <nav className="mt-10">
            <div className="space-y-2">
              {desktopTabs
                .filter((key) => key !== "foundation" && key !== "manifesto")
                .map((key) => (
                  <button
                    key={key}
                    type="button"
                    title={getTabLabel(key)}
                    onClick={() => setActiveTab(key)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      activeTab === key
                        ? "bg-white text-zinc-950"
                        : "text-zinc-500 hover:bg-white/5 hover:text-white"
                    } ${
                      sidebarCollapsed ? "justify-center px-0" : "text-left"
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-base">
                      {tabIcons[key]}
                    </span>

                    {!sidebarCollapsed && (
                      <span className="truncate">{getTabLabel(key)}</span>
                    )}
                  </button>
                ))}
            </div>

            {!sidebarCollapsed && (
              <>
                <div className="my-6 border-t border-white/10" />

                <div className="mb-3 px-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    {getDashboardText("knowledge", uiLanguage)}
                  </p>
                </div>

                <div className="space-y-2">
                  {["foundation", "manifesto"].map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveTab(key as DashboardTab)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        activeTab === key
                          ? "bg-white text-zinc-950"
                          : "text-zinc-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-base">
                        {tabIcons[key as keyof typeof tabIcons]}
                      </span>

                      <span>{getTabLabel(key as DashboardTab)}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
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
          <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-zinc-600">
                {getDashboardText("commandCenter", uiLanguage)}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {getDashboardText("brandHealthCenter", uiLanguage)}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 md:text-base">
                {getDashboardText("dashboardTitle", uiLanguage)}
              </p>
            </div>
          </header>

          <MobileCommandCenter
            brandName={currentBrand?.name ?? "TILLA"}
            brandCategory={
  brandProfile?.category ?? getDashboardText("premiumBrand", uiLanguage)
}
            readinessScore={brandReadiness.score}
            activeOutputLanguage={activeOutputLanguage}
            workspaceName={authContext?.workspace.name}
            userEmail={authContext?.user.email}
            onOpenWorkspace={() => setWorkspaceOpen((current) => !current)}
          />
          <MissionControl
  readinessScore={brandReadiness.score}
  uiLanguage={uiLanguage}
/>

          <ActivityTimeline uiLanguage={uiLanguage} />

          <WorkspaceGrid
  activeTab={activeTab}
  readinessScore={brandReadiness.score}
  marketplaceUpdates={languageMarketplace.updates.length}
  uiLanguage={uiLanguage}
  onNavigate={(tab) => {
              setActiveTab(tab);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />

          <div className="relative mb-5 flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.035] p-2 md:hidden">
            {visibleTabs.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setMoreOpen(false);
                }}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition ${
                  activeTab === key
                    ? "bg-white text-zinc-950"
                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {sidebarCollapsed
                  ? getTabLabel(key).charAt(0)
                  : getTabLabel(key)}
              </button>
            ))}

            {isMobileNav && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((current) => !current)}
                  className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition ${
                    activeTab === "foundation" || activeTab === "manifesto"
                      ? "bg-white text-zinc-950"
                      : "text-zinc-500 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {getDashboardText("more", uiLanguage)}
                </button>

                {moreOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-lg">
                    {moreTabs.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setActiveTab(key);
                          setMoreOpen(false);
                        }}
                        className={`block w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                          activeTab === key
                            ? "bg-white text-zinc-950"
                            : "text-zinc-500 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {getTabLabel(key)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <ActiveModuleShell
  title={getActiveModuleMeta(activeTab).title}
  description={getActiveModuleMeta(activeTab).description}
  uiLanguage={uiLanguage}
>
            <section className="rounded-[2rem] border border-white/10 bg-zinc-950/60 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
              {activeTab === "overview" && (
                <OverviewTab pipeline={pipeline} uiLanguage={uiLanguage} />
              )}

              {activeTab === "foundation" && (
                <FoundationTab
                  currentBrand={currentBrand}
                  brandReadiness={brandReadiness}
                  brandProfile={brandProfile}
                  language={activeOutputLanguage}
                />
              )}

              {activeTab === "manifesto" && (
                <ManifestoTab
                  brandId={currentBrand?.id}
                  language={activeOutputLanguage}
                />
              )}

              {activeTab === "decision" && (
                <DecisionTab
                  pipeline={pipeline}
                  uiLanguage={uiLanguage}
                  language={activeOutputLanguage}
                  input={input}
                  loading={loading}
                  onInputChange={setInput}
                  onGenerate={() => generate()}
                />
              )}

              {activeTab === "brandHealth" && (
                <AuditTab
                  brandId={currentBrand?.id}
                  language={activeOutputLanguage}
                />
              )}

              {activeTab === "audit" && (
                <AuditReportTab
                  brandId={currentBrand?.id}
                  language={activeOutputLanguage}
                />
              )}

              {activeTab === "studios" && (
                <OutputTab
                  pipeline={pipeline}
                  language={activeOutputLanguage}
                />
              )}

              {activeTab === "marketplace" && (
                <LanguageMarketplacePanel
                  active={languageMarketplace.active}
                  installed={languageMarketplace.installed}
                  installedLanguages={languageMarketplace.installedLanguages}
                  updates={languageMarketplace.updates}
                  versionHistory={languageMarketplace.versionHistory}
                  onRefresh={loadMarketplace}
                />
              )}
            </section>
          </ActiveModuleShell>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20 backdrop-blur">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
        {label}
      </p>

      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-zinc-500">{detail}</p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-500">{label}</span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/30 focus:bg-black/40"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-500">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 focus:bg-black/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
