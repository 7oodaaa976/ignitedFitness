import { useEffect, useState } from "react";
import Screen from "../components/common/Screen";
import { useTranslate } from "../lib/i18n/useTranslate";
import { useLangStore } from "../lib/i18n/langStore";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";
import { useAuthStore } from "../features/auth/store/authStore";
import { useNavigate } from "react-router-dom";

function Row({ title, subtitle, right, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left card-soft p-5 rounded-3xl border border-zinc-700/50 transition hover:opacity-[0.98] active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          {subtitle ? <p className="text-gray-300 text-sm mt-1">{subtitle}</p> : null}
        </div>
        <div className="text-cyan-300">{right}</div>
      </div>
    </button>
  );
}

export default function Settings() {
  const t = useTranslate();
  const navigate = useNavigate();

  // ✅ Zustand selectors (مهم)
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);

  const resetAll = useOnboardingStore((s) => s.resetAll);
  const logout = useAuthStore((s) => s.logout);

  const isRTL = lang === "ar";

  // ✅ animation on language change
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [lang]);

  function handleReset() {
    resetAll();
    localStorage.removeItem("ignited-onboarding");
    navigate("/onboarding", { replace: true });
  }

  function handleLogout() {
    logout();
    localStorage.removeItem("ignited-auth");
    navigate("/login", { replace: true });
  }

  return (
    <Screen className="px-5 pt-8 pb-28">
      <div
        className={`max-w-sm mx-auto ${isRTL ? "text-right" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
        key={animKey}
      >
        {/* ✅ fade/slide animation class */}
        <div className="lang-animate">
          <h1 className="text-cyan-300 text-xl font-semibold">
            {t("settings.title")}
          </h1>

          <div className="mt-5 space-y-4">
            {/* Language */}
            <Row
              title={t("settings.language")}
              subtitle={lang === "ar" ? t("settings.ar") : t("settings.en")}
              right="🌐"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLang("en")}
                className={[
                  "card-soft rounded-2xl border py-4 text-sm font-semibold transition",
                  lang === "en"
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                    : "border-zinc-700/50 text-gray-300 hover:text-white",
                ].join(" ")}
              >
                {t("settings.en")}
              </button>

              <button
                onClick={() => setLang("ar")}
                className={[
                  "card-soft rounded-2xl border py-4 text-sm font-semibold transition",
                  lang === "ar"
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                    : "border-zinc-700/50 text-gray-300 hover:text-white",
                ].join(" ")}
              >
                {t("settings.ar")}
              </button>
            </div>

            {/* Reset */}
            <Row
              title={t("settings.resetOnboarding")}
              subtitle={t("settings.resetHint")}
              right="↺"
              onClick={handleReset}
            />

            {/* Logout */}
            <Row
              title={t("settings.logout")}
              subtitle={t("settings.logoutHint")}
              right="⎋"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </Screen>
  );
}
