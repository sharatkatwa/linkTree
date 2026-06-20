import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (data) => {
    await api("/auth/register", data);
  };

  const login = async (data) => {
    await api("/auth/login", data);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      register,
      login,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
