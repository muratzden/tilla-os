import type {
  User,
  Workspace,
  Membership,
  Session,
  MarketplaceEntitlement,
  UserRole,
} from "./auth-types";

import type { AuthStorageAdapter } from "./auth-storage-adapter";

import { executeSql } from "../database/database-client";

function mapUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

function mapWorkspace(row: any): Workspace {
  return {
    id: row.id,
    name: row.name,
    ownerUserId: row.owner_user_id,
    createdAt: row.created_at,
  };
}

function mapMembership(row: any): Membership {
  return {
    workspaceId: row.workspace_id,
    userId: row.user_id,
    role: row.role as UserRole,
  };
}

function mapSession(row: any): Session {
  return {
    token: row.token,
    userId: row.user_id,
    activeWorkspaceId: row.active_workspace_id,
    expiresAt: row.expires_at,
  };
}

function mapEntitlement(row: any): MarketplaceEntitlement {
  return {
    workspaceId: row.workspace_id,
    packageId: row.package_id,
    grantedAt: row.granted_at,
  };
}

export const postgresAuthStorageAdapter: AuthStorageAdapter = {
  async getUsers() {
    const result = await executeSql(
      `
      SELECT id, email, password_hash, created_at
      FROM users
      ORDER BY created_at ASC
      `,
    );

    return result.rows.map(mapUser);
  },

  async saveUser(user: User) {
    await executeSql(
      `
      INSERT INTO users (
        id,
        email,
        password_hash,
        created_at
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id)
      DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        created_at = EXCLUDED.created_at
      `,
      [
        user.id,
        user.email,
        user.passwordHash,
        user.createdAt,
      ],
    );
  },

  async getUserByEmail(email: string) {
    const result = await executeSql(
      `
      SELECT id, email, password_hash, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [email],
    );

    const row = result.rows[0];

    return row ? mapUser(row) : undefined;
  },

  async saveWorkspace(workspace: Workspace) {
    await executeSql(
      `
      INSERT INTO workspaces (
        id,
        name,
        owner_user_id,
        created_at
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id)
      DO UPDATE SET
        name = EXCLUDED.name,
        owner_user_id = EXCLUDED.owner_user_id,
        created_at = EXCLUDED.created_at
      `,
      [
        workspace.id,
        workspace.name,
        workspace.ownerUserId,
        workspace.createdAt,
      ],
    );
  },

  async getWorkspace(workspaceId: string) {
    const result = await executeSql(
      `
      SELECT id, name, owner_user_id, created_at
      FROM workspaces
      WHERE id = $1
      LIMIT 1
      `,
      [workspaceId],
    );

    const row = result.rows[0];

    return row ? mapWorkspace(row) : undefined;
  },

  async addMembership(membership: Membership) {
    await executeSql(
      `
      INSERT INTO memberships (
        workspace_id,
        user_id,
        role
      )
      VALUES ($1, $2, $3)
      ON CONFLICT (workspace_id, user_id)
      DO UPDATE SET
        role = EXCLUDED.role
      `,
      [
        membership.workspaceId,
        membership.userId,
        membership.role,
      ],
    );
  },

  async getMemberships(userId: string) {
    const result = await executeSql(
      `
      SELECT workspace_id, user_id, role
      FROM memberships
      WHERE user_id = $1
      `,
      [userId],
    );

    return result.rows.map(mapMembership);
  },

  async saveSession(session: Session) {
    await executeSql(
      `
      INSERT INTO sessions (
        token,
        user_id,
        active_workspace_id,
        expires_at
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (token)
      DO UPDATE SET
        user_id = EXCLUDED.user_id,
        active_workspace_id = EXCLUDED.active_workspace_id,
        expires_at = EXCLUDED.expires_at
      `,
      [
        session.token,
        session.userId,
        session.activeWorkspaceId,
        session.expiresAt,
      ],
    );
  },

  async getSession(token: string) {
    const result = await executeSql(
      `
      SELECT token, user_id, active_workspace_id, expires_at
      FROM sessions
      WHERE token = $1
      LIMIT 1
      `,
      [token],
    );

    const row = result.rows[0];

    return row ? mapSession(row) : undefined;
  },

  async grantEntitlement(
    entitlement: MarketplaceEntitlement,
  ) {
    await executeSql(
      `
      INSERT INTO marketplace_entitlements (
        workspace_id,
        package_id,
        granted_at
      )
      VALUES ($1, $2, $3)
      ON CONFLICT (workspace_id, package_id)
      DO UPDATE SET
        granted_at = EXCLUDED.granted_at
      `,
      [
        entitlement.workspaceId,
        entitlement.packageId,
        entitlement.grantedAt,
      ],
    );
  },

  async getWorkspaceEntitlements(workspaceId: string) {
    const result = await executeSql(
      `
      SELECT workspace_id, package_id, granted_at
      FROM marketplace_entitlements
      WHERE workspace_id = $1
      `,
      [workspaceId],
    );

    return result.rows.map(mapEntitlement);
  },
};