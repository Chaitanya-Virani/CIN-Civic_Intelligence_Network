import type { ReactNode } from "react";
import { PublicHeader } from "@/components/public/header";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      {children}
    </div>
  );
}
