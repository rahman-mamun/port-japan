# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev        # Vite dev server, http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run typecheck  # tsc -b --noEmit
npm run preview    # serve the built dist/
```

There is no test runner, no linter, and no formatter config. `npm run typecheck` is the only automated check. Run it after any change.

## What this is

A single-page React portfolio site. One scrolling page, no router, no data fetching, no backend. Only runtime dependencies are `react` and `react-dom`.

Stack: React 19 + TypeScript (strict) + Vite 7 + Tailwind CSS v4.

## Architecture

### Content lives in one file

`src/data/content.ts` is the single source of truth for all copy. Components import from it. No text is hardcoded in JSX. Every export has an exported `interface` above it, so shape mistakes fail at `tsc`.

Rule: to change words, edit `content.ts`. Do not put copy in a component.

### Sections and the numbering scheme

`src/App.tsx` renders every section in fixed order. There is no routing.

Each section is wrapped in `<Section id=... index=...>` (`src/components/Section.tsx`). `Section` draws the "slide" chrome: the numbered index bottom-left, the `Monogram` bottom-right, the top border, the page padding, and the `max-w-7xl` inner container. Use `bare` to hide the index and monogram.

The `index` string ("01".."08") is duplicated in three places and they must stay in sync:

| Place | Purpose |
| ----- | ------- |
| `nav[].index` in `content.ts` | shown in the contents slide |
| `nav[].id` in `content.ts` | anchor target, drives nav highlighting |
| `<Section id index>` in the component | the actual DOM element |

If you add a section: add the entry to `nav`, create the component, add it to `App.tsx`, and give `<Section>` the matching `id` and `index`. `Nav` builds `SECTION_IDS` from `nav`, so a mismatched `id` silently breaks the active-link highlight.

`Hero` uses `id="top"` and is not a `Section`. It is not in `nav`.

### Hooks own all motion

Three hooks in `src/hooks/`, no animation library:

- `useReveal()` — returns a ref. Attach to an element that also has the `.reveal` or `.clip-reveal` class. IntersectionObserver adds `is-visible` once, then unobserves. Takes an optional `delayMs` for staggering lists.
- `useScrollProgress()` — 0→1 document scroll, throttled to `requestAnimationFrame`. Drives the top progress bar in `Nav`.
- `useActiveSection(ids)` — picks the section with the highest intersection ratio. Drives nav link highlighting.

The two observer hooks (`useReveal`, `useActiveSection`) guard `typeof IntersectionObserver === 'undefined'` so the code is SSR/prerender safe. `useScrollProgress` touches `document`/`window` only inside `useEffect`, which never runs on the server.

The animation itself is CSS in `src/styles/index.css`, not JS. Hooks only toggle the `is-visible` class.

### Styling: Tailwind v4, CSS-first

There is **no `tailwind.config.js`**. Tailwind v4 is wired through the `@tailwindcss/vite` plugin. Design tokens are declared in `@theme` in `src/styles/index.css`:

| Token | Value | Use |
| ----- | ----- | --- |
| `--color-ink` | `#0A0A0A` | page background |
| `--color-ink-soft` | `#131313` | card hover |
| `--color-ember` | `#FF3B18` | display type and accents |
| `--color-flame` | `#FF7A5C` | **all body and small text** |
| `--color-ember-dim` | `#C22A10` | scrollbar thumb |
| `--color-bone` | `#F4F0EC` | reserved light neutral, unused |

**Ember vs flame — do not mix these up.** Ember is only 5.6:1 against ink at full strength, so `text-ember/70` and below is unreadable. Every dimmed text colour must be flame:

| Use | Class | Contrast |
| --- | --- | --- |
| Headings, names, numbers, marquee | `text-ember` or `text-ember/85` | 5.6 / 4.9 : 1 |
| Body copy, list items | `text-flame/85` | 5.8 : 1 |
| Small uppercase labels, nav, meta | `text-flame/75` | 4.7 : 1 |
| Decorative only (the `"` glyph) | `text-flame/45` | — |

Rule: if a person reads it, it is flame. If it is display type or an accent, it is ember. `text-ember` below `/85` is a bug. Borders and fills (`border-ember/15`, `bg-ember/15`) stay ember — they are structure, not text.

