type UILanguage = "tr" | "en";

export type DashboardTextKey =
  | "decisionIntelligence"
  | "decisionSummary"
  | "decisionStrength"
  | "whySelected"
  | "whyRejected"
  | "decisionConfidence"
  | "rejectedAlternatives"
  | "worldExplorer"
  | "decisionGraph"
  | "brandAdvisor"
  | "foundation"
  | "execution"
  | "dashboardTitle"
  | "outputLanguage"
  | "generating"
  | "generateDecision"
  | "brandDecisionSystem"
  | "currentBrand"
  | "brandProfile"
  | "brandSetupReadiness"
  | "decisionLayer"
  | "selectedWorld"
  | "decisionEngine"
  | "visualPrompt"
  | "negativePrompt"
  | "useWorld"
  | "decisionMargin"
  | "foundationDescription"
  | "name"
  | "category"
  | "premium"
  | "tone"
  | "personality"
  | "aesthetic"
  | "confidence"
  | "violations"
  | "apiContext"
  | "activeBrandContext"
  | "advisorConfidence"
  | "brandDecisionSummary"
  | "brandDecisionSummaryDescription"
  | "executiveLayer"
  | "archetype"
  | "world"
  | "brandHealth"
  | "recommendedAction"
  | "brandGuidance"
  | "recommendedNextMove"
  | "primaryAction"
  | "risks"
  | "noImmediateBrandRisk"
  | "opportunities"
  | "noClearOpportunity"
  | "dominantArchetype"
  | "dominantWorld"
  | "apiContextActive"
  | "premiumLevel"
  | "advisorRecommendations"
  | "warnings"
  | "noWarnings"
  | "noOpportunities"
  | "actions"
  | "noActions"
  | "governanceSignals"
  | "noGovernanceSignals"
  | "legacyBrandAdvisor"
  | "recommendation"
  | "campaignOpportunity"
  | "worldSelection"
  | "worldAnalysis"
  | "selected"
  | "candidate"
  | "final"
  | "heritage"
  | "craft"
  | "material"
  | "campaign"
  | "worldCandidates"
  | "scene"
  | "trend"
  | "brandMemory"
  | "totalDecisions"
  | "averageConfidence"
  | "brandConsistency"
  | "consistencyScore"
  | "archetypeMemory"
  | "worldMemory"
  | "count"
  | "noMemoryYet"
  | "manifestoInterview"
  | "manifestoInterviewDescription"
  | "brandType"
  | "generateManifesto"
  | "manifestoStatus"
  | "draftNotLocked"
  | "approveManifesto"
  | "lockManifesto"
  | "narrative"
  | "dominantPrinciple"
  | "none"
  | "role"
  | "governancePriority"
  | "principles"
  | "noPrincipleSignals"
  | "forbiddenDirections"
  | "noForbiddenDirectionSignals"
  | "generatedConstitution"
  | "corePrinciple"
  | "noCorePrincipleDetected"
  | "supportingPrinciples"
  | "noSupportingPrinciplesDetected"
  | "secondaryPrinciples"
  | "noSecondaryPrinciplesDetected"
  | "noForbiddenDirectionsDetected"
  | "decisionRules"
  | "noDecisionRulesGenerated"
  | "brandHealthStatusHealthy"
  | "brandHealthStatusWarning"
  | "brandHealthStatusCritical"
  | "statusLow"
  | "statusMedium"
  | "statusHigh"
  | "statusReady"
  | "statusBlocked"
  | "statusActive"
  | "statusLocked"
  | "statusLearning"
  | "statusWaiting"
  | "statusImproving"
  | "statusStable"
  | "statusDeclining"
  | "governance"
  | "driftRisk"
  | "publish"
  | "alignment"
  | "memory"
  | "consistency"
  | "brandBrain"
    | "systemStatus"
  | "missionControl"
  | "systemScoreboard"
  | "liveBrandOperatingStatus"
  | "brandHealthCard"
  | "foundationScore"
  | "alignmentCard"
  | "aligned"
  | "governanceCard"
  | "protected"
  | "activeStatus"
  | "memoryCard"
  | "strong"
    | "loaded"
  | "activity"
  | "systemSignals"
  | "liveWorkspace"
  | "today"
  | "yesterday"
  | "governanceCheckCompleted"
  | "governanceCheckCompletedDetail"
  | "brandMemoryLoaded"
  | "brandMemoryLoadedDetail"
  | "marketplaceLanguageStateChecked"
   | "marketplaceLanguageStateCheckedDetail"
  | "workspace"
  | "operatingSystemModules"
  | "workspaceGridDescription"
  | "primaryWorkspace"
  | "supportingModule"
  | "decisionEngineReady"
  | "healthy"
  | "stable"
  | "attention"
  | "readiness"
  | "contentStudioOnline"
  | "updates"
  | "current"
  | "updatesAvailable"
  | "allPackagesCurrent"
  | "status"
    | "active"
  | "commandCenter"
  | "brandHealthCenter"
  | "brandOperatingSystem"
  | "knowledge"
  | "logout"
  | "more"
  | "currentModule"
  | "overview"
  | "overviewDescription"
  | "decisionEngineDescription"
  | "governanceCenter"
  | "governanceCenterDescription"
  | "auditCenter"
  | "auditCenterDescription"
  | "studios"
  | "studiosDescription"
   | "marketplace"
  | "marketplaceDescription"
  | "foundationModuleDescription"
    | "manifestoModuleDescription"
  | "premiumBrand"
    | "primaryStatus"
  | "typeLabel"
  | "materialLabel"
  | "colorLabel"
  | "sizeLabel"
  | "channelLabel"
  | "archetypeLabel"
  | "worldLabel"
  | "confidenceLabel"
  | "positivePrompt"
  | "negativePrompt";
  
  

