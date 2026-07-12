import { Navigate, Route, Routes } from "react-router-dom";
import { SystemBar } from "@/components/system-bar";
import { AppShell } from "@/components/app-shell";
import { PublicLayout } from "@/components/public-layout";
import { useSession } from "@/context/SessionContext";
import { useTenant } from "@/context/TenantContext";
import { useAdminSession } from "@/context/AdminSessionContext";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { AdminLoginPage } from "@/pages/AdminLoginPage";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";
import { FeedPage } from "@/pages/FeedPage";
import { ProposalDetailPage } from "@/pages/ProposalDetailPage";
import { TallyPage } from "@/pages/TallyPage";
import { BudgetingPage } from "@/pages/BudgetingPage";
import { ProvisionPage } from "@/pages/ProvisionPage";
import type { ReactNode } from "react";

function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthed } = useSession();
  return isAuthed ? <>{children}</> : <Navigate to="/login" replace />;
}

function RequireAdminAuth({ children }: { children: ReactNode }) {
  const { isAdminAuthed } = useAdminSession();
  return isAdminAuthed ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

function RequireFeature({
  feature,
  children,
}: {
  feature: string;
  children: ReactNode;
}) {
  const { hasFeature } = useTenant();
  return hasFeature(feature) ? <>{children}</> : <Navigate to="/feed" replace />;
}

/** Chrome for the platform-admin console: the OS system bar (tenant toggle,
 * reset) plus whatever admin screen is active. */
function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SystemBar />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* ---------------------------- public ---------------------------- */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicLayout>
            <SignupPage />
          </PublicLayout>
        }
      />
      <Route
        path="/admin/login"
        element={
          <PublicLayout>
            <AdminLoginPage />
          </PublicLayout>
        }
      />

      {/* ----------------------- admin console -------------------------- */}
      <Route
        path="/admin"
        element={
          <RequireAdminAuth>
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/provision"
        element={
          <RequireAdminAuth>
            <AdminLayout>
              <div className="px-6 py-10">
                <ProvisionPage />
              </div>
            </AdminLayout>
          </RequireAdminAuth>
        }
      />

      {/* ------------------------ client (member) area ------------------ */}
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/proposals/:id" element={<ProposalDetailPage />} />
        <Route
          path="/tally"
          element={
            <RequireFeature feature="tally">
              <TallyPage />
            </RequireFeature>
          }
        />
        <Route
          path="/budgeting"
          element={
            <RequireFeature feature="participatory_budgeting">
              <BudgetingPage />
            </RequireFeature>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
