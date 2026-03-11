"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not checked yet

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(false);
      }
    };
    getSession();

    // Listen for changes on auth state (log in, log out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (userData) => {
    // Provided for compatibility if needed, but onAuthStateChange handles the state.
    setUser(userData);
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
