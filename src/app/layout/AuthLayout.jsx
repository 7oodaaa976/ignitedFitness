import Screen from "../../components/common/Screen";

export default function AuthLayout({ children }) {
  return (
    <Screen className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm">{children}</div>
    </Screen>
  );
}
