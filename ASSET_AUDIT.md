# Asset audit — v35

- Existing Workout/Progress/Timer PNG navigation artwork retained as supplied.
- Existing Target Area, movement and warm-up assets retained.
- Original `icons8-fire.gif` source had an opaque white canvas. Reprocessed its
  28 source frames with edge-connected white-matte removal and soft alpha
  recovery, then exported a lossless 53-frame transparent APNG using a
  forward/reverse loop to avoid a hard loop seam.
- APNG is `assets/icons8-fire-transparent.png`; the obsolete GIF is removed
  from the release and service-worker shell.
- APNG transparency was verified at the image corners and composited against
  the app's yellow flame tile for visual review.
