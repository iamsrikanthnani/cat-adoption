import React, { createContext, useContext, useEffect, useState } from "react";
import { TYPE_USER } from "@/types";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: TYPE_USER | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  onSignOut: () => {};
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
  onSignOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const checkAuthUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (accessToken && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  const onSignOut = async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    onSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
