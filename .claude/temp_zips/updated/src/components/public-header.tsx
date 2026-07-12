import { Link, useLocation } from "react-router-dom";
import { Command, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The nav bar shown on every public (unauthenticated) surface — the landing
 * page, client sign-up, client sign-in, and the admin sign-in gate. It always
 * surfaces the two entry points into the product: "Admin" (platform console)
 * and "Client Sign Up" (join as a college or panchayat member).
 */
export function PublicHeader() {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");
  const isSignup = location.pathname === "/signup";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Command size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display text-[16px] font-semibold tracking-tight text-ink">
            Civic<span className="text-ink-3">OS</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
          <Link
            to="/login"
            className={cn(
              "hidden items-center gap-1.5 rounded-[var(--radius-app)] px-3 py-2 text-[13px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink sm:flex",
              location.pathname === "/login" && "text-ink",
            )}
          >
            <LogIn size={15} />
            Sign in
          </Link>
          <Link
            to="/admin/login"
            className={cn(
              "flex items-center gap-1.5 rounded-[var(--radius-app)] border border-line-strong bg-surface px-3 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-surface-2",
              isAdminArea && "border-primary/40 bg-primary-soft text-primary-strong",
            )}
          >
            <ShieldCheck size={15} />
            Admin
          </Link>
          <Link
            to="/signup"
            className={cn(
              "flex items-center gap-1.5 rounded-[var(--radius-app)] bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-strong",
              isSignup && "ring-2 ring-primary/30",
            )}
          >
            <UserPlus size={15} />
            Client Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
