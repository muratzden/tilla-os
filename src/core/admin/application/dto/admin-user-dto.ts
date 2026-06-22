import type { AdminUserStatus } from "../../domain/users/user-types";

export interface AdminUserDto {
  id: string;
  email: string;
  status: AdminUserStatus;
  createdAt: string;
  updatedAt: string | null;
}