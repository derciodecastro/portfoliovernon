import { motion } from 'motion/react';
import { biography, site } from '../../data/content';

export function Biografia() {
  return (
    <motion.section
      key="biografia"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="size-full overflow-y-auto custom-scrollbar bg-[#f5f5f5] text-black px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-14">
        <figure className="w-full">
          <img
            src={biography.portrait}
            alt="Retrato de Vernon De Castro"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full grayscale object-cover shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
          />
        </figure>

        <header className="text-center">
          <p className="text-[10px] tracking-[0.45em] uppercase text-black/40 font-outfit mb-3">Biografia</p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight">{site.name}</h1>
        </header>

        <div className="text-sm md:text-[15px] leading-loose text-black/75 font-outfit text-justify space-y-5 max-w-2xl">
          {biography.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <a
          href={`mailto:${site.email}`}
          className="mt-2 text-[11px] tracking-[0.3em] uppercase font-outfit border-b border-black/30 pb-1 hover:border-black transition-colors"
        >
          {site.email}
        </a>
      </div>
    </motion.section>
  );
}
