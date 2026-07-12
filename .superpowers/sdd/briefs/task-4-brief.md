# Task 4: Tenant Refinements & Slido Integration

## Requirements
1. **Slido API Route**:
   - Create `cin/app/api/config/slido/route.ts`.
   - Implement a `GET` handler that returns `{ eventId: process.env.SLIDO_EVENT_ID || null }` as JSON.
2. **Tenant Route Group**:
   - Create `cin/app/(tenant)/layout.tsx`.
   - Wrap children in any necessary tenant-level providers.
   - Move all `cin/app/t/[tenant]` routes into this group (`cin/app/(tenant)/t/[tenant]`).
3. **Verification**:
   - Ensure the `TenantShell` still wraps the member pages correctly.
   - Verify that navigating to `/t/[tenant]` still functions as expected.

## Global Constraints
- Use Next.js Route Groups (`(tenant)`) for isolation.
- Slido API must return JSON.
