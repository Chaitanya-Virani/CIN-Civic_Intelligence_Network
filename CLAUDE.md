# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
CIN (Civic Intelligence Network) is a multi-tenant React application that themes and feature-scopes itself per client (university, panchayat, NGO) at runtime based on tenant configuration.

## Common Commands
- Build and run in development: `npm run dev`
- Production build: `npm run build`
- Install dependencies: `npm install`

## Architecture
- **Multi-Tenancy**: Configuration for tenants is located in `src/config/tenants.ts`.
- **Feature Gating**: The feature-module catalog is defined in `src/config/modules.ts`.
- **Context & Theming**: `src/context/TenantContext.tsx` handles tenant resolution, runtime theming via CSS custom properties, and feature access checks (`hasFeature()`).
- **Data Layer**: A mock API seam in `src/api/index.ts` handles data flow, allowing a real backend to be swapped in without modifying UI screens.
- **State Management**: Mutable state (tenants, votes, sessions) is persisted in `src/lib/store.ts` using `localStorage`.
- **Pages/Views**: All application screens are located in `src/pages/`.