Declaring a colour in `@theme` generates the utilities (`bg-ink`, `text-ember`, `border-ember/10`, …). To add a colour, add a `--color-*` variable there — do not create a config file.

Custom utilities also live in `index.css` under `@layer utilities`:

| Utility | Purpose |
| ------- | ------- |
| `.font-display` | Playfair Display |
| `.reveal` / `.clip-reveal` | the two scroll-in animations, toggled by `useReveal` |
| `.hero-scrim` / `.hero-scrim-bottom` | the two hero photo gradients (stop positions matter — see The hero) |
| `.brushed` | diagonal server-rack texture behind the hero type |
| `.marquee-track` / `.data-flow` | the two infinite animations |
| `.noise` | fixed grain overlay, applied on the root div in `App.tsx` |

`@media (prefers-reduced-motion: reduce)` at the bottom of the file disables every reveal and the marquee. Any new animation must be added to that block.

### Assets

There is no `public/` directory. Images are ES-imported from `src/assets/` so Vite hashes and bundles them.

- `src/assets/profile.jpg` — the hero portrait (1200×1200, ~340 KB). Imported by `HeroPortrait.tsx`.
- `src/asst/Japan Pose.png` — the 9.9 MB original. Nothing imports it, so it never ships. Keep web copies in `src/assets/`, not this folder.
- `Projects.tsx` renders `<RadialBurst />`, a generated SVG that is deterministic per project index. No project screenshots exist.

Fonts (Playfair Display, Poppins) load from Google Fonts via `<link>` in `index.html`.

**Do not hand-edit `profile.jpg`.** It is produced by `scripts/optimize-photo.ps1`, which crops the subject-centred square out of the PNG and lifts the dusk exposure. Retune with parameters, then re-run:

```bash
powershell -File scripts/optimize-photo.ps1 -Gamma 1.45 -Contrast 1.15
```

Rule: never import a multi-megabyte source image directly. `npm run build` prints per-asset sizes — check them.

Alt text is copy, so it lives in `content.ts` (`profile.photoAlt`), not in the JSX.

### The hero

`Hero.tsx` owns the type. `HeroPortrait.tsx` owns the disc, and is split into two stacked layers:

1. A clipped circle — photo, two scrims, and the `DataLines` overlay.
2. `InstrumentRing`, drawn **outside** the clip. Its arcs sit at `r=103` in a 200×200 viewBox, so inside `overflow-hidden` they would be cut in half.

Things that are load-bearing here:

- The `.hero-scrim` gradient finishes by 58%. That is deliberate — it darkens only the strip under the name and leaves the subject clear. Widening it makes the photo muddy again.
- The photo is `opacity-75 md:opacity-100`. The mobile dimming exists because the huge name covers the disc at narrow widths.
- SVG colours are hex constants (`SIGNAL`, `EMBER`) at the top of the file, matching `RadialBurst`. A `@theme` token would be tree-shaken, since no utility class consumes it.
- `.data-flow` animates one overlay line. Like every other animation here, it must stay listed in the `prefers-reduced-motion` block in `index.css`.

## TypeScript conventions

`tsconfig.app.json` is strict and unusual — match the existing style or the build fails:

- `erasableSyntaxOnly` — no enums, no parameter properties, no namespaces.
- `verbatimModuleSyntax` — type-only imports must use `import type { ... }`.
- `noUnusedLocals` / `noUnusedParameters` — an unused variable is a build error, not a warning.
- All data interfaces use `readonly` fields and `readonly T[]` arrays.

Components are named exports (`export function About()`), not default exports. Only `App.tsx` has a default export.

## Deployment

Deploys to Vercel as a static build. `vercel.json` sets `framework: vite`, `buildCommand: npm run build`, `outputDirectory: dist`. Nothing else is configured — there is no serverless function, no env var the app reads at runtime.

`.env.local` holds only `VERCEL_OIDC_TOKEN`, written by the Vercel CLI. It is gitignored (`*.local`). The app never reads it.

`README.md` still documents Firebase Hosting and Cloud Run as the deploy targets. That is stale — Vercel is the live one.
