# Form First — Architecture

This build is the October 11, 2026 engineering refactor of the v33 branded PWA.
The current runtime intentionally remains a zero-config static PWA while the source
is organized as ES modules in preparation for the planned Vite migration.

## Dependency direction

```text
index.html
  ├─ splash.js                    launch-only brand experience
  └─ app.js                       generated classic compatibility bundle
       ↑ generated from
src/app-controller.js             application orchestration
  ├─ src/features/*               self-contained product features
  ├─ src/ui/*                     presentation and UI interaction modules
  ├─ src/services/*               browser/platform API boundaries
  ├─ src/core/*                   pure domain/state helpers
  └─ src/data/*                   workout content
```

Lower layers must not manipulate higher layers. Core/domain modules do not touch
the DOM. Platform APIs are isolated behind services. UI modules may render and
bind presentation behavior but do not own persistence.

## Source ownership

### `src/app-controller.js`
Coordinates navigation, workout rendering, exercise detail flow, persisted state,
and feature composition. It should contain orchestration and product flow—not raw
WebAuthn, geolocation math, notification plumbing, canvas celebration physics, or
timer internals.

### `src/features/`
- `timer.js` owns timer state, presets, start/pause/reset, countdown rendering,
  urgency behavior, and timer-specific development controls.

### `src/core/`
- `storage.js`: state hydration, schema normalization and persistence safety.
- `date-time.js`: local date/week and display formatting helpers.
- `workout-progress.js`: pure set/day/week completion calculations.
- `gym-visits.js`: pure attendance/session calculations.
- `html.js`: HTML escaping for external-link presentation.

### `src/services/`
- `geolocation.js`: browser geolocation + Haversine distance.
- `biometrics.js`: local WebAuthn/platform-authenticator flow.
- `gym-checkin.js`: gym verification policy/orchestration.
- `notifications.js`: Notification + service-worker notification boundary.
- `water-reminders.js`: reminder scheduling and lifecycle.

### `src/ui/`
- `feedback.js`: notice/banner feedback lifecycle.
- `settings-sheet.js`: Settings rendering + sheet gesture behavior.
- `form-guide.js`: in-app Watch Form browser/picker lifecycle.
- `edge-back.js`: interactive iOS-style back gesture.
- `celebrations.js`: set/day completion effects.
- `exercise-media.js`: movement/target-area presentation.
- `theme.js`, `haptics.js`, `icons.js`: focused UI primitives.

## Compatibility bundle

`scripts/build-browser-bundle.py` discovers the dependency graph recursively from
`src/app-controller.js`, topologically orders modules, checks for missing/circular
imports and top-level collisions, then emits `app.js` as a classic script.

This bridge intentionally rejects import aliases/default/namespace imports because
silently stripping those forms can change bindings and produce a blank runtime.
The restriction disappears when Vite replaces the compatibility bundle.

`app.js` is generated output. Do not hand-edit it.

## Runtime state

Persistent state is stored under `formfirst-5day-plan-v2`. Hydration treats stored
data as untrusted input: object/array/string/boolean/numeric fields are normalized,
and retired prototype fields are discarded.

Transient view state (active view, workout/detail scroll state, timer state,
pending check-in state) remains in memory and is intentionally not persisted unless
it represents user data or a durable setting.

## PWA caching

The service worker uses:
- network-first for navigations with an offline `index.html` fallback;
- stale-while-revalidate for same-origin static resources;
- no interception of cross-origin requests;
- no interception of Range requests, which protects MP4 partial-content behavior;
- a deliberately small critical app shell.

The splash poster/final frame are precached; the MP4 is an enhancement and is not
allowed to make PWA installation fail.

## Next architectural milestone

Do not split the remaining controller simply to reduce its line count. The next
large structural move should happen after the Vite + Playwright migration. At that
point Workout, Progress, and Exercise Detail can become feature controllers with
browser-level regression coverage protecting navigation, gestures, state restore,
and PWA behavior.
