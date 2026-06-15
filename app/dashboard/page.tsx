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
  "foundation",
  "manifesto",
  "brandHealth",
  "audit",
  "decision",
  "studios",
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
  const [authContext, setAuthContext] =
  useState<AuthContextState | null>(null);
  
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
  const brandReadiness = calculateBrandReadiness(brandSetup);
  const brandProfile = getBrandProfile(currentBrand?.id);
  const pipeline = data?.pipeline;
  const visibleTabs = isMobileNav ? mobileTabs : desktopTabs;
  
  const activeOutputLanguage =
  languageMarketplace.active as OutputLanguage;
  

  function getTabLabel(tab: DashboardTab) {
    if (tab === "overview") return text.dashboard.navigation.overview;
    if (tab === "foundation") return text.dashboard.navigation.foundation;
    if (tab === "manifesto") return text.dashboard.navigation.manifesto;
    if (tab === "brandHealth") return text.dashboard.navigation.governance;
    if (tab === "audit") return text.dashboard.navigation.audit;
    if (tab === "decision") return "Decision";
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
      const json = await response.json();

      if (response.ok && json.authenticated) {
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

      setBrandSetup(parsedSetup);
      setUiLanguage(parsedSetup.identity.uiLanguage);
      setInput((currentInput) => ({
        ...currentInput,
        outputLanguage: parsedSetup.identity.contentLanguage,
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
    const response = await fetch(
      "/api/language-marketplace"
    );

    const json = await response.json();

    setLanguageMarketplace(json);
  } catch (error) {
    console.error(
      "Language marketplace load failed",
      error
    );
  }
}

useEffect(() => {
  loadMarketplace();
}, []);

  if (booting) {
    return <SplashScreen />;
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-6 md:px-6 lg:px-8">
     <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
    <Image
      src="/brand/logo-mark.png"
      alt="TILLA-OS"
      width={56}
      height={56}
      priority
    />

    <div>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
        TILLA-OS
      </h1>

      <p className="mt-2 text-zinc-500">
        {getDashboardText("dashboardTitle", uiLanguage)}
      </p>
    </div>
  </div>

  {authContext && (
    <div className="rounded-2xl border border-[#e7e2d8] bg-white px-4 py-3 text-sm shadow-sm">
      <div className="text-xs uppercase tracking-[0.25em] text-zinc-400">
        Workspace
      </div>

      <div className="mt-1 font-semibold text-zinc-900">
        {authContext.workspace.name}
      </div>

      <div className="mt-1 text-xs text-zinc-500">
        {authContext.user.email} · {authContext.membership.role}
      </div>

      <button
        type="button"
        onClick={logout}
        className="mt-3 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-950"
      >
        Logout
      </button>
    </div>
  )}
</div>

      <div className="mb-8 flex items-center gap-3">
        <span className="text-xs uppercase tracking-widest text-zinc-400">
          UI
        </span>

        <div className="flex rounded-full border border-[#e7e2d8] bg-[#fcfbf8] p-1">
          {(["tr", "en"] as const).map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => setUiLanguage(language)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                uiLanguage === language
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {language.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <section className="mb-6 rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-4 md:mb-8 md:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
              {text.brandSetup.currentBrand}
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-900 md:text-3xl">
              {currentBrand?.name ?? "TILLA"}
            </h2>

            <p className="mt-2 text-zinc-500">
              {brandProfile?.category ?? "Premium Brand"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-[#e7e2d8] bg-white px-4 py-3 md:px-5 md:py-4">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                {text.dashboard.labels.readiness}
              </div>

              <div className="mt-1 text-2xl font-semibold text-zinc-900 md:mt-2 md:text-3xl">
                {brandReadiness.score}%
              </div>
            </div>

            <button
              type="button"
              onClick={() => setWorkspaceOpen((current) => !current)}
              className="rounded-2xl border border-[#e7e2d8] bg-white px-5 py-4 text-sm font-medium text-zinc-700 transition hover:text-zinc-950 md:hidden"
            >
              {workspaceOpen ? `Workspace ▲` : `Workspace ▼`}
            </button>
          </div>
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
            onClick={() => generate()}
            disabled={loading}
            className="mt-6 rounded-xl bg-zinc-900 px-5 py-3 font-medium text-white disabled:opacity-50"
          >
            {loading
              ? getDashboardText("generating", uiLanguage)
              : getDashboardText("generateDecision", uiLanguage)}
          </button>
        </div>
      </section>
	  
  
      <div className="relative mb-4 flex gap-2 overflow-visible rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-2">
        {visibleTabs.map((key) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
              setMoreOpen(false);
            }}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition md:px-4 md:text-sm ${
              activeTab === key
                ? "bg-zinc-900 text-white"
                : "text-zinc-500 hover:bg-white hover:text-zinc-900"
            }`}
          >
            {getTabLabel(key)}
          </button>
        ))}

        {isMobileNav && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((current) => !current)}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition ${
                activeTab === "foundation" || activeTab === "manifesto"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-white hover:text-zinc-900"
              }`}
            >
              More
            </button>

            {moreOpen && (
              <div className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-[#e7e2d8] bg-white p-2 shadow-lg">
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
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
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
        <AuditTab brandId={currentBrand?.id} language={activeOutputLanguage} />
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
    </main>
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
        className="mt-2 w-full rounded-xl border border-[#e7e2d8] bg-white px-4 py-3 text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900"
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
        className="mt-2 w-full rounded-xl border border-[#e7e2d8] bg-white px-4 py-3 text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900"
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
