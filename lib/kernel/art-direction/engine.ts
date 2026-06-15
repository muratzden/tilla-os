export function createArtDirection(identity: string, emotion: string) {
  return {
    lighting: "natural_window_light",
    surface: "dark_walnut_workbench",
    mood: emotion,
    styling: identity,
    cameraStyle: "leica_editorial",
    atmosphere: "quiet_luxury",
  };
}
