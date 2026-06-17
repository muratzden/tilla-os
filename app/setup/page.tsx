"use client";

import { useEffect, useState } from "react";

import {
  defaultBrandSetup,
  normalizeBrandSetup,
} from "@/src/lib/brand/setup/default-brand-setup";

import {
  includedLanguagePacks,
  marketplaceLanguagePacks,
} from "@/src/lib/i18n/language-marketplace";

export default function SetupPage() {
  const [setup, setSetup] = useState(defaultBrandSetup);
  useEffect(() => {
    async function loadWorkspaceBrandSetup() {
      const response = await fetch("/api/workspace/brand-setup");

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      if (result.brandSetup) {
        setSetup(normalizeBrandSetup(result.brandSetup));
      }
    }

    loadWorkspaceBrandSetup();
  }, []);
  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <section className="mx-auto max-w-3xl rounded-2xl border border-[#e7e2d8] bg-[#fcfbf8] p-6">
        <p className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
          Brand Setup
        </p>

        <h1 className="mb-2 text-2xl font-semibold text-zinc-900">Identity</h1>

        <p className="mb-8 text-sm text-zinc-500">
          Define the basic identity signals for this brand.
        </p>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Brand Name
            </label>
            <input
              type="text"
              value={setup.identity.brandName}
              onChange={(e) =>
                setSetup({
                  ...setup,
                  identity: {
                    ...setup.identity,
                    brandName: e.target.value,
                  },
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Category
            </label>
            <input
              type="text"
              value={setup.identity.category}
              onChange={(e) =>
                setSetup({
                  ...setup,
                  identity: {
                    ...setup.identity,
                    category: e.target.value,
                  },
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Country
            </label>
            <select
              value={setup.identity.country}
              onChange={(e) =>
                setSetup({
                  ...setup,
                  identity: {
                    ...setup.identity,
                    country: e.target.value,
                  },
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
            >
              <option value="TR">Turkey</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="NL">Netherlands</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Founded Year
            </label>
            <input
              type="number"
              value={setup.identity.foundedYear ?? ""}
              onChange={(e) =>
                setSetup({
                  ...setup,
                  identity: {
                    ...setup.identity,
                    foundedYear:
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                  },
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
            />
          </div>
          <div className="border-t border-zinc-200 pt-6">
            <p className="mb-4 text-xs uppercase tracking-widest text-zinc-400">
  Brand Intelligence
</p>

            <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4">
              <p className="mb-2 text-sm font-semibold text-zinc-900">
  Brand Intelligence Packs
</p>

              <p className="mb-4 text-sm text-zinc-500">
  Brand Intelligence Packs are not translation packs. They extend
  TILLA-OS with local market reasoning, cultural context, brand
  language systems, content intelligence and region-specific
  decision support.
</p>

              <div className="mb-5">
                <p className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
                 Available Interview Languages
                </p>

                <div className="grid gap-2">
                  {includedLanguagePacks.map((pack) => (
                    <div
                      key={pack.id}
                      className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          {pack.nativeName}
                        </p>
                        <p className="text-xs text-zinc-500">{pack.name}</p>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700">
                        Included
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
                  Marketplace Brand Intelligence Packs
                </p>

                <div className="grid gap-2">
                  {marketplaceLanguagePacks.map((pack) => (
                    <div
                      key={pack.id}
                      className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          {pack.nativeName}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {pack.name} · ${pack.priceUsd.toFixed(2)}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-400"
                      >
                        Buy soon
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Brand Interview Language
                </label>
				<p className="mb-3 text-xs text-zinc-500">
  Choose the language you can express your brand most accurately in.
  This improves manifesto quality, brand memory and foundation accuracy.
</p>
                <select
                 value={setup.identity.interviewLanguage}
                  onChange={(e) =>
                    setSetup({
                      ...setup,
                      identity: {
                        ...setup.identity,
                        interviewLanguage: e.target.value as "tr" | "en" | "de" | "fr" | "es" | "it",
                      },
                    })
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                >
                  <option value="tr">Turkish</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Brand Foundation Language
                </label>
                <select
                  value={setup.identity.foundationLanguage}
                  onChange={(e) =>
                    setSetup({
                      ...setup,
                      identity: {
                        ...setup.identity,
                        foundationLanguage: e.target.value as "tr" | "en" | "de" | "fr" | "es" | "it",
                      },
                    })
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                >
                  <option value="tr">Turkish</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Prompt Language
                </label>
                <select
                  value={setup.identity.promptLanguage}
                  onChange={(e) =>
                    setSetup({
                      ...setup,
                      identity: {
                        ...setup.identity,
                        promptLanguage: e.target.value as "en",
                      },
                    })
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                >
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              const response = await fetch("/api/workspace/brand-setup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(setup),
              });

              if (!response.ok) {
                throw new Error("Workspace brand setup save failed");
              }
            }}
            className="mt-4 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Save Setup
          </button>
        </form>
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4">
          <p className="mb-3 text-xs uppercase tracking-widest text-zinc-400">
            Setup Debug
          </p>

          <pre className="overflow-auto rounded-xl bg-zinc-950 p-4 text-xs text-zinc-100">
            {JSON.stringify(setup, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}
