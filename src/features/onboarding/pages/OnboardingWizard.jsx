import Screen from "../../../components/common/Screen";
import { STEPS } from "../config/steps";
import { useOnboardingStore } from "../store/onboardingStore";
import StepCounter from "../components/StepCounter";
import StepRenderer from "../components/StepRenderer";
import NavButtons from "../components/NavButtons";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../lib/i18n/useTranslate";
import { generatePlan } from "../../plan/planEngine";

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const t = useTranslate();

  const stepIndex = useOnboardingStore((s) => s.stepIndex);
  const next = useOnboardingStore((s) => s.next);
  const prev = useOnboardingStore((s) => s.prev);

  const answers = useOnboardingStore((s) => s.answers);
  const setPlan = useOnboardingStore((s) => s.setPlan);
  const setPlanStartedAt = useOnboardingStore((s) => s.setPlanStartedAt);
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);

  const step = STEPS[stepIndex];
  const total = STEPS.length;
  const isLast = stepIndex === total - 1;

  const currentAnswer = answers[step.id];
  const disableNext = (() => {
    if (currentAnswer == null) return true;

    if (Array.isArray(currentAnswer)) {
      if (currentAnswer.length === 0) return true;
    } else if (String(currentAnswer).trim() === "") {
      return true;
    }

    if (step.type === "input" && step.kind === "number") {
      const n = Number(currentAnswer);
      if (!Number.isFinite(n)) return true;
      if (step.min != null && n < step.min) return true;
      if (step.max != null && n > step.max) return true;
    }

    return false;
  })();


  function handleNext() {
    if (!isLast) {
      next();
      return;
    }

    // ✅ Finish
    const plan = generatePlan(answers);
    setPlan(plan);

    const startedAt = new Date().toISOString();
    setPlanStartedAt(startedAt);

    completeOnboarding();
    navigate("/home", { replace: true });
  }
  if ((step.type === "choice" || step.type === "yn" || step.type === "multi" || step.type === "time" || step.type === "select") && Array.isArray(step.options)) {
    const bad = step.options.some((o) => typeof o !== "object" || o == null || !("value" in o) || !("labelKey" in o));
    if (bad) console.warn("BAD OPTIONS SHAPE:", step.id, step.options);
  }


  return (
    <Screen className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-white text-center text-xl font-semibold mb-2">
          {t(step.titleKey || step.title || "")}
        </h1>

        {step.subtitleKey ? (
          <p className="text-cyan-300 text-center text-sm mb-4">
            {t(step.subtitleKey)}
          </p>
        ) : null}

        <div className="flex justify-center mb-6">
          <StepCounter current={stepIndex + 1} total={total} />
        </div>

        <StepRenderer step={step} />

        <NavButtons
          onPrev={prev}
          onNext={handleNext}
          disablePrev={stepIndex === 0}
          disableNext={disableNext}
        />
      </div>
    </Screen>
  );
}
