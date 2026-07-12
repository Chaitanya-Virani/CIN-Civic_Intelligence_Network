'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSession, setSession, type Session } from '@/lib/store';

interface SessionContextType {
  session: Session | null;
  login: (userId: string, tenantId?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthed: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    setSessionState(getSession());
  }, []);

  const login = async (userId: string, tenantId?: string) => {
    const newSession = { userId, tenantId: tenantId || 'default' };
    setSession(newSession);
    setSessionState(newSession);
  };

  const logout = async () => {
    setSession(null);
    setSessionState(null);
  };

  const isAuthed = !!session;

  return (
    <SessionContext.Provider value={{ session, login, logout, isAuthed }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
