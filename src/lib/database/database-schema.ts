export const authTables = {
  users: "users",
  workspaces: "workspaces",
  memberships: "memberships",
  sessions: "sessions",
  marketplaceEntitlements: "marketplace_entitlements",
  workspaceSettings: "workspace_settings",
  workspaceMarketplaceInstallations:
    "workspace_marketplace_installations",
} as const;

export const postgresAuthSchema = [
  `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS workspaces (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS memberships (
    workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),

    PRIMARY KEY (workspace_id, user_id)
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    active_workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS marketplace_entitlements (
    workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    package_id TEXT NOT NULL,
    granted_at TEXT NOT NULL,

    PRIMARY KEY (workspace_id, package_id)
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS workspace_settings (
    workspace_id TEXT PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,
    brand_setup JSONB,
    updated_at TEXT NOT NULL
  )
  `,

  `
  CREATE TABLE IF NOT EXISTS workspace_marketplace_installations (
    workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    package_id TEXT NOT NULL,
    type TEXT NOT NULL,
    version TEXT NOT NULL,
    entitlement TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT false,
    installed_at TEXT NOT NULL,

    PRIMARY KEY (workspace_id, package_id)
  )
  `,

  `
  CREATE INDEX IF NOT EXISTS idx_workspaces_owner_user_id
  ON workspaces(owner_user_id)
  `,

  `
  CREATE INDEX IF NOT EXISTS idx_memberships_user_id
  ON memberships(user_id)
  `,

  `
  CREATE INDEX IF NOT EXISTS idx_sessions_user_id
  ON sessions(user_id)
  `,

  `
  CREATE INDEX IF NOT EXISTS idx_sessions_active_workspace_id
  ON sessions(active_workspace_id)
  `,

  `
  CREATE INDEX IF NOT EXISTS idx_workspace_marketplace_installations_workspace_id
  ON workspace_marketplace_installations(workspace_id)
  `,
] as const;