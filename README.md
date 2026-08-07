# Mamun Rahman — Portfolio

Editorial black/ember portfolio site. Design language lifted from the reference deck: `#0A0A0A` canvas, `#FF3B18` accent, Playfair Display for the display type, Poppins for body, numbered "slide" sections with a corner monogram.

## Stack

- React 19 + TypeScript (strict, `erasableSyntaxOnly`)
- Vite 7
- Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first `@theme` tokens — no `tailwind.config.js`)
- Zero runtime dependencies beyond React

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run preview
npm run typecheck
```

## Editing content

Everything is in `src/data/content.ts` — profile, nav, stats, education, experience, skills, projects, testimonials, contact links. No copy is hardcoded in JSX. Types are exported so the compiler catches shape mistakes.

## Theming

Tokens live in `src/styles/index.css` under `@theme`:

| Token             | Value     | Use                    |
| ----------------- | --------- | ---------------------- |
| `--color-ink`     | `#0A0A0A` | Page background        |
| `--color-ink-soft`| `#131313` | Card hover             |
| `--color-ember`   | `#FF3B18` | Primary accent / text  |
| `--color-bone`    | `#F4F0EC` | Reserved light neutral |

Swap `--color-ember` to re-skin the whole site.

## Structure

```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── Nav.tsx            scroll progress bar, active-section highlight, mobile overlay
│   ├── Hero.tsx           oversized name, grey disc backdrop
│   ├── Marquee.tsx        infinite stack ticker
│   ├── Contents.tsx       the deck's contents slide as an index
│   ├── About.tsx          intro + stat grid
│   ├── Education.tsx      timeline rows
│   ├── Experience.tsx     three-column cards
│   ├── Skills.tsx         six grouped cards
│   ├── Projects.tsx       alternating rows + generative SVG radial burst
│   ├── Testimonials.tsx   quote cards
│   ├── Contact.tsx        mailto + link grid
│   ├── Section.tsx        slide wrapper (index + monogram chrome)
│   ├── Monogram.tsx       stacked Ma/mun mark
│   └── Footer.tsx
├── data/content.ts        ← edit here
├── hooks/
│   ├── useReveal.ts       IntersectionObserver scroll-in
│   ├── useScrollProgress.ts
│   └── useActiveSection.ts
└── styles/index.css
```

## Notes

- Project artwork is generated SVG (deterministic per project index), so there are no image assets to ship. Drop real screenshots into `public/` and replace `<RadialBurst />` in `Projects.tsx` if you'd rather show the real thing.
- `prefers-reduced-motion` disables all reveals and the marquee.
- Fonts load from Google Fonts in `index.html`. Self-host them if you want zero third-party requests.

## Deploying

Static output — any host works. For Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting   # public: "dist"
```

For Cloud Run, serve `dist/` from an nginx or `serve` container.
