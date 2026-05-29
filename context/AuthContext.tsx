"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;

  login: (
    password: string
  ) => boolean;

  logout: () => void;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const auth =
      localStorage.getItem("admin-auth");

    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string) => {
    // CAMBIA ESTA CONTRASEÑA
    const correctPassword = "mayra123";

    if (password === correctPassword) {
      localStorage.setItem(
        "admin-auth",
        "true"
      );

      setIsAuthenticated(true);

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem(
      "admin-auth"
    );

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de AuthProvider"
    );
  }

  return context;
}