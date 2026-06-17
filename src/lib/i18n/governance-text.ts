import type { OutputLanguage } from "./language";

type GovernanceTextKey =
  | "governanceHealth"
  | "brandAlignment"
  | "decisionVetoRisk"
  | "forbiddenDirectionExposure"
  | "corePrincipleConflicts"
  | "governanceSignals"
  | "governanceRecommendations"
  | "alignmentScore"
  | "constitutionAlignment"
  | "memoryAlignment"
  | "consistencyAlignment"
  | "driftLevel"
  | "healthy"
  | "warning"
  | "critical"
  | "low"
  | "medium"
  | "high"
  | "aligned"
  | "needsReview"
  | "atRisk"
  | "noGovernanceSignals"
  | "noGovernanceRecommendations"
  | "noCorePrincipleConflicts"
  | "noForbiddenDirectionExposure"
  | "brandAuditEngine"
  | "brandAuditDescription"
  | "channel"
  | "contentToAudit"
  | "auditing"
  | "runAudit"
  | "brandDriftAnalysis"
  | "violations"
  | "noViolationsDetected"
  | "exposureCount"
  | "governanceResultUnavailable"
  | "governanceStatus"
  | "allowed"
  | "yes"
  | "no"
  | "governanceScore"
  | "appliedRules"
    | "noAppliedRules"
  | "brandGovernanceTitle"
  | "governanceWorkspaceTitle"
  | "governanceWorkspaceDescription"
  | "governanceLayerLabel"
  | "channelWebsite"
  | "channelSocialMedia"
  | "channelMarketplace"
  | "channelEmail"
  | "channelAdvertising"
  | "brandHealthTitle"
  | "driftRiskLabel"
  | "decisionVetoRiskLabel"
  | "exposureLabel"
  | "advancedAuditToolTitle"
  | "advancedAuditToolDescription"
  | "showLabel"
  | "hideLabel"
  | "alignmentLabel"
  | "constitutionLabel"
  | "memoryLabel"
  | "consistencyLabel";

const governanceText: Partial<
  Record<OutputLanguage, Record<GovernanceTextKey, string>>
