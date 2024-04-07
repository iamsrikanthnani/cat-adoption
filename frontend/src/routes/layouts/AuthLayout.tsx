import { useAuthContext } from "@/contexts/auth";
import { CatIcon } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <div className="CONTAINER relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-primary text-primary-foreground p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 " />
        <div className="relative z-20 flex items-center text-lg font-medium gap-2">
          <CatIcon />
          Cat Adoption
        </div>
        <img
          src="https://images.unsplash.com/photo-1455525928928-837c99714248"
          className="rounded-2xl mt-24 shadow-lg"
        />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Find your purr-fect companion and unlock a lifetime of
              love. Welcome to our community, where every meow counts and every
              heart finds its match. Join us in making homes happier, one
              whisker at a time.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
