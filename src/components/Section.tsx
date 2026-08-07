import type { ReactNode } from 'react';
import { Monogram } from './Monogram';

interface SectionProps {
  readonly id: string;
  readonly index: string;
  readonly children: ReactNode;
  readonly className?: string;
  /** Hide the slide-corner index + monogram chrome. */
  readonly bare?: boolean;
}

/**
 * A full "slide" — matches the deck: numbered bottom-left, monogram bottom-right,
 * generous vertical rhythm, black canvas.
 */
export function Section({ id, index, children, className = '', bare = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full border-t border-ember/10 px-6 py-24 sm:px-10 md:py-32 lg:px-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>

      {!bare && (
        <>
          <span className="pointer-events-none absolute bottom-8 left-6 font-display text-xl font-black text-ember/85 sm:left-10 lg:left-20">
            {index}
          </span>
          <Monogram className="pointer-events-none absolute right-6 bottom-6 hidden opacity-70 sm:right-10 md:block lg:right-20" />
        </>
      )}
    </section>
  );
}

interface SectionTitleProps {
  readonly children: ReactNode;
  readonly align?: 'left' | 'center';
  readonly className?: string;
}

export function SectionTitle({ children, align = 'left', className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.88] font-black tracking-[-0.02em] text-ember ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      {children}
    </h2>
  );
}
