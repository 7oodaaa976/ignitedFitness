import Screen from "../components/common/Screen";
import { useNavigate, useParams } from "react-router-dom";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";

function getDefaultVideoId(name) {
    // fallback IDs (ممكن تغيرهم)
    const map = {
        "Bench Press": "rT7DgCr-3pg",
        "Lat Pulldown": "CAwf7n6Luuc",
        "Leg Press": "IZxyjW7MPJQ",
        "Push-ups": "IODxDxX7oi4",
        "Bodyweight Squats": "aclHkVaku9U",
        "Romanian Deadlift": "2SHsk9AzdjA",
        "Plank": "pSHjTRCQxIw",
    };
    return map[name] || "dQw4w9WgXcQ"; // placeholder 😄 (غيره لو عايز)
}

function getExerciseExplain(ex) {
    const name = ex?.name || "Exercise";
    // شرح سريع، ونقدر نحطه لاحقًا في library لكل تمرين
    return {
        summary: `Focus on good form and controlled tempo while performing ${name}.`,
        steps: [
            "Warm up 3–5 minutes + 1–2 light sets.",
            "Keep the movement controlled (no rushing).",
            "Stop 1–2 reps before failure if you’re a beginner.",
            "Rest as prescribed and maintain breathing.",
        ],
        tips: [
            "Quality > weight. Form first.",
            "If you feel pain (not normal muscle fatigue), stop and adjust.",
            "Increase reps before increasing load.",
        ],
    };
}

export default function ExerciseDetails() {
    const navigate = useNavigate();
    const { workoutIndex, exerciseIndex } = useParams();

    const plan = useOnboardingStore((s) => s.plan);

    if (!plan) {
        return (
            <Screen className="px-5 pt-8">
                <div className="max-w-sm mx-auto card-soft p-6 rounded-3xl border border-zinc-700/50 text-white">
                    <h1 className="text-cyan-300 text-xl font-semibold">Exercise</h1>
                    <p className="text-gray-300 mt-2">No plan found.</p>
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

    const wi = Number(workoutIndex);
    const ei = Number(exerciseIndex);

    const workout = plan.workouts?.[wi];
    const ex = workout?.exercises?.[ei];

    if (!workout || !ex) {
        return (
            <Screen className="px-5 pt-8">
                <div className="max-w-sm mx-auto card-soft p-6 rounded-3xl border border-zinc-700/50 text-white">
                    <h1 className="text-cyan-300 text-xl font-semibold">Exercise</h1>
                    <p className="text-gray-300 mt-2">Exercise not found.</p>
                    <button
                        className="mt-4 w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold"
                        onClick={() => navigate("/workout")}
                    >
                        Back to Workout
                    </button>
                </div>
            </Screen>
        );
    }

    const info = getExerciseExplain(ex);
    const videoId = ex.videoId || getDefaultVideoId(ex.name);

    return (
        <Screen className="px-5 pt-8 pb-28">
            <div className="max-w-sm mx-auto">
                <div className="card-soft p-6 rounded-3xl border border-zinc-700/50 text-white">
                    <button
                        className="text-gray-300 text-sm hover:text-white transition"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                    <h1 className="mt-3 text-cyan-300 text-xl font-semibold">{ex.name}</h1>
                    <p className="text-gray-300 text-sm mt-1">
                        {workout.name} • {ex.sets} sets • {ex.reps} • Rest {ex.restSec}s
                    </p>

                    {/* Video */}
                    {ex.videoId ? (
                        <div className="mt-5 rounded-2xl overflow-hidden border border-zinc-700/40 bg-zinc-900/50">
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube-nocookie.com/embed/${ex.videoId}`}
                                    title={ex.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 rounded-2xl border border-zinc-700/40 bg-zinc-900/50 p-4">
                            <p className="text-gray-300 text-sm">
                                Video coming soon for this exercise.
                            </p>
                        </div>
                    )}


                    {/* Explain */}
                    <p className="text-gray-200 text-sm mt-2">{ex.desc || "Focus on good form and controlled tempo."}</p>

                    {Array.isArray(ex.steps) && ex.steps.length > 0 ? (
                        <ul className="mt-3 text-gray-200 text-sm list-disc pl-5 space-y-1">
                            {ex.steps.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    ) : null}


                    {/* Tips */}
                    <div className="mt-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-700/30">
                        <p className="text-cyan-300 text-sm font-semibold">Tips</p>
                        <ul className="mt-2 text-gray-200 text-sm list-disc pl-5 space-y-1">
                            {info.tips.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className="mt-5 w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:opacity-95 active:scale-[0.99] transition"
                        onClick={() => navigate("/workout")}
                    >
                        Back to Workout
                    </button>
                </div>
            </div>
        </Screen>
    );
}
