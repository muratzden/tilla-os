import type { AdminUser } from "../../domain/users/user-types";

export interface UserContract {
  getUser(userId: string): Promise<AdminUser | null>;

  listUsers(): Promise<AdminUser[]>;
}