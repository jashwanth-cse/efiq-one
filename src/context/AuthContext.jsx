"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not checked yet

  useEffect(() => {
    const stored = localStorage.getItem("efiq_user");
    setUser(stored ? JSON.parse(stored) : false); // false = logged out
  }, []);

  const login = (userData) => {
    localStorage.setItem("efiq_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("efiq_user");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
