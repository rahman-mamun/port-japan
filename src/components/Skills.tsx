import type { SkillGroup } from '../data/content';
import { skills } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

export function Skills() {
  const titleRef = useReveal<HTMLDivElement>();

  return (
    <Section id="skills" index="05">
      <div ref={titleRef} className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle>Skills</SectionTitle>
        <p className="max-w-sm text-sm leading-relaxed text-flame/85 sm:text-base">
          The stack I reach for daily — and the practice around it that keeps production quiet.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden border border-ember/15 bg-ember/15 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <SkillCard key={group.title} group={group} delay={i * 70} />
        ))}
      </div>
    </Section>
  );
}

interface SkillCardProps {
  readonly group: SkillGroup;
  readonly delay: number;
}

function SkillCard({ group, delay }: SkillCardProps) {
  const ref = useReveal<HTMLDivElement>({ delayMs: delay });

  return (
    <div ref={ref} className="reveal bg-ink p-7 transition-colors duration-300 hover:bg-ink-soft">
      <h3 className="font-display text-xl font-bold text-ember">{group.title}</h3>
      <ul className="mt-5 space-y-2">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-flame/85 sm:text-base">
            <span className="mt-[0.55rem] inline-block h-1 w-1 shrink-0 rounded-full bg-ember/60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
