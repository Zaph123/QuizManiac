import { Outlet } from "react-router-dom";
import MainNav from "../component/navbar/MainNav";

const MainLayout = () => {
  return (
    <main className="w-full min-h-screen">
      {/* Main Navigation */}
      <MainNav />
      <div className="h-full">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
