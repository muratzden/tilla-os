import { selectArchetype } from "../lib/brand/archetype-selector";
import { composeScene } from "../lib/brand/scene-composer";
import { worldComposer } from "../lib/brand/world/world-composer";

const dna = {
  type: "briefcase",
  material: "frisco",
  color: "camel",
  size: "13",
};

const archetype = selectArchetype(dna);

const world = worldComposer(archetype.archetype);

const scene = composeScene({
  dna,
  archetype,
  world,
});

console.log({
  dna,
  archetype,
  world,
  scene,
});
