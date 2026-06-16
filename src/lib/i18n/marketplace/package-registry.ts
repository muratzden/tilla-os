export type PackageVersionEntry = {
  version: string;
  releasedAt: string;
  changelog: string[];
};

export type PackageRegistryEntry = {
  packageId: string;
  latestVersion: string;
  versions: PackageVersionEntry[];
};

export const packageRegistry: Record<string, PackageRegistryEntry> = {
  "de-marketplace": {
    packageId: "de-marketplace",

    latestVersion: "1.1.0",

    versions: [
      {
        version: "1.0.0",
        releasedAt: "2026-06-14",
        changelog: ["Initial marketplace release"],
      },
      {
        version: "1.1.0",
        releasedAt: "2026-06-14",
        changelog: [
          "Improved German output expressions",
          "Prepared package registry update flow",
        ],
      },
    ],
  },
};

export function getPackageRegistryEntry(
  packageId: string,
): PackageRegistryEntry {
  const entry = packageRegistry[packageId];

  if (!entry) {
    throw new Error(`Package '${packageId}' was not found in registry`);
  }

  return entry;
}

export function getPackageVersionEntry(
  packageId: string,
  version: string,
): PackageVersionEntry {
  const entry = getPackageRegistryEntry(packageId);

  const versionEntry = entry.versions.find((item) => item.version === version);

  if (!versionEntry) {
    throw new Error(
      `Version '${version}' was not found for package '${packageId}'`,
    );
  }

  return versionEntry;
}

export function getLatestPackageVersion(packageId: string): string {
  return getPackageRegistryEntry(packageId).latestVersion;
}

export function getPackageVersionHistory(
  packageId: string,
): PackageVersionEntry[] {
  return [...getPackageRegistryEntry(packageId).versions];
}

export function packageVersionExists(
  packageId: string,
  version: string,
): boolean {
  const entry = packageRegistry[packageId];

  if (!entry) {
    return false;
  }

  return entry.versions.some((item) => item.version === version);
}
