import {
  Register,
  Login,
  Home,
  ManageCat,
  Favorites,
  NotFound,
  ViewCat,
} from "@/app";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";
import { useAuthContext } from "@/contexts/auth";

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      {/* loading route */}
      <Route>
        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/cat/view/:id" element={<ViewCat />} />

        {/* private routes */}
        {isAuthenticated && (
          <Route element={<RootLayout />}>
            <Route path="/cat/add" element={<ManageCat />} />
            <Route path="/cat/update/:id" element={<ManageCat />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        )}
      </Route>
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
