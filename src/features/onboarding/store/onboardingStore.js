import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STEPS } from "../config/steps";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export const useOnboardingStore = create(
  persist(
    (set, get) => ({
      stepIndex: 0,
      answers: {},

      // ✅ plan info
      plan: null,
      planStartedAt: null,
      isCompleted: false,

      setAnswer: (id, value) =>
        set((state) => ({
          answers: { ...state.answers, [id]: value },
        })),

      setPlan: (plan) => set({ plan }),

      setPlanStartedAt: (iso) => set({ planStartedAt: iso }),

      next: () =>
        set((state) => ({
          stepIndex: clamp(state.stepIndex + 1, 0, STEPS.length - 1),
        })),

      prev: () =>
        set((state) => ({
          stepIndex: clamp(state.stepIndex - 1, 0, STEPS.length - 1),
        })),

      goTo: (index) =>
        set(() => ({
          stepIndex: clamp(index, 0, STEPS.length - 1),
        })),

      // ✅ لما يخلص الأسئلة
      completeOnboarding: () => {
        const startedAt = get().planStartedAt || new Date().toISOString();
        set({
          isCompleted: true,
          planStartedAt: startedAt,
        });
      },

      // ✅ Reset كل شيء
      resetAll: () =>
        set({
          stepIndex: 0,
          answers: {},
          plan: null,
          planStartedAt: null,
          isCompleted: false,
        }),
    }),
    {
      name: "ignited-onboarding",
    }
  )
);
