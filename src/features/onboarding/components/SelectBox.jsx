import { useOnboardingStore } from "../store/onboardingStore";
import { useTranslate } from "../../../lib/i18n/useTranslate";

export default function SelectBox({ id, placeholderKey, options = [] }) {
  const t = useTranslate();
  const setAnswer = useOnboardingStore((s) => s.setAnswer);
  const value = useOnboardingStore((s) => s.answers[id] || "");

  return (
    <select
      value={value}
      onChange={(e) => setAnswer(id, e.target.value)}
      className="w-full p-3 rounded-xl bg-zinc-900/60 text-white neon"
    >
      <option value="">{t(placeholderKey)}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {t(opt.labelKey)}
        </option>
      ))}
    </select>
  );
}
