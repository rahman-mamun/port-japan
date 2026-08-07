import type { Testimonial } from '../data/content';
import { testimonials } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

export function Testimonials() {
  const titleRef = useReveal<HTMLDivElement>();

  return (
    <Section id="testimonials" index="07">
      <div ref={titleRef} className="reveal">
        <SectionTitle align="center">
          Client
          <br />
          Testimonials
        </SectionTitle>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden border border-ember/15 bg-ember/15 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <QuoteCard key={t.author} testimonial={t} delay={i * 100} />
        ))}
      </div>
    </Section>
  );
}

interface QuoteCardProps {
  readonly testimonial: Testimonial;
  readonly delay: number;
}

function QuoteCard({ testimonial, delay }: QuoteCardProps) {
  const ref = useReveal<HTMLElement>({ delayMs: delay });

  return (
    <figure
      ref={ref}
      className="reveal flex flex-col bg-ink p-8 transition-colors duration-300 hover:bg-ink-soft sm:p-10"
    >
      <span aria-hidden className="font-display text-6xl leading-none text-flame/45">
        &ldquo;
      </span>
      <blockquote className="mt-2 flex-1 text-base leading-[1.8] text-flame/85">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-8 border-t border-ember/15 pt-5">
        <p className="font-display text-lg font-bold text-ember">{testimonial.author}</p>
        <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-flame/75 uppercase">
          {testimonial.role}
        </p>
      </figcaption>
    </figure>
  );
}
