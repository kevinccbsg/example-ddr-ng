# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 21 demo application showcasing the `ddr-ng` component library. Uses standalone components (no NgModules), Vitest for testing, and Bootstrap/Bootstrap Icons for styling.

## Commands

- **Dev server:** `npm start` (serves at http://localhost:4200)
- **Build:** `npm run build` (production by default, outputs to `dist/`)
- **Run all tests:** `npm test` (Vitest via `@angular/build:unit-test`)
- **Run a single test file:** `npx ng test --include src/app/app.spec.ts`
- **Watch mode build:** `npm run watch`

## Architecture

- **Standalone app** bootstrapped in `src/main.ts` via `bootstrapApplication(App, appConfig)`
- **No NgModules** — components use `imports` array directly in `@Component` decorator
- **Routing** configured in `src/app/app.routes.ts` — `/` (HelloWorld), `/todos` (TodoList)
- **App config** in `src/app/app.config.ts` — sets up router, animations, and i18n initialization via `DdrTranslateService`

### ddr-ng Library Integration

The app uses `ddr-ng` for UI components and services:
- **Components:** `DdrButtonComponent`, `DdrButtonMultipleComponent`, `DdrToggleComponent`
- **Services:** `DdrTranslateService` (i18n), `DdrToastService` (notifications), `DdrThemeService` (theme switching)
- **Pipe:** `DdrTranslatePipe` (`ddrTranslate`) for template translations
- **Themes:** `ddr-blue` (default) and `ddr-dark`, loaded as global SCSS in `angular.json`

### Internationalization

- Translation files live in `public/i18n/{lang}.json` (currently `en` and `es`)
- Translations loaded at app init via `DdrTranslateService.getData('/i18n/', 'es')` in `app.config.ts`
- Language switching at runtime via `DdrTranslateService.getData()`

## TWD (In-Browser Testing)

TWD is designed for AI agents to validate their own changes in a real browser during development. Tests run in the actual browser (not Node.js), exercising the real Angular app end-to-end with HTTP mocking via a Service Worker. A WebSocket relay bridges the AI agent to the in-browser test runner, so the agent can write code, run tests, and iterate — all without human intervention.

### How It Works (Architecture)

The TWD flow involves three cooperating pieces:

1. **Dev server** (`npm start`) — serves the Angular app, which includes the TWD test runner and relay client (only in dev mode via `isDevMode()` in `src/main.ts`)
2. **Relay server** (`npm run twd:relay`) — a standalone WebSocket server on port 9876 that bridges the CLI to the browser
3. **Test runner CLI** (`npx twd-relay run --port 9876`) — connects to the relay, triggers test execution in the browser, and reports results back to the terminal

HTTP mocking uses a Service Worker (`public/mock-sw.js`) that intercepts fetch requests and returns mock responses configured via `twd.mockRequest()` in tests.

### Commands

- **Start relay server:** `npm run twd:relay` (standalone server on port 9876)
- **Run TWD tests:** `npm run twd:run` (or `npx twd-relay run --port 9876`)
- Exit code 0 = all passed, 1 = failures/errors

### Setup Details & Gotchas

- Tests live in `src/twd-tests/*.twd.test.ts`
- Mock data in `src/twd-tests/mocks/` (JSON files)
- **Manual test registration required:** each test file must be added to the `tests` map in `src/main.ts` — TWD does NOT auto-discover test files. When creating a new test, always add its dynamic import entry to `main.ts`
- `tsconfig.app.json` excludes `*.twd.test.ts` from Angular compilation — the bundler handles them via dynamic import. Without this exclusion the Angular compiler would fail on test imports
- The Service Worker `public/mock-sw.js` must stay version-synced with the `twd-js` package. Reinstall with `npx twd-js init public --save` if versions drift
- The relay client and test imports in `main.ts` are guarded by `isDevMode()` so they are tree-shaken from production builds

### Writing TWD Tests

```ts
import { twd, userEvent, screenDom } from 'twd-js';
import { describe, it, beforeEach } from 'twd-js/runner';
```

- Always `await` `twd.get()`, `twd.getAll()`, and `userEvent` methods
- Use `screenDom` (Testing Library) for element selection; `twd.get()` with CSS selectors as fallback
- Mock HTTP requests with `twd.mockRequest()` BEFORE the action that triggers them
- Wait for mocked requests with `await twd.waitForRequest('alias')` — returns the captured request body
- Clear mocks in `beforeEach`: `twd.clearRequestMockRules()`
- Navigate with `await twd.visit('/path')`
- Use `expect` (chai-style) for value assertions and `twd.should()` for DOM assertions

### Workflow

Requires 3 terminals (or the user must confirm the dev server and browser are already running):

1. Dev server must be running (`npm start`) — **ask the user** if it's already up
2. Start relay in another terminal (`npm run twd:relay`) — or use `npx twd-relay run --port 9876` which starts the relay and runs tests in one step
3. Run tests (`npm run twd:run`)

**For AI agents:** the user typically has the dev server and browser open already. You only need to run `npx twd-relay run --port 9876` to execute tests. Always ask the user to confirm the dev server is running before attempting to run tests. This is the primary way to verify your changes work — run TWD tests after making code changes to confirm nothing is broken before moving on.

### Adding a New TWD Test

1. Create the test file at `src/twd-tests/<name>.twd.test.ts`
2. Add mock data (if needed) to `src/twd-tests/mocks/`
3. **Register the test** in `src/main.ts` by adding an entry to the `tests` map:
   ```ts
   const tests = {
     // ... existing tests
     './twd-tests/<name>.twd.test.ts': () => import('./twd-tests/<name>.twd.test'),
   };
   ```
4. Run with `npx twd-relay run --port 9876`

## Code Style

- **Prettier** configured in `package.json`: 100 char width, single quotes, Angular HTML parser
- **TypeScript** strict mode with Angular strict templates enabled
- **Indentation:** 2 spaces, single quotes for TS (see `.editorconfig`)
- Component prefix: `app`