> = {
  en: {
    governanceHealth: "Governance Health",
    brandAlignment: "Brand Alignment",
    decisionVetoRisk: "Decision Veto Risk",
    forbiddenDirectionExposure: "Forbidden Direction Exposure",
    corePrincipleConflicts: "Core Principle Conflicts",
    governanceSignals: "Governance Signals",
    governanceRecommendations: "Governance Recommendations",
    alignmentScore: "Alignment Score",
    constitutionAlignment: "Constitution Alignment",
    memoryAlignment: "Memory Alignment",
    consistencyAlignment: "Consistency Alignment",
    driftLevel: "Drift Level",
    healthy: "Healthy",
    warning: "Warning",
    critical: "Critical",
    low: "Low",
    medium: "Medium",
    high: "High",
    aligned: "Aligned",
    needsReview: "Needs Review",
    atRisk: "At Risk",
    noGovernanceSignals: "No governance signals detected.",
    noGovernanceRecommendations: "No governance recommendations.",
    noCorePrincipleConflicts: "No core principle conflicts detected.",
    noForbiddenDirectionExposure: "No forbidden direction exposure detected.",
    brandAuditEngine: "Brand Audit Engine",
    brandAuditDescription:
      "Evaluate external brand content against the manifesto, constitution, memory and consistency system.",
    channel: "Channel",
    contentToAudit: "Content to Audit",
    auditing: "Auditing...",
    runAudit: "Run Audit",
    brandDriftAnalysis: "Brand Drift Analysis",
    violations: "Violations",
    noViolationsDetected: "No violations detected.",
    exposureCount: "Exposure Count",
    governanceResultUnavailable: "Governance result is not available yet.",
    governanceStatus: "Governance Status",
    allowed: "Allowed",
    yes: "YES",
    no: "NO",
    governanceScore: "Governance Score",
    appliedRules: "Applied Rules",
    noAppliedRules: "No applied rules.",
	    brandGovernanceTitle: "Brand Governance",
    governanceWorkspaceTitle: "Governance Workspace",
    governanceWorkspaceDescription:
      "Manage constitution alignment, governance controls and drift signals from one workspace.",
    governanceLayerLabel: "Governance Layer",
    channelWebsite: "Website",
    channelSocialMedia: "Social Media",
    channelMarketplace: "Marketplace",
    channelEmail: "Email",
    channelAdvertising: "Advertising",
    brandHealthTitle: "Brand Health",
    driftRiskLabel: "Drift Risk",
    decisionVetoRiskLabel: "Decision Veto Risk",
    exposureLabel: "Exposure",
    advancedAuditToolTitle: "Advanced Audit Tool",
    advancedAuditToolDescription: "Open to manually audit channel content.",
    showLabel: "Show",
    hideLabel: "Hide",
    alignmentLabel: "Alignment",
    constitutionLabel: "Constitution",
    memoryLabel: "Memory",
    consistencyLabel: "Consistency",
  },
  tr: {
    governanceHealth: "Yönetişim Sağlığı",
    brandAlignment: "Marka Uyumu",
    decisionVetoRisk: "Karar Veto Riski",
    forbiddenDirectionExposure: "Yasaklı Yön Maruziyeti",
    corePrincipleConflicts: "Çekirdek İlke Çatışmaları",
    governanceSignals: "Yönetişim Sinyalleri",
    governanceRecommendations: "Yönetişim Önerileri",
    alignmentScore: "Uyum Skoru",
    constitutionAlignment: "Anayasa Uyumu",
    memoryAlignment: "Hafıza Uyumu",
    consistencyAlignment: "Tutarlılık Uyumu",
    driftLevel: "Sapma Seviyesi",
    healthy: "Sağlıklı",
    warning: "Uyarı",
    critical: "Kritik",
    low: "Düşük",
    medium: "Orta",
    high: "Yüksek",
    aligned: "Uyumlu",
    needsReview: "İnceleme Gerekli",
    atRisk: "Riskli",
    noGovernanceSignals: "Yönetişim sinyali tespit edilmedi.",
    noGovernanceRecommendations: "Yönetişim önerisi yok.",
    noCorePrincipleConflicts: "Çekirdek ilke çatışması tespit edilmedi.",
    noForbiddenDirectionExposure: "Yasaklı yön maruziyeti tespit edilmedi.",
    brandAuditEngine: "Marka Denetim Motoru",
    brandAuditDescription:
      "Marka içeriğini manifesto, anayasa, hafıza ve tutarlılık sistemine göre denetler.",
    channel: "Kanal",
    contentToAudit: "Denetlenecek İçerik",
    auditing: "Denetleniyor...",
    runAudit: "Denetimi Başlat",
    brandDriftAnalysis: "Marka Sapma Analizi",
    violations: "İhlaller",
    noViolationsDetected: "İhlal tespit edilmedi.",
    exposureCount: "Maruziyet Sayısı",
    governanceResultUnavailable: "Yönetişim sonucu henüz hazır değil.",
    governanceStatus: "Yönetişim Durumu",
    allowed: "İzin Durumu",
    yes: "EVET",
    no: "HAYIR",
    governanceScore: "Yönetişim Skoru",
    appliedRules: "Uygulanan Kurallar",
    noAppliedRules: "Uygulanan kural yok.",
	    brandGovernanceTitle: "Marka Yönetişimi",
    governanceWorkspaceTitle: "Yönetişim Merkezi",
    governanceWorkspaceDescription:
      "Marka anayasası, yönetişim kuralları, hizalama ve sapma sinyallerini tek merkezden yönet.",
    governanceLayerLabel: "Yönetişim Katmanı",
    channelWebsite: "Web Sitesi",
    channelSocialMedia: "Sosyal Medya",
    channelMarketplace: "Pazaryeri",
    channelEmail: "E-posta",
    channelAdvertising: "Reklam",
    brandHealthTitle: "Marka Sağlığı",
    driftRiskLabel: "Sapma Riski",
    decisionVetoRiskLabel: "Karar Veto Riski",
    exposureLabel: "Maruziyet",
    advancedAuditToolTitle: "Gelişmiş Denetim Aracı",
    advancedAuditToolDescription:
      "Kanal içeriğini manuel denetlemek için aç.",
    showLabel: "Göster",
    hideLabel: "Gizle",
    alignmentLabel: "Uyum",
    constitutionLabel: "Anayasa",
    memoryLabel: "Hafıza",
    consistencyLabel: "Tutarlılık",
  },
};

export function getGovernanceText(
  language: OutputLanguage,
  key: GovernanceTextKey,
): string {
  return (
    governanceText[language]?.[key] ??
    governanceText.en?.[key] ??
    governanceText.tr?.[key] ??
    key
  );
}
