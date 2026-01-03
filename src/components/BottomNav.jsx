import { NavLink } from "react-router-dom";
import { useTranslate } from "../lib/i18n/useTranslate";
import { useLangStore } from "../lib/i18n/langStore";

import {
  HomeIcon,
  DumbbellIcon,
  FoodIcon,
  UserIcon,
  SettingsIcon,
} from "./icons/NavIcons";

function Item({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "relative flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-2xl transition",
          isActive ? "text-cyan-300" : "text-gray-400 hover:text-gray-200",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {/* Glow */}
          {isActive ? (
            <span className="absolute -inset-2 rounded-2xl bg-cyan-400/10 blur-[10px]" />
          ) : null}

          <span className="relative">
            <Icon active={isActive} />
          </span>

          <span className="relative text-[11px] leading-none">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function BottomNav() {
  const t = useTranslate();
  const lang = useLangStore((s) => s.lang);
  const isRTL = lang === "ar";

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div
        className={`max-w-sm mx-auto card-soft border border-zinc-700/50 rounded-3xl px-3 py-3 ${
          isRTL ? "dir-rtl" : ""
        }`}
      >
        <div className={`grid grid-cols-5 ${isRTL ? "direction-rtl" : ""}`}>
          <Item to="/home" label={t("nav.home")} Icon={HomeIcon} />
          <Item to="/workout" label={t("nav.workout")} Icon={DumbbellIcon} />
          <Item to="/nutrition" label={t("nav.nutrition")} Icon={FoodIcon} />
          <Item to="/profile" label={t("nav.profile")} Icon={UserIcon} />
          <Item to="/settings" label={t("nav.settings")} Icon={SettingsIcon} />
        </div>
      </div>
    </div>
  );
}
