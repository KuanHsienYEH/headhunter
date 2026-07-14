AGENTS.md

# Project Overview

This is a full-stack web application using:

- Frontend: Next.js + TypeScript 
- Database: postgreSQL
- Authentication: JWT
- Deployment: Docker + GitHub Actions

---

# Engineering Principles

- Prefer maintainability over premature optimization.
- Follow existing patterns before introducing new abstractions.
- Avoid unnecessary dependencies.
- Keep components and services small and composable.
- Favor explicit naming over clever implementations.

---

# Frontend Guidelines

## Component Structure

- Shared UI components go under:
  /src/components/ui

- Feature-specific components go under:
  /src/features/[feature-name]

- Avoid large components over 300 lines.

## State Management

- Use React Query for server state.
- Use Zustand only for global client state.
- Avoid prop drilling deeper than 2 levels.

## Styling

- Use Tailwind CSS only.
- Do not use inline styles unless dynamic.
- Reuse existing utility classes and patterns.

## API Calls

- All API logic should live under:
  /src/api

- Never call fetch directly inside components.

---

# Backend Guidelines

---

# Testing

## Frontend

- Use Jest + React Testing Library.
- Test user behavior, not implementation details.

---

# Git Workflow

- Create small focused commits.
- Do not modify unrelated files.
- Run tests before committing.

Commit message format:

feat: add user profile endpoint
fix: resolve login token refresh bug

---

# Important Rules

- Before implementing new features:
  1. Explore existing patterns
  2. Create implementation plan
  3. Then begin coding

- Never introduce a new architecture pattern unless necessary.

- Prefer consistency with the existing codebase over personal preference.