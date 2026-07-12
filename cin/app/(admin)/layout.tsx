"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSessionProvider, useAdminSession } from "@/context/AdminSessionContext";
import { TenantProvider } from "@/context/TenantContext";

function AdminGate({ children }: { children: React.ReactNode }) {
  const { isAdminAuthed } = useAdminSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdminAuthed && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isAdminAuthed, pathname, router]);

  if (!isAdminAuthed && pathname !== "/admin/login") {
    return null; // Avoid flicker while redirecting
  }

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSessionProvider>
      <TenantProvider>
        <AdminGate>{children}</AdminGate>
      </TenantProvider>
    </AdminSessionProvider>
  );
}
