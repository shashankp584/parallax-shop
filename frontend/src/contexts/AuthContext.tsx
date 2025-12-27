import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth.service";

interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    setUser(res.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await authService.register({ name, email, password });
    setUser(res.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
