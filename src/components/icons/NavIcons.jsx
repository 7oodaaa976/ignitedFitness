export function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

export function DumbbellIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 10v4M18 10v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={active ? 1 : 0.7}
      />
      <path
        d="M8 9h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8M16 9h-1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.7}
      />
      <path
        d="M5 9v6M19 9v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

export function FoodIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3v8M10 3v8M7 7h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={active ? 1 : 0.7}
      />
      <path
        d="M14 3v7a2 2 0 0 0 2 2v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.7}
      />
      <path
        d="M18 3v7a2 2 0 0 1-2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

export function UserIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity={active ? 1 : 0.7}
      />
      <path
        d="M4 21a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

export function SettingsIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15.5a3.5 3.5 0 1 0-3.5-3.5 3.5 3.5 0 0 0 3.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity={active ? 1 : 0.7}
      />
      <path
        d="M19.4 15a7.9 7.9 0 0 0 .1-1l2-1.2-2-3.4-2.3.6a7.6 7.6 0 0 0-1.7-1L15.2 6h-6.4L8.5 8.9a7.6 7.6 0 0 0-1.7 1L4.5 9.3 2.5 12.7l2 1.2a7.9 7.9 0 0 0 .1 1l-2 1.2 2 3.4 2.3-.6a7.6 7.6 0 0 0 1.7 1L8.8 22h6.4l.3-2.9a7.6 7.6 0 0 0 1.7-1l2.3.6 2-3.4-2.1-1.3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}
