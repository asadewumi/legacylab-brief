# Assets still to carry over from the old host

Two binary files are live on the cPanel host and are not in this repository yet,
because the container this was built in cannot reach brief.legacylab.ng directly.

- `favicon.svg` — the starburst mark, built 19 September and live on all pages.
  Download it from the old host and drop it in this folder. `base.njk` already
  references `/favicon.svg`.
- `apple-touch-icon.png` at 180x180 — this one has never existed. It is an open
  item. Once it is made, put it here and add the link tag back to `base.njk`.

Everything else in this folder is the real asset, carried over at full quality.
