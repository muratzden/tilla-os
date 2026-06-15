import type { OutputLanguage } from "@/src/lib/i18n/language";
import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type OutputTabProps = {
  pipeline: any;
  language?: OutputLanguage;
};

export function OutputTab({ pipeline, language = "tr" }: OutputTabProps) {
  const uiLanguage = language === "en" ? "en" : "tr";

  const text = (key: Parameters<typeof getDashboardText>[0]) =>
    getDashboardText(key, uiLanguage);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          {text("visualPrompt")}
        </div>

        <pre className="mt-4 whitespace-pre-wrap text-sm text-zinc-700">
          {pipeline?.visualPrompt?.positivePrompt ?? "-"}
        </pre>
      </div>

      <div className="rounded-[2rem] border border-[#e7e2d8] bg-white p-6 shadow-sm">
        <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          {text("negativePrompt")}
        </div>

        <pre className="mt-4 whitespace-pre-wrap text-sm text-zinc-700">
          {pipeline?.visualPrompt?.negativePrompt ?? "-"}
        </pre>
      </div>
    </div>
  );
}
