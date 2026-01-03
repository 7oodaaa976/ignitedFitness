// src/features/plan/workoutBuilder.js
import { EX } from "./exerciseLibrary";

function setsRepsByExperience(type, experience, lowImpact = false) {
  const exp = experience || "beginner";
  const compound = type === "compound";

  // Low impact = أقل حجم/شدة
  if (lowImpact) {
    return { sets: compound ? 2 : 2, reps: compound ? "8-10" : "12-15" };
  }

  if (exp === "beginner")
    return { sets: compound ? 3 : 2, reps: compound ? "8-10" : "12-15" };
  if (exp === "intermediate")
    return { sets: compound ? 4 : 3, reps: compound ? "6-10" : "10-15" };
  return { sets: compound ? 5 : 4, reps: compound ? "5-8" : "10-15" };
}

function restFor(type, goal = "general_fitness", lowImpact = false) {
  if (goal === "fat_loss") {
    return type === "compound" ? (lowImpact ? 75 : 90) : lowImpact ? 45 : 60;
  }
  // general fitness / muscle gain
  return type === "compound" ? (lowImpact ? 90 : 120) : lowImpact ? 60 : 75;
}

function normalizeExercise(it, experience, goal, lowImpact) {
  const sr = setsRepsByExperience(it.type, experience, lowImpact);
  return {
    id: it.id,
    name: it.name,
    type: it.type,
    sets: sr.sets,
    reps: sr.reps,
    restSec: restFor(it.type, goal, lowImpact),
    videoId: it.videoId || null,
    desc: it.desc || "",
    steps: it.steps || [],
  };
}

// ✅ دي الفنكشن اللي planEngine بيعملها import
export function attachExercisesToWorkouts(workouts = [], ctx = {}) {
  const splitId = ctx.splitId || "full_body";
  const equipment = ctx.equipment || "gym";
  const experience = ctx.experience || "beginner";
  const lowImpact = !!ctx.lowImpact;
  const goal = ctx.goal || "general_fitness";

  const isHome = equipment === "home";

  const getBucket = (workoutName = "") => {
    const n = String(workoutName).toLowerCase();

    // Conditioning يوم كارديو: نستخدم home.full كتمارين عامة (ممكن نخصصها لاحقًا)
    if (n.includes("condition")) return "condition";

    if (n.includes("push")) return "push";
    if (n.includes("pull")) return "pull";
    if (n.includes("leg") || n.includes("lower")) return "legs";
    if (n.includes("upper")) return "upper";
    if (n.includes("full")) return "full";

    return "full";
  };

  const take = (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : []);

  return workouts.map((w) => {
    const bucket = getBucket(w.name);

    // HOME: كله من home.full
    if (isHome) {
      const list = EX.home.full || [];
      return {
        ...w,
        exercises: list.map((it) =>
          normalizeExercise(it, experience, goal, lowImpact)
        ),
      };
    }

    // GYM / BOTH
    let list = [];

    if (splitId === "ppl") {
      if (bucket === "push") list = EX.gym.push || [];
      else if (bucket === "pull") list = EX.gym.pull || [];
      else if (bucket === "legs") list = EX.gym.legs || [];
      else list = EX.home.full || [];
    } else if (splitId === "upper_lower") {
      // Upper = mix push + pull
      if (bucket === "upper")
        list = [...(EX.gym.push || []), ...(EX.gym.pull || [])];
      else if (bucket === "legs") list = EX.gym.legs || [];
      else list = EX.home.full || [];
    } else if (splitId === "mixed") {
      // mixed: يوم conditioning نخليه home.full كتمارين عامة
      if (bucket === "condition") list = EX.home.full || [];
      else if (bucket === "upper")
        list = [...(EX.gym.push || []), ...(EX.gym.pull || [])];
      else if (bucket === "legs") list = EX.gym.legs || [];
      else list = EX.home.full || [];
    } else {
      // full_body
      list = EX.home.full || [];
    }

    // لو upper واخدناه push+pull ممكن يكون كتير: قصّها 5-6 تمارين
    const trimmed = bucket === "upper" ? take(list, 6) : list;

    return {
      ...w,
      exercises: trimmed.map((it) =>
        normalizeExercise(it, experience, goal, lowImpact)
      ),
    };
  });
}
