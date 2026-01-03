import { Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import LangAnimated from "../../components/common/LangAnimated";

export default function AppLayout() {
  return (
    <>
      <LangAnimated>
        <Outlet />
      </LangAnimated>
      <BottomNav />
    </>
  );
}
