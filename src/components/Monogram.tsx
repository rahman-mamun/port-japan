import { profile } from '../data/content';

interface MonogramProps {
  readonly className?: string;
}

/** The stacked "Ma / mun — RAHMAN" mark used in the deck's slide corners. */
export function Monogram({ className = '' }: MonogramProps) {
  return (
    <div className={`select-none leading-[0.78] text-ember ${className}`}>
      <div className="font-display text-3xl font-black tracking-tight">{profile.monogramTop}</div>
      <div className="font-display text-3xl font-black tracking-tight">
        {profile.monogramBottom}
      </div>
      <div className="mt-1 font-display text-[0.6rem] tracking-[0.35em]">
        {profile.monogramSub.toUpperCase()}
      </div>
    </div>
  );
}
