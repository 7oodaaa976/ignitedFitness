import Screen from "../components/common/Screen";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";
import { useNavigate } from "react-router-dom";

export default function Nutrition() {
  const navigate = useNavigate();
  const plan = useOnboardingStore((s) => s.plan);

  if (!plan) {
    return (
      <Screen className="px-5 pt-8">
        <div className="max-w-sm mx-auto card-soft p-6 rounded-3xl border border-zinc-700/50 text-white">
          <h1 className="text-cyan-300 text-xl font-semibold">Nutrition</h1>
          <p className="text-gray-300 mt-2">
            No plan found. Please complete onboarding first.
          </p>
          <button
            className="mt-4 w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold"
            onClick={() => navigate("/onboarding", { replace: true })}
          >
            Go to Onboarding
          </button>
        </div>
      </Screen>
    );
  }

  const cal = plan.caloriesTarget ?? 0;
  const p = plan.macros?.protein ?? 0;
  const c = plan.macros?.carbs ?? 0;
  const f = plan.macros?.fat ?? 0;

  return (
    <Screen className="px-5 pt-8 pb-28">
      <div className="max-w-sm mx-auto">
        <div className="card-soft p-6 rounded-3xl border border-zinc-700/50 text-white">
          <h1 className="text-cyan-300 text-xl font-semibold">Nutrition</h1>
          <p className="text-gray-300 text-sm mt-1">{plan.title}</p>

          <div className="mt-5 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-700/40">
            <p className="text-gray-300 text-xs">Daily Targets</p>
            <h2 className="text-white text-2xl font-semibold mt-1">
              {cal} kcal
            </h2>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-700/30 p-3">
                <p className="text-gray-400 text-xs">Protein</p>
                <p className="text-white font-semibold mt-1">{p}g</p>
              </div>
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-700/30 p-3">
                <p className="text-gray-400 text-xs">Carbs</p>
                <p className="text-white font-semibold mt-1">{c}g</p>
              </div>
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-700/30 p-3">
                <p className="text-gray-400 text-xs">Fat</p>
                <p className="text-white font-semibold mt-1">{f}g</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm mt-4">
              Meals per day:{" "}
              <span className="text-white font-semibold">
                {plan.nutrition?.mealsPerDay || 3}
              </span>
            </p>
          </div>

          {plan.nutrition?.notes?.length ? (
            <div className="mt-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-700/30">
              <p className="text-cyan-300 text-sm font-semibold">Tips</p>
              <ul className="mt-2 text-gray-200 text-sm list-disc pl-5 space-y-1">
                {plan.nutrition.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </Screen>
  );
}
