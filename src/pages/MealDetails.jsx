import { useNavigate, useParams } from "react-router-dom";
import Screen from "../components/common/Screen";
import { useTranslate } from "../lib/i18n/useTranslate";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";

export default function MealDetails() {
  const { key } = useParams();
  const navigate = useNavigate();
  const t = useTranslate();

  const markMealDone = useOnboardingStore((s) => s.markMealDone);
  const isMealDone = useOnboardingStore((s) => s.isMealDone);

  const done = isMealDone?.(key);

  return (
    <Screen className="px-5 pt-8 pb-28">
      <div className="max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-300 text-sm hover:text-white transition"
        >
          ← {t("common.back")}
        </button>

        <div className="mt-4 card-soft p-6 rounded-3xl border border-zinc-700/50">
          <div className="flex items-center justify-between">
            <h1 className="text-cyan-300 text-xl font-semibold">
              {t(`meal.${key}`)}
            </h1>
            {done ? <span className="text-cyan-300">✓</span> : null}
          </div>

          <p className="text-gray-300 text-sm mt-2">{t(`meal.${key}.desc`)}</p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="card-soft p-5 rounded-2xl border border-zinc-700/50">
            <p className="text-gray-300 text-sm">Calories</p>
            <p className="text-white font-semibold mt-1">450 kcal</p>
          </div>
          <div className="card-soft p-5 rounded-2xl border border-zinc-700/50">
            <p className="text-gray-300 text-sm">Macros</p>
            <p className="text-white font-semibold mt-1">
              Protein 35g • Carbs 45g • Fat 15g
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={done}
          onClick={() => markMealDone(key)}
          className={[
            "mt-6 w-full py-4 rounded-2xl font-semibold transition",
            done
              ? "bg-cyan-400/20 text-cyan-200/60"
              : "bg-cyan-400 text-black hover:opacity-95 active:scale-[0.99]",
          ].join(" ")}
        >
          {done ? "Done ✓" : "Mark as Done"}
        </button>
      </div>
    </Screen>
  );
}
