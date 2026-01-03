import AppRouter from "./app/router/AppRouter";
import { useLangEffects } from "./lib/i18n/useLangEffects";

export default function App() {
  useLangEffects();
  return <AppRouter />;
}
