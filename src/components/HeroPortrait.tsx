import profilePhoto from '../assets/profile.jpg';
import { profile } from '../data/content';
import { useReveal } from '../hooks/useReveal';

/**
 * The deck's grey disc, now holding the portrait.
 *
 * Two stacked layers: a clipped circle with the photo, its scrims and the data
 * overlay, then an unclipped "instrument" ring drawn on top. The ring has to sit
 * outside the clip or its outer arc and ticks get cut in half.
 */
export function HeroPortrait() {
  const photoRef = useReveal<HTMLImageElement>({ threshold: 0, delayMs: 80 });

  return (
    <div className="absolute top-1/2 left-1/2 z-0 h-[min(78vw,44rem)] w-[min(78vw,44rem)] -translate-x-1/4 -translate-y-1/2">
      <div className="absolute inset-0 overflow-hidden rounded-full bg-[#191713] ring-1 ring-ember/15">
        <img
          ref={photoRef}
          src={profilePhoto}
          alt={profile.photoAlt}
          width={1200}
          height={1200}
          decoding="async"
          fetchPriority="high"
          className="clip-reveal h-full w-full object-cover opacity-75 md:opacity-100"
        />
        <div aria-hidden className="hero-scrim absolute inset-0" />
        <div aria-hidden className="hero-scrim-bottom absolute inset-0" />
        <DataLines />
      </div>

      <InstrumentRing />
    </div>
  );
}

/**
 * SVG colours are hex, not theme tokens — same convention as RadialBurst in
 * Projects.tsx. A `--color-signal` token would be tree-shaken by Tailwind
 * anyway, because no utility class consumes it.
 */
const SIGNAL = '#5B9DFF'; // cool counterweight to ember, hero overlay only
const EMBER = '#FF3B18';

/**
 * Thin connector lines traced over the power lines already in the photo's sky.
 * Hand-authored, not generated — they have to land on the upper-right quadrant
 * where the actual cables are, so random placement would miss.
 */
function DataLines() {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <g fill="none" stroke={SIGNAL} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="106,20 146,34 184,29" strokeWidth="0.6" opacity="0.34" />
        <polyline points="98,45 139,60 188,73" strokeWidth="0.5" opacity="0.24" />
        <polyline points="151,8 151,63 196,63" strokeWidth="0.5" opacity="0.22" />
        {/* the one that moves */}
        <polyline
          points="118,6 157,52 197,47"
          strokeWidth="0.7"
          strokeDasharray="7 11"
          opacity="0.5"
          className="data-flow"
        />
      </g>

      <g fill={SIGNAL}>
        {[
          [146, 34],
          [139, 60],
          [151, 63],
          [157, 52],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" opacity="0.55" />
        ))}
      </g>
    </svg>
  );
}

/** Outer arcs and tick marks — reads as an instrument bezel, not a photo frame. */
function InstrumentRing() {
  const tickCount = 60;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angle = (360 / tickCount) * i;
    const major = i % 5 === 0;
    return { angle, length: major ? 3.4 : 1.6, opacity: major ? 0.4 : 0.18, i };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden
    >
      {/* partial arcs: pathLength 100 turns the dash array into percentages */}
      <circle
        cx="100"
        cy="100"
        r="103"
        fill="none"
        stroke={SIGNAL}
        strokeWidth="0.4"
        pathLength={100}
        strokeDasharray="21 79"
        strokeDashoffset="-6"
        opacity="0.45"
      />
      <circle
        cx="100"
        cy="100"
        r="103"
        fill="none"
        stroke={EMBER}
        strokeWidth="0.4"
        pathLength={100}
        strokeDasharray="13 87"
        strokeDashoffset="-56"
        opacity="0.5"
      />

      <g stroke={EMBER}>
        {ticks.map((tick) => (
          <line
            key={tick.i}
            x1="100"
            y1="-0.5"
            x2="100"
            y2={-0.5 + tick.length}
            strokeWidth="0.35"
            opacity={tick.opacity}
            transform={`rotate(${tick.angle} 100 100)`}
          />
        ))}
      </g>
    </svg>
  );
}
