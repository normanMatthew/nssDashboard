# Project Overview
    - This project is developed as if it were a production SaaS, even though it is currently a personal system. All architectural choices prioritize long-term maintainability, safety, and scalability.

# Phase 3.8 - Backend Hardening Decisions

## Contract-First API Design
    - Decision: All APIs are defined by shared TypeScript schemas used by both frontend and backend.
    - Why: Prevents API drift, eliminates class of bugs where frontend and backend disagree, and enables contract-driven development.
    - Tradeoff: Requires upfront modeling and validation code, but dramatically reduces production defects.

## Runtime Validation Layer
    - Decision: All incoming API input is validated at runtime against the shared schema before hitting the data layer.
    - Why: TypeScript types do not exist at runtime. Validation protects against malformed, malicious, or unexpected requests.
    - Outcome: Prevents query injection, infinite pagination, and schema drift. 

## Test-Driven API Behavior
    - Decision: API behavior is locked in by unit tests (pagination, filtering, validation, error semantics).
    - Why: Tests define the public contract of the API, not just implementation.
    - Outcome: Refactors can happen safely without breaking clients.

## Framework-Independent Core Logic
    - Decision: Validation and schema logic lives outside Next.js route handlers.
    - Why: Core business rules should not depend on a framework. This allows reuse, testing, and future migration.
    - Outcome: Next.js becomes a transport layer, not the brain of the system.

## Defensive API Posture
    - Decision: All query parameters are allow-listed (sort fields, order, filters).
    - Why: Prevents accidental full-table scans, query abuse, and undefined behavior.
    - Outcome: Predictable performance and security under hostile input.

## Phase-Based Architecture Evolution(secret weapon)
    - Decision: System is developed in explicit hardening phases (e.g., 3.8 Validation, 3.9 Rate Limiting).
    - Why: Complex systems fail when too many concerns are introduced at once. Phased hardening allows correctness before scale.
    - Outcome: Stable growth without architectural rewrites.