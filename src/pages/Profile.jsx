import { useMemo, useState } from "react";
import Screen from "../components/common/Screen"; // عدّل المسار لو مختلف
import BottomNav from "../components/BottomNav"; // عدّل لو مختلف
import { useTranslate } from "../lib/i18n/useTranslate"; // عدّل لو مختلف
import { useLangStore } from "../lib/i18n/langStore"; // عدّل لو مختلف
import { useAuthStore } from "../features/auth/store/authStore"; // عدّل لو مختلف

export default function Profile() {
  const t = useTranslate();
  const lang = useLangStore((s) => s.lang);

  const user = useAuthStore((s) => s.user);
  const setName = useAuthStore((s) => s.setName);
  const logout = useAuthStore((s) => s.logout);

  const [open, setOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState(user?.name || "");

  const displayName = useMemo(() => {
    const base = (user?.name?.trim() || user?.email?.split("@")[0] || "AHMED");
    return base.toUpperCase();
  }, [user]);

  const email = user?.email || "demo@mail.com";
  const rtl = lang === "ar";

  function onOpenEdit() {
    setNameDraft(user?.name || "");
    setOpen(true);
  }

  function onSave() {
    const v = String(nameDraft || "").trim();
    if (v.length >= 2) setName(v);
    setOpen(false);
  }

  return (
    <Screen className="px-5 pt-8 pb-28">
      <div className="max-w-sm mx-auto" dir={rtl ? "rtl" : "ltr"}>
        {/* Title */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-cyan-300 text-lg font-semibold tracking-widest">
            {t("profile.title")}
          </h1>

          <button
            onClick={onOpenEdit}
            className="px-4 py-2 rounded-xl bg-zinc-900/50 text-cyan-300 border border-cyan-300/30 hover:bg-zinc-900/70 transition"
          >
            {t("profile.editName")}
          </button>
        </div>

        {/* Main Card */}
        <div className="card-soft rounded-3xl p-6">
          <p className="text-gray-300 text-sm">{t("profile.hello")}</p>

          <h2 className="mt-2 text-white text-2xl font-semibold tracking-wide line-clamp-2">
            {displayName}
          </h2>

          <div className="h-px bg-white/10 my-5" />

          <div className="space-y-3">
            <Row label={t("profile.name")} value={user?.name?.trim() || "-"} />
            <Row label={t("profile.email")} value={email} mono />
          </div>
        </div>

        {/* Note Card */}
        <div className="card-soft rounded-3xl p-6 mt-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-400/15 border border-cyan-300/20 flex items-center justify-center">
              <span className="text-cyan-300 text-lg">i</span>
            </div>
            <div>
              <p className="text-white font-semibold">{t("profile.note")}</p>
              <p className="text-gray-300 text-sm mt-1 leading-6">
                {t("profile.noteDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full mt-5 py-3 rounded-2xl bg-zinc-900/50 border border-red-400/30 text-red-300 hover:bg-zinc-900/70 transition font-semibold"
        >
          {t("profile.logout")}
        </button>
      </div>

      <BottomNav active="profile" />

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-sm card-soft rounded-3xl p-6 border border-white/10">
            <h3 className="text-white text-lg font-semibold">
              {t("profile.editName")}
            </h3>

            <input
              className="mt-4 w-full p-3 rounded-xl bg-zinc-900/60 text-white neon"
              placeholder={t("profile.namePh")}
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3 rounded-2xl bg-zinc-900/50 text-white border border-white/10 hover:bg-zinc-900/70 transition"
              >
                {t("profile.cancel")}
              </button>
              <button
                onClick={onSave}
                className="flex-1 py-3 rounded-2xl bg-cyan-400 text-black font-semibold hover:opacity-90 transition"
              >
                {t("profile.save")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Screen>
  );
}

function Row({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-300 text-sm">{label}</span>
      <span className={`text-white text-sm ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}
