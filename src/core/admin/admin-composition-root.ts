import { SettingsRepositoryImpl } from "./repositories/implementations/settings-repository-impl";
import { UserRepositoryImpl } from "./repositories/implementations/user-repository-impl";
import { WorkspaceRepositoryImpl } from "./repositories/implementations/workspace-repository-impl";

import { SettingsAdminServiceImpl } from "./services/implementations/settings-admin-service-impl";
import { UserAdminServiceImpl } from "./services/implementations/user-admin-service-impl";
import { WorkspaceAdminServiceImpl } from "./services/implementations/workspace-admin-service-impl";

export function createAdminCompositionRoot() {
  const settingsRepository = new SettingsRepositoryImpl();
  const userRepository = new UserRepositoryImpl();
  const workspaceRepository = new WorkspaceRepositoryImpl();

  const settingsAdminService = new SettingsAdminServiceImpl(settingsRepository);
  const userAdminService = new UserAdminServiceImpl(userRepository);
  const workspaceAdminService = new WorkspaceAdminServiceImpl(workspaceRepository);

  return {
    repositories: {
      settingsRepository,
      userRepository,
      workspaceRepository,
    },
    services: {
      settingsAdminService,
      userAdminService,
      workspaceAdminService,
    },
  };
}

export type AdminCompositionRoot = ReturnType<typeof createAdminCompositionRoot>;