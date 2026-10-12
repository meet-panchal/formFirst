# Form First

Mobile-first five-day workout PWA with form guidance, workout logging, gym
check-in, progress, recovery timer, reminders, offline support and iOS-first
interaction design.

This package is the **v34 engineering refactor**, based on the latest v33 branded
application from October 11, 2026.

## Important: source vs generated runtime

`src/` is the source of truth. `app.js` is generated compatibility output.

After changing JavaScript source:

```bash
python scripts/build-browser-bundle.py
node scripts/smoke-startup.cjs
node --experimental-default-type=module scripts/test-core.mjs
python scripts/verify-build.py
```

Do not hand-edit `app.js`.

## Current source layout

```text
src/
├── app-controller.js
├── config.js
├── core/
│   ├── date-time.js
│   ├── gym-visits.js
│   ├── html.js
│   ├── storage.js
│   └── workout-progress.js
├── data/
│   └── workouts.js
├── features/
│   └── timer.js
├── services/
│   ├── biometrics.js
│   ├── geolocation.js
│   ├── gym-checkin.js
│   ├── notifications.js
│   └── water-reminders.js
└── ui/
    ├── celebrations.js
    ├── edge-back.js
    ├── exercise-media.js
    ├── feedback.js
    ├── form-guide.js
    ├── haptics.js
    ├── icons.js
    ├── settings-sheet.js
    └── theme.js
```

See `ARCHITECTURE.md` for ownership/dependency rules and `ENGINEERING_REVIEW.md`
for the full refactor rationale, validation and remaining technical debt.

## Runtime

The project still supports its existing static/zero-config deployment model.
`index.html` loads `splash.js` and generated classic `app.js`. Service-worker and
PWA behavior require a secure context/localhost in browsers even though the static
UI can be opened directly.

## Next production-tooling milestone

The compatibility bundler is temporary. The planned migration is:

```text
Git baseline
→ Dockerized Node LTS
→ Vite/Rolldown
→ ESLint/Prettier
→ Vitest + Playwright
→ automated image pipeline
→ Workbox/vite-plugin-pwa
→ Lighthouse/size budgets
→ CDN decision from measurements
```

Do not combine that migration with a UI redesign; each checkpoint should remain
independently verifiable.
