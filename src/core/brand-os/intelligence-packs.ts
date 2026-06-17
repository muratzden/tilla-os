import type { IntelligencePackDefinition } from "./types";

export const INTELLIGENCE_PACKS: IntelligencePackDefinition[] = [
  {
    id: "coffee",
    label: "Coffee",
    appliesTo: ["coffee"],
    status: "metadata_only",
    description: "External pack slot for coffee market context."
  },
  {
    id: "dental",
    label: "Dental",
    appliesTo: ["dental", "clinic"],
    status: "metadata_only",
    description: "External pack slot for dental market context."
  },
  {
    id: "hospitality",
    label: "Hospitality",
    appliesTo: ["hotel", "stay", "hospitality"],
    status: "metadata_only",
    description: "External pack slot for hospitality market context."
  },
  {
    id: "restaurant",
    label: "Restaurant",
    appliesTo: ["restaurant", "dining"],
    status: "metadata_only",
    description: "External pack slot for restaurant market context."
  },
  {
    id: "saas",
    label: "SaaS",
    appliesTo: ["saas", "software", "startup"],
    status: "metadata_only",
    description: "External pack slot for SaaS market context."
  },
  {
    id: "creator",
    label: "Creator",
    appliesTo: ["creator", "media"],
    status: "metadata_only",
    description: "External pack slot for creator market context."
  },
  {
    id: "local_service",
    label: "Local Service",
    appliesTo: ["local service", "service business"],
    status: "metadata_only",
    description: "External pack slot for local service market context."
  },
  {
    id: "personal_brand",
    label: "Personal Brand",
    appliesTo: ["personal brand", "consultant", "expert"],
    status: "metadata_only",
    description: "External pack slot for personal brand context."
  }
];
