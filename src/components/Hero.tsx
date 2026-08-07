import { profile } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { HeroPortrait } from './HeroPortrait';

export function Hero() {
  const kickerRef = useReveal<HTMLDivElement>({ threshold: 0 });
  const nameRef = useReveal<HTMLHeadingElement>({ threshold: 0, delayMs: 120 });
  const metaRef = useReveal<HTMLDivElement>({ threshold: 0, delayMs: 260 });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full items-center overflow-hidden px-6 pt-28 pb-20 sm:px-10 lg:px-20"
    >
      {/* brushed metal panel under the type */}
      <div aria-hidden className="brushed absolute inset-y-0 left-0 z-0 hidden w-1/2 md:block" />

      {/* ember bloom behind the disc */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 z-0 h-[min(92vw,54rem)] w-[min(92vw,54rem)] -translate-x-1/4 -translate-y-1/2 rounded-full bg-ember/8 blur-3xl"
      />

      <HeroPortrait />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div ref={kickerRef} className="reveal flex items-center gap-3 text-ember">
          <CloudMark />
          <p className="text-[0.7rem] tracking-[0.32em] uppercase sm:text-xs">{profile.kicker}</p>
        </div>

        <h1
          ref={nameRef}
          className="reveal mt-10 font-display leading-[0.8] font-black tracking-[-0.03em] text-ember"
        >
          <span className="block text-[clamp(4.5rem,20vw,17rem)]">{profile.firstName}</span>
          <span className="block text-[clamp(4.5rem,20vw,17rem)]">{profile.lastNameInline}</span>
          <span className="mt-6 block font-display text-[clamp(0.8rem,2.2vw,1.6rem)] font-normal tracking-[0.45em]">
            {profile.surname.toUpperCase()}
          </span>
        </h1>

        <div
          ref={metaRef}
          className="reveal mt-16 flex flex-col gap-10 border-t border-ember/20 pt-10 md:flex-row md:items-start md:justify-between md:gap-16"
        >
          <p className="max-w-lg text-sm leading-[1.75] text-flame/85 sm:text-base">
            {profile.tagline}
          </p>
          <div className="shrink-0 space-y-2 text-[0.7rem] leading-[1.6] tracking-[0.2em] text-flame/75 uppercase md:text-right">
            <p>{profile.role}</p>
            <p>{profile.company}</p>
            <p className="border-t border-ember/15 pt-2">{profile.location}</p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[0.65rem] tracking-[0.3em] text-flame/75 uppercase transition-colors hover:text-flame md:block"
      >
        Scroll ↓
      </a>
    </section>
  );
}

/** Replaces the plain dot next to the kicker — one mark, and it says "cloud". */
function CloudMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.5 18.5H7a4.5 4.5 0 0 1-.9-8.91 6 6 0 0 1 11.53-1.4A4.25 4.25 0 0 1 17.5 18.5Z" />
    </svg>
  );
}
