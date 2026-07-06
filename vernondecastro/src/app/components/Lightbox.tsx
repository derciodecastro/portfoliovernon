import { useEffect } from 'react';
import { motion } from 'motion/react';

type LightboxProps = {
  images: string[];
  current: string | null;
  onClose: () => void;
  onChange: (src: string) => void;
};

export function Lightbox({ images, current, onClose, onChange }: LightboxProps) {
  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      const idx = images.indexOf(current);
      if (e.key === 'ArrowRight') onChange(images[(idx + 1) % images.length]);
      else if (e.key === 'ArrowLeft') onChange(images[(idx - 1 + images.length) % images.length]);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, images, onChange, onClose]);

  if (current === null) return null;

  const idx = images.indexOf(current);
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(images[(idx - 1 + images.length) % images.length]);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(images[(idx + 1) % images.length]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#f8f7f2] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <IconButton className="top-4 right-4 md:top-8 md:right-8" onClick={() => onClose()} label="Fechar">
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
      </IconButton>

      {images.length > 1 && (
        <>
          <IconButton className="left-2 md:left-8 top-1/2 -translate-y-1/2" onClick={prev} label="Anterior" size={30}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </IconButton>
          <IconButton className="right-2 md:right-8 top-1/2 -translate-y-1/2" onClick={next} label="Seguinte" size={30}>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </IconButton>
        </>
      )}

      <div
        className="flex flex-col max-w-full max-h-[90vh] cursor-auto items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={current}
          alt="Fotografia em destaque"
          className="max-w-full max-h-[85vh] object-contain shadow-2xl"
          draggable={false}
        />
        {images.length > 1 && (
          <span className="mt-4 text-[11px] tracking-[0.3em] font-outfit text-black/40">
            {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function IconButton({
  className,
  onClick,
  label,
  size = 24,
  children,
}: {
  className: string;
  onClick: (e: React.MouseEvent) => void;
  label: string;
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      className={`absolute ${className} p-4 hover:opacity-40 transition-opacity z-[110]`}
      onClick={onClick}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1">
        {children}
      </svg>
    </button>
  );
}
