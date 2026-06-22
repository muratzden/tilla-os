import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type FoundationTabProps = {
  brandReadiness: any;
  brandProfile: any;
  language?: OutputLanguage;
};

export function FoundationTab({
  brandReadiness,
  brandProfile,
  language = "tr",
}: FoundationTabProps) {
  const uiLanguage = language === "en" ? "en" : "tr";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, uiLanguage);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          Brand
        </div>

        <div className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-zinc-900">
          {brandProfile.name}
        </div>

        <div className="mt-2 text-sm text-zinc-500">
          {text("activeBrandContext")}
        </div>

        <div className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {text("apiContextActive")}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          {text("brandSetupReadiness")}
        </div>

        <div className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-zinc-900">
          {brandReadiness?.score}/100
        </div>

        <div className="mt-6 space-y-3">
          {Object.entries(brandReadiness?.sections ?? {}).map(
            ([key, score]) => (
              <div
                key={key}
                className="flex items-center justify-between border-b border-[#e7e2d8] pb-2 text-sm"
              >
                <span className="capitalize text-zinc-500">{key}</span>

                <span className="font-medium text-zinc-900">
                  {String(score)}%
                </span>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          {text("brandProfile")}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProfileRow label={text("name")} value={brandProfile?.name} />

          <ProfileRow label={text("category")} value={brandProfile?.category} />

          <ProfileRow
            label={text("premiumLevel")}
            value={brandProfile?.premiumLevel}
          />

          <ProfileRow label={text("tone")} value={brandProfile?.tone} />

          <ProfileRow
            label={text("personality")}
            value={brandProfile?.personality}
          />

          <ProfileRow
            label={text("aesthetic")}
            value={brandProfile?.aesthetic}
          />
        </div>
      </section>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl border border-[#e7e2d8] bg-[#fcfbf8] p-4">
      <div className="text-xs uppercase tracking-widest text-zinc-400">
        {label}
      </div>

      <div className="mt-2 font-medium text-zinc-900">{value ?? "-"}</div>
    </div>
  );
}
