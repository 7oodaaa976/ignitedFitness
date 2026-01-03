import { useEffect, useState } from "react";
import { useLangStore } from "../../lib/i18n/langStore";

export default function LangAnimated({ children }) {
  const lang = useLangStore((s) => s.lang);
  const [phase, setPhase] = useState("in"); // in | out

  useEffect(() => {
    // اطلع بره ثم ادخل تاني
    setPhase("out");
    const t = setTimeout(() => setPhase("in"), 140);
    return () => clearTimeout(t);
  }, [lang]);

  return (
    <div
      className={[
        "transition-all duration-200 ease-out",
        phase === "out" ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
