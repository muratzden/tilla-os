import type { SystemLanguage } from "../system-languages";
import type { LanguagePack } from "../language-pack-types";

import { trPack } from "./tr";
import { enPack } from "./en";
import { dePack } from "./de";

export const systemLanguagePacks: Partial<
  Record<SystemLanguage, LanguagePack>
> = {
  tr: trPack,
  en: enPack,
  de: dePack,
};

export const installedSystemLanguages = Object.keys(
  systemLanguagePacks,
) as SystemLanguage[];
