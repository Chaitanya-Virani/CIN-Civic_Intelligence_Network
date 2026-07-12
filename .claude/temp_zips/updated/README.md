# CIN — Campus Democracy OS

One React codebase that themes and feature-scopes itself per client (university,
panchayat, NGO) at runtime. Each tenant is a config row; flipping tenants
re-themes the whole app and changes which modules exist. Flagship tenant:
**Campus Democracy OS**.

> Hackathon UI build — clickable demo on mock data. No backend. All data flows
> through a single `src/api/` seam that returns Promises, so a real
> Supabase/Flask layer can drop in without touching the screens.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
```

## The demo path

1. **Home** (`/`) — public landing page. The nav bar has two entry points:
   **Admin** and **Client Sign Up**.
2. **Admin console** (`/admin/login` → `/admin`) — sign in as the platform
   administrator (simulated Duo MFA), then toggle between **College** and
   **Panchayat** tenants, pick a specific institution, and review its live
   proposal/vote snapshot. **Provision new tenant** (`/admin/provision`) spins
   up a fresh, fully themed client on the spot.
3. **Client sign up** (`/signup`) — choose College or Panchayat, pick the
   specific institution, fill in your details, verify via Duo MFA, and land
   straight in that tenant's feed as a brand-new member.
4. **Client sign in** (`/login`) — branded per tenant, pick a demo account →
   simulated **Duo** MFA.
5. **Proposal feed** (`/feed`) — tenant-scoped, filter by pipeline stage, sort.
6. **Proposal detail** (`/proposals/:id`) — the 4-stage trust pipeline strip;
   **Vote** triggers Duo MFA, records one vote per member, updates the
   per-constituency breakdown.
7. **Live tally** (`/tally`) — animated, grouped by department/ward, ticks as
   votes land.
8. **Participatory budgeting** (`/budgeting`) — allocate a shared budget
   across proposals (where enabled).

## Architecture

| Concern | Where |
|---|---|
| Tenants (config rows) | `src/config/tenants.ts` |
| Feature-module catalog (17) | `src/config/modules.ts` |
| Tenant resolve + theming + `hasFeature()` | `src/context/TenantContext.tsx` |
| Member session (per-tenant) | `src/context/SessionContext.tsx` |
| Admin session (platform-level) | `src/context/AdminSessionContext.tsx` |
| Mock API (the only data seam) | `src/api/index.ts` |
| Seed data (users, proposals) | `src/api/mock/` |
| Mutable state (tenants, votes, sessions) | `src/lib/store.ts` → localStorage |
| Public pages (home, sign in/up, admin gate) | `src/pages/HomePage.tsx`, `LoginPage.tsx`, `SignupPage.tsx`, `AdminLoginPage.tsx` |
| Admin console | `src/pages/AdminDashboardPage.tsx`, `src/pages/ProvisionPage.tsx` |
| Member screens | `src/pages/FeedPage.tsx`, `ProposalDetailPage.tsx`, `TallyPage.tsx`, `BudgetingPage.tsx` |

### Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | public | Landing page — Admin / Client Sign Up nav |
| `/login` | public | Client (member) sign-in, tenant-branded |
| `/signup` | public | Client sign-up — choose College or Panchayat |
| `/admin/login` | public | Admin sign-in gate |
| `/admin` | admin only | Tenant toggle (College/Panchayat) + live snapshot |
| `/admin/provision` | admin only | Provision a new tenant |
| `/feed` | member only | Proposal feed |
| `/proposals/:id` | member only | Proposal detail + voting |
| `/tally` | member only | Live tally (if enabled) |
| `/budgeting` | member only | Participatory budgeting (if enabled) |

Theming is CSS custom properties (`--primary` / `--accent`) set on `:root` from
the active tenant's branding; features gate nav, routes, and modules live.

Reset all demo state with the ↺ button in the system bar (inside the admin
console).

