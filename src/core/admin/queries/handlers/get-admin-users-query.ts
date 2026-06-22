import type { AdminCompositionRoot } from "../../admin-composition-root";
import { toAdminUserDto } from "../../application/mappers/admin-user-mapper";
import type { AdminUserDto } from "../../application/dto/admin-user-dto";

export async function getAdminUsersQuery(
  admin: AdminCompositionRoot,
): Promise<AdminUserDto[]> {
  const users = await admin.services.userAdminService.listUsers();

  return users.map(toAdminUserDto);
}