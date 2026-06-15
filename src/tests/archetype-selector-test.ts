import { selectArchetype } from "../lib/brand/archetype-selector";

console.log(
  selectArchetype({
    type: "briefcase",
    material: "frisco",
    color: "camel",
  }),
);
