import type { UserContract } from "../../domain/users/user-contract";
import type { AdminUser } from "../../domain/users/user-types";
import { getUsers } from "@/src/lib/auth/user-storage";

function toAdminUser(user: {
  id: string;
  email: string;
  createdAt?: string;
  created_at?: string;
}): AdminUser {
  return {
    id: user.id,
    email: user.email,
    status: "active",
    createdAt: user.createdAt ?? user.created_at ?? new Date().toISOString(),
  };
}

export class UserRepositoryImpl implements UserContract {
  async getUser(userId: string): Promise<AdminUser | null> {
    const users = await getUsers();
    const user = users.find((candidate) => candidate.id === userId);

    return user ? toAdminUser(user) : null;
  }

  async listUsers(): Promise<AdminUser[]> {
    const users = await getUsers();

    return users.map(toAdminUser);
  }
}