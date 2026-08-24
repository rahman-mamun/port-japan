import { useEffect, useState } from 'react';
import { nav, profile } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollProgress } from '../hooks/useScrollProgress';

const SECTION_IDS = nav.map((n) => n.id);

export function Nav() {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* progress bar */}
      <div
        aria-hidden
        className="fixed top-0 left-0 z-50 h-[2px] bg-ember transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />

      <header className="fixed top-0 right-0 left-0 z-40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-20">
          <a
            href="#top"
            className="flex items-center gap-3 font-display text-lg font-black tracking-tight text-ember transition-opacity hover:opacity-70"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-ember" />
            {profile.firstName}
            {profile.lastNameInline}
          </a>

          {/* desktop */}
          <nav className="hidden items-center gap-4 whitespace-nowrap lg:flex xl:gap-7">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                  active === item.id ? 'text-flame' : 'text-flame/75 hover:text-flame'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`block h-[2px] w-6 bg-ember transition-transform duration-300 ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-ember transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-ember transition-transform duration-300 ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-ink transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-1 px-8">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="px-6 py-3 text-center text-lg tracking-[0.14em] text-ember uppercase transition-opacity hover:opacity-60"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
