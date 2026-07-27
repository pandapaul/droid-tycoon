# Star Wars: Droid Tycoon — Rebirth Requirements

Lookup and printable reference for all four rebirth cycles (30 levels each) in the Fortnite island **Star Wars: Droid Tycoon**.

## Live site

After GitHub Pages is enabled, the site will be at:

**https://pandapaul.github.io/droid-tycoon/**

- [Lookup](https://pandapaul.github.io/droid-tycoon/) — cycle/level picker, droid search, local checklist
- [Print sheets](https://pandapaul.github.io/droid-tycoon/print.html) — one cycle per page; Print → Save as PDF

## Local use

Open `web/index.html` or `web/print.html` in a browser (no build step).

```bash
node scripts/lookup.mjs --cycle 3 --level 15
node scripts/lookup.mjs --droid mecha-droid
```

## Repo layout

| Path | Purpose |
|------|---------|
| `web/` | Static site (what GitHub Pages deploys) |
| `data/` | Structured JSON + schema |
| `original-source/` | Chart PNGs used as ground truth |
| `scripts/` | CLI lookup |

## Publishing

Pushes to `main` deploy `web/` via [`.github/workflows/pages.yml`](.github/workflows/pages.yml).

In the repo on GitHub: **Settings → Pages → Source: GitHub Actions**.
