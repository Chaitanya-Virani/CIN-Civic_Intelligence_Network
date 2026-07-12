"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Check,
  GraduationCap,
  Landmark,
  ListChecks,
  LogOut,
  Plus,
  Puzzle,
  Sparkles,
  Users2,
} from "lucide-react";
import { useTenant } from "@/context/TenantContext";
import { useAdminSession } from "@/context/AdminSessionContext";
import { tally, type TallyData } from "@/lib/api";
import type { Sector } from "@/config/modules";
import type { Tenant } from "@/config/tenants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SECTOR_META: Record<Sector, { label: string; icon: any }> = {
  education: { label: "Colleges", icon: GraduationCap },
  government: { label: "Panchayats", icon: Landmark },
  ngo: { label: "NGOs", icon: Users2 },
};

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary-strong">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-[20px] font-semibold leading-none text-ink">
          {value}
        </p>
        <p className="mt-1 text-[12.5px] text-ink-3">{label}</p>
      </div>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const { tenant, tenants, switchTenant } = useTenant();
  const { logoutAdmin } = useAdminSession();
  const router = useRouter();

  function signOut() {
    logoutAdmin();
    router.replace("/");
  }

  const sectors = useMemo(() => {
    const order: Sector[] = ["education", "government", "ngo"];
    const present = new Set(tenants.map((t) => t.sector));
    return order.filter((s) => present.has(s));
  }, [tenants]);

  const [sector, setSector] = useState<Sector>(tenant.sector);

  useEffect(() => {
    setSector(tenant.sector);
  }, [tenant.sector]);

  const tenantsInSector = useMemo(
    () => tenants.filter((t) => t.sector === sector),
    [tenants, sector],
  );

  function pickSector(s: Sector) {
    setSector(s);
    const first = tenants.find((t) => t.sector === s);
    if (first) switchTenant(first.id);
  }

  function pickTenant(t: Tenant) {
    switchTenant(t.id);
  }

  const [snapshot, setSnapshot] = useState<TallyData | null>(null);
  useEffect(() => {
    let live = true;
    tally.get(tenant).then((d) => {
      if (live) setSnapshot(d);
    });
    return () => {
      live = false;
    };
  }, [tenant]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-3">
              CIN · admin console
            </span>
          </div>
          <h1 className="mt-2 font-display text-[28px] font-semibold tracking-tight text-ink">
            Manage your tenants
          </h1>
          <p className="mt-1 max-w-xl text-[14px] text-ink-2">
            Toggle between colleges and panchayats to review live activity for
            each institution, exactly as members see it.
          </p>
        </div>
        <button
          onClick={signOut}
          className="flex shrink-0 items-center gap-1.5 rounded-[var(--radius-app)] border border-line-strong bg-surface px-3 py-2 text-[13px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>

      <div className="mt-7 inline-flex rounded-[calc(var(--radius-app)+2px)] border border-line bg-surface p-1">
        {sectors.map((s) => {
          const meta = SECTOR_META[s];
          const active = s === sector;
          return (
            <button
              key={s}
              onClick={() => pickSector(s)}
              className={cn(
                "flex items-center gap-2 rounded-[var(--radius-app)] px-4 py-2 text-[13.5px] font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-ink-2 hover:text-ink",
              )}
            >
              <meta.icon size={16} />
              {meta.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tenantsInSector.map((t) => {
          const active = t.id === tenant.id;
          return (
            <button
              key={t.id}
              onClick={() => pickTenant(t)}
              className={cn(
                "flex items-center gap-3 rounded-[calc(var(--radius-app)+2px)] border p-4 text-left transition-all",
                active
                  ? "border-primary bg-primary-soft/50 ring-1 ring-primary/25"
                  : "border-line bg-surface hover:border-line-strong",
              )}
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg font-display text-[13px] font-semibold"
                style={{
                  background: t.branding.primaryColor,
                  color: t.branding.primaryForeground,
                }}
              >
                {t.branding.logoText}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 truncate text-[14px] font-semibold text-ink">
                  {t.name}
                  {active && <Check size={14} className="shrink-0 text-primary" />}
                </span>
                <span className="font-mono text-[10.5px] text-ink-3">
                  {t.kind} · {t.features.length} modules
                </span>
              </span>
            </button>
          );
        })}

        <Link
          href="/admin/provision"
          className="flex items-center justify-center gap-2 rounded-[calc(var(--radius-app)+2px)] border border-dashed border-line-strong p-4 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Plus size={16} />
          Provision new tenant
        </Link>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold tracking-tight text-ink">
            Live snapshot · {tenant.name}
          </h2>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={ListChecks}
            label="Total proposals"
            value={snapshot?.totalProposals ?? "—"}
          />
          <StatCard
            icon={BarChart3}
            label="Total votes cast"
            value={snapshot?.totalVotes ?? "—"}
          />
          <StatCard
            icon={Puzzle}
            label="Modules enabled"
            value={tenant.features.length}
          />
          <StatCard
            icon={Users2}
            label={`${tenant.constituencyLabel}s reporting`}
            value={snapshot?.groups.length ?? "—"}
          />
        </div>

        {snapshot && snapshot.groups.length > 0 && (
          <Card className="mt-4 p-5">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-ink-3">
              Votes by {tenant.constituencyLabel.toLowerCase()}
            </p>
            <div className="space-y-2">
              {snapshot.groups.map((g) => {
                const max = snapshot.groups[0]?.votes || 1;
                return (
                  <div key={g.constituency} className="flex items-center gap-3">
                    <span className="w-36 shrink-0 truncate text-[13px] text-ink-2">
                      {g.constituency}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${Math.max(6, (g.votes / max) * 100)}%` }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right font-mono text-[12px] text-ink-3">
                      {g.votes}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
