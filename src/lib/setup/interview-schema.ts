export type InterviewField = {
  id: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
};

export type InterviewSection = {
  id: string;
  title: string;
  description: string;
  fields: InterviewField[];
};

export const interviewSections: InterviewSection[] = [
  {
    id: "identity",
    title: "Identity",
    description: "Tell us what you are building.",
    fields: [
      {
        id: "brandName",
        label: "What is the name of this brand?",
        placeholder: "Example: North & Co.",
      },
      {
        id: "category",
        label: "What category is this brand in?",
        placeholder:
          "Example: coffee brand, dental clinic, boutique hotel, SaaS",
      },
      {
        id: "description",
        label: "How would you describe what you are building?",
        multiline: true,
      },
      {
        id: "offering",
        label: "What do you provide?",
      },
      {
        id: "stage",
        label: "What stage are you currently in?",
      },
    ],
  },

  {
    id: "purpose",
    title: "Purpose",
    description: "Why does this venture exist?",
    fields: [
      {
        id: "disappearance",
        label: "If your venture disappeared tomorrow, what would people miss?",
        multiline: true,
      },
      {
        id: "obsession",
        label: "What problem are you obsessed with solving?",
        multiline: true,
      },
      {
        id: "reasonToExist",
        label: "Why does this venture deserve to exist?",
        multiline: true,
      },
    ],
  },

  {
    id: "transformation",
    title: "Transformation",
    description: "Describe the change you create.",
    fields: [
      {
        id: "before",
        label: "How are people before they discover you?",
        multiline: true,
      },
      {
        id: "after",
        label: "How are people after working with you?",
        multiline: true,
      },
      {
        id: "transformation",
        label: "What transformation do you create?",
        multiline: true,
      },
    ],
  },

  {
    id: "audience",
    title: "Audience",
    description: "Who benefits most from your work?",
    fields: [
      {
        id: "idealAudience",
        label: "Who benefits most from what you do?",
        multiline: true,
      },
      {
        id: "notFor",
        label: "Who is not a good fit?",
        multiline: true,
      },
      {
        id: "bestCustomer",
        label: "Describe your ideal customer.",
        multiline: true,
      },
    ],
  },

  {
    id: "principles",
    title: "Principles",
    description: "Define your boundaries.",
    fields: [
      {
        id: "never",
        label: "What will you never do?",
        multiline: true,
      },
      {
        id: "defend",
        label: "What will you always defend?",
        multiline: true,
      },
      {
        id: "boundaries",
        label: "What lines will you never cross?",
        multiline: true,
      },
    ],
  },

  {
    id: "ambition",
    title: "Ambition",
    description: "Define your future.",
    fields: [
      {
        id: "future",
        label: "What do you want to become in 10 years?",
        multiline: true,
      },
      {
        id: "legacy",
        label: "What should people remember you for?",
        multiline: true,
      },
      {
        id: "change",
        label: "What change do you want to create?",
        multiline: true,
      },
    ],
  },

  {
    id: "constraints",
    title: "Constraints",
    description: "Define reality.",
    fields: [
      {
        id: "limitations",
        label: "What limits you today?",
        multiline: true,
      },
      {
        id: "fixedResources",
        label: "What resources are fixed?",
        multiline: true,
      },
      {
        id: "nonNegotiables",
        label: "What compromises will you never make?",
        multiline: true,
      },
    ],
  },
];
