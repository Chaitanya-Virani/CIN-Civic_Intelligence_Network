"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getAdminSession, setAdminSession } from "@/lib/store";

interface AdminSessionContextValue {
  isAdminAuthed: boolean;
  loginAsAdmin: () => void;
  logoutAdmin: () => void;
}

const AdminSessionContext = createContext<AdminSessionContextValue | null>(
  null,
);

/**
 * Platform-admin auth, separate from the per-tenant member session in
 * SessionContext. There's only one admin persona in this demo — no tenant
 * scoping, no user picker — it just gates the /admin console.
 */
export function AdminSessionProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthed, setIsAdminAuthed] = useState(() => getAdminSession());

  const loginAsAdmin = useCallback(() => {
    setAdminSession(true);
    setIsAdminAuthed(true);
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminSession(false);
    setIsAdminAuthed(false);
  }, []);

  const value = useMemo(
    () => ({ isAdminAuthed, loginAsAdmin, logoutAdmin }),
    [isAdminAuthed, loginAsAdmin, logoutAdmin],
  );

  return (
    <AdminSessionContext.Provider value={value}>
      {children}
    </AdminSessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminSession() {
  const ctx = useContext(AdminSessionContext);
  if (!ctx)
    throw new Error(
      "useAdminSession must be used within an AdminSessionProvider",
    );
  return ctx;
}
