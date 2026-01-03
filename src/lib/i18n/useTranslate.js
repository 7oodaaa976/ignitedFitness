import { useLangStore } from "./langStore";
import { translations } from "./translations";

export function useTranslate() {
  const lang = useLangStore((s) => s.lang);

  return (key) => {
    const k = String(key ?? "").trim(); // ✅ يمنع مشاكل المسافات
    const value = translations[lang]?.[k];

    if (value == null) {
      console.warn(`[i18n] Missing key "${k}" for lang "${lang}"`);
      return k;
    }
    return value;
  };
}
