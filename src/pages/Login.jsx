import { useEffect, useRef, useState } from "react";
import Screen from "../components/common/Screen";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import SocialButton from "../components/ui/SocialButton";


function isValidEmail(v) {
  return /^\S+@\S+\.\S+$/.test(v);
}

function Eye({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.9 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18.4 18.4 0 0 1-3.3 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.3 6.3C3.9 8.1 2 12 2 12s3.5 7 10 7c1.2 0 2.4-.2 3.4-.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!shake) return;
    const t = setTimeout(() => setShake(false), 300);
    return () => clearTimeout(t);
  }, [shake]);

  const disabled =
    loading || !isValidEmail(email.trim()) || pass.trim().length < 6;

  function validate() {
    if (!isValidEmail(email.trim())) {
      emailRef.current?.focus();
      return "Please enter a valid email";
    }
    if (pass.trim().length < 6) {
      passRef.current?.focus();
      return "Password must be at least 6 characters";
    }
    return "";
  }

  async function handleLogin() {
    if (loading) return;

    const err = validate();
    if (err) {
      setError(err);
      setShake(true);
      return;
    }

    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 550));

    const safeEmail = email.trim();
    login({
      email: safeEmail,
      name: safeEmail.split("@")[0],
    });

    setLoading(false);
    navigate("/onboarding", { replace: true });
  }

  return (
    <Screen className="flex items-center justify-center px-4">
      <div
        className={[
          "w-full max-w-sm card-soft p-6 rounded-3xl border border-zinc-700/50",
          shake ? "shake" : "",
        ].join(" ")}
      >
        <h1 className="text-cyan-300 text-center shadow-cyan-500  shadow-2xs text-2xl font-semibold">LOGIN</h1>
        {/* <p className="text-gray-300 mt-2">Fake Auth for UI</p> */}

        <div className="mt-6 space-y-3">
          <input
            ref={emailRef}
            className="w-full p-3 rounded-xl bg-zinc-900/60 text-white neon outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          {/* Password with show/hide */}
          <div className="relative">
            <input
              ref={passRef}
              className="w-full p-3 pr-11 rounded-xl bg-zinc-900/60 text-white neon outline-none"
              placeholder="Password"
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              <Eye open={showPass} />
            </button>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          ) : null}

          <button
            className={[
              "w-full py-3 rounded-xl font-semibold transition",
              disabled
                ? "bg-cyan-400/20 text-cyan-200/60"
                : "bg-cyan-400 text-black hover:opacity-95 active:scale-[0.99]",
            ].join(" ")}
            onClick={handleLogin}
            disabled={disabled}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="relative my-4">
            <div className="h-[1px] bg-zinc-700/50" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 text-xs text-gray-400 bg-transparent">
              OR
            </span>
          </div>

          <div className="space-y-3">
            <SocialButton
              provider="google"
              onClick={() => alert("Google Login (UI فقط)")}
            />
            <SocialButton
              provider="facebook"
              onClick={() => alert("Facebook Login (UI فقط)")}
            />
          </div>


        </div>

        <p className="text-gray-400 text-sm mt-4">
          Don’t have an account?{" "}
          <Link className="text-cyan-300 hover:underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </Screen>
  );
}
