import { useParams, useNavigate } from "react-router-dom";
import Screen from "../components/common/Screen";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";

function calcPlanDay(startedAt) {
  if (!startedAt) return 1;
  const start = new Date(startedAt);
  const today = new Date();
  const diff = today - start;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

const SAMPLE = [
  { name: "Warm-up", info: "5-8 min mobility" },
  { name: "Squats", info: "4 sets x 8 reps" },
  { name: "Bench Press", info: "4 sets x 8 reps" },
  { name: "Pull-ups", info: "3 sets x max" },
  { name: "Finisher", info: "5 min cardio" },
];

export default function WorkoutDay() {
  const { day } = useParams();
  const navigate = useNavigate();

  const planStartedAt = useOnboardingStore((s) => s.planStartedAt);
  const completedDays = useOnboardingStore((s) => s.completedDays);
  const completeDay = useOnboardingStore((s) => s.completeDay);

  const today = calcPlanDay(planStartedAt);
  const dayNum = Math.max(1, Number(day) || 1);

  const locked = dayNum > today;
  const done = completedDays.includes(dayNum);
  const isToday = dayNum === today;

  return (
    <Screen className="px-5 pt-8 pb-28">
      <div className="max-w-sm mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 text-sm hover:text-white transition"
        >
          ← Back
        </button>

        <div className="mt-4 card-soft p-6 rounded-3xl border border-zinc-700/50">
          <div className="flex items-center justify-between">
            <h1 className="text-cyan-300 text-xl font-semibold">
              Day {dayNum}
            </h1>

            {done ? (
              <span className="text-cyan-300">✓ Completed</span>
            ) : locked ? (
              <span className="text-gray-400">🔒 Locked</span>
            ) : isToday ? (
              <span className="text-cyan-200 bg-cyan-400/15 border border-cyan-400/30 px-3 py-1 rounded-full text-xs">
                Today
              </span>
            ) : (
              <span className="text-gray-300">Available</span>
            )}
          </div>

          <p className="text-gray-300 text-sm mt-3">
            {locked
              ? "This day is locked. Complete previous days first."
              : "Follow the session and mark it completed."}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {SAMPLE.map((ex) => (
            <div
              key={ex.name}
              className={[
                "card-soft p-5 rounded-2xl border border-zinc-700/50",
                locked ? "opacity-45" : "",
              ].join(" ")}
            >
              <h3 className="text-white font-semibold">{ex.name}</h3>
              <p className="text-gray-300 text-sm mt-1">{ex.info}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled={!isToday || done}
          onClick={() => completeDay(dayNum)}
          className={[
            "mt-6 w-full py-4 rounded-2xl font-semibold transition",
            !isToday || done
              ? "bg-cyan-400/20 text-cyan-200/60"
              : "bg-cyan-400 text-black hover:opacity-95 active:scale-[0.99]",
          ].join(" ")}
        >
          {done ? "Day Completed ✓" : isToday ? "Complete Today" : "Complete (Today Only)"}
        </button>
      </div>
    </Screen>
  );
}
