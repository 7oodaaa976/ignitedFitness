import { useMemo, useState } from "react";
import { useOnboardingStore } from "../store/onboardingStore";
import { useTranslate } from "../../../lib/i18n/useTranslate";

export default function SearchableSelect({ id, options = [], placeholderKey }) {
  const t = useTranslate();
  const value = useOnboardingStore((s) => s.answers[id]);
  const setAnswer = useOnboardingStore((s) => s.setAnswer);

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return options.filter((o) => o.toLowerCase().includes(s));
  }, [options, q]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-zinc-900/60 text-white rounded-xl px-4 py-4 neon flex items-center justify-between"
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value || t(placeholderKey)}
        </span>
        <span className="text-cyan-300">▾</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden">
          <div className="p-2 border-b border-zinc-700">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("onboarding.search")}
              className="w-full bg-zinc-800/60 text-white rounded-lg px-3 py-2 outline-none border border-transparent focus:border-cyan-400"
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-auto">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                className="w-full text-left px-4 py-3 text-white hover:bg-zinc-800"
                onClick={() => {
                  setAnswer(id, opt);
                  setOpen(false);
                  setQ("");
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
