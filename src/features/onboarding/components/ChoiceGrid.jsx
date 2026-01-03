import { useOnboardingStore } from "../store/onboardingStore";
import { useTranslate } from "../../../lib/i18n/useTranslate";

export default function ChoiceGrid({ id, options = [], columns = 1 }) {
  const t = useTranslate();
  const setAnswer = useOnboardingStore((s) => s.setAnswer);
  const answer = useOnboardingStore((s) => s.answers[id]);

  return (
    <div className={`grid gap-3 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {options.map((opt) => {
        const value = opt?.value;          // ✅ value
        const labelKey = opt?.labelKey;    // ✅ labelKey
        const active = answer === value;

        return (
          <button
            key={value}
            onClick={() => setAnswer(id, value)}
            className={`p-4 rounded-2xl border transition ${
              active
                ? "bg-cyan-400 text-black border-cyan-300"
                : "bg-zinc-900/40 text-white border-zinc-700/40"
            }`}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
}
