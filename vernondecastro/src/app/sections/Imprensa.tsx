import { motion } from 'motion/react';
import { pressBanner, site } from '../../data/content';

const contacts = [
  {
    label: 'Trabalhos, sessões privadas e exposições',
    lines: [{ text: site.email, href: `mailto:${site.email}` }],
  },
  {
    label: 'Colaborações editoriais e de moda',
    lines: [{ text: 'editorial@vernondecastro.com', href: 'mailto:editorial@vernondecastro.com' }],
  },
  {
    label: 'Imprensa e comunicação',
    lines: [{ text: 'imprensa@vernondecastro.com', href: 'mailto:imprensa@vernondecastro.com' }],
  },
  {
    label: 'Redes sociais',
    lines: [{ text: site.instagramHandle, href: site.instagram }],
  },
];

export function Imprensa() {
  return (
    <motion.section
      key="imprensa"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="size-full overflow-y-auto custom-scrollbar bg-white text-black pt-28 pb-32"
    >
      {pressBanner && (
        <div className="w-full aspect-[21/9] md:aspect-[4/1] lg:aspect-[5/1] bg-gray-100 overflow-hidden mb-16 mt-6 md:mt-14">
          <img
            src={pressBanner}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover"
            alt="Banner de imprensa"
          />
        </div>
      )}

      <div className="w-full max-w-4xl mx-auto px-6 md:px-10">
        <header className="text-center mb-14">
          <p className="text-[10px] tracking-[0.45em] uppercase text-black/40 font-outfit mb-3">Contactos</p>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight">Imprensa &amp; Representação</h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {contacts.map((c) => (
            <div key={c.label} className="flex flex-col gap-2 border-t border-black/10 pt-5">
              <span className="text-[10px] tracking-[0.25em] uppercase text-black/40 font-outfit">{c.label}</span>
              {c.lines.map((line) => (
                <a
                  key={line.text}
                  href={line.href}
                  target={line.href.startsWith('http') ? '_blank' : undefined}
                  rel={line.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm md:text-base font-outfit hover:opacity-50 transition-opacity underline underline-offset-4 decoration-black/20"
                >
                  {line.text}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