const dashboardText: Record<
  DashboardTextKey,
  {
    tr: string;
    en: string;
  }
> = {
  decisionIntelligence: {
    tr: "Karar Analizi",
    en: "Decision Intelligence",
  },

  decisionSummary: {
    tr: "Karar Özeti",
    en: "Decision Summary",
  },

  decisionStrength: {
    tr: "Karar Gücü",
    en: "Decision Strength",
  },

  whySelected: {
    tr: "Neden Seçildi",
    en: "Why Selected",
  },

  whyRejected: {
    tr: "Neden Reddedildi",
    en: "Why Rejected",
  },

  decisionConfidence: {
    tr: "Karar Güveni",
    en: "Decision Confidence",
  },

  rejectedAlternatives: {
    tr: "Reddedilen Alternatifler",
    en: "Rejected Alternatives",
  },

  worldExplorer: {
    tr: "Dünya Keşfi",
    en: "World Explorer",
  },

  decisionGraph: {
    tr: "Karar Grafiği",
    en: "Decision Graph",
  },

  brandAdvisor: {
    tr: "Marka Danışmanı",
    en: "Brand Advisor",
  },

  foundation: {
    tr: "Temel Katman",
    en: "Foundation",
  },

  execution: {
    tr: "Uygulama",
    en: "Execution",
  },
  dashboardTitle: {
    tr: "Marka Karar Paneli v0.3",
    en: "Brand Decision Dashboard v0.3",
  },

  outputLanguage: {
    tr: "Çıktı Dili",
    en: "Output Language",
  },

  generating: {
    tr: "Üretiliyor...",
    en: "Generating...",
  },

  generateDecision: {
    tr: "Karar Üret",
    en: "Generate Decision",
  },

  brandDecisionSystem: {
    tr: "Marka Karar Sistemi",
    en: "Brand Decision System",
  },
  currentBrand: {
    tr: "Aktif Marka",
    en: "Current Brand",
  },

  brandProfile: {
    tr: "Marka Profili",
    en: "Brand Profile",
  },

  brandSetupReadiness: {
    tr: "Marka Kurulum Hazırlığı",
    en: "Brand Setup Readiness",
  },

  decisionLayer: {
    tr: "Karar Katmanı",
    en: "Decision Layer",
  },

  selectedWorld: {
    tr: "Seçilen Dünya",
    en: "Selected World",
  },

  decisionEngine: {
    tr: "Karar Motoru",
    en: "Decision Engine",
  },

  visualPrompt: {
    tr: "Görsel Prompt",
    en: "Visual Prompt",
  },

  negativePrompt: {
    tr: "Negatif Prompt",
    en: "Negative Prompt",
  },

  useWorld: {
    tr: "Dünyayı Kullan",
    en: "Use World",
  },

  decisionMargin: {
    tr: "Karar Farkı",
    en: "Decision Margin",
  },

  foundationDescription: {
    tr: "Marka kararını destekleyen sinyaller.",
    en: "Supporting signals behind the brand decision.",
  },

  name: {
    tr: "İsim",
    en: "Name",
  },

  category: {
    tr: "Kategori",
    en: "Category",
  },

  premium: {
    tr: "Premium",
    en: "Premium",
  },

  tone: {
    tr: "Ton",
    en: "Tone",
  },

  personality: {
    tr: "Kişilik",
    en: "Personality",
  },

  aesthetic: {
    tr: "Estetik",
    en: "Aesthetic",
  },

  confidence: {
    tr: "Güven",
    en: "Confidence",
  },

  violations: {
    tr: "İhlaller",
    en: "Violations",
  },

  apiContext: {
    tr: "API Bağlamı",
    en: "API Context",
  },

  apiContextActive: {
    tr: "API Bağlamı Aktif",
    en: "API Context Active",
  },

  premiumLevel: {
    tr: "Premium Seviye",
    en: "Premium",
  },

  activeBrandContext: {
    tr: "Aktif Marka Bağlamı",
    en: "Active Brand Context",
  },
  advisorConfidence: {
    tr: "Danışman Güveni",
    en: "Advisor Confidence",
  },
  brandDecisionSummary: {
    tr: "Marka Karar Özeti",
    en: "Brand Decision Summary",
  },

  brandDecisionSummaryDescription: {
    tr: "Mevcut ürün kararı; marka kurulumu, anayasa, hafıza ve tutarlılık zekası üzerinden yorumlanır.",
    en: "Current product decision interpreted through brand setup, constitution, memory and consistency intelligence.",
  },

  executiveLayer: {
    tr: "Yönetici Katman",
    en: "Executive Layer",
  },

  archetype: {
    tr: "Arketip",
    en: "Archetype",
  },

  world: {
    tr: "Dünya",
    en: "World",
  },

  brandHealth: {
    tr: "Marka Sağlığı",
    en: "Brand Health",
  },

  recommendedAction: {
    tr: "Önerilen Aksiyon",
    en: "Recommended Action",
  },

  brandGuidance: {
    tr: "Marka Rehberliği",
    en: "Brand Guidance",
  },

  recommendedNextMove: {
    tr: "Önerilen sonraki hamle",
    en: "Recommended next move",
  },

  primaryAction: {
    tr: "Birincil Aksiyon",
    en: "Primary Action",
  },

  risks: {
    tr: "Riskler",
    en: "Risks",
  },

  noImmediateBrandRisk: {
    tr: "Acil marka riski tespit edilmedi.",
    en: "No immediate brand risk detected.",
  },

  opportunities: {
    tr: "Fırsatlar",
    en: "Opportunities",
  },

  noClearOpportunity: {
    tr: "Henüz net bir fırsat tespit edilmedi.",
    en: "No clear opportunity detected yet.",
  },

  dominantArchetype: {
    tr: "Baskın Arketip",
    en: "Dominant Archetype",
  },

  dominantWorld: {
    tr: "Baskın Dünya",
    en: "Dominant World",
  },

  advisorRecommendations: {
    tr: "Danışman önerileri",
    en: "Advisor recommendations",
  },

  warnings: {
    tr: "Uyarılar",
    en: "Warnings",
  },

  noWarnings: {
    tr: "Uyarı yok.",
    en: "No warnings.",
  },

  noOpportunities: {
    tr: "Fırsat yok.",
    en: "No opportunities.",
  },

  actions: {
    tr: "Aksiyonlar",
    en: "Actions",
  },

  noActions: {
    tr: "Aksiyon yok.",
    en: "No actions.",
  },

  governanceSignals: {
    tr: "Yönetişim Sinyalleri",
    en: "Governance Signals",
  },

  noGovernanceSignals: {
    tr: "Yönetişim sinyali yok.",
    en: "No governance signals.",
  },

  legacyBrandAdvisor: {
    tr: "Eski Marka Danışmanı",
    en: "Legacy Brand Advisor",
  },

  recommendation: {
    tr: "Öneri",
    en: "Recommendation",
  },

  campaignOpportunity: {
    tr: "Kampanya Fırsatı",
    en: "Campaign Opportunity",
  },
  worldSelection: {
    tr: "Dünya Seçimi",
    en: "World Selection",
  },

  worldAnalysis: {
    tr: "Dünya Analizi",
    en: "World Explorer",
  },

  selected: {
    tr: "Seçildi",
    en: "Selected",
  },

  candidate: {
    tr: "Aday",
    en: "Candidate",
  },

  final: {
    tr: "Nihai",
    en: "Final",
  },

  heritage: {
    tr: "Miras",
    en: "Heritage",
  },

  craft: {
    tr: "Zanaat",
    en: "Craft",
  },

  material: {
    tr: "Malzeme",
    en: "Material",
  },

  campaign: {
    tr: "Kampanya",
    en: "Campaign",
  },

  worldCandidates: {
    tr: "Dünya Adayları",
    en: "World Candidates",
  },

  scene: {
    tr: "Sahne",
    en: "Scene",
  },
  brandMemory: {
    tr: "Marka Hafızası",
    en: "Brand Memory",
  },

  totalDecisions: {
    tr: "Toplam Karar",
    en: "Total Decisions",
  },

  averageConfidence: {
    tr: "Ortalama Güven",
    en: "Average Confidence",
  },

  brandConsistency: {
    tr: "Marka Tutarlılığı",
    en: "Brand Consistency",
  },

  consistencyScore: {
    tr: "Tutarlılık Skoru",
    en: "Consistency Score",
  },

  archetypeMemory: {
    tr: "Arketip Hafızası",
    en: "Archetype Memory",
  },

  worldMemory: {
    tr: "Dünya Hafızası",
    en: "World Memory",
  },

  count: {
    tr: "Adet",
    en: "Count",
  },

  noMemoryYet: {
    tr: "Henüz hafıza yok.",
    en: "No memory yet.",
  },

  manifestoInterview: {
    tr: "Manifesto Görüşmesi",
    en: "Manifesto Interview",
  },

  manifestoInterviewDescription: {
    tr: "Stratejik kurulum sorularını yanıtla. TILLA-OS, kullanıcının marka yönünü sonradan serbestçe değiştirmesi yerine manifestoyu bu görüşmeden üretir.",
    en: "Answer strategic setup questions. TILLA-OS generates the manifesto from the interview instead of letting the user freely rewrite the brand direction later.",
  },

  brandType: {
    tr: "Marka Türü",
    en: "Brand Type",
  },

  generateManifesto: {
    tr: "Manifesto Üret",
    en: "Generate Manifesto",
  },

  manifestoStatus: {
    tr: "Manifesto Durumu",
    en: "Manifesto Status",
  },

  draftNotLocked: {
    tr: "TASLAK / KİLİTLİ DEĞİL",
    en: "DRAFT / NOT LOCKED",
  },

  approveManifesto: {
    tr: "Manifestoyu Onayla",
    en: "Approve Manifesto",
  },

  lockManifesto: {
    tr: "Manifestoyu Kilitle",
    en: "Lock Manifesto",
  },

  narrative: {
    tr: "Anlatı",
    en: "Narrative",
  },

  dominantPrinciple: {
    tr: "Baskın İlke",
    en: "Dominant Principle",
  },

  none: {
    tr: "yok",
    en: "none",
  },

  role: {
    tr: "Rol",
    en: "Role",
  },

  governancePriority: {
    tr: "Yönetişim Önceliği",
    en: "Governance Priority",
  },

  principles: {
    tr: "İlkeler",
    en: "Principles",
  },

  noPrincipleSignals: {
    tr: "Henüz ilke sinyali tespit edilmedi.",
    en: "No principle signals detected yet.",
  },

  forbiddenDirections: {
    tr: "Yasaklı Yönler",
    en: "Forbidden Directions",
  },

  noForbiddenDirectionSignals: {
    tr: "Henüz yasaklı yön sinyali tespit edilmedi.",
    en: "No forbidden direction signals detected yet.",
  },

  generatedConstitution: {
    tr: "Üretilen Anayasa",
    en: "Generated Constitution",
  },

  corePrinciple: {
    tr: "Çekirdek İlke",
    en: "Core Principle",
  },

  noCorePrincipleDetected: {
    tr: "Çekirdek ilke tespit edilmedi.",
    en: "No core principle detected.",
  },

  supportingPrinciples: {
    tr: "Destekleyici İlkeler",
    en: "Supporting Principles",
  },

  noSupportingPrinciplesDetected: {
    tr: "Destekleyici ilke tespit edilmedi.",
    en: "No supporting principles detected.",
  },

  secondaryPrinciples: {
    tr: "İkincil İlkeler",
    en: "Secondary Principles",
  },

  noSecondaryPrinciplesDetected: {
    tr: "İkincil ilke tespit edilmedi.",
    en: "No secondary principles detected.",
  },

  noForbiddenDirectionsDetected: {
    tr: "Yasaklı yön tespit edilmedi.",
    en: "No forbidden directions detected.",
  },

  decisionRules: {
    tr: "Karar Kuralları",
    en: "Decision Rules",
  },

  noDecisionRulesGenerated: {
    tr: "Karar kuralı üretilmedi.",
    en: "No decision rules generated.",
  },

  trend: {
    tr: "Trend",
    en: "Trend",
  },
  brandHealthStatusHealthy: {
    tr: "Sağlıklı",
    en: "Healthy",
  },

  brandHealthStatusWarning: {
    tr: "Uyarı",
    en: "Warning",
  },

  brandHealthStatusCritical: {
    tr: "Kritik",
    en: "Critical",
  },

  statusLow: {
    tr: "Düşük",
    en: "Low",
  },

  statusMedium: {
    tr: "Orta",
    en: "Medium",
  },

  statusHigh: {
    tr: "Yüksek",
    en: "High",
  },

  statusReady: {
    tr: "Hazır",
    en: "Ready",
  },

  statusBlocked: {
    tr: "Engellendi",
    en: "Blocked",
  },

  statusActive: {
    tr: "Aktif",
    en: "Active",
  },

  statusLocked: {
    tr: "Kilitli",
    en: "Locked",
  },

  statusLearning: {
    tr: "Öğreniyor",
    en: "Learning",
  },

  statusWaiting: {
    tr: "Bekliyor",
    en: "Waiting",
  },

  statusImproving: {
    tr: "İyileşiyor",
    en: "Improving",
  },

  statusStable: {
    tr: "Stabil",
    en: "Stable",
  },

  statusDeclining: {
    tr: "Zayıflıyor",
    en: "Declining",
  },

  governance: {
    tr: "Yönetişim",
    en: "Governance",
  },

  driftRisk: {
    tr: "Sapma Riski",
    en: "Drift Risk",
  },

  publish: {
    tr: "Yayın",
    en: "Publish",
  },

  alignment: {
    tr: "Uyum",
    en: "Alignment",
  },

  memory: {
    tr: "Hafıza",
    en: "Memory",
  },

  consistency: {
    tr: "Tutarlılık",
    en: "Consistency",
  },

  brandBrain: {
    tr: "Marka Beyni",
    en: "Brand Brain",
  },

  systemStatus: {
    tr: "Sistem Durumu",
    en: "System Status",
  },
  missionControl: {
  tr: "Görev Merkezi",
  en: "Mission Control",
},

systemScoreboard: {
  tr: "Sistem Skor Tablosu",
  en: "System Scoreboard",
},

liveBrandOperatingStatus: {
  tr: "Canlı marka işletim durumu.",
  en: "Live brand operating status.",
},

brandHealthCard: {
  tr: "Marka Sağlığı",
  en: "Brand Health",
},

foundationScore: {
  tr: "Temel Skoru",
  en: "Foundation Score",
},

alignmentCard: {
  tr: "Uyum",
  en: "Alignment",
},

aligned: {
  tr: "Uyumlu",
  en: "Aligned",
},

governanceCard: {
  tr: "Yönetişim",
  en: "Governance",
},

protected: {
  tr: "Korunuyor",
  en: "Protected",
},

activeStatus: {
  tr: "Aktif",
  en: "Active",
},

memoryCard: {
  tr: "Hafıza",
  en: "Memory",
},

strong: {
  tr: "Güçlü",
  en: "Strong",
},

loaded: {
  tr: "Yüklendi",
  en: "Loaded",
},

activity: {
  tr: "Aktivite",
  en: "Activity",
},

systemSignals: {
  tr: "Sistem Sinyalleri",
  en: "System Signals",
},

liveWorkspace: {
  tr: "Canlı çalışma alanı",
  en: "Live workspace",
},

today: {
  tr: "Bugün",
  en: "Today",
},

yesterday: {
  tr: "Dün",
  en: "Yesterday",
},

governanceCheckCompleted: {
  tr: "Yönetişim kontrolü tamamlandı",
  en: "Governance check completed",
},

governanceCheckCompletedDetail: {
  tr: "Marka anayasası ve karar kuralları aktif.",
  en: "Brand constitution and decision rules are active.",
},

brandMemoryLoaded: {
  tr: "Marka hafızası yüklendi",
  en: "Brand memory loaded",
},

brandMemoryLoadedDetail: {
  tr: "Çalışma alanı bağlamı karar üretimi için hazır.",
  en: "Workspace context is available for decision generation.",
},

marketplaceLanguageStateChecked: {
  tr: "Marketplace dil durumu kontrol edildi",
  en: "Marketplace language state checked",
},

marketplaceLanguageStateCheckedDetail: {
  tr: "Çıktı dil paketleri çalışma alanı ayarları üzerinden yönetiliyor.",
  en: "Output language packs are controlled through workspace settings.",
},
workspace: {
  tr: "Çalışma Alanı",
  en: "Workspace",
},

operatingSystemModules: {
  tr: "İşletim Sistemi Modülleri",
  en: "Operating System Modules",
},

workspaceGridDescription: {
  tr: "Decision Engine ana çalışma alanıdır. Governance, Studios ve Marketplace işletim sistemini destekler.",
  en: "Decision Engine is the primary workspace. Governance, Studios and Marketplace support the operating system.",
},

primaryWorkspace: {
  tr: "Ana Çalışma Alanı",
  en: "Primary Workspace",
},

supportingModule: {
  tr: "Destek Modülü",
  en: "Supporting Module",
},

decisionEngineReady: {
  tr: "Decision Engine Hazır",
  en: "Decision Engine Ready",
},

healthy: {
  tr: "SAĞLIKLI",
  en: "HEALTHY",
},

stable: {
  tr: "STABİL",
  en: "STABLE",
},

attention: {
  tr: "DİKKAT",
  en: "ATTENTION",
},

readiness: {
  tr: "Hazırlık",
  en: "Readiness",
},

contentStudioOnline: {
  tr: "Content Studio Çevrim İçi",
  en: "Content Studio Online",
},

updates: {
  tr: "GÜNCELLEME",
  en: "UPDATES",
},

current: {
  tr: "GÜNCEL",
  en: "CURRENT",
},

updatesAvailable: {
  tr: "Güncelleme Mevcut",
  en: "Updates Available",
},

allPackagesCurrent: {
  tr: "Tüm Paketler Güncel",
  en: "All Packages Current",
},

status: {
  tr: "Durum",
  en: "Status",
},

active: {
  tr: "Aktif",
  en: "Active",
},
commandCenter: {
  tr: "Komuta Merkezi",
  en: "Command Center",
},

brandHealthCenter: {
  tr: "Marka Sağlık Merkezi",
  en: "Brand Health Center",
},

brandOperatingSystem: {
  tr: "Marka İşletim Sistemi",
  en: "Brand Operating System",
},

knowledge: {
  tr: "Bilgi Katmanı",
  en: "Knowledge",
},

logout: {
  tr: "Çıkış Yap",
  en: "Logout",
},

more: {
  tr: "Daha Fazla",
  en: "More",
},

currentModule: {
  tr: "Mevcut Modül",
  en: "Current Module",
},

overview: {
  tr: "Genel Bakış",
  en: "Overview",
},

overviewDescription: {
  tr: "İşletim sisteminin üst seviye görünümü.",
  en: "High-level operating system overview.",
},

decisionEngineDescription: {
  tr: "Yönetilen marka kararlarını değerlendirir ve üretir.",
  en: "Evaluate and generate governed brand decisions.",
},

governanceCenter: {
  tr: "Yönetişim Merkezi",
  en: "Governance Center",
},

governanceCenterDescription: {
  tr: "Uyum, tutarlılık ve yönetişim sinyallerini izler.",
  en: "Monitor alignment, consistency and governance.",
},

auditCenter: {
  tr: "Denetim Merkezi",
  en: "Audit Center",
},

auditCenterDescription: {
  tr: "Marka sağlığı ve yönetişim raporlarını inceler.",
  en: "Review brand health and governance reports.",
},

studios: {
  tr: "Stüdyolar",
  en: "Studios",
},

marketplace: {
  tr: "Marketplace",
  en: "Marketplace",
},

studiosDescription: {
  tr: "İçerik ve operasyonel çıktılar üretir.",
  en: "Create content and operational outputs.",
},

marketplaceDescription: {
  tr: "Dil paketlerini ve sistem modüllerini yönetir.",
  en: "Manage language packs and system modules.",
},

foundationModuleDescription: {
  tr: "Marka kimliği ve stratejik yapının temel katmanı.",
  en: "Core brand identity and strategic structure.",
},

manifestoModuleDescription: {
  tr: "Marka anayasası ve yönlendirici ilkeler.",
  en: "Brand constitution and guiding principles.",
},

premiumBrand: {
  tr: "Premium Marka",
  en: "Premium Brand",
},

primaryStatus: {
  tr: "ANA",
  en: "PRIMARY",
},
typeLabel: {
  tr: "Ürün Tipi",
  en: "Type",
},

materialLabel: {
  tr: "Malzeme",
  en: "Material",
},

colorLabel: {
  tr: "Renk",
  en: "Color",
},

sizeLabel: {
  tr: "Boyut",
  en: "Size",
},

channelLabel: {
  tr: "Kanal",
  en: "Channel",
},

archetypeLabel: {
  tr: "Arketip",
  en: "Archetype",
},

worldLabel: {
  tr: "Dünya",
  en: "World",
},

confidenceLabel: {
  tr: "Güven",
  en: "Confidence",
},

positivePrompt: {
  tr: "Pozitif Prompt",
  en: "Positive Prompt",
},

};

export function getDashboardText(
  key: DashboardTextKey,
  uiLanguage: UILanguage = "tr",
) {
  return dashboardText[key][uiLanguage];
}

export const dashboardTextKeys = Object.keys(
  dashboardText,
) as DashboardTextKey[];
