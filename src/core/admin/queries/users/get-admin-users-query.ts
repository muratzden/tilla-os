import type { AdminCompositionRoot } from "../../admin-composition-root";
import type { AdminUserDto } from "../../application/dto/admin-user-dto";
import { toAdminUserDto } from "../../application/mappers/admin-user-mapper";
import type { AdminQueryHandler } from "../contracts/admin-query-handler";

export const getAdminUsersQuery: AdminQueryHandler<
  AdminCompositionRoot,
  AdminUserDto[]
> = async (admin) => {
  const users = await admin.services.userAdminService.listUsers();

  return users.map(toAdminUserDto);
};