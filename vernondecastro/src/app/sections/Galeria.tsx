import { motion } from 'motion/react';
import { GalleryImage } from '../components/GalleryImage';

type GaleriaProps = {
  section: string;
  images: string[];
  onSelectImage: (src: string) => void;
};

const titles: Record<string, string> = {
  pessoas: 'Pessoas',
  estilo: 'Estilo',
  marcas: 'Marcas',
};

export function Galeria({ section, images, onSelectImage }: GaleriaProps) {
  return (
    <motion.section
      key="gallery-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="size-full overflow-y-auto custom-scrollbar pt-24 md:pt-32 pb-20 px-4 md:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10 md:mb-14">
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/40 font-outfit mb-3">Galeria</p>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight text-white">
            {titles[section] || section.replace(/-/g, ' ')}
          </h1>
        </header>

        {images.length === 0 ? (
          <p className="text-center text-white/40 font-outfit text-sm tracking-[0.2em] uppercase">
            Sem fotografias nesta secção.
          </p>
        ) : (
          <div className="masonry-grid">
            {images.map((src) => (
              <GalleryImage key={src} src={src} alt={`${titles[section] || section} — fotografia`} onClick={onSelectImage} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
