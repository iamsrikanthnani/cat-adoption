import { useAuthContext } from "@/contexts/auth";
import { CatIcon, HeartIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated } = useAuthContext();

  const isFavorites = window.location.pathname.includes("/favorites");

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white">
      <div className="flex items-center text-lg font-medium gap-2">
        <CatIcon className="w-6 h-6" />
        <span className="hidden sm:block">Cat Adoption</span>
      </div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <Link
            to={isFavorites ? "/" : "/favorites"}
            className="p-[4px] px-[6px] hover:bg-[#E6E6C2] rounded-md"
          >
            {isFavorites ? (
              <HomeIcon />
            ) : (
              <HeartIcon fill="#000033" color={"#000033"} />
            )}
          </Link>
        ) : (
          <Link
            to="/auth/login"
            className="py-[4px] px-[12px] font-medium hover:bg-[#E6E6C2] hover:bg-opacity-30 rounded-md"
          >
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
