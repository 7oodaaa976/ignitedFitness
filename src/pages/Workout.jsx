import Screen from "../components/common/Screen";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";
import { useNavigate } from "react-router-dom";

function calcPlanDay(startedAt) {
    if (!startedAt) return 1;
    const start = new Date(startedAt);
    const today = new Date();
    const diff = today - start;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + 1);
}

export default function Workout() {
    const navigate = useNavigate();

    const plan = useOnboardingStore((s) => s.plan);
    const planStartedAt = useOnboardingStore((s) => s.planStartedAt);

    if (!plan) {
        return (
            <Screen className="px-5 pt-8">
                <div className="max-w-sm mx-auto card-soft p-6 rounded-3xl border border-zinc-700/50 text-white">
                    <h1 className="text-cyan-300 text-xl font-semibold">Workout</h1>
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

    const dayNumber = calcPlanDay(planStartedAt);

    const workouts = plan.workouts || [];
    const idx = workouts.length ? (dayNumber - 1) % workouts.length : 0;
    const todayWorkout = workouts[idx];

    return (
        <Screen className="px-5 pt-8 pb-28">
            <div className="max-w-sm mx-auto">
                <div className="card-soft p-6 rounded-3xl border border-zinc-700/50 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-cyan-300 text-xl font-semibold">Workout</h1>
                            <p className="text-gray-300 text-sm mt-1">
                                Day {dayNumber} • {plan.title}
                            </p>
                        </div>
                        <span className="text-xs text-gray-300">{plan.daysPerWeek}x/wk</span>
                    </div>

                    <div className="mt-5 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-700/40">
                        <p className="text-gray-300 text-xs">Today</p>
                        <h2 className="text-white text-lg font-semibold mt-1">
                            {todayWorkout?.name || "Workout Session"}
                        </h2>
                        <p className="text-cyan-300 text-sm mt-1">
                            {todayWorkout?.focus || "Strength"} • {todayWorkout?.durationMin || 50} min
                        </p>

                        <div className="mt-4 text-sm text-gray-300 space-y-1">
                            <p>Split: <span className="text-white">{plan.split}</span></p>
                            <p>Equipment: <span className="text-white">{plan.equipment}</span></p>
                            <p>
                                Intensity:{" "}
                                <span className="text-white">{plan.lowImpact ? "Low Impact" : "Normal"}</span>
                            </p>
                        </div>
                    </div>

                    {/* ✅ Exercises list */}
                    <div className="mt-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-700/30">
                        <p className="text-cyan-300 text-sm font-semibold">Exercises</p>

                        <div className="mt-3 space-y-3">
                            {(todayWorkout?.exercises || []).map((ex, exIndex) => (
                                <button
                                    key={exIndex}
                                    onClick={() => navigate(`/workout/exercise/${idx}/${exIndex}`)}
                                    className="w-full text-left flex items-start justify-between gap-3 rounded-xl bg-zinc-900/50 border border-zinc-700/20 p-3 hover:opacity-95 active:scale-[0.99] transition"
                                >
                                    <div className="min-w-0">
                                        <p className="text-white font-semibold truncate">{ex.name}</p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {String(ex.type).toUpperCase()} • Rest {ex.restSec}s
                                        </p>
                                    </div>

                                    <div className="text-right shrink-0">
                                        <p className="text-white text-sm font-semibold">{ex.sets} sets</p>
                                        <p className="text-cyan-300 text-xs">{ex.reps}</p>
                                    </div>
                                </button>
                            ))}

                            {(!todayWorkout?.exercises || todayWorkout.exercises.length === 0) && (
                                <p className="text-gray-400 text-sm">No exercises for today.</p>
                            )}
                        </div>
                    </div>

                    {plan.warnings?.length ? (
                        <div className="mt-4 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4">
                            <p className="text-yellow-200 text-sm font-semibold">Notes</p>
                            <ul className="mt-2 text-yellow-100 text-sm list-disc pl-5 space-y-1">
                                {plan.warnings.map((w) => (
                                    <li key={w}>{w}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </Screen>
    );
}
