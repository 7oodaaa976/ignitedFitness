export default function SocialButton({ provider = "google", onClick }) {
  const isGoogle = provider === "google";
  const label = isGoogle ? "Continue with Google" : "Continue with Facebook";

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900/60 text-white neon font-semibold transition hover:opacity-95 active:scale-[0.99]"
    >
      {isGoogle ? <GoogleIcon /> : <FacebookIcon />}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.834 32.658 29.341 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.021 6.053 29.243 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.021 6.053 29.243 4 24 4c-7.682 0-14.34 4.33-17.694 10.691Z"/>
      <path fill="#4CAF50" d="M24 44c5.135 0 9.835-1.965 13.378-5.17l-6.186-5.238C29.182 35.091 26.715 36 24 36c-5.318 0-9.798-3.317-11.279-7.946l-6.52 5.025C9.505 39.556 16.227 44 24 44Z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.721 2.033-2.058 3.761-3.925 4.986l.003-.002 6.186 5.238C36.999 39.7 44 35 44 24c0-1.341-.138-2.65-.389-3.917Z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12A12 12 0 1 0 10.125 23.85v-8.437H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.81c-1.49 0-1.953.925-1.953 1.874V12h3.328l-.532 3.413h-2.796v8.437A12.004 12.004 0 0 0 24 12Z"
      />
      <path
        fill="#fff"
        d="M16.653 15.413 17.185 12h-3.328V9.96c0-.949.463-1.874 1.953-1.874h1.514V5.133s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669V12H7.078v3.413h3.047v8.437a12.08 12.08 0 0 0 3.732 0v-8.437h2.796Z"
      />
    </svg>
  );
}
