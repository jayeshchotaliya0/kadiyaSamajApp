"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface DemoUser {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextValue {
  user: DemoUser | null;
  admin: DemoUser | null;
  loginUser: (email: string, _password: string) => boolean;
  loginAdmin: (email: string, _password: string) => boolean;
  logoutUser: () => void;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const USER_KEY = "prajabandhan-user";
const ADMIN_KEY = "prajabandhan-admin";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [admin, setAdmin] = useState<DemoUser | null>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem(USER_KEY);
      const a = localStorage.getItem(ADMIN_KEY);
      if (u) setUser(JSON.parse(u) as DemoUser);
      if (a) setAdmin(JSON.parse(a) as DemoUser);
    } catch {
      /* ignore */
    }
  }, []);

  const loginUser = useCallback((email: string) => {
    const next = { name: "Demo Member", email, role: "user" as const };
    setUser(next);
    localStorage.setItem(USER_KEY, JSON.stringify(next));
    return true;
  }, []);

  const loginAdmin = useCallback((email: string) => {
    const next = { name: "Demo Admin", email, role: "admin" as const };
    setAdmin(next);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(next));
    return true;
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem(ADMIN_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, admin, loginUser, loginAdmin, logoutUser, logoutAdmin }),
    [user, admin, loginUser, loginAdmin, logoutUser, logoutAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
