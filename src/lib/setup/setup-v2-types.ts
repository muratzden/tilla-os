export type BrandInterview = {
  identity: {
    description: string;
    offering: string;
    stage: string;
  };

  purpose: {
    disappearance: string;
    obsession: string;
    reasonToExist: string;
  };

  transformation: {
    before: string;
    after: string;
    transformation: string;
  };

  audience: {
    idealAudience: string;
    notFor: string;
    bestCustomer: string;
  };

  principles: {
    never: string;
    defend: string;
    boundaries: string;
  };

  ambition: {
    future: string;
    legacy: string;
    change: string;
  };

  constraints: {
    limitations: string;
    fixedResources: string;
    nonNegotiables: string;
  };
};

export type BrandInterviewV2 = {
  identity: string;
  purpose: string;
  transformation: string;
  audience: string;
  principles: string[];
  ambition: string;
  constraints: string[];
};

export type BrandManifestoV2 = {
  identity: string;
  mission: string;
  transformation: string;
  audience: string;
  principles: string[];
  vision: string;
};

export type BrandConstitutionV2 = {
  reject: string[];
  prefer: string[];
  productRules: string[];
  marketingRules: string[];
  customerRules: string[];
  growthRules: string[];
  boundaries: string[];
};

export const emptyBrandInterview: BrandInterview = {
  identity: {
    description: "",
    offering: "",
    stage: "",
  },

  purpose: {
    disappearance: "",
    obsession: "",
    reasonToExist: "",
  },

  transformation: {
    before: "",
    after: "",
    transformation: "",
  },

  audience: {
    idealAudience: "",
    notFor: "",
    bestCustomer: "",
  },

  principles: {
    never: "",
    defend: "",
    boundaries: "",
  },

  ambition: {
    future: "",
    legacy: "",
    change: "",
  },

  constraints: {
    limitations: "",
    fixedResources: "",
    nonNegotiables: "",
  },
};