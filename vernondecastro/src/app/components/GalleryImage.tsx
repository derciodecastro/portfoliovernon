import { useState } from 'react';

type GalleryImageProps = {
  src: string;
  alt: string;
  onClick: (src: string) => void;
};

/** Foto de galeria com fade-in ao carregar e remoção silenciosa em caso de erro. */
export function GalleryImage({ src, alt, onClick }: GalleryImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) return null;

  return (
    <button
      type="button"
      className="gallery-item relative group overflow-hidden bg-neutral-900/40 cursor-zoom-in w-full"
      onClick={() => onClick(src)}
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`w-full h-auto object-contain transition-all duration-700 ease-out group-hover:scale-[1.04] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </button>
  );
}
