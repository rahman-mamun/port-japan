import { marqueeWords } from '../data/content';

/** Infinite horizontal ticker of the core stack. */
export function Marquee() {
  const words = [...marqueeWords, ...marqueeWords];

  return (
    <div
      aria-hidden
      className="w-full overflow-hidden border-y border-ember/15 bg-ember/[0.03] py-5"
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-2xl font-black tracking-tight text-ember/85 sm:text-3xl">
              {word}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
