import { contact, profile } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

export function Contact() {
  const titleRef = useReveal<HTMLDivElement>();
  const linksRef = useReveal<HTMLUListElement>({ delayMs: 140 });

  return (
    <Section id="contact" index="08">
      <div ref={titleRef} className="reveal text-center">
        <SectionTitle align="center">{contact.heading}</SectionTitle>
        <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-flame/85 sm:text-base">
          {contact.blurb}
        </p>

        <a
          href={`mailto:${contact.email}`}
          className="mt-12 inline-block font-display text-[clamp(1.4rem,5vw,3.5rem)] leading-none font-black break-all text-ember transition-opacity hover:opacity-60"
        >
          {contact.email}
        </a>
      </div>

      <ul
        ref={linksRef}
        className="reveal mt-20 grid gap-px overflow-hidden border border-ember/15 bg-ember/15 sm:grid-cols-2 lg:grid-cols-4"
      >
        {contact.links.map((link) => (
          <li key={link.label} className="bg-ink">
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex h-full flex-col justify-between gap-6 p-7 transition-colors duration-300 hover:bg-ink-soft active:bg-ink-soft"
            >
              <span className="text-[0.7rem] tracking-[0.25em] text-flame/75 uppercase sm:text-[0.65rem]">
                {link.label}
              </span>
              <span className="flex items-center justify-between gap-3 font-display text-lg font-bold text-ember">
                {link.value}
                <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-center text-[0.7rem] tracking-[0.22em] text-flame/70 uppercase sm:text-[0.65rem]">
        {profile.role} · {profile.company} · {profile.location}
      </p>
    </Section>
  );
}
