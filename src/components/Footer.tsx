import { profile } from '../data/content';
import { Monogram } from './Monogram';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ember/15 px-6 py-12 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <Monogram />
        <div className="text-[0.65rem] tracking-[0.2em] text-flame/75 uppercase sm:text-right">
          <p>
            © {year} Mamun {profile.surname}
          </p>
          <p className="mt-1">{profile.footerLine}</p>
          <a
            href="#top"
            className="mt-3 inline-block border-b border-ember/40 pb-0.5 transition-colors hover:text-ember"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
