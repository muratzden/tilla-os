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
import { normalizeBrandSetup } from "@/src/lib/brand/setup/default-brand-setup";

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
  outputLanguage: "tr",
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

export default function DashboardPage() {
  const [input, setInput] = useState<InputState>(defaultInput);
  const [uiLanguage, setUiLanguage] = useState<UILanguage>("tr");
  const [brandSetup, setBrandSetup] = useState<BrandSetup>(defaultBrandSetup);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [booting, setBooting] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] =
  useState(false);
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
  languageMarketplace.active === "tr" ||
  languageMarketplace.active === "en" ||
  languageMarketplace.active === "de"
    ? languageMarketplace.active
    : "en"
) as OutputLanguage;

  function getTabLabel(tab: DashboardTab) {
    if (tab === "overview") return text.dashboard.navigation.overview;
    if (tab === "foundation") return text.dashboard.navigation.foundation;
    if (tab === "manifesto") return text.dashboard.navigation.manifesto;
    if (tab === "brandHealth") return text.dashboard.navigation.governance;
    if (tab === "audit") return text.dashboard.navigation.audit;
    if (tab === "decision") return "Decision Engine";
    if (tab === "studios") return "Studios";
    return "Marketplace";
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
          uiLanguage: brandSetup.identity.uiLanguage,
          contentLanguage: activeOutputLanguage,
          promptLanguage: activeOutputLanguage,
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
      setUiLanguage(normalizedSetup.identity.uiLanguage);
      setInput((currentInput) => ({
        ...currentInput,
        outputLanguage: normalizedSetup.identity.contentLanguage,
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
                    Brand Operating System
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
                onClick={() => setActiveTab(key)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeTab === key
                    ? "bg-white text-zinc-950"
                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                } ${sidebarCollapsed ? "text-center" : ""}`}
              >
                {sidebarCollapsed
                  ? getTabLabel(key).charAt(0)
                  : getTabLabel(key)}
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
                Logout
              </button>
            </div>
          )}
        </aside>

        <section className="px-4 py-5 md:px-8 md:py-7 lg:px-10">
          <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-zinc-600">
                Command Center
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Brand Health Center
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 md:text-base">
                {getDashboardText("dashboardTitle", uiLanguage)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-zinc-600">
                UI
              </span>

              <div className="flex rounded-full border border-white/10 bg-white/[0.035] p-1">
                {(["tr", "en"] as const).map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => setUiLanguage(language)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                      uiLanguage === language
                        ? "bg-white text-zinc-950"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {language.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <StatCard
              label="Current Brand"
              value={currentBrand?.name ?? "TILLA"}
              detail={brandProfile?.category ?? "Premium Brand"}
            />

            <StatCard
              label={text.dashboard.labels.readiness}
              value={`${brandReadiness.score}%`}
              detail="Foundation readiness"
            />

            <StatCard
              label="Governance"
              value="Protected"
              detail="Constitution active"
            />

            <StatCard
              label="Output Language"
              value={activeOutputLanguage.toUpperCase()}
              detail="Marketplace controlled"
            />
          </section>

          <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-zinc-600">
                  Decision Workspace
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Generate a governed brand decision
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                  Use the input layer only when you need a new decision. The
                  primary dashboard remains focused on brand health,
                  governance, and alignment.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setWorkspaceOpen((current) => !current)}
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
              >
                {workspaceOpen ? "Hide Workspace" : "Open Workspace"}
              </button>
            </div>

            <div className={`mt-6 ${workspaceOpen ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                <Input
                  label="Type"
                  value={input.type}
                  onChange={(value) => setInput({ ...input, type: value })}
                />

                <Input
                  label="Material"
                  value={input.material}
                  onChange={(value) => setInput({ ...input, material: value })}
                />

                <Input
                  label="Color"
                  value={input.color}
                  onChange={(value) => setInput({ ...input, color: value })}
                />

                <Input
                  label="Size"
                  value={input.size}
                  onChange={(value) => setInput({ ...input, size: value })}
                />

                <Input
                  label="Channel"
                  value={input.channel}
                  onChange={(value) => setInput({ ...input, channel: value })}
                />

                <SelectInput
                  label={getDashboardText("outputLanguage", uiLanguage)}
                  value={input.outputLanguage}
                  options={["tr", "en", "de"]}
                  onChange={(value) =>
                    setInput({
                      ...input,
                      outputLanguage: value as OutputLanguage,
                    })
                  }
                />
              </div>

              <button
                type="button"
                onClick={() => generate()}
                disabled={loading}
                className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-white/10 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? getDashboardText("generating", uiLanguage)
                  : getDashboardText("generateDecision", uiLanguage)}
              </button>
            </div>
          </section>

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
                  More
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
              <OutputTab pipeline={pipeline} language={activeOutputLanguage} />
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