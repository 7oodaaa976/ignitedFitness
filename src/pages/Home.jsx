import Screen from "../components/common/Screen";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import { useOnboardingStore } from "../features/onboarding/store/onboardingStore";
import { useTranslate } from "../lib/i18n/useTranslate";
import PlanCard from './../features/home/PlanCard';

const hero1 = null;
const hero2 = null;

function calcPlanDay(startedAt) {
  if (!startedAt) return 1;
  const start = new Date(startedAt);
  const today = new Date();
  const diff = today - start;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

export default function Home() {
  const t = useTranslate();
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const plan = useOnboardingStore((s) => s.plan);
  const planStartedAt = useOnboardingStore((s) => s.planStartedAt);

  const displayName =
    (user?.name?.trim() || user?.email?.split("@")[0] || "AHMED").toUpperCase();

  const dayNumber = calcPlanDay(planStartedAt);
  const daysDone = Math.max(0, dayNumber - 1);

  const planTitle = plan?.title || t("home.planName");
  const daysPerWeek = plan?.daysPerWeek || 3;
  const split = plan?.split || "";

  return (
    <Screen className="px-5 pt-8 pb-28">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="card-soft px-6 py-6 rounded-3xl border border-zinc-700/50">
          <p className="text-gray-200 text-sm">{t("home.goodMorning")}</p>

          <div className="flex items-start justify-between mt-1">
            <h1 className="text-cyan-300 text-2xl font-semibold tracking-wide truncate max-w-[70%]">
              {displayName}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-200">
              <span>{daysDone} Days</span>
              <span className="text-cyan-300">🔥</span>
            </div>
          </div>

          {/* Small plan meta */}
          <div className="mt-3 flex items-center justify-between text-xs text-gray-300">
            <span>{planTitle}</span>
            <span className="text-cyan-300">
              {daysPerWeek}x / week {split ? `• ${split}` : ""}
            </span>
          </div>

          {/* Progress bar (30 days demo) */}
          <div className="mt-4 h-2 rounded-full bg-zinc-800/60 overflow-hidden">
            <div
              className="h-full bg-cyan-300/70"
              style={{ width: `${Math.min(100, (dayNumber / 30) * 100)}%` }}
            />
          </div>

          <p className="text-gray-400 text-xs mt-2">
            {t("home.day")} {dayNumber} / 30
          </p>
        </div>

        {/* Continue plan */}
        <h2 className="mt-6 mb-3 text-cyan-300 text-sm tracking-wide">
          {t("home.continuePlan")}
        </h2>

        <div className="space-y-4">
          <PlanCard
            title={planTitle}
            day={`${t("home.day")} ${dayNumber}`}
            img={hero1}
            variant="big"
            onClick={() => navigate("/workout")}
          />
          <PlanCard
            title={planTitle}
            day={`${t("home.day")} ${dayNumber}`}
            img={hero2}
            variant="small"
            onClick={() => navigate("/nutrition")}
          />
        </div>
      </div>
    </Screen>
  );
}
