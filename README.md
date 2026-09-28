# T1S Studio website — V2

A local, static multi-page prototype for **t1sstudio.com**.

## What changed in V2

The site is now built around the real T1S Studio identity:

- **AI-free content philosophy** as the main brand position
- human, warm tone instead of a generic premium/cinematic brand voice
- real-world footage only; no generated visual stand-ins
- dedicated **Slow TV** page
- dedicated **Manifesto** page
- **Gear / How T1S is filmed** page, ready for future affiliate links
- Story section including the April 2026 launch and the real motivation behind the channel
- Patreon CTA: **Help grow the AI-free library**
- homepage goal: send visitors to watch T1S on YouTube
- content slots for featured / latest videos without inventing live metrics
- desktop + tablet + mobile responsive layout
- no framework or build system required

## Run locally

From the folder:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

You can also double-click `index.html`, but running a tiny local server is cleaner.

## Add real T1S images

The V2 deliberately refuses to fake photography. It displays neutral placeholders until you add your own real stills.

Add these files:

```text
assets/frames/hero.jpg
assets/frames/featured.jpg
assets/frames/latest-1.jpg
assets/frames/latest-2.jpg
assets/frames/latest-3.jpg
```

Recommended:

- JPG or WebP
- at least 1600 px wide for hero/featured
- actual frames from T1S footage or your own photographs
- no generated backgrounds or objects

## Update video data

Open:

```text
data/content.js
```

The video title, URL, duration, category, sound type, views and publish text can be updated there without changing the HTML.

The current version intentionally does **not** fabricate current YouTube statistics. A live YouTube feed can be added once the site is hosted, using the YouTube Data API or a small server-side/serverless feed endpoint.

## Current external links

YouTube:
`https://www.youtube.com/channel/UC7tokKEXW1PbJNHov2ePhFw`

Patreon:
`https://www.patreon.com/c/T1S_Studio`

## Pages

- `index.html` — homepage
- `manifesto.html` — T1S content manifesto
- `slow-tv.html` — What is Slow TV?
- `gear.html` — filming setup / future affiliate page

## Contact

A public contact address is intentionally not hard-coded yet because the dedicated T1S public inbox is still undecided.
