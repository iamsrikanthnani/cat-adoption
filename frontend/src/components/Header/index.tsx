import { useAuthContext } from "@/contexts/auth";
import { CatIcon, HeartIcon, HomeIcon, User2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { isAuthenticated, user, onSignOut } = useAuthContext();

  const isFavorites = window.location.pathname.includes("/favorites");
  const isAddCat = window.location.pathname.includes("/cat/add");

  return (
    <div className="fixed w-full z-[100] flex justify-between items-center px-8 py-4 bg-white">
      <Link
        to="/"
        className="flex  justify-center items-center gap-2 py-[4px] px-[12px] font-medium hover:bg-[#E6E6C2] rounded-md"
      >
        <div className="select-none flex items-center text-lg font-medium gap-2">
          <CatIcon className="w-6 h-6" />
          <span className="hidden sm:block">Cat Adoption</span>
        </div>
      </Link>

      {isAuthenticated ? (
        <div className="flex gap-2">
          {user?.role === "admin" && !isAddCat && (
            <Link
              to="/cat/add"
              className="flex select-none justify-center items-center gap-2 py-[4px] px-[12px] font-medium hover:bg-[#E6E6C2] rounded-md"
            >
              <span>Add cat</span>
              <CatIcon width={16} height={16} />
            </Link>
          )}

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

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-[4px] px-[6px] hover:bg-[#E6E6C2] rounded-md cursor-pointer">
                <User2Icon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8 z-[110]">
              <DropdownMenuLabel>
                {user?.name} ({user?.role})
              </DropdownMenuLabel>
              <DropdownMenuLabel>email: {user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            to="/auth/login"
            className="py-[4px] px-[12px] font-medium hover:bg-[#E6E6C2] hover:bg-opacity-30 rounded-md"
          >
            <span>Sign In</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
