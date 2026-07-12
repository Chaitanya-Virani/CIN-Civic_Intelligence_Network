# Task 1: State & Infrastructure (The Foundation)

## Requirements
1. Update `cin/lib/store.ts`:
   - Add `adminSession: "cin.adminSession.v1"` to the `KEYS` object.
   - Implement `getAdminSession(): boolean` and `setAdminSession(value: boolean)` using existing `read`/`write` helpers.
2. Create `cin/context/AdminSessionContext.tsx`:
   - Implement `AdminSessionProvider` and `useAdminSession` hook.
   - It should manage `isAdminAuthed` state, syncing with the store.
3. Create `cin/lib/api.ts`:
   - Port `auth`, `tenants`, `proposals`, `votes`, and `tally` objects from `.claude/temp_zips/updated/src/api/index.ts`.
   - Ensure all functions return Promises and use the updated `cin/lib/store.ts`.

## Global Constraints
- Maintain compatibility with existing Webex integration.
- Use `cin/lib/store.ts` as the single source of truth.
