import { useState } from 'react';
import { motion } from 'motion/react';
import { getExhibition, site } from '../../data/content';
import { getSectionImages } from '../../lib/galleries';

type ExibicaoProps = {
  slug: string;
  onSelectImage: (src: string) => void;
};

export function Exibicao({ slug, onSelectImage }: ExibicaoProps) {
  const exhibition = getExhibition(slug);
  const images = getSectionImages(slug);
  const [aspects, setAspects] = useState<Record<string, 'landscape' | 'portrait'>>({});

  return (
    <motion.section
      key={slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="size-full bg-white text-black overflow-hidden relative"
    >
      <div
        className="h-full w-full overflow-x-auto overflow-y-hidden flex flex-row items-center pl-[6vw] md:pl-[10vw] pr-[15vw] custom-scrollbar-hidden select-none"
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        {/* Bloco de texto */}
        <div className="min-w-[300px] md:min-w-[420px] max-w-[480px] shrink-0 mr-[6vw] flex flex-col justify-center py-20">
          <div className="w-full text-center space-y-8">
            <h1 className="font-serif text-2xl md:text-3xl leading-tight">
              {exhibition?.title || slug.replace(/-/g, ' ')}
            </h1>
            <div className="text-[13px] md:text-sm leading-relaxed text-black/65 text-justify font-outfit space-y-5">
              {(exhibition?.paragraphs || []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Faixa de imagens */}
        <div className="flex flex-row items-center gap-4 md:gap-8 h-full py-[10vh] pr-[20vw]">
          {images.map((src) => {
            const isPortrait = aspects[src] === 'portrait';
            return (
              <button
                key={src}
                type="button"
                className={`h-[50vh] md:h-[65vh] shrink-0 cursor-zoom-in transition-all duration-700 ${
                  isPortrait ? 'aspect-[4/5]' : 'aspect-[5/4]'
                } bg-neutral-50 overflow-hidden relative group`}
                onClick={() => onSelectImage(src)}
              >
                <img
                  src={src}
                  alt={`${exhibition?.title || slug} — fotografia`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:scale-[1.03]"
                  onLoad={(e) => {
                    const { naturalWidth, naturalHeight } = e.currentTarget;
                    setAspects((prev) => ({
                      ...prev,
                      [src]: naturalWidth > naturalHeight ? 'landscape' : 'portrait',
                    }));
                    e.currentTarget.classList.remove('opacity-0');
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Rodapé de contacto fixo */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 md:gap-5 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity" aria-label="Instagram">
          <InstagramIcon />
        </a>
        <span className="h-6 w-px bg-black/20" />
        <a
          href={`mailto:${site.email}`}
          className="text-[12px] md:text-[13px] font-outfit tracking-[0.1em] hover:opacity-40 transition-opacity whitespace-nowrap"
        >
          {site.email}
        </a>
      </div>

      {/* Sidebar vertical (desktop) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6 hidden md:flex">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="group" aria-label="Instagram">
          <InstagramIcon className="opacity-30 group-hover:opacity-100 transition-opacity" />
        </a>
        <span className="text-[11px] tracking-[0.3em] uppercase opacity-30 whitespace-nowrap font-outfit [writing-mode:vertical-rl]">
          Segue Vernon De Castro no Instagram
        </span>
      </div>
    </motion.section>
  );
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.2" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
