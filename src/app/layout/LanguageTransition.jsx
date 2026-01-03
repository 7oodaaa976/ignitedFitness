import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { useLangStore } from "../../lib/i18n/langStore";

export default function LanguageTransition() {
  const lang = useLangStore((s) => s.lang);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
