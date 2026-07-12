'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTenants, getCurrentTenantId, setCurrentTenantId, type Tenant } from '@/lib/store';

interface TenantContextType {
  tenant: Tenant;
  tenants: Tenant[];
  switchTenant: (id: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentTenantId, setCurrentTenantIdState] = useState('');
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    const allTenants = getTenants();
    setTenants(allTenants);
    const id = getCurrentTenantId();
    setCurrentTenantIdState(id);
    const current = allTenants.find((t) => t.id === id);
    if (current) {
      setTenant(current);
    } else if (allTenants.length > 0) {
      setTenant(allTenants[0]);
    }
  }, []);

  const switchTenant = (id: string) => {
    setCurrentTenantId(id);
    setCurrentTenantIdState(id);
    const allTenants = getTenants();
    const current = allTenants.find((t) => t.id === id);
    if (current) {
      setTenant(current);
    }
  };

  if (!tenant) {
    return null; // Or a loading spinner
  }

  return (
    <TenantContext.Provider value={{ tenant, tenants, switchTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
