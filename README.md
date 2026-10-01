# The Legacy Lab Brief

The source of [brief.legacylab.ng](https://brief.legacylab.ng), the weekly publication of Legacy Lab NG.

Markdown in, a static site out. Every Brief is one file. The archive index, the RSS feed and the sitemap build themselves from those files, so nothing has to be updated in two places and nothing can drift.

---

## Publishing a new Brief

One file. That is the whole process.

1. Copy `src/briefs/brief-02.md` to `src/briefs/brief-03.md`.
2. Change the front matter and write the five items.
3. Commit and push to `main`.

GitHub Actions builds the site and deploys it. The new Brief appears at `/brief-03/`, at the top of the archive, and in the RSS feed, within a couple of minutes. Nobody touches the index page, the feed or the sitemap by hand, ever.

### The front matter

```yaml
---
number: 3                      # drives the URL, the dateline and the sort order
date: 2026-10-02               # the publication date
headline: The headline         # the h1 and the archive card title
summary: One or two sentences  # the archive card and the RSS summary
standfirst: One line under the headline
lead: The opening paragraph, before the five items
readingTime: Four minutes
ogImage: brief-og-03.png       # optional, falls back to brief-og-default.png
---
```

### Writing the body

The body is the five items and nothing else. The dateline, the forward-it-on line and the sign-off are in the layout, so they are identical on every Brief and cannot be forgotten.

Each item follows the same shape:

```markdown
## One, the policy change

### The specific thing that happened

Two or three paragraphs of plain explanation.

<p class="why"><b>Why it matters to you.</b> The paragraph that earns the item its place.</p>

<a class="more" href="https://source.example/">Read the detail</a>

<hr>
```

The last item takes no trailing `<hr>`.

---

## House rules this repository enforces

These are the ones that have been got wrong before, so they live in the layout rather than in a person's memory.

**The word issue is retired.** In Nigerian English it reads as trouble. Everything reads Brief #01, Brief #02. The URL is `/brief-01/`. `/issue-01/` still resolves, see Redirects below.

**Never name the day.** The list sends across two days, so Friday is wrong for a third of readers. The approved phrasing is "at the end of every week". A publication date on a specific Brief is a fact and stays.

**No em dashes and no semicolons.** Commas, full stops, or two sentences.

**Nothing goes out carrying a link that does not resolve today.** Check every source link before you commit. Brief #02 deliberately shipped without an October registration link rather than point at a form showing September.

---

## How it is put together

```
src/
  _data/site.json          the site's name, URL, socials and the Brevo form
  _data/redirects.json     old URLs that must keep working
  _includes/base.njk       the page shell, head, header, footer
  _includes/brief.njk      the Brief layout, dateline through sign-off
  briefs/                  one markdown file per Brief
  briefs/briefs.11tydata.js  the permalink and metadata rules for all Briefs
  assets/                  stylesheet, logos, preview cards, served from the root
  index.njk                the archive, generated from the briefs collection
  subscribe.njk            the Brevo form, in an iframe
  feed.njk                 the Atom feed at /feed.xml
  sitemap.njk, robots.njk, 404.njk
  redirects.njk            generates a redirect page per entry in redirects.json
  CNAME                    brief.legacylab.ng
```

Built with [Eleventy](https://www.11ty.dev/). No database, no admin login, no plugin updates, nothing to patch.

### Running it locally

```bash
npm install
npm run serve      # http://localhost:8080
npm run build      # writes _site/
```

### Redirects

GitHub Pages cannot do server-side redirects, so each old URL gets a small page that carries a canonical link and forwards immediately. Add an entry to `src/_data/redirects.json` and the page is generated:

```json
{ "from": "/old-path/", "to": "/new-path/" }
```

`/issue-01/` is already in there, because that URL went out in emails and social posts before the rename.

---

## Why this rather than what was there before

The site was hand-written HTML uploaded through the cPanel file manager. Two problems with that, and both had already cost something.

**Publishing was unreliable.** Brief #02 was written and its emails were scheduled, but the `/brief-02/` page missed its Friday deadline because the page could not be copied and rebuilt in the time available. The email went out with no archive link and no share link. That is the failure this repository is designed to remove.

**There was no RSS feed.** The whole publishing design depends on writing once and letting Brevo send from it. Without a feed there is no way to do that, so every Brief had to be written twice, into the site and into Brevo. Whenever a thing is written twice, one of the two starts slipping, and it is always the archive that goes.

The feed is now at `/feed.xml`.

---

## Still to carry over

See [`ASSETS.md`](ASSETS.md). The starburst `favicon.svg` was recovered from the old host on 29 September and is in the repository. Two things are still outstanding, an `apple-touch-icon.png` at 180x180 that has never existed, and `brief-og-02.png`, without which Brief #02 falls back to the default preview card.

Keep internal notes out of `src/`. Anything in `src/assets/` is passed through to the site root and served publicly.

---

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`. It installs, builds, and publishes `_site/` to GitHub Pages.

### This repository must stay public

GitHub Pages is not available on a private repository on a free plan. Making this repository private takes brief.legacylab.ng off the internet immediately, and it does it quietly. There is no warning, no email and no failed build. The last workflow run keeps its green tick and the deployment still reads Active, while the site serves GitHub's own "There isn't a GitHub Pages site here" 404.

It also clears two settings that then have to be put back by hand. The custom domain resets to blank, and Source resets from GitHub Actions to Deploy from a branch.

This happened once, between 29 September and 1 October 2026. Because DNS had already left the old host, the Brief served nothing at all for the whole period, and every archive link in the emails and posts already sent was dead.

**If the site ever returns a 404, check repository visibility before anything else.** DNS and the CNAME file were both correct throughout that outage and neither was the cause.

If this repository ever has to be private, move the Brief to another host first, not after.

### Settings, set once

Under Pages, set Source to GitHub Actions. Under Pages again, set the custom domain to `brief.legacylab.ng` and tick Enforce HTTPS once the certificate has issued.

### DNS

`brief` is a subdomain, so it takes a single CNAME. This supersedes an earlier version of this file that called for four A records, which is the guidance for an apex domain and is wrong here.

```
brief    CNAME    asadewumi.github.io.
```

A CNAME cannot coexist with any other record for the same name, so delete every existing record at `brief` before adding it. cPanel rejects the zone otherwise, with `CNAME and other data`.

Do not touch the root domain or any MX record. Mail is not involved and must not move.
