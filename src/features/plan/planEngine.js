import { attachExercisesToWorkouts } from "./workoutBuilder";


// Helpers
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function toNum(v) {
  const n = Number(String(v ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function ynToBool(v) {
  const s = String(v ?? "").toLowerCase();
  return s === "yes" || s === "true" || s === "1" || s === "y";
}

function pickSplit({ goal, daysPerWeek, lowImpact }) {
  const d = Number(daysPerWeek) || 3;

  if (lowImpact) {
    if (d <= 3) return { id: "full_body", label: "Full Body", days: d };
    return { id: "upper_lower", label: "Upper / Lower", days: d };
  }

  if (goal === "muscle_gain") {
    if (d <= 3) return { id: "full_body", label: "Full Body", days: d };
    if (d === 4) return { id: "upper_lower", label: "Upper / Lower", days: d };
    return { id: "ppl", label: "Push / Pull / Legs", days: d };
  }

  // fat loss / general fitness
  if (d <= 3) return { id: "full_body", label: "Full Body", days: d };
  if (d === 4) return { id: "upper_lower", label: "Upper / Lower", days: d };
  return { id: "mixed", label: "Strength + Conditioning", days: d };
}

function estimateTargets({
  goal,
  sex,
  age,
  heightCm,
  weightKg,
  activityLevel,
  experience,
}) {
  const w = weightKg ?? 70;
  const h = heightCm ?? 170;
  const a = age ?? 25;

  const isMale = String(sex ?? "")
    .toLowerCase()
    .includes("male");
  const bmr = 10 * w + 6.25 * h - 5 * a + (isMale ? 5 : -161);

  let mult = 1.2;
  const act = String(activityLevel ?? "").toLowerCase();
  if (act.includes("moderate")) mult = 1.45;
  if (act.includes("high")) mult = 1.65;

  const exp = String(experience ?? "").toLowerCase();
  if (exp === "intermediate") mult += 0.05;
  if (exp === "advanced") mult += 0.1;

  const tdee = bmr * mult;

  let calories = tdee;
  const g = String(goal ?? "general_fitness");
  if (g === "fat_loss") calories = tdee * 0.85;
  if (g === "muscle_gain") calories = tdee * 1.1;

  calories = Math.round(calories / 10) * 10;

  let proteinPerKg = 1.6;
  if (g === "fat_loss") proteinPerKg = 2.0;
  if (g === "muscle_gain") proteinPerKg = 1.8;

  const protein = Math.round((w * proteinPerKg) / 5) * 5;
  const fat = Math.round((w * 0.8) / 5) * 5;

  const proteinCals = protein * 4;
  const fatCals = fat * 9;
  const remaining = Math.max(0, calories - (proteinCals + fatCals));
  const carbs = Math.round(remaining / 4 / 5) * 5;

  return {
    caloriesTarget: calories,
    macros: { protein, carbs, fat },
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
  };
}

function buildWorkouts({ splitId, days, equipment, lowImpact }) {
  const templates = {
    full_body: [
      { name: "Full Body A", focus: "Strength" },
      { name: "Full Body B", focus: "Strength" },
      { name: "Full Body C", focus: "Strength" },
      { name: "Full Body D", focus: "Strength" },
      { name: "Full Body E", focus: "Strength" },
      { name: "Full Body F", focus: "Strength" },
    ],
    upper_lower: [
      { name: "Upper Body", focus: "Strength" },
      { name: "Lower Body", focus: "Strength" },
      { name: "Upper Body (Volume)", focus: "Volume" },
      { name: "Lower Body (Volume)", focus: "Volume" },
      { name: "Upper Body", focus: "Strength" },
      { name: "Lower Body", focus: "Strength" },
    ],
    ppl: [
      { name: "Push", focus: "Hypertrophy" },
      { name: "Pull", focus: "Hypertrophy" },
      { name: "Legs", focus: "Hypertrophy" },
      { name: "Push (Strength)", focus: "Strength" },
      { name: "Pull (Strength)", focus: "Strength" },
      { name: "Legs (Strength)", focus: "Strength" },
    ],
    mixed: [
      { name: "Full Body", focus: "Strength" },
      { name: "Conditioning", focus: "Cardio" },
      { name: "Upper Body", focus: "Strength" },
      { name: "Lower Body", focus: "Strength" },
      { name: "Conditioning", focus: "Cardio" },
      { name: "Full Body", focus: "Strength" },
    ],
  };

  const arr = templates[splitId] || templates.full_body;

  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    name: arr[i]?.name || `Workout Day ${i + 1}`,
    focus: arr[i]?.focus || "Strength",
    durationMin: lowImpact ? 40 : 55,
    equipment,
    lowImpact,
    exercises: [], // سيتم تعبئتها لاحقًا
  }));
}

