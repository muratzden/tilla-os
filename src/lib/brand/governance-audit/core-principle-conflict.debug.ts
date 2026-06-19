import { detectCorePrincipleConflicts } from "./core-principle-conflict";

console.log(
  detectCorePrincipleConflicts({
    content:
      "This factory made synthetic product is designed for mass production.",
    principleKeys: [
      "human_craft",
      "material_truth",
      "individuality",
      "longevity",
    ],
  }),
);
