export type CorePrincipleRule = {
  principleKey: string;
  priority: number;
  mustDominateWhenPresent: boolean;
};

export const corePrincipleRegistry: CorePrincipleRule[] = [
  {
    principleKey: "human_craft",
    priority: 100,
    mustDominateWhenPresent: true,
  },
  {
    principleKey: "material_truth",
    priority: 80,
    mustDominateWhenPresent: false,
  },
  {
    principleKey: "longevity",
    priority: 70,
    mustDominateWhenPresent: false,
  },
  {
    principleKey: "individuality",
    priority: 60,
    mustDominateWhenPresent: false,
  },
  {
    principleKey: "trust",
    priority: 50,
    mustDominateWhenPresent: false,
  },
];
