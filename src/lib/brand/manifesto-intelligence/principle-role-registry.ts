export type PrincipleRole = "core" | "supporting" | "derived";

export type PrincipleRoleDefinition = {
  key: string;
  role: PrincipleRole;
  governancePriority: number;
  outranks?: string[];
};

export const principleRoleRegistry: PrincipleRoleDefinition[] = [
  {
    key: "human_craft",
    role: "core",
    governancePriority: 100,
    outranks: ["material_truth", "longevity", "individuality", "trust"],
  },
  {
    key: "material_truth",
    role: "supporting",
    governancePriority: 70,
  },
  {
    key: "longevity",
    role: "supporting",
    governancePriority: 65,
  },
  {
    key: "individuality",
    role: "supporting",
    governancePriority: 60,
  },
  {
    key: "trust",
    role: "derived",
    governancePriority: 50,
  },
];

export function getPrincipleRoleDefinition(
  key: string,
): PrincipleRoleDefinition | undefined {
  return principleRoleRegistry.find((principle) => principle.key === key);
}
