import type { Project } from '../data/content';
import { projects } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { Section, SectionTitle } from './Section';

export function Projects() {
  const titleRef = useReveal<HTMLDivElement>();

  return (
    <Section id="projects" index="06">
      <div ref={titleRef} className="reveal">
        <SectionTitle>
          My Recent
          <br />
          Projects
        </SectionTitle>
      </div>

      <div className="mt-16 flex flex-col gap-px bg-ember/15">
        {projects.map((project, i) => (
          <ProjectRow key={project.index} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}

interface ProjectRowProps {
  readonly project: Project;
  readonly flip: boolean;
}

function ProjectRow({ project, flip }: ProjectRowProps) {
  const ref = useReveal<HTMLElement>();
  const artRef = useReveal<HTMLDivElement>({ delayMs: 140 });

  return (
    <article
      ref={ref}
      className="reveal grid items-stretch gap-px bg-ember/15 md:grid-cols-2"
    >
      <div
        className={`flex flex-col justify-center bg-ink p-8 sm:p-12 ${
          flip ? 'md:order-2' : ''
        }`}
      >
        <div className="flex items-start gap-5">
          <span className="font-display text-3xl leading-none font-black text-ember/85">
            {project.index}
          </span>
          <h3 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[0.95] font-black text-ember">
            {project.name}
          </h3>
        </div>

        <p className="mt-8 font-semibold text-ember">Client: {project.client}</p>

        <p className="mt-4 max-w-md text-sm leading-[1.9] text-flame/85">{project.summary}</p>

        <ul className="mt-7 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-flame/85">
              <span className="mt-[0.55rem] inline-block h-1 w-1 shrink-0 rounded-full bg-ember/60" />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="border border-ember/25 px-2.5 py-1 text-[0.6rem] tracking-[0.12em] text-flame/80 uppercase"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 border-b border-ember pb-1 text-[0.7rem] tracking-[0.2em] text-ember uppercase transition-opacity hover:opacity-60"
          >
            View case study →
          </a>
        )}
      </div>

      {/* Generative visual — the deck's radial burst, no photography needed */}
      <div
        ref={artRef}
        className={`clip-reveal relative min-h-[16rem] overflow-hidden bg-ink md:min-h-[30rem] ${
          flip ? 'md:order-1' : ''
        }`}
      >
        <RadialBurst seed={Number(project.index)} />
      </div>
    </article>
  );
}

interface BurstProps {
  readonly seed: number;
}

/** Deterministic radial ray pattern — echoes the deck's project imagery. */
function RadialBurst({ seed }: BurstProps) {
  const rayCount = 56;
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = (360 / rayCount) * i;
    // deterministic pseudo-random length so every project reads differently
    const noise = Math.abs(Math.sin((i + 1) * (seed + 1) * 1.7));
    const length = 22 + noise * 26;
    const width = 1.4 + noise * 2.2;
    const opacity = 0.25 + noise * 0.75;
    return { angle, length, width, opacity, i };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Abstract radial burst artwork"
    >
      <defs>
        <radialGradient id={`glow-${seed}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF3B18" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#FF3B18" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="200" fill="#0A0A0A" />
      <circle cx="100" cy="100" r="95" fill={`url(#glow-${seed})`} />

      {rays.map((ray) => (
        <rect
          key={ray.i}
          x="100"
          y={100 - ray.width / 2}
          width={ray.length}
          height={ray.width}
          fill="#FF3B18"
          opacity={ray.opacity}
          transform={`rotate(${ray.angle} 100 100)`}
          rx={ray.width / 2}
        />
      ))}

      <circle cx="100" cy="100" r="16" fill="#0A0A0A" />
      <circle cx="100" cy="100" r="16" fill="none" stroke="#FF3B18" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}
