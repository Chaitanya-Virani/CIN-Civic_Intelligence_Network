'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import { useSession } from "@/context/SessionContext";
import { auth } from "@/lib/api";
import { getTenant } from "@/lib/tenant";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login } = useSession();
  const router = useRouter();

  const [tenantSlug, setTenantSlug] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (!tenantSlug || !userId) return;
    setLoading(true);
    setError(null);

    try {
      const tenant = await getTenant(tenantSlug);
      if (!tenant) {
        setError("Tenant not found.");
        setLoading(false);
        return;
      }

      await auth.login(tenant.slug, userId);
      await login(userId, tenant.slug);
      router.replace(`/t/${tenant.slug}`);
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(120%_100%_at_50%_-20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_70%)]" />

      <div className="relative mx-auto max-w-md px-6 py-14">
        <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-ink-3">
          <Lock size={13} />
          Client sign in
        </div>

        <div className="animate-rise">
          <h1 className="font-display text-[26px] font-semibold tracking-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-1.5 text-[14px] text-ink-2">
            Enter your credentials to access your civic feed.
          </p>

          <div className="mt-6 space-y-4">
            <section>
              <Label>Tenant slug</Label>
              <Input
                value={tenantSlug}
                onChange={(e) => setTenantSlug(e.target.value)}
                placeholder="e.g. xaviers"
                autoFocus
              />
            </section>
            <section>
              <Label>User ID</Label>
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. xaviers-u1"
              />
            </section>
          </div>

          {error && (
            <p className="mt-4 text-[13px] font-medium text-error">{error}</p>
          )}

          <Button
            size="lg"
            className="mt-6 w-full"
            disabled={loading || !tenantSlug || !userId}
            onClick={handleLogin}
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-[spin_800ms_linear_infinite]" />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <ArrowRight size={17} />
              </>
            )}
          </Button>

          <p className="mt-8 text-center text-[13px] text-ink-3">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
