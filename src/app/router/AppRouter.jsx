import { Navigate, Route, Routes, Outlet } from "react-router-dom";

import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Home from "../../pages/Home";
import Workout from "../../pages/Workout";
import Nutrition from "../../pages/Nutrition";
import Profile from "../../pages/Profile";
import Settings from "../../pages/Settings";

import AppLayout from "../layout/AppLayout";

import { useAuthStore } from "../../features/auth/store/authStore";
import { useOnboardingStore } from "../../features/onboarding/store/onboardingStore";
import OnboardingWizard from "../../features/onboarding/pages/OnboardingWizard";
import WorkoutDay from "../../pages/WorkoutDay";
import MealDetails from "../../pages/MealDetails";
import ExerciseDetails from "../../pages/ExerciseDetails";



function RequireAuth() {
  const token = useAuthStore((s) => s.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function RequireOnboardingDone() {
  const done = useOnboardingStore((s) => s.isCompleted);
  return done ? <Outlet /> : <Navigate to="/onboarding" replace />;
}

function BlockAuthPages({ children }) {
  const token = useAuthStore((s) => s.token);
  const done = useOnboardingStore((s) => s.isCompleted);

  if (token && done) return <Navigate to="/home" replace />;
  if (token && !done) return <Navigate to="/onboarding" replace />;

  return children;
}

function IndexRedirect() {
  const token = useAuthStore((s) => s.token);
  const done = useOnboardingStore((s) => s.isCompleted);

  if (!token) return <Navigate to="/login" replace />;
  if (!done) return <Navigate to="/onboarding" replace />;
  return <Navigate to="/home" replace />;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Smart Index */}
      <Route path="/" element={<IndexRedirect />} />

      {/* Auth */}
      <Route
        path="/login"
        element={
          <BlockAuthPages>
            <Login />
          </BlockAuthPages>
        }
      />
      <Route
        path="/signup"
        element={
          <BlockAuthPages>
            <Signup />
          </BlockAuthPages>
        }
      />

      {/* لازم Login */}
      <Route element={<RequireAuth />}>
        {/* Onboarding متاح بعد Login */}
        <Route path="/onboarding" element={<OnboardingWizard />} />

        {/* لازم يخلص Onboarding */}
        <Route element={<RequireOnboardingDone />}>
          {/* كل التابات تحت AppLayout عشان BottomNav */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/workout/day/:day" element={<WorkoutDay />} />
            <Route path="/workout/exercise/:workoutIndex/:exerciseIndex" element={<ExerciseDetails />} />


            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/nutrition/meal/:key" element={<MealDetails />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      {/* Default */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
