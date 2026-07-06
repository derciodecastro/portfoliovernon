import { useEffect, useRef, useState } from 'react';

/** Esconde a navbar ao fazer scroll para baixo e mostra ao subir. */
export function useHideOnScroll(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(!(y > lastScrollY && y > 100));
      lastScrollY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible;
}

/** Fecha algo quando se clica fora do elemento referenciado. */
export function useClickOutside<T extends HTMLElement>(
  onOutside: () => void,
  active = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onOutside();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onOutside, active]);

  return ref;
}

/**
 * Proteção anti-cópia: bloqueia menu de contexto e atalhos de captura/print.
 * (Nota: é apenas dissuasor — não impede utilizadores determinados.)
 */
export function useContentProtection() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const blocked =
        e.key === 'PrintScreen' ||
        ((e.ctrlKey || e.metaKey) && (k === 's' || k === 'p')) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && k === 'i') ||
        (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key));
      if (blocked) e.preventDefault();
    };
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
}
