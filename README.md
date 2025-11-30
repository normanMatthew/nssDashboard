# Phase 1: Foundations & CI/CD
The goal of phase one was to integrate Github Actions into my workflow, setup automated testing, and establish a basic DevOps work environment. 

## Major tasks included: Version control, refining git workflow, using .gitignore to hide sensitive data, setup a CI pipeline, linting, TypeScript type checking, setting up unit tests, trigger pipeline on push/PRs to main branch, environment variables & secrets, refactoring code to pull from .env securely, code-quality best practices, enforcement of eslint in CI pipeline, ensured relavant rules are active, fully-automated CI pipeline for linting, type checking, and tests, securely managing .env variables.

# Phase 2: Smart CI/CD + Test Optimization - Stability, Structure and Testing
Local commands: npm run dev, npm run lint, npm run test, npm run type-check, npm run build
During Phase 2 we focused on stabilizing the project structure, improving type-safety, and ensuring baseline reliability across the codebase. Major accomplishments include:

Migrated shared logic into /lib and cleaned up imports across the project.

Improved type safety across the application (including models, utilities, and API handlers).

Added automated linting, type-check, and unit test pipelines.

Added three passing unit tests for core UI components.

Refactored MongoDB utilities into a stable, reusable connection module.

Implemented pagination, filtering, and sorting for /api/ci-logs.

Performed manual verification of API behavior and page rendering.

Prepared project layout for future CI/CD, E2E testing, and backend extensions.

Phase 2 establishes a reliable foundation for Phase 3 (Feature Expansion) and Phase 4 (Security Hardening).

# Phase 3: Auto-Deployment + Features
# Phase 4: Security