import { PublicLayout } from "@/components/public/layout";
import { TenantProvider } from "@/context/TenantContext";
import { SessionProvider } from "@/context/SessionContext";

export default function PublicRouteGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TenantProvider>
        <PublicLayout>
          {children}
        </PublicLayout>
      </TenantProvider>
    </SessionProvider>
  );
}
