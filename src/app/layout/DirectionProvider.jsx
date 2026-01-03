import { useEffect } from "react";
import { useLangStore } from "../../lib/i18n/langStore";

export default function DirectionProvider({ children }) {
  const lang = useLangStore((s) => s.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return children;
}
