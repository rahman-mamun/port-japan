import { useEffect, useRef } from 'react';

/**
 * Adds `is-visible` to the element once it scrolls into view. Fires once.
 * Pair with the `.reveal` or `.clip-reveal` utility class.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; delayMs?: number },
) {
  const ref = useRef<T | null>(null);
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', delayMs = 0 } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          if (delayMs > 0) {
            window.setTimeout(() => target.classList.add('is-visible'), delayMs);
          } else {
            target.classList.add('is-visible');
          }
          observer.unobserve(target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, delayMs]);

  return ref;
}
