import { Outlet } from "react-router-dom";
import BottomNav from "@/components/molecules/BottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <main className="pb-20 lg:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;