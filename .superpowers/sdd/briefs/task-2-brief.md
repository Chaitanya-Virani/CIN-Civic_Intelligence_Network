# Task 2: Public Route Group (The Entryway)

## Requirements
1. **Public Components**:
   - Port `.claude/temp_zips/updated/src/components/public-layout.tsx` to `cin/components/public/layout.tsx`.
   - Port `.claude/temp_zips/updated/src/components/public-header.tsx` to `cin/components/public/header.tsx`.
   - Replace all `react-router-dom` imports/links with `next/link`.
2. **Public Route Group Layout**:
   - Create `cin/app/(public)/layout.tsx`.
   - It must wrap children in the `PublicLayout` component.
3. **Home Page**:
   - Port `.claude/temp_zips/updated/src/pages/HomePage.tsx` to `cin/app/(public)/page.tsx`.
   - Adapt as a Client Component (`'use client'`).
   - Use `useTenant` hook to get default branding.
4. **Signup Page**:
   - Port `.claude/temp_zips/updated/src/pages/SignupPage.tsx` to `cin/app/(public)/signup/page.tsx`.
   - Ensure it uses the unified `auth.signup` from `cin/lib/api.ts`.
   - Integrate the `DuoModal` component.
5. **Routing Cleanup**:
   - If `cin/app/page.tsx` exists, remove it or move it to `(public)/page.tsx` to avoid conflicts.

## Global Constraints
- Use Next.js Route Groups (`(public)`) for isolation.
- All links must use `next/link`.
- Components must be marked `'use client'` where React hooks are used.
