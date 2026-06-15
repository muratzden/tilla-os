import { useState } from "react";

type InstalledLanguageView = {
  language: string;
  packageId?: string;
  source: string;
  installedAt: string | null;
  currentVersion: string;
  latestVersion: string;
  updateAvailable: boolean;
  active: boolean;
};

type VersionHistoryView = {
  language: string;
  packageId: string;
  version: string;
  activatedAt: string;
};

type LanguageMarketplacePanelProps = {
  active: string;
  installed: string[];
  installedLanguages?: InstalledLanguageView[];
  updates?: InstalledLanguageView[];
  versionHistory?: VersionHistoryView[];

  onRefresh?: () => Promise<void>;
};

export function LanguageMarketplacePanel({
  active,
  installed,
  installedLanguages = [],
  updates = [],
  versionHistory = [],
  onRefresh,
}: LanguageMarketplacePanelProps) {
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function runMarketplaceAction(
    actionKey: string,
    endpoint: string,
    body: Record<string, string>
  ) {
    try {
      setPendingAction(actionKey);
      setActionError(null);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error ?? "Marketplace action failed");
      }

      await onRefresh?.();
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Marketplace action failed"
      );
    } finally {
      setPendingAction(null);
    }
  }

  const visibleInstalledLanguages =
    installedLanguages.length > 0
      ? installedLanguages
      : installed.map((language) => ({
          language,
          source: "system",
          installedAt: null,
          currentVersion: "system",
          latestVersion: "system",
          updateAvailable: false,
          active: active === language,
        }));

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-white shadow-xl">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Marketplace
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
          Output Language Marketplace
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Manage installed language packs, updates, version history, and rollback.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatusCard label="Active Language" value={active.toUpperCase()} />
        <StatusCard
          label="Installed Packs"
          value={String(visibleInstalledLanguages.length)}
        />
        <StatusCard label="Available Updates" value={String(updates.length)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Installed Languages">
          <div className="space-y-3">
            {visibleInstalledLanguages.map((pack) => (
              <LanguageRow key={pack.language} pack={pack} />
            ))}
          </div>
        </Panel>

        <Panel title="Available Updates">
          {updates.length > 0 ? (
            <div className="space-y-3">
              {updates.map((pack) => (
                <div
                  key={pack.language}
                  className="rounded-xl border border-amber-700/40 bg-amber-950/20 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium uppercase text-white">
                        {pack.language}
                      </div>

                      <div className="mt-1 text-xs text-zinc-400">
                        {pack.currentVersion} → {pack.latestVersion}
                      </div>
                    </div>

                                        <button
                      type="button"
                      disabled={pendingAction === `update-${pack.language}`}
                      onClick={() =>
                        runMarketplaceAction(
                          `update-${pack.language}`,
                          "/api/language-marketplace/update",
                          {
                            language: pack.language,
                          }
                        )
                      }
                      className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {pendingAction === `update-${pack.language}`
                        ? "Updating..."
                        : "Update"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No available updates." />
          )}
        </Panel>

        <Panel title="Version History">
          {versionHistory.length > 0 ? (
            <div className="space-y-3">
              {versionHistory.map((entry, index) => (
                <div
                  key={`${entry.packageId}-${entry.version}-${index}`}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium uppercase text-white">
                        {entry.language}
                      </div>

                      <div className="mt-1 text-xs text-zinc-500">
                        {entry.packageId}
                      </div>
                    </div>

                                        <div className="text-right">
                      <div className="text-sm text-zinc-300">
                        v{entry.version}
                      </div>

                      <div className="mt-1 text-xs text-zinc-500">
                        {formatDate(entry.activatedAt)}
                      </div>

                      <button
                        type="button"
                        disabled={
                          pendingAction ===
                          `install-version-${entry.packageId}-${entry.version}`
                        }
                        onClick={() =>
                          runMarketplaceAction(
                            `install-version-${entry.packageId}-${entry.version}`,
                            "/api/language-marketplace/install-version",
                            {
                              packageId: entry.packageId,
                              language: entry.language,
                              version: entry.version,
                            }
                          )
                        }
                        className="mt-3 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {pendingAction ===
                        `install-version-${entry.packageId}-${entry.version}`
                          ? "Installing..."
                          : "Install Version"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No version history yet." />
          )}
        </Panel>

        <Panel title="Rollback">
          {versionHistory.length > 1 ? (
            <div className="space-y-3">
              {versionHistory.slice(0, -1).map((entry, index) => (
                <div
                  key={`rollback-${entry.packageId}-${entry.version}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                >
                  <div>
                    <div className="font-medium uppercase text-white">
                      {entry.language}
                    </div>

                    <div className="mt-1 text-xs text-zinc-500">
                      Roll back to v{entry.version}
                    </div>
                  </div>

                                    <button
                    type="button"
                    disabled={pendingAction === `rollback-${entry.language}`}
                    onClick={() =>
                      runMarketplaceAction(
                        `rollback-${entry.language}`,
                        "/api/language-marketplace/rollback",
                        {
                          language: entry.language,
                        }
                      )
                    }
                    className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pendingAction === `rollback-${entry.language}`
                      ? "Rolling back..."
                      : "Rollback"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Rollback requires at least one previous version." />
          )}
        </Panel>
      </div>
    </section>
  );
}

function LanguageRow({ pack }: { pack: InstalledLanguageView }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
      <div>
        <div className="flex items-center gap-2">
          <div className="font-medium uppercase text-white">
            {pack.language}
          </div>

          {pack.active && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
              Active
            </span>
          )}
        </div>

        <div className="mt-1 text-xs text-zinc-500">
          Source: {pack.source}
        </div>

        <div className="mt-1 text-xs text-zinc-600">
          Installed: {formatDate(pack.installedAt)}
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm text-zinc-300">
          {pack.currentVersion === "system"
            ? "system"
            : `v${pack.currentVersion}`}
        </div>

        <div className="mt-1 text-xs text-zinc-500">
          Latest:{" "}
          {pack.latestVersion === "system"
            ? "system"
            : `v${pack.latestVersion}`}
        </div>
      </div>
    </div>
  );
}

function StatusCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="text-xs uppercase tracking-widest text-zinc-500">
        {label}
      </div>

      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-300">
        {title}
      </h3>

      {children}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 px-4 py-6 text-sm text-zinc-500">
      {text}
    </div>
  );
}

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}