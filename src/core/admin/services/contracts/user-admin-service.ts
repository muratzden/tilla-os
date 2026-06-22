import type { AdminUser } from "../../domain/users/user-types";

export interface UserAdminService {
  getUser(userId: string): Promise<AdminUser | null>;

  listUsers(): Promise<AdminUser[]>;
}