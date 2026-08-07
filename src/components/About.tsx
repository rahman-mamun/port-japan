import { profile, stats } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

export function About() {
  const titleRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>({ delayMs: 120 });
  const statsRef = useReveal<HTMLDivElement>({ delayMs: 220 });

  return (
    <Section id="about" index="02">
      <div ref={titleRef} className="reveal text-center">
        <SectionTitle align="center">About Me</SectionTitle>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-flame/85 sm:text-lg">
          I&rsquo;m {profile.fullName} — {profile.role} at {profile.company}.
        </p>
      </div>

      <div
        ref={bodyRef}
        className="reveal mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-14"
      >
        <p className="text-sm leading-[1.9] text-flame/85 sm:text-base">{profile.intro}</p>
        <p className="text-sm leading-[1.9] text-flame/85 sm:text-base">{profile.introSecondary}</p>
      </div>

      <div
        ref={statsRef}
        className="reveal mt-20 grid grid-cols-2 gap-px overflow-hidden border border-ember/15 bg-ember/15 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-ink p-6 sm:p-8">
            <p className="font-display text-4xl font-black text-ember sm:text-5xl">{stat.value}</p>
            <p className="mt-3 text-[0.68rem] leading-relaxed tracking-[0.12em] text-flame/75 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
