# Form First — Asset Audit (v34)

The v34 engineering refactor retains the approved v33 branding and artwork while
keeping the earlier asset-deduplication work intact.

## Current result

Automated release verification reports:
- 89 packaged binary assets across `assets/`, `icons/`, and `favicon.ico`;
- 0 unreferenced packaged assets;
- 0 byte-identical duplicate groups;
- 95 local runtime references with 0 missing targets.

## Brand assets retained from v33

- final app icons (`180`, `192`, `512`, maskable `512`);
- favicon;
- splash MP4;
- splash poster;
- splash final frame;
- approved PNG bottom-navigation artwork.

The splash MP4 is intentionally **not** in the mandatory service-worker app shell.
It remains referenced by `index.html` and loads normally when available. The poster
and final-frame images are the reliable launch/offline fallback.

## Asset policy

1. Do not add exercise-specific copies of identical target-muscle artwork. Share a
   canonical target asset when the rendered image is identical.
2. Do not package source-resolution design files when a right-sized web derivative
   exists.
3. Do not retain superseded PNG/SVG/WebP variants in the production tree.
4. Any new packaged asset must have an explicit runtime reference.
5. Exact binary duplicates fail `scripts/verify-build.py`.
6. The future Vite image pipeline should produce responsive, optimized derivatives
   from master source artwork; source masters should not be served directly.
