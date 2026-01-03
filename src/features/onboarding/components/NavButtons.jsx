import { useTranslate } from "../../../lib/i18n/useTranslate";

export default function NavButtons({ onPrev, onNext, disablePrev, disableNext }) {
  const t = useTranslate();

  return (
    <div className="flex gap-3 mt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={disablePrev}
        className={[
          "flex-1 py-4 rounded-xl border transition",
          disablePrev
            ? "border-zinc-800 text-zinc-600 bg-zinc-900/30"
            : "border-zinc-700 text-white bg-zinc-800/40 hover:bg-zinc-800/70",
        ].join(" ")}
      >
        {t("common.back")}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={disableNext}
        className={[
          "flex-1 py-4 rounded-xl font-semibold transition",
          disableNext
            ? "bg-cyan-400/30 text-cyan-100/60"
            : "bg-cyan-400 text-black hover:opacity-95",
        ].join(" ")}
      >
        {t("common.next")}
      </button>
    </div>
  );
}
