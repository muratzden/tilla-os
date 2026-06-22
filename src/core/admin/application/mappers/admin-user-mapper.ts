import type { AdminUser } from "../../domain/users/user-types";
import type { AdminUserDto } from "../dto/admin-user-dto";

export function toAdminUserDto(user: AdminUser): AdminUserDto {
  return {
    id: user.id,
    email: user.email,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt ?? null,
  };
}