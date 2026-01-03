import Screen from "../components/common/Screen";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const complete = useOnboardingStore((s) => s.complete);
  const navigate = useNavigate();

  return (
    <Screen className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm card-soft p-6 rounded-3xl">
        <h1 className="text-cyan-300 text-2xl font-semibold">ONBOARDING</h1>
        <p className="text-gray-300 mt-2">Temporary screen (Step 3 test)</p>

        <button
          className="w-full mt-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold"
          onClick={() => {
            complete();
            navigate("/home", { replace: true });
          }}
        >
          Finish Onboarding
        </button>
      </div>
    </Screen>
  );
}
