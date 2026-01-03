import { useEffect } from "react";
import { useLangStore } from "./langStore";

export function useLangEffects() {
  const lang = useLangStore((s) => s.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
}
