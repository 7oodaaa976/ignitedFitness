export default function Screen({ children, className = "" }) {
  return (
    <div className={`min-h-screen app-bg text-white ${className}`}>
      {children}
    </div>
  );
}
