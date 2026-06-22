import { createAdminCompositionRoot } from "../admin-composition-root";

const adminCompositionRoot = createAdminCompositionRoot();

export const adminServices = adminCompositionRoot.services;