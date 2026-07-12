# Task 5: Final Integration & MVP Verification

## Requirements
1. **Root Route Cleanup**:
   - Ensure `cin/app/page.tsx` is removed or correctly redirects to the new Home page in `(public)/page.tsx`.
   - Verify no conflicting routes exist between `(public)`, `(admin)`, and `(tenant)`.
2. **E2E Verification (The "Golden Path")**:
   - **Public Flow**: Landing Page $\rightarrow$ Signup $\rightarrow$ Login $\rightarrow$ Tenant Feed.
   - **Admin Flow**: Admin Login $\rightarrow$ Admin Dashboard $\rightarrow$ Provision Tenant $\rightarrow$ Verify in DB/List.
   - **Tenant Flow**: Member Login $\rightarrow$ Proposal Page $\rightarrow$ Cast Vote $\rightarrow$ Verify Tally update.
3. **Technical Audit**:
   - Run `npm run build` inside the `cin/` directory to verify zero TypeScript or import errors.
   - Verify `/api/config/slido` returns valid JSON.
   - Verify `AdminSessionContext` blocks access to `/admin/dashboard`.

## Global Constraints
- Final MVP must be fully functional and buildable.
- No "TBD" or "TODO" markers in any file.
