import { COUNTRIES } from "../../../lib/data/countries";

export const STEPS = [
  {
    id: "gender",
    type: "choice",
    titleKey: "ob.gender.title",
    options: [
      { value: "male", labelKey: "ob.gender.male" },
      { value: "female", labelKey: "ob.gender.female" },
    ],
  },

  {
    id: "age",
    type: "choice",
    titleKey: "ob.age.title",
    options: [
      { value: "18-24", labelKey: "ob.age.18_24" },
      { value: "25-30", labelKey: "ob.age.25_30" },
      { value: "31-36", labelKey: "ob.age.31_36" },
      { value: "37-42", labelKey: "ob.age.37_42" },
    ],
  },

  {
    id: "height",
    type: "input",
    titleKey: "ob.height.title",
    placeholderKey: "ob.height.ph",
    unit: "CM",
    inputMode: "numeric",
    kind: "number",
    min: 80,
    max: 230,
  },
  {
    id: "weight",
    type: "input",
    titleKey: "ob.weight.title",
    placeholderKey: "ob.weight.ph",
    unit: "KG",
    inputMode: "numeric",
    kind: "number",
    min: 30,
    max: 250,
  },

  {
    id: "job",
    type: "input",
    titleKey: "ob.job.title",
    placeholderKey: "ob.job.ph",
  },
  {
    id: "nationality",
    type: "input",
    titleKey: "ob.nationality.title",
    placeholderKey: "ob.nationality.ph",
  },

  {
    id: "country",
    type: "select",
    titleKey: "ob.country.title",
    placeholderKey: "ob.country.ph",
    options: COUNTRIES.map((c) => ({ value: c, labelKey: c })),
  },
  {
    id: "relationship",
    type: "choice",
    titleKey: "ob.relationship.title",
    options: [
      { value: "single", labelKey: "ob.relationship.single" },
      { value: "married", labelKey: "ob.relationship.married" },
      { value: "widow", labelKey: "ob.relationship.widow" },
      { value: "divorced", labelKey: "ob.relationship.divorced" },
    ],
  },

  {
    id: "wakeUp",
    type: "time",
    titleKey: "ob.wakeup.title",
    placeholderKey: "ob.time.ph",
    options: [
      { value: "7am", labelKey: "ob.time.7am" },
      { value: "8am", labelKey: "ob.time.8am" },
      { value: "9am", labelKey: "ob.time.9am" },
      { value: "10am", labelKey: "ob.time.10am" },
      { value: "11am", labelKey: "ob.time.11am" },
      { value: "12am", labelKey: "ob.time.12am" },
    ],
  },

  {
    id: "sleep",
    type: "time",
    titleKey: "ob.sleep.title",
    placeholderKey: "ob.time.ph",
    options: [
      { value: "9pm", labelKey: "ob.time.9pm" },
      { value: "10pm", labelKey: "ob.time.10pm" },
      { value: "11pm", labelKey: "ob.time.11pm" },
      { value: "12am", labelKey: "ob.time.12am" },
      { value: "1am", labelKey: "ob.time.1am" },
      { value: "2am", labelKey: "ob.time.2am" },
    ],
  },

  {
    id: "workoutTime",
    type: "time",
    titleKey: "ob.workoutTime.title",
    placeholderKey: "ob.time.ph",
    options: [
      { value: "6am", labelKey: "ob.time.6am" },
      { value: "7am", labelKey: "ob.time.7am" },
      { value: "9am", labelKey: "ob.time.9am" },
      { value: "12pm", labelKey: "ob.time.12pm" },
      { value: "3pm", labelKey: "ob.time.3pm" },
      { value: "6pm", labelKey: "ob.time.6pm" },
      { value: "8pm", labelKey: "ob.time.8pm" },
      { value: "10pm", labelKey: "ob.time.10pm" },
    ],
  },

  {
    id: "activityLevel",
    type: "choice",
    titleKey: "ob.activityLevel.title",
    options: [
      { value: "low", labelKey: "ob.activityLevel.low" },
      { value: "mid", labelKey: "ob.activityLevel.mid" },
      { value: "high", labelKey: "ob.activityLevel.high" },
    ],
  },

  {
    id: "activities",
    type: "multi",
    titleKey: "ob.activities.title",
    subtitleKey: "ob.activities.sub",
    options: [
      { value: "dog_walk", labelKey: "ob.activities.dog" },
      { value: "kids_play", labelKey: "ob.activities.kids" },
      { value: "football", labelKey: "ob.activities.football" },
      { value: "long_walk", labelKey: "ob.activities.longwalk" },
      { value: "friends", labelKey: "ob.activities.friends" },
    ],
  },

  {
    id: "smoke",
    type: "yn",
    titleKey: "ob.smoke.title",
    options: [
      { value: "no", labelKey: "common.no" },
      { value: "yes", labelKey: "common.yes" },
    ],
  },
  {
    id: "alcohol",
    type: "yn",
    titleKey: "ob.alcohol.title",
    options: [
      { value: "no", labelKey: "common.no" },
      { value: "yes", labelKey: "common.yes" },
    ],
  },
  {
    id: "drugs",
    type: "yn",
    titleKey: "ob.drugs.title",
    options: [
      { value: "no", labelKey: "common.no" },
      { value: "yes", labelKey: "common.yes" },
    ],
  },

  {
    id: "poorSleep",
    type: "yn",
    titleKey: "ob.poorSleep.title",
    subtitleKey: "ob.poorSleep.sub",
    options: [
      { value: "no", labelKey: "common.no" },
      { value: "yes", labelKey: "common.yes" },
    ],
  },

  {
    id: "steroids",
    type: "yn",
    titleKey: "ob.steroids.title",
    options: [
      { value: "no", labelKey: "common.no" },
      { value: "yes", labelKey: "common.yes" },
    ],
  },

  {
    id: "surgery",
    type: "yn",
    titleKey: "ob.surgery.title",
    options: [
      { value: "no", labelKey: "common.no" },
      { value: "yes", labelKey: "common.yes" },
    ],
  },

  {
    id: "meals",
    type: "choice",
    titleKey: "ob.meals.title",
    options: [
      { value: "1", labelKey: "ob.meals.1" },
      { value: "2", labelKey: "ob.meals.2" },
      { value: "3", labelKey: "ob.meals.3" },
      { value: "4", labelKey: "ob.meals.4" },
    ],
  },
  {
    id: "goal",
    type: "choice",
    titleKey: "ob.goal.title",
    options: [
      { value: "fat_loss", labelKey: "ob.goal.fat_loss" },
      { value: "muscle_gain", labelKey: "ob.goal.muscle_gain" },
      { value: "general_fitness", labelKey: "ob.goal.general_fitness" },
    ],
  },
  {
    id: "experience",
    type: "choice",
    titleKey: "ob.experience.title",
    options: [
      { value: "beginner", labelKey: "ob.experience.beginner" },
      { value: "intermediate", labelKey: "ob.experience.intermediate" },
      { value: "advanced", labelKey: "ob.experience.advanced" },
    ],
  },
  {
    id: "daysPerWeek",
    type: "choice",
    titleKey: "ob.days.title",
    options: [
      { value: "3", labelKey: "ob.days.3" },
      { value: "4", labelKey: "ob.days.4" },
      { value: "5", labelKey: "ob.days.5" },
      { value: "6", labelKey: "ob.days.6" },
    ],
  },
  {
    id: "equipment",
    type: "choice",
    titleKey: "ob.equipment.title",
    options: [
      { value: "gym", labelKey: "ob.equipment.gym" },
      { value: "home", labelKey: "ob.equipment.home" },
      { value: "both", labelKey: "ob.equipment.both" },
    ],
  },
];
