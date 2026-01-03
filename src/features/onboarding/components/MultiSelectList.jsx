import { useMemo } from "react";
import { useOnboardingStore } from "../store/onboardingStore";
import { useTranslate } from "../../../lib/i18n/useTranslate";

const EMPTY = [];

export default function MultiSelectList({ id, options = [] }) {
  const t = useTranslate();

  const setAnswer = useOnboardingStore((s) => s.setAnswer);
  const stored = useOnboardingStore((s) => s.answers[id]); // ✅ بدون fallback array هنا

  // ✅ fallback ثابت
  const selected = useMemo(() => (Array.isArray(stored) ? stored : EMPTY), [stored]);

  const toggle = (val) => {
    const next = selected.includes(val)
      ? selected.filter((x) => x !== val)
      : [...selected, val];
    setAnswer(id, next);
  };

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={`w-full text-left p-4 rounded-2xl border transition ${
              active
                ? "bg-cyan-400 text-black border-cyan-300"
                : "bg-zinc-900/40 text-white border-zinc-700/40"
            }`}
          >
            {t(opt.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
