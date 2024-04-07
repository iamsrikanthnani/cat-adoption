import { Register, Login, Home, ManageCat, Favorites, NotFound } from "@/app";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* loading route */}
      <Route>
        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>

        {/* private routes */}
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/cat/add" element={<ManageCat />} />
          <Route path="/cat/update" element={<ManageCat />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Route>
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
