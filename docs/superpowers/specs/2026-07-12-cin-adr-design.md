# Architecture Decision Record (ADR): CIN / CivicOS Platform

## Core Architectural Decisions

**Decision: Shared-codebase multi-tenancy via configuration rows**
- **Alternative(s) considered:** Separate deployment per tenant (SaaS silo).
- **Rationale:** Allows for instant tenant provisioning and global updates without redeploying multiple stacks.
- **Trade-off accepted:** "Noisy-neighbor" risk; a single tenant's heavy load could impact others on the same instance.

**Decision: Tenant identity as a URL route parameter (`/t/[tenant]`)**
- **Alternative(s) considered:** Global application state or session-based tenant identification.
- **Rationale:** Ensures strict boundaries, allows for easy deep-linking to tenant-specific pages, and prevents cross-tenant data leaks.
- **Trade-off accepted:** Slightly more complex routing and middleware logic to handle the dynamic path.

**Decision: Feature flags enforced at the router level (404)**
- **Alternative(s) considered:** UI-level conditional rendering (hiding nav items/buttons).
- **Rationale:** Provides "security by obscurity" and prevents API probing of features that are disabled for a specific tenant.
- **Trade-off accepted:** Loss of "graceful" discovery; users cannot see a "Coming Soon" page unless a specific preview stub is implemented.

**Decision: Tenant isolation and vote integrity enforced at the database layer (RLS + Unique Constraints)**
- **Alternative(s) considered:** Application-layer validation and middleware checks.
- **Rationale:** Provides a "hard" guarantee of integrity that cannot be bypassed by bugs in the application logic.
- **Trade-off accepted:** Increased complexity in schema management and migration scripts.

**Decision: Fail-closed on unknown tenant (404)**
- **Alternative(s) considered:** Fallback to a default tenant.
- **Rationale:** Prevents accidental data leakage and ensures that branding and configuration are always correct for the requested entity.
- **Trade-off accepted:** Less forgiving of user typos in the URL.

**Decision: Migration to single Next.js app + Supabase Realtime**
- **Alternative(s) considered:** Original Flask/Kafka microservices architecture.
- **Rationale:** Drastically reduces operational overhead and development latency while providing native real-time capabilities for live tallies.
- **Trade-off accepted:** Higher architectural coupling; the platform is now a single unit rather than a set of independent services.

## Cisco Technology as Architectural Decisions

**Decision: Duo MFA for identity and vote integrity**
- **Alternative(s) considered:** Generic OAuth or basic password-based authentication.
- **Rationale:** High-assurance identity verification is the only way to reliably enforce a "one-person-one-vote" guarantee in a civic context.
- **Trade-off accepted:** Higher friction during the login/voting process for the end-user.

**Decision: Webex (Spaces + Adaptive Cards + bot) as a first-class input channel**
- **Alternative(s) considered:** Using Webex purely as a notification/alerting layer.
- **Rationale:** Transforms the bot into the core interaction loop, meeting users where they already communicate and lowering the barrier to civic participation.
- **Trade-off accepted:** Deep dependency on the Webex API availability and rate limits.

**Decision: Meraki location API for anti-manipulation presence checks**
- **Alternative(s) considered:** Simple GPS/Browser geolocation checks.
- **Rationale:** Uses hardware-verified network presence to prevent remote spoofing of "physical presence" during the Verification stage.
- **Trade-off accepted:** Requires specific Meraki infrastructure to be present at the physical venue.

## Demo Strategy

- **The "Money Shot":** A vote cast via a Webex Adaptive Card triggers an immediate, live tally update in the web app via Supabase Realtime.
- **The Pipeline:** Crossing the `WEBEX_VOTE_THRESHOLD` automatically creates a new Webex space and invites registered moderators in real-time.
- **The Guardrail:** An attempt to verify a proposal is blocked until the Meraki API confirms the user is physically within the designated venue.
