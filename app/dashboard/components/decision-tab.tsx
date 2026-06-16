import { getDashboardText } from "@/src/lib/i18n/dashboard-text";

type OutputLanguage = "tr" | "en" | "de";
type UILanguage = "tr" | "en";

type InputState = {
  type: string;
  material: string;
  color: string;
  size: string;
  channel: string;
  outputLanguage: OutputLanguage;
};

type DecisionTabProps = {
  pipeline: any;
  uiLanguage: UILanguage;
  language: OutputLanguage;
  input: InputState;
  loading: boolean;
  onInputChange: (input: InputState) => void;
  onGenerate: () => void;
};

export function DecisionTab({
  pipeline,
  uiLanguage,
  input,
  loading,
  onInputChange,
  onGenerate,
}: DecisionTabProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 md:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-600">
            Decision Engine
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
            Generate a governed brand decision
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Use this module when you need a new decision. The dashboard remains
            focused on brand health, governance, memory and alignment.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
          <Input
            label={getDashboardText("typeLabel", uiLanguage)}
            value={input.type}
            onChange={(value) => onInputChange({ ...input, type: value })}
          />

          <Input
            label={getDashboardText("materialLabel", uiLanguage)}
            value={input.material}
            onChange={(value) => onInputChange({ ...input, material: value })}
          />

          <Input
            label={getDashboardText("colorLabel", uiLanguage)}
            value={input.color}
            onChange={(value) => onInputChange({ ...input, color: value })}
          />

          <Input
            label={getDashboardText("sizeLabel", uiLanguage)}
            value={input.size}
            onChange={(value) => onInputChange({ ...input, size: value })}
          />

          <Input
            label={getDashboardText("channelLabel", uiLanguage)}
            value={input.channel}
            onChange={(value) => onInputChange({ ...input, channel: value })}
          />
        </div>

        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-white/10 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? getDashboardText("generating", uiLanguage)
            : getDashboardText("generateDecision", uiLanguage)}
        </button>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <DecisionMetric
          label={getDashboardText("archetypeLabel", uiLanguage)}
          value={pipeline?.debug?.archetype ?? "-"}
        />

        <DecisionMetric label={getDashboardText("worldLabel", uiLanguage)} value={pipeline?.debug?.world ?? "-"} />

        <DecisionMetric
          label={getDashboardText("confidenceLabel", uiLanguage)}
          value={pipeline?.confidence?.confidence ?? "-"}
          detail={pipeline?.confidence?.confidenceLevel ?? "waiting"}
        />
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 md:p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-zinc-600">
          Decision Output
        </p>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <OutputBlock
            title={getDashboardText("positivePrompt", uiLanguage)}
            value={pipeline?.visualPrompt?.positivePrompt}
          />

          <OutputBlock
            title={getDashboardText("negativePrompt", uiLanguage)}
            value={pipeline?.visualPrompt?.negativePrompt}
          />
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 md:p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-zinc-600">
          Governance Notes
        </p>

        <div className="mt-5 space-y-3">
          {(pipeline?.advisorV2?.warnings ?? []).length > 0 ? (
            pipeline.advisorV2.warnings.map((item: any, index: number) => (
              <p
                key={index}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-400"
              >
                {item.warning ?? item.message ?? String(item)}
              </p>
            ))
          ) : (
            <p className="text-sm text-zinc-500">
              No governance warning generated yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function DecisionMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string | number;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
        {label}
      </p>

      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
        {value}
      </p>

      {detail && (
        <p className="mt-2 text-xs leading-5 text-zinc-500">{detail}</p>
      )}
    </div>
  );
}

function OutputBlock({ title, value }: { title: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm font-medium text-white">{title}</p>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-400">
        {value ?? "-"}
      </p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-500">{label}</span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-white/30 focus:bg-black/40"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-zinc-500">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 focus:bg-black/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
