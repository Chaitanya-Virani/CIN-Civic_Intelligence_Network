# Task 3: Admin Route Group (The Console)

## Requirements
1. **Admin Route Group Layout**:
   - Create `cin/app/(admin)/layout.tsx`.
   - Wrap content in `AdminSessionProvider` (from `cin/context/AdminSessionContext.tsx`).
   - Implement access control: if `!isAdminAuthed`, redirect to `/admin/login` (unless the user is already on the login page).
2. **Admin Login Page**:
   - Port `.claude/temp_zips/updated/src/pages/AdminLoginPage.tsx` to `cin/app/(admin)/admin/login/page.tsx`.
   - Use `useAdminSession` hook.
   - Ensure `onVerified` callback calls `loginAsAdmin()`.
3. **Admin Dashboard**:
   - Port `.claude/temp_zips/updated/src/pages/AdminDashboardPage.tsx` to `cin/app/(admin)/admin/dashboard/page.tsx`.
   - Use `next/navigation` (`useRouter`) for navigation.
   - Integrate `tally.get` from `cin/lib/api.ts` to show live snapshot data for the selected tenant.
   - Ensure the tenant toggle logic uses `switchTenant` from `useTenant`.
4. **Provisioning Page**:
   - Move current `cin/app/provision/page.tsx` to `cin/app/(admin)/admin/provision/page.tsx`.
   - Update `cin/app/provision/provision-client.tsx` to use the unified `tenants.create` from `cin/lib/api.ts`.
   - Fix imports to reflect the new directory structure.

## Global Constraints
- Use Next.js Route Groups (`(admin)`) for isolation.
- Admin routes must be gated by `AdminSessionContext`.
- Use `next/link` and `next/navigation`.
