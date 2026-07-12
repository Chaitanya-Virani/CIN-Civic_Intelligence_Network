import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, UserCog } from "lucide-react";
import { useAdminSession } from "@/context/AdminSessionContext";
import { Button } from "@/components/ui/button";
import { DuoModal } from "@/components/duo-modal";

export function AdminLoginPage() {
  const { isAdminAuthed, loginAsAdmin } = useAdminSession();
  const navigate = useNavigate();
  const [duoOpen, setDuoOpen] = useState(false);

  useEffect(() => {
    if (isAdminAuthed) navigate("/admin", { replace: true });
  }, [isAdminAuthed, navigate]);

  function onVerified() {
    loginAsAdmin();
    setDuoOpen(false);
    navigate("/admin", { replace: true });
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(120%_100%_at_50%_-20%,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_70%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-6 py-12">
        <div className="animate-rise text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-system text-white shadow-lg">
            <UserCog size={26} />
          </div>
          <h1 className="mt-5 font-display text-[26px] font-semibold leading-tight tracking-tight text-ink">
            Admin console
          </h1>
          <p className="mx-auto mt-1.5 max-w-xs text-[14.5px] text-ink-2">
            Manage every tenant — switch between colleges and panchayats,
            review live activity, and provision new civic apps.
          </p>
        </div>

        <div className="mt-8 animate-rise" style={{ animationDelay: "60ms" }}>
          <Button size="lg" className="w-full" onClick={() => setDuoOpen(true)}>
            Continue as Administrator
            <ArrowRight size={17} />
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[11px] text-ink-3">
            <ShieldCheck size={13} className="text-ok" />
            Protected by two-factor authentication
          </p>
        </div>

        <p className="mt-8 text-center text-[13px] text-ink-3">
          Not an administrator?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up as a client
          </Link>
        </p>
      </div>

      <DuoModal
        open={duoOpen}
        onClose={() => setDuoOpen(false)}
        onVerified={onVerified}
        title="Confirm admin sign-in"
        context="Signing in to the CIN admin console"
      />
    </div>
  );
}
