import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="h-screen w-screen bg-[#E6E6C2]">
      <Header />
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
