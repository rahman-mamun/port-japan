import { education } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

export function Education() {
  const titleRef = useReveal<HTMLDivElement>();

  return (
    <Section id="education" index="03">
      <div ref={titleRef} className="reveal">
        <SectionTitle>Education</SectionTitle>
      </div>

      <ol className="mt-16 border-t border-ember/15">
        {education.map((item, i) => (
          <EducationRow key={item.credential} item={item} delay={i * 90} />
        ))}
      </ol>
    </Section>
  );
}

interface RowProps {
  readonly item: (typeof education)[number];
  readonly delay: number;
}

function EducationRow({ item, delay }: RowProps) {
  const ref = useReveal<HTMLLIElement>({ delayMs: delay });

  return (
    <li
      ref={ref}
      className="reveal group grid gap-4 border-b border-ember/15 py-8 transition-colors hover:bg-ember/[0.04] md:grid-cols-12 md:items-baseline md:gap-8"
    >
      <span className="text-[0.7rem] tracking-[0.22em] text-flame/75 uppercase sm:text-[0.68rem] md:col-span-2">
        {item.period}
      </span>
      <div className="md:col-span-5">
        <h3 className="font-display text-2xl leading-tight font-bold text-ember sm:text-3xl">
          {item.credential}
        </h3>
        <p className="mt-2 text-[0.7rem] tracking-[0.18em] text-flame/75 uppercase">
          {item.institution}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-flame/85 sm:text-base md:col-span-5">{item.detail}</p>
    </li>
  );
}
