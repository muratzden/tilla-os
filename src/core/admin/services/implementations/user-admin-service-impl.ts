import type { UserContract } from "../../domain/users/user-contract";
import type { UserAdminService } from "../contracts/user-admin-service";

export class UserAdminServiceImpl implements UserAdminService {
  constructor(private readonly userRepository: UserContract) {}

  async getUser(userId: string) {
    return this.userRepository.getUser(userId);
  }

  async listUsers() {
    return this.userRepository.listUsers();
  }
}