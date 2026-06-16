import type { OutputPack } from "../output-pack-types";

export const trOutputPack: OutputPack = {
  meta: {
    id: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    description: "TILLA-OS Türkçe çıktı paketi",
    status: "core",
    source: "system",
    version: "1.0.0",
  },

  toneLabels: {
    restrained: "Ölçülü",
    premium: "Premium",
    warm: "Sıcak",
    direct: "Doğrudan",
    editorial: "Editoryal",
  },

  auditLabels: {
    aligned: "Uyumlu",
    weak: "Zayıf",
    risky: "Riskli",
    blocked: "Engellendi",
  },

  auditText: {
    violations: {
      forbiddenDirection:
        "İçerik yasaklı marka yönü sinyali veriyor: {{value}}",
    },
    recommendations: {
      removeOrReframe:
        "{{value}} yönünü çağrıştıran içeriği kaldır veya yeniden çerçevele.",
      strengthenBrandSignal: "{{value}} etrafındaki marka sinyalini güçlendir.",
    },
    driftAnalysis: {
      aligned:
        "İçerik; manifesto, constitution ve mevcut marka hafızasıyla genel olarak uyumlu.",
      fragmenting:
        "İçerik marka parçalanmasını artırabilir; mevcut hafıza zaten tutarsız yön gösteriyor.",
      shifting:
        "İçerik dikkatle incelenmeli; marka hafızası yön değişimi sinyali veriyor.",
      partialDrift:
        "İçerik kısmi marka sapması gösteriyor ve yayın öncesi düzeltilmeli.",
      critical:
        "İçerik temel governance kurallarını ihlal ediyor ve yayınlanmamalı.",
    },
    governanceSignals: {
      forbiddenDirectionDetected: "Yasaklı marka yönü tespit edildi.",
      lowAlignment: "Marka uyumu kabul edilebilir çalışma aralığının altında.",
      consistencyNotStable: "Marka tutarlılık trendi stabil değil: {{value}}.",
    },
  },

  decisionLabels: {
    selected: "Seçildi",
    rejected: "Reddedildi",
    recommended: "Önerilir",
    notRecommended: "Önerilmez",
    publishReady: "Yayına hazır",
    blocked: "Engellendi",
  },

  promptSections: {
    visualPrompt: "Görsel Prompt",
    negativePrompt: "Negatif Prompt",
    artDirection: "Sanat Yönü",
    scene: "Sahne",
    material: "Malzeme",
    lighting: "Işık",
    composition: "Kompozisyon",
  },

  visualPromptText: {
    subject: {
      premiumHandcraftedLeather: "Ultra premium el yapımı deri",
      honestArtisanPhotography: "dürüst zanaatkâr ürün fotoğrafçılığı",
    },

    material: {
      visibleNaturalGrain: "görünür doğal deri dokusu",
      subtleSurfaceVariation: "ince gözenekler ve yüzey farklılıkları",
      controlledHandmadeCharacter: "kontrollü el yapımı karakter",
      notFactoryPerfect:
        "fabrika kusursuzluğunda değil, birebir aynı değil, steril değil",
    },

    lighting: {
      controlledShadows: "kontrollü gölgeler",
      softHighlightDiscipline: "yumuşak vurgu ışığı disiplini",
    },

    camera: {
      realisticEditorialProductPhotography:
        "gerçekçi editoryal ürün fotoğrafçılığı",
    },

    composition: {
      premiumNegativeSpace: "premium negatif alan",
      quietLuxuryProductPlacement: "sessiz lüks ürün yerleşimi",
      colorPalette: "renk paleti",
    },

    atmosphere: {
      earnedConfidence: "hak edilmiş özgüven",
      calmEuropeanArtisanLuxury: "sakin Avrupa zanaatkâr lüksü",
    },

    microDetails: {
      title: "MİKRO DETAYLAR",
      handStitching: "el dikişi",
      edgeBurnishing: "kenar perdahı",
      naturalLeatherVariation: "doğal deri varyasyonu",
      humanCraftEvidence: "insan emeği izi",
      intentionalImperfection: "bilinçli kusursuz olmama hali",
      materialTruth: "malzeme gerçekliği",
    },

    negativePrompt: [
      "yazı",
      "filigran",
      "logo bozulması",
      "sahte deri",
      "plastik doku",
      "sentetik parlaklık",
      "ucuz aksesuarlar",
      "karmaşa",
      "aşırı patlamış ışıklar",
      "aşırı doygun renkler",
      "altın lüks klişeleri",
      "fabrika kusursuzluğunda steril yüzey",
      "seri üretim görünümü",
      "düşük çözünürlük",
      "çizgi film tarzı",
      "AI artefaktları",
    ],
  },

  narrative: {
    warmHeritage: {
      narrative: "Kullanıldıkça karakter kazanan nesneler.",
      productLanguage: {
        opening: "Zamanla karakter kazanan bir deri parça.",
        material:
          "Doğal dokusu ve sıcak tonu, kullanım izleriyle kişisel bir hikâyeye dönüşür.",
        emotion: "Gösterişli değil; sakin, dürüst ve kalıcı.",
      },
    },

    quietPower: {
      narrative: "Gösterişsiz özgüven.",
      productLanguage: {
        opening: "Sessiz ama güçlü bir duruş.",
        material: "Koyu deri yüzey, net form ve kontrollü detaylarla birleşir.",
        emotion: "Gereksiz hiçbir şey yok; yalnızca işlev, denge ve otorite.",
      },
    },

    default: {
      narrative: "Gündelik hayat için sessiz zanaatkârlık.",
      productLanguage: {
        opening: "Zamansız bir deri parça.",
        material: "Doğal deri dokusu, sade form ve el işçiliğiyle birleşir.",
        emotion: "Sessiz, dengeli ve uzun ömürlü.",
      },
    },
  },

  expressions: {
    materials: {
      frisco: {
        label: "zengin dokulu full grain deri",
        description: "Doğal damarları ve yüzey karakteri görünen hakiki deri",
      },
      crazy_horse: {
        label: "pull-up full grain deri",
        description: "Kullanımla karakter kazanan yağlı deri yüzeyi",
      },
      nubuck: {
        label: "yumuşak mat nubuk deri",
        description: "Kadifemsi, mat ve rafine deri dokusu",
      },
      suede: {
        label: "yumuşak süet deri",
        description: "Dokulu ve sıcak his veren süet yüzey",
      },
      vegetable_tanned: {
        label: "bitkisel tabaklanmış deri",
        description: "Zamanla patina geliştiren doğal tabaklanmış deri",
      },
    },

    colors: {
      camel: {
        label: "sıcak camel kahve",
        description: "Sıcak, doğal ve premium kahverengi ton",
      },
      warm_brown: {
        label: "zengin sıcak kahve",
        description: "Derin ve sıcak kahverengi deri tonu",
      },
      tan: {
        label: "doğal taba",
        description: "Doğal, açık ve zamansız deri tonu",
      },
      ivory: {
        label: "yumuşak fildişi",
        description: "Sade ve temiz destekleyici açık ton",
      },
      black: {
        label: "derin mat siyah",
        description: "Güçlü, sade ve premium siyah yüzey",
      },
      dark_brown: {
        label: "koyu çikolata kahve",
        description: "Derin, klasik ve güçlü kahverengi ton",
      },
      cognac: {
        label: "zengin konyak kahve",
        description: "Sıcak ve karakterli konyak deri tonu",
      },
      natural: {
        label: "doğal deri tonu",
        description: "İşlenmemiş ve dürüst deri rengi hissi",
      },
    },

    productTypes: {},

    channels: {
      website: {
        label: "web sitesi",
        description: "Markanın ana dijital satış ve sunum kanalı",
      },
      instagram: {
        label: "Instagram",
        description: "Sosyal medya görünürlüğü ve topluluk kanalı",
      },
      marketplace: {
        label: "pazaryeri",
        description: "Üçüncü taraf satış platformu",
      },
    },

    environments: {
      private_library: {
        label: "sessiz özel kütüphane ortamı",
        description: "Sakin, entelektüel ve güven veren iç mekân",
      },
      private_study: {
        label: "zamansız özel çalışma odası ortamı",
        description: "Klasik, rafine ve düşünsel çalışma sahnesi",
      },
      executive_office: {
        label: "sessiz yönetici ofisi ortamı",
        description: "Profesyonel, kontrollü ve güven veren ofis sahnesi",
      },
      artisan_workshop: {
        label: "rafine zanaatkâr atölyesi ortamı",
        description: "Ustalık ve üretim emeğini taşıyan atölye atmosferi",
      },
      modern_travel: {
        label: "modern seyahat ortamı",
        description: "Hareket, kullanım ve çağdaş yolculuk hissi",
      },
      minimal_gallery: {
        label: "minimal galeri ortamı",
        description: "Ürünü öne çıkaran sade ve temiz galeri sahnesi",
      },
      creative_studio: {
        label: "minimal yaratıcı stüdyo ortamı",
        description: "Temiz, kontrollü ve üretime odaklı stüdyo sahnesi",
      },
    },

    emotions: {
      quiet_confidence: {
        label: "sessiz özgüven",
        description: "Abartısız ama güçlü güven hissi",
      },
      warm_confidence: {
        label: "sıcak özgüven",
        description: "Yakın, güven veren ve olgun marka hissi",
      },
      quiet_luxury: {
        label: "sessiz lüks",
        description: "Gösterişsiz, rafine ve premium duygu",
      },
      artisan_heritage: {
        label: "zanaat mirası",
        description: "Ustalık, emek ve zamansız üretim hissi",
      },
      modern_restraint: {
        label: "modern ölçülülük",
        description: "Sade, kontrollü ve çağdaş ifade",
      },
      travel_ready: {
        label: "seyahate hazır sakinlik",
        description: "Hareketli ama kontrollü kullanım hissi",
      },
    },
  },

  semantic: {
    quiet_luxury: {
      label: "Sessiz lüks",
      description: "Gösterişsiz, rafine ve premium marka hissi",
    },
    artisan_heritage: {
      label: "Zanaat mirası",
      description: "İnsan emeği, ustalık ve geleneksel üretim hissi",
    },
    executive_artisan: {
      label: "Yönetici zanaatkâr",
      description: "Profesyonel ciddiyet ile el işçiliğinin birleşimi",
    },
    quiet_power: {
      label: "Sessiz güç",
      description: "Abartısız ama güçlü premium duruş",
    },
    modern_nomad: {
      label: "Modern gezgin",
      description: "Hareket, seyahat ve çağdaş kullanım hissi",
    },
    minimal_editorial: {
      label: "Minimal editoryal",
      description: "Temiz, sade ve editoryal görsel yön",
    },
    private_library: {
      label: "Sessiz özel kütüphane",
      description: "Sakin, entelektüel ve güven veren iç mekân sahnesi",
    },
    private_study: {
      label: "Zamansız özel çalışma odası",
      description: "Klasik, düşünsel ve rafine çalışma odası sahnesi",
    },
    executive_office: {
      label: "Sessiz yönetici ofisi",
      description: "Profesyonel, kontrollü ve güven veren ofis sahnesi",
    },
    artisan_workshop: {
      label: "Rafine zanaatkâr atölyesi",
      description: "Ustalık, malzeme ve üretim emeğini taşıyan atölye sahnesi",
    },
    minimal_gallery: {
      label: "Minimal galeri",
      description: "Temiz, sade ve ürünü öne çıkaran galeri sahnesi",
    },
    editorial_product: {
      label: "Editoryal ürün çekimi",
      description: "Ürünü dergi estetiğinde anlatan çekim türü",
    },
    editorial_hero: {
      label: "Premium editoryal hero kompozisyon",
      description: "Ana görsel için güçlü, premium ve editoryal kompozisyon",
    },
    premium_editorial: {
      label: "Premium editoryal kompozisyon",
      description: "Yüksek algılı, rafine ve yayın kalitesinde kompozisyon",
    },
    hero_composition: {
      label: "premium kahraman kompozisyonu",
      description:
        "Ana ürünü güçlü, sade ve premium bir sahne düzeniyle öne çıkaran kompozisyon.",
    },
    leica_m11: {
      label: "Leica M11 editoryal fotoğrafçılık",
      description: "Premium, gerçekçi ve editoryal ürün fotoğrafçılığı hissi.",
    },
    hasselblad_x2d: {
      label: "Hasselblad X2D orta format fotoğrafçılık",
      description:
        "Yüksek detaylı, rafine ve premium orta format görsel kalite.",
    },
    phase_one: {
      label: "Phase One ticari lüks fotoğrafçılık",
      description: "Yüksek seviye ticari ürün ve lüks marka fotoğrafçılığı.",
    },
    canon_r5: {
      label: "Canon R5 profesyonel ürün fotoğrafçılığı",
      description: "Gerçekçi, net ve profesyonel ürün fotoğrafçılığı.",
    },
  },
  advisor: {
    warnings: {
      archetypeConflict: "Mevcut karar baskın arketiple çelişiyor.",
      worldConflict: "Mevcut dünya baskın marka dünyasından farklı.",
      consistencyWeakening: "Marka tutarlılığı zayıflıyor.",
    },

    opportunities: {
      archetypeReinforced: "Mevcut karar baskın arketipi güçlendiriyor.",
      worldStrengthened: "Mevcut karar baskın marka dünyasını güçlendiriyor.",
      insufficientMemory:
        "Güçlü danışmanlık yargısı için henüz yeterli marka hafızası yok.",
    },

    actions: {
      reviewArchetypeDrift:
        "Bu yönü genişletmeden önce arketip sapmasını gözden geçir.",
      compareWorldNarrative: "Bu dünyayı baskın anlatı ortamıyla karşılaştır.",
      pauseCampaignExpansion:
        "Tutarlılık güçlenene kadar büyük kampanya genişlemesini durdur.",
      expandDominantWorld:
        "Kampanya varlıklarını baskın dünya etrafında genişlet.",
    },
  },
  governanceAuditText: {
    publishReadiness: {
      blocked: "Yayın engellendi.",
      ready: "Yayınlanabilir.",
    },

    constitution: {
      approved: "Marka Anayasası tarafından onaylandı.",
      rejected: "Marka Anayasası tarafından reddedildi.",
    },

    vetoRisk: {
      high: "Yüksek veto riski tespit edildi.",
      medium: "Orta düzey veto riski tespit edildi.",
      low: "Düşük veto riski.",
    },

    recommendations: {
      forbiddenDirectionDetected: "Yasaklı marka yönelimi tespit edildi.",
      corePrincipleConflict: "Temel marka ilkesiyle çatışma tespit edildi.",
      governancePassed: "İçerik temel governance kurallarından geçti.",
    },

    signals: {
      forbiddenDirectionDetected: "Yasaklı yönelim algılandı.",
      corePrincipleConflict: "Temel ilke çatışması algılandı.",
      governancePassed: "Governance doğrulaması başarılı.",
    },
  },
};
