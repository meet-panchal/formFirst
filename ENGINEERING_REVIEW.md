# Form First — Engineering Review (v34)

## Baseline

This refactor is based on the latest full application build available on October
11, 2026: `formfirst-brand-assets-v33-2026-10-11.zip`. It preserves the v33 brand
assets, final PWA icons/maskable icon, favicon, splash video/poster/final frame,
October 11 location feedback, state preservation, timer behavior, Development Mode
location semantics, and the existing UI/UX.

## Primary finding

The product had continued to evolve faster than its architecture. The main
controller had grown to 1,391 lines and was again implementing feature state,
platform APIs, presentation markup, animation effects, settings gestures,
notification behavior, gym verification and progress calculations in one place.

The refactor reduces the controller to 789 lines by extracting coherent ownership,
not by minifying or hiding code. Readable source is intentionally preferred over
artificial line-count reduction.

## Structural changes

New focused modules:
- `core/workout-progress.js`
- `core/gym-visits.js`
- `core/html.js`
- `services/gym-checkin.js`
- `services/water-reminders.js`
- `features/timer.js`
- `ui/feedback.js`
- `ui/settings-sheet.js`
- `ui/celebrations.js`

Existing service/UI modules remain isolated for geolocation, biometrics,
notifications, form-guide presentation, edge-back gestures, theme and haptics.

## Reliability fixes found during refactoring

1. **Workout completion correctness** — completion checks now use the exercise's
   required set count. A shorter all-true array can no longer be mistaken for a
   fully completed exercise.
2. **Gym weekly-time calculation** — a typo exposed by the new domain test suite
   (`currentWeekVisits` vs `getCurrentWeekVisits`) was corrected before release.
3. **Persistence hardening** — localStorage hydration now validates container types,
   normalizes scalar fields, removes retired state and safely handles blocked/quota
   storage writes.
4. **Geolocation math** — the Haversine intermediate is clamped to its mathematical
   domain to protect against floating-point overflow.
5. **Watch Form lifecycle** — Escape listeners are removed on every close path.
6. **Edge-back ownership** — the interactive back gesture no longer competes with
   Settings/form-browser overlays.
7. **Classic-bundle safety** — dependency discovery is automatic and unsupported
   alias/default/namespace imports fail the build instead of producing broken
   global bindings.
8. **Service-worker media handling** — Range requests bypass CacheStorage so MP4
   206 responses are never treated like reusable full assets; cache-write failure
   cannot turn a successful network response into a failed request.
9. **Splash resilience** — sessionStorage failures do not break launch; the splash
   video is no longer part of the mandatory PWA install transaction.

## Dead code / package cleanup

Removed or kept removed:
- retired toast DOM/CSS system;
- obsolete timer-completion styling/animations;
- old vector navigation SVGs replaced by the approved PNG nav artwork;
- obsolete live-flame/vector-tab styles;
- stale debug/test HTML artifacts;
- backup/temp artifacts;
- dead Settings gesture state.

The final CSS audit reports 243 class selectors with zero known orphaned runtime
classes. The package contains 89 binary assets with zero unreferenced packaged
assets and zero byte-identical duplicate groups.

## Regression protection

`scripts/smoke-startup.cjs` executes the shipped classic `app.js` in a controlled DOM
harness and verifies:
- Workout homepage renders;
- selecting the already-active Day is a true no-op;
- selecting a different Day renders normally;
- Exercise Detail renders;
- Progress renders;
- Timer renders.

`scripts/test-core.mjs` exercises pure domain/storage behavior including required-set
completion, next-incomplete selection, day completion, weekly gym visits/minutes,
active/latest visit lookup, Haversine sanity, malformed persisted state, storage
read failure and storage write failure.

`scripts/verify-build.py` verifies manifest parsing, classic-bundle module leakage,
all local runtime references, service-worker shell paths, CSS runtime producers,
unreferenced packaged assets and exact duplicate binaries.

## Validation result

- JavaScript syntax: PASS
- Python build/verification scripts: PASS
- deterministic source → `app.js` rebuild: PASS
- startup + navigation/detail/progress/timer smoke: PASS
- core behavior tests: PASS
- manifest: PASS
- local runtime references: 95, missing: 0
- service-worker shell entries: 16, missing: 0
- CSS classes: 243, orphaned: 0
- packaged binary assets: 89, unused: 0, duplicate groups: 0

A real Chromium `--dump-dom` pass was attempted, but Chromium cannot complete in
this execution container because its system/DBus environment does not initialize.
The build therefore does **not** claim full browser E2E coverage. That is the main
reason the refactor stops short of a deeper Workout/Progress controller split.

## Remaining technical debt

1. `styles.css` is still a large single source file. Split it only after Vite is in
   place so CSS modules/files can be composed by a real build tool instead of a
   second handwritten concatenation pipeline.
2. `app-controller.js` still owns Workout/Progress/Exercise Detail rendering. This
   should become feature-level controllers after Playwright protects the flows.
3. The Python classic bundler is a compatibility bridge, not the desired final
   production pipeline. Replace it with Vite/Rolldown as previously planned.
4. WebAuthn is a local device-presence gate, not server-authenticated identity.
   If Form First gains accounts/sync, challenge generation and verification belong
   on the server.
5. Image/CDN architecture should be decided from measured transfer/LCP data after
   the Vite image pipeline is introduced—not from ZIP size alone.

## Engineering decision

The code is intentionally not rewritten into React and does not introduce a global
state library. Neither solves a demonstrated problem at the current product scale.
The next engineering investment should be build/test infrastructure (Git → Docker
Node → Vite → Vitest/Playwright → image pipeline → Workbox/PWA verification) before
another large structural rewrite.
