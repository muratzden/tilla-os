import type { LanguagePack } from "../language-pack-types";

export const trPack: LanguagePack = {
  meta: {
    id: "tr",
    language: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    version: "1.0.0",
    source: "system",
  },

  dashboard: {
    appTitle: "TILLA-OS",
    appSubtitle: "Marka karar, yönetişim ve denetim sistemi",

    navigation: {
      overview: "Genel Bakış",
      foundation: "Temel",
      manifesto: "Manifesto",
      constitution: "Anayasa",
      governance: "Yönetişim",
      audit: "Denetim",
      output: "Çıktı",
      memory: "Hafıza",
      settings: "Ayarlar",
    },

    actions: {
      generate: "Üret",
      save: "Kaydet",
      approve: "Onayla",
      lock: "Kilitle",
      reset: "Sıfırla",
      import: "İçe Aktar",
      export: "Dışa Aktar",
      test: "Test Et",
    },

    labels: {
      brand: "Marka",
      brandId: "Marka ID",
      category: "Kategori",
      channel: "Kanal",
      language: "Dil",
      outputLanguage: "Çıktı Dili",
      status: "Durum",
      score: "Skor",
      risk: "Risk",
      readiness: "Hazırlık",
    },

    statuses: {
      healthy: "Sağlıklı",
      warning: "Uyarı",
      critical: "Kritik",
      ready: "Hazır",
      blocked: "Engellendi",
      low: "Düşük",
      medium: "Orta",
      high: "Yüksek",
    },
  },

  governance: {
    health: "Yönetişim Sağlığı",
    decisionVetoRisk: "Karar Veto Riski",
    forbiddenDirectionExposure: "Yasaklı Yön Maruziyeti",
    corePrincipleConflicts: "Çekirdek İlke Çatışmaları",
    signals: "Yönetişim Sinyalleri",
    recommendations: "Yönetişim Önerileri",
    publishReadiness: "Yayın Hazırlığı",
    blockedMessage:
      "Bu çıktı marka yönetişim kurallarını ihlal ediyor ve yayınlanmamalı.",
    readyMessage: "Bu çıktı marka yönetişim kurallarına göre yayınlanabilir.",
  },

  alignment: {
    brandAlignment: "Marka Uyumu",
    alignmentScore: "Uyum Skoru",
    constitutionAlignment: "Anayasa Uyumu",
    memoryAlignment: "Hafıza Uyumu",
    consistencyAlignment: "Tutarlılık Uyumu",
    driftLevel: "Sapma Seviyesi",
    driftAnalysis: "Marka Sapma Analizi",
  },

  brandSetup: {
    title: "Marka Kurulumu",
    subtitle: "Markanın temel kimliğini ve karar zeminini tanımla.",
    currentBrand: "Mevcut Marka",
    brandProfile: "Marka Profili",
    brandReadiness: "Marka Hazırlığı",
    premiumLevel: "Premium Seviye",
    tone: "Ton",
    personality: "Kişilik",
    aesthetic: "Estetik",
  },

  manifesto: {
    title: "Manifesto",
    subtitle: "Markanın niyetini, sınırlarını ve temel ilkelerini tanımlar.",
    interview: "Manifesto Görüşmesi",
    intelligence: "Manifesto Zekâsı",
    dominantPrinciple: "Baskın İlke",
    approval: "Manifesto Onayı",
    locked: "Kilitli",
    draft: "Taslak",
    approved: "Onaylandı",
  },

  constitution: {
    title: "Marka Anayasası",
    subtitle: "Manifestodan üretilen bağlayıcı karar kuralları.",
    generatedConstitution: "Üretilen Anayasa",
    corePrinciples: "Çekirdek İlkeler",
    forbiddenDirections: "Yasaklı Yönler",
    decisionRules: "Karar Kuralları",
    enforcement: "Uygulama",
  },

  audit: {
    title: "Marka Denetimi",
    subtitle: "Kanalların manifesto ve anayasaya uyumunu denetler.",
    source: "Denetim Kaynağı",
    channelAudit: "Kanal Denetimi",
    websiteAudit: "Web Sitesi Denetimi",
    socialAudit: "Sosyal Medya Denetimi",
    marketplaceAudit: "Pazaryeri Denetimi",
    emailAudit: "E-posta Denetimi",
    adAudit: "Reklam Denetimi",
  },

  output: {
    title: "Çıktı",
    subtitle: "Marka kararından üretilen içerik ve görsel yön.",
    visualPrompt: "Görsel Prompt",
    negativePrompt: "Negatif Prompt",
    contentOutput: "İçerik Çıktısı",
    bilingualOutput: "Çift Dilli Çıktı",
  },

  languagePacks: {
    title: "Dil Paketleri",
    subtitle:
      "Arayüz ve çıktı dillerini sistem ya da içe aktarılan paketlerle yönet.",
    installedPacks: "Yüklü Paketler",
    importPack: "Dil Paketi İçe Aktar",
    marketplacePacks: "Paket Pazaryeri",
    activePack: "Aktif Paket",
    packImported: "Dil paketi başarıyla içe aktarıldı.",
    invalidPack: "Geçersiz dil paketi.",
    missingKey: "Dil paketinde eksik anahtar var.",
  },
};
