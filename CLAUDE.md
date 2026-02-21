# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check (`vue-tsc --build`) then build for production
- `npm run lint` — Run oxlint with autofix, then eslint with autofix (sequentially via `run-s lint:*`)
- `npm run format` — Format `src/` with Prettier
- `npm run test:unit` — Run Cypress component tests (headless)
- `npm run test:unit:dev` — Open Cypress component test runner (interactive)
- `npm run test:e2e` — Build preview server and run Cypress e2e tests (headless)
- `npm run test:e2e:dev` — Run e2e tests against Vite dev server (interactive)

## Architecture

Vue 3 + TypeScript + Vite application using Composition API with `<script setup>`.

- **State management**: Pinia (composition/setup store style — see `src/stores/counter.ts`)
- **Routing**: Vue Router with HTML5 history mode (`src/router/index.ts`). Non-home routes use lazy-loaded imports for code splitting.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin, imported in `src/assets/main.css`
- **Path alias**: `@` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`)

## Testing

- **Component tests**: Cypress Component Testing. Test files live in `src/**/__tests__/*.{cy,spec}.{ts,tsx}`
- **E2E tests**: Cypress. Test files live in `cypress/e2e/**/*.{cy,spec}.{ts,tsx}`. Base URL is `http://localhost:4173` (preview server).

## Linting

Two-pass lint pipeline: oxlint runs first (fast native linter), then eslint. The eslint config uses `eslint-plugin-oxlint` to disable rules already covered by oxlint (configured via `.oxlintrc.json`). Prettier handles formatting separately — eslint formatting rules are disabled via `eslint-config-prettier`.
