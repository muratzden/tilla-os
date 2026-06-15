type RenderContextInput = {
  world: any;
  scene: any;
  artDirection: any;
  dna?: any;
};

export function createRenderContext({
  world,
  scene,
  artDirection,
  dna,
}: RenderContextInput) {
  return {
    product: dna?.type ?? dna?.category,

    material: dna?.material,

    color: dna?.color,

    environment: world?.environment,

    surface: scene?.surface,

    props: scene?.props ?? [],

    camera: scene?.camera,

    lens: scene?.lens,

    lighting: scene?.lighting ?? artDirection?.lighting,

    lightingDirection: scene?.lightingDirection,

    atmosphere: artDirection?.atmosphere,

    styling: artDirection?.styling,

    composition: scene?.composition,

    palette: scene?.palette ?? [],
  };
}
