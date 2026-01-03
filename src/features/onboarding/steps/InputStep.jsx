import { useOnboardingStore } from "../store/onboardingStore";
import { useTranslate } from "../../../lib/i18n/useTranslate";

export default function InputStep({ id, placeholderKey, unit, inputMode, kind="text", min, max }) {
  const t = useTranslate();
  const setAnswer = useOnboardingStore((s) => s.setAnswer);
  const value = useOnboardingStore((s) => s.answers[id] ?? "");

  const isNumber = kind === "number";

  function onChange(e) {
    let v = e.target.value;

    if (isNumber) {
      // ✅ اسمح أرقام فقط
      v = v.replace(/[^\d]/g, "");

      // ✅ clamp (اختياري)
      if (v !== "") {
        let n = Number(v);
        if (Number.isFinite(min)) n = Math.max(min, n);
        if (Number.isFinite(max)) n = Math.min(max, n);
        v = String(n);
      }
    }

    setAnswer(id, v);
  }

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        inputMode={inputMode || (isNumber ? "numeric" : "text")}
        className="w-full p-3 pr-14 rounded-xl bg-zinc-900/60 text-white neon"
        placeholder={t(placeholderKey)}
      />

      {unit ? (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-300 text-sm">
          {unit}
        </span>
      ) : null}
    </div>
  );
}
