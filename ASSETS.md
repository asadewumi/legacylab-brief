# Assets, what is here and what is still missing

This note lives at the repository root on purpose. It used to sit in `src/assets/`,
where Eleventy picked it up and published it, so an internal to-do list was being
served at `/assets/README-assets/` and `/README-assets.md` on the live site. Keep
internal notes out of `src/`.

Everything in `src/assets/` is passed through to the site root untouched, so a file
named `x.png` in that folder is served at `/x.png`.

## On file

- `favicon.svg`, the starburst mark. Recovered from the old host on 29 September
  and committed. `base.njk` references `/favicon.svg`.
- `logo-navy.svg` and `logo-white.svg`
- `brief-og-01.png`, the Brief #01 preview card
- `brief-og-default.png`, the fallback preview card
- `style.css`

## Still missing

- `apple-touch-icon.png` at 180x180. Has never existed. Once it is made, put it in
  `src/assets/` and add the link tag back to `base.njk`.
- `brief-og-02.png`. Brief #02 falls back to the default card. Once made, add it
  and set `ogImage: brief-og-02.png` in that Brief's front matter.
