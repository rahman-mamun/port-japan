import type { ExperienceItem } from '../data/content';
import { experience } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

export function Experience() {
  const titleRef = useReveal<HTMLDivElement>();

  return (
    <Section id="experience" index="04">
      <div ref={titleRef} className="reveal">
        <SectionTitle>
          Work
          <br />
          Experience
        </SectionTitle>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden border border-ember/15 bg-ember/15 md:grid-cols-3">
        {experience.map((item, i) => (
          <ExperienceCard key={item.role} item={item} delay={i * 110} />
        ))}
      </div>
    </Section>
  );
}

interface CardProps {
  readonly item: ExperienceItem;
  readonly delay: number;
}

function ExperienceCard({ item, delay }: CardProps) {
  const ref = useReveal<HTMLElement>({ delayMs: delay });

  return (
    <article
      ref={ref}
      className="reveal flex flex-col bg-ink p-7 transition-colors duration-300 hover:bg-ink-soft sm:p-9"
    >
      <span className="text-[0.65rem] tracking-[0.25em] text-flame/75 uppercase">
        {item.period}
      </span>

      <h3 className="mt-5 font-display text-2xl leading-[1.1] font-bold text-ember sm:text-[1.7rem]">
        {item.role}
      </h3>

      <p className="mt-2 text-[0.7rem] tracking-[0.18em] text-flame/75 uppercase">
        {item.employer}
      </p>

      <p className="mt-6 flex-1 text-sm leading-[1.85] text-flame/85">{item.description}</p>

      <ul className="mt-7 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <li
            key={tech}
            className="border border-ember/25 px-2.5 py-1 text-[0.6rem] tracking-[0.12em] text-flame/80 uppercase"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