function buildNutrition({ mealsPerDay, goal, lowImpact, flags }) {
  const m = Number(mealsPerDay) || 3;
  const notes = [];

  if (goal === "fat_loss") notes.push("Prioritize lean protein + vegetables.");
  if (goal === "muscle_gain")
    notes.push("Hit protein target and add calorie-dense carbs.");
  if (lowImpact) notes.push("Keep recovery high: sleep + hydration.");

  if (flags.smoke)
    notes.push("Consider reducing smoking for better cardio recovery.");
  if (flags.alcohol) notes.push("Limit alcohol to improve recovery.");
  if (flags.poorSleep) notes.push("Aim for 7–9 hours of sleep consistently.");

  return { mealsPerDay: m, notes };
}

export function generatePlan(answers = {}) {
  const goal = answers.goal || "general_fitness";
  const experience = answers.experience || "beginner";
  const daysPerWeek = answers.daysPerWeek || "3";
  const equipment = answers.equipment || "gym";

  const sex = answers.gender;

  const age = (() => {
    const s = String(answers.age ?? "");
    if (s.includes("18")) return 21;
    if (s.includes("25")) return 28;
    if (s.includes("31")) return 33;
    if (s.includes("37")) return 39;
    return null;
  })();

  const heightCm = toNum(answers.height);
  const weightKg = toNum(answers.weight);

  const flags = {
    smoke: ynToBool(answers.smoke),
    alcohol: ynToBool(answers.alcohol),
    drugs: ynToBool(answers.drugs),
    poorSleep: ynToBool(answers.poorSleep),
    steroids: ynToBool(answers.steroids),
    surgery: ynToBool(answers.surgery),
  };

  const lowImpact = flags.surgery || flags.poorSleep;

  const split = pickSplit({ goal, daysPerWeek, lowImpact });

  const targets = estimateTargets({
    goal,
    sex,
    age,
    heightCm,
    weightKg,
    activityLevel: answers.activityLevel,
    experience,
  });

  const workouts = buildWorkouts({
    splitId: split.id,
    days: split.days,
    equipment,
    lowImpact,
  });

  // ✅ هنا أهم جزء: نضيف exercises جاهزة لكل workout
  const workoutsWithExercises = attachExercisesToWorkouts(workouts, {
    splitId: split.id,
    equipment,
    experience,
    lowImpact,
    goal,
  });

  const nutrition = buildNutrition({
    mealsPerDay: answers.meals,
    goal,
    lowImpact,
    flags,
  });

  const warnings = [];
  if (flags.surgery) warnings.push("recent_surgery_low_impact");
  if (flags.poorSleep) warnings.push("sleep_improvement_recommended");
  if (flags.steroids) warnings.push("medical_supervision_recommended");
  if (flags.drugs) warnings.push("health_risk_consult_professional");

  const titles = {
    fat_loss: "Fat Loss Plan",
    muscle_gain: "Muscle Gain Plan",
    general_fitness: "General Fitness Plan",
  };

  return {
    id: `${goal}_${experience}_${split.id}_${split.days}d`,
    title: titles[goal] || "Your Plan",
    goal,
    experience,
    daysPerWeek: split.days,
    split: split.label,
    equipment,
    lowImpact,

    caloriesTarget: targets.caloriesTarget,
    macros: targets.macros,
    meta: { bmr: targets.bmr, tdee: targets.tdee },

    workouts: workoutsWithExercises,
    nutrition,
    warnings,

    createdAt: new Date().toISOString(),
  };
}
