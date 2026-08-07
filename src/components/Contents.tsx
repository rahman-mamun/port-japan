import { nav } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

/** The deck's "Contents" slide, as a clickable index. */
export function Contents() {
  const titleRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLUListElement>({ delayMs: 120 });

  return (
    <Section id="contents" index="01" className="border-t-0">
      <div ref={titleRef} className="reveal">
        <SectionTitle align="center">Contents</SectionTitle>
      </div>

      <ul ref={listRef} className="reveal mx-auto mt-14 flex max-w-md flex-col gap-1 text-center">
        {nav.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group inline-flex items-baseline gap-3 py-1.5 text-sm tracking-[0.12em] text-flame/85 uppercase transition-colors hover:text-flame sm:text-base"
            >
              <span className="font-display text-xs opacity-50 transition-opacity group-hover:opacity-100">
                {item.index}
              </span>
              <span className="bg-linear-to-r from-ember to-ember bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
