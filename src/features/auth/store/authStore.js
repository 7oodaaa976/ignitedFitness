import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null, // { email, name }

      // Fake login (UI only)
      login: ({ email, name }) =>
        set({
          token: "fake-token",
          user: { email, name: name || "" },
        }),

      // ✅ update name from Profile / Settings
      setName: (name) =>
        set((state) => ({
          user: state.user ? { ...state.user, name } : { email: "", name },
        })),

      // (Optional) update user object
      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : { ...patch },
        })),

      logout: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    { name: "ignited-auth" }
  )
);
