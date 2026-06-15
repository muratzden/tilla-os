export const intentRegistry = {
  product_page: {
    objective: "conversion",
    audience: "purchase_ready_visitor",
    messageRole: "prove_value",
    ctaBehavior: "clear_soft_cta",
    emotionalPressure: "low",
  },

  instagram: {
    objective: "awareness",
    audience: "brand_discovery_audience",
    messageRole: "create_desire",
    ctaBehavior: "none_or_soft",
    emotionalPressure: "medium",
  },

  pinterest: {
    objective: "inspiration",
    audience: "visual_research_audience",
    messageRole: "express_style_world",
    ctaBehavior: "none",
    emotionalPressure: "low",
  },

  packaging: {
    objective: "brand_confirmation",
    audience: "existing_customer",
    messageRole: "reinforce_choice",
    ctaBehavior: "none",
    emotionalPressure: "very_low",
  },

  email: {
    objective: "relationship",
    audience: "warm_customer_or_lead",
    messageRole: "build_trust",
    ctaBehavior: "contextual",
    emotionalPressure: "low",
  },

  photography: {
    objective: "visual_authority",
    audience: "brand_viewer",
    messageRole: "make_product_feel_real",
    ctaBehavior: "none",
    emotionalPressure: "low",
  },

  meta_feed: {
    objective: "performance_conversion",
    audience: "cold_or_warm_buyer",
    messageRole: "stop_scroll_and_clarify_value",
    ctaBehavior: "direct",
    emotionalPressure: "medium",
  },
} as const;

export type IntentChannel = keyof typeof intentRegistry;
