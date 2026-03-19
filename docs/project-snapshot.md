# Project Snapshot — Phases 1–5
_Last Updated: Phase 3.9 Started_

This document represents the canonical system snapshot for this project.  
It is intended to preserve architectural decisions, implementation state, and phase progress across tooling, deployments, and conversational context.

---

## PHASE 1 — FOUNDATION & BASELINE ARCHITECTURE

### Objectives
- Establish a clean, modern full-stack foundation
- Remove legacy or unused infrastructure
- Ensure dependency safety and deployment readiness

### Key Outcomes
- Next.js app initialized with App Router
- TypeScript-first codebase
- SCSS-based component styling strategy
- Clear separation of:
  - UI components
  - Hooks
  - API routes
  - Models

### Infrastructure Decisions
- Deployment platform: **Vercel**
- Removed unused services:
  - Netlify
  - Render
- Dependencies audited and updated
- Known security vulnerabilities resolved

### Status
✅ Complete  
Foundation is stable, secure, and deployable.

---

## PHASE 2 — DATA MODELS, API CONTRACTS & UI BASELINES

### Objectives
- Define backend data shape
- Build API endpoints with predictable contracts
- Establish UI tables and sorting primitives

### Key Outcomes
- CI Webhook Log data model defined
- `/api/ci-logs` endpoint implemented
- Pagination support:
  - page
  - totalPages
- Sorting support:
  - sortField
  - sortOrder
- Filtering support:
  - status
  - repo
  - branch

### UI Components
- Reusable table primitives
- Sortable `<Th />` component
- `<StatusTags />` visual indicator component

### Status
✅ Complete  
Frontend and backend speak a shared, stable language.

---

## PHASE 3 — POLLING, OBSERVABILITY & LIVE INFRASTRUCTURE

### Phase 3 Goal
Build **safe, observable, production-grade polling** instead of “invisible magic.”

---

### PHASE 3.1–3.5 — POLLING CORE

#### usePolling Hook
- Ref-based polling system
- Avoids unnecessary re-renders
- Prevents overlapping requests
- Supports dynamic intervals (`number | () => number`)

#### Safety Features
- MAX_FAILURES hard stop
- Visibility-aware behavior:
  - Pauses when tab hidden
  - Resumes on visibility restore
- Graceful teardown on unmount

#### Internal State (Refs)
- `isRunningRef`
- `timeoutRef`
- `failureCountRef`
- `lastSuccessAtRef`
- `statusRef`

### Status
✅ Complete

---

### PHASE 3.6 — UI FEEDBACK & LIVE INDICATORS

#### Live Indicator Behavior
- Green dot + pulse → active network request
- Gray dot → idle / polling disabled
- Text reflects system truth:
  - “Live Polling”
  - “Idle”

#### Verified Scenarios
- Initial page load
- Page navigation
- Network throttling
- Error injection
- Background tab pause

### Status
✅ Complete

---

### PHASE 3.7 — STATUS SURFACING & METRICS (OBSERVABILITY)

#### Exposed Metrics (from usePolling)
- `status`
  - idle
  - running
  - paused
  - error
  - stopped
- `failureCount`
- `lastSuccessAt`

#### Implementation Notes
- Internal refs preserved
- `forceRender` pattern used to notify consumers
- Metrics exposed intentionally via getters

#### UI Additions
- “Last Updated” timestamp
- Error messaging surfaced in UI
- Polling state is now **observable and debuggable**

### Status
✅ Complete  
Polling is no longer magic — it is **infrastructure with telemetry**.

---

## PHASE 3.8 — BACKEND HARDENING (IN PROGRESS)

### Objectives
Make the API resilient, safe, and un-abusable.

### Planned Work
- Request validation
- Page bounds checking
- Default limits
- Graceful empty responses
- Distinguish:
  - No data
  - Error
- Consistent response shapes
- Proper HTTP status codes
- Proper unit tests for APIs

### Status
✅ Complete

---

## PHASE 3.9 — RATE LIMITING & PRODUCTION STABILITY

### Objectives
Prevent accidental or malicious overload.

### Status
✅ Complete

---

### ✅ Completed

#### Rate Limiting (MongoDB-Based)
- IP-based rate limiting
- Configurable per endpoint (GET vs POST)
- Sliding window approach using MongoDB
- Concurrency-safe via `updateOne + upsert`
- Prevents duplicate key errors
- Returns proper `429` responses with retry metadata

#### Infrastructure Refactor
- Removed legacy middleware approach
- Centralized limiter in `/lib/api/infrastructure/requestRateLimiter.ts`
- Clean separation between route and infrastructure logic

#### Database Connection Stability
- Refactored `/lib/utils.ts`
- Implemented global connection cache (`mongooseCache`)
- Eliminated connection race conditions
- Prevented buffering timeouts in production
- Fully typed (removed all `any` usage)

#### Production Fixes (Vercel)
- Environment variables configured in **Vercel**
- Removed `dotenv` (not needed in serverless)
- Fixed production-only failures:
  - 500 errors
  - Empty JSON responses
  - polling crashes

#### Frontend Resilience
- Polling now handles invalid/empty responses safely
- Prevents UI crashes from failed API calls

#### Performance Optimization
- Added compound MongoDB index:

---

## PHASE 3.10 — ETAG / CONDITIONAL FETCH OPTIMIZATION / Cursor-based Pagination in /api/ci-logs

### Objectives
Eliminate unnecessary payloads and renders. Replace skip/limit.

### Planned Work
- Backend ETag generation
- Client `If-None-Match` headers
- `304 Not Modified` responses
- Skip frontend state updates entirely
- Add TTL index to RateLimit collection
  - Auto Delete old documents
  - prevents unbounded growth

### Expected Result
- Near-zero payload polling
- No unnecessary renders
- Extremely scalable polling system

### Status
🟡 In Progress

---

## PHASE 3.11 — Authentication / Authorization

### Objectives
Implement authentication / authorization.

### Planned Work


### Expected Result


### Status
⬜ Not started

---

## PHASE 4 — ADVANCED OBSERVABILITY & SYSTEM INTELLIGENCE (FUTURE)

### Expected Focus
- Metrics aggregation
- Historical trend views
- Failure pattern analysis
- Admin-level diagnostics
- Possibly background workers / queues

### Status
⬜ Not started

---

## PHASE 5 — PRODUCTIZATION & SCALE (FUTURE)

### Expected Focus
- Multi-tenant readiness
- Auth & permissions
- Billing / quotas (if applicable)
- Recruiter- and client-facing polish
- Long-term maintainability

### Status
⬜ Not started

---

## CURRENT STATE SUMMARY

- ✅ App deployed to Vercel
- ✅ Polling system stable, observable, and validated
- ✅ UI truthfully reflects backend behavior
- ✅ Security posture clean
- ⏭ Currently Working On: **Phase 3.10 -- Etag Optimizations**

