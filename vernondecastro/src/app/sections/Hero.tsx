import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { heroImages } from '../../lib/galleries';

/** Slideshow da página inicial — autoplay + controlo pela posição do rato. */
export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length === 0) return;
    let interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    const onMouseMove = (e: MouseEvent) => {
      clearInterval(interval);
      const ratio = e.clientX / window.innerWidth;
      setIndex(Math.min(Math.floor(ratio * heroImages.length), heroImages.length - 1));
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <motion.section
      key="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="size-full relative bg-black"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[index]}
            alt={`Fotografia de Vernon De Castro ${index + 1}`}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradiente subtil para dar profundidade e legibilidade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25" />

      {/* Indicadores de slide */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-white' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
