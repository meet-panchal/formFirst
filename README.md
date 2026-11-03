# Form First

Mobile-first five-day workout PWA with form guidance, workout logging, gym
check-in, progress, recovery timer, reminders, offline support and iOS-first
interaction design.

This package is the **v35 UI refinement**, based on the latest shared v34
canonical build from October 11, 2026. The modular `src/` tree remains the source
of truth; `app.js` is generated compatibility output.

## v35 changes

- Removed visible page-name headings from the top navigation bars.
- Unified Workout, Exercise, Progress and Timer page canvases on the Workout
  page's warm gradient (with a coordinated dark-mode gradient).
- Replaced the white-matte fire GIF with a transparent, lossless animated PNG
  (APNG) using the original uploaded flame artwork and a ping-pong loop.
- Initial Workout selection now starts at the first incomplete day in ascending
  order; Continue Workout advances past completed days.

## Build and validation

After changing JavaScript source:

```bash
python scripts/build-browser-bundle.py
node scripts/smoke-startup.cjs
node --experimental-default-type=module scripts/test-core.mjs
python scripts/verify-build.py
```

Do not hand-edit `app.js`.
