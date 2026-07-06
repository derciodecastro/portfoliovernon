import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { stories, type Story } from '../../lib/galleries';

export function Historias() {
  const [selected, setSelected] = useState<Story | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const openStory = (story: Story) => {
    setSelected(story);
    setActiveImage(0);
  };

  return (
    <motion.section
      key="historias"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="size-full overflow-y-auto custom-scrollbar bg-black text-white"
    >
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key="story-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-full pt-28 md:pt-40 pb-20"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-3 pl-4 md:pl-16 pr-4">
                <div className="flex flex-col gap-2">
                  {selected.images.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(i)}
                      className={`w-14 h-14 overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img} loading="lazy" decoding="async" draggable={false} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="flex-1 bg-white/5 flex items-center justify-center p-4 md:p-8">
                  <img
                    src={selected.images[activeImage]}
                    alt={selected.title}
                    loading="eager"
                    draggable={false}
                    className="w-full h-full object-contain max-h-[70vh]"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start pt-8 md:pt-4 gap-6 px-4 md:px-16">
                <h1 className="font-serif text-2xl md:text-3xl leading-tight">{selected.title}</h1>
                <p className="text-[11px] tracking-[0.15em] font-outfit opacity-60 leading-relaxed uppercase">
                  Uma série fotográfica que explora narrativas visuais através de múltiplas perspetivas.
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-2 w-fit bg-white text-black text-[10px] tracking-[0.3em] uppercase font-outfit font-medium py-4 px-10 hover:bg-white/80 transition-colors duration-300"
                >
                  ← Voltar
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="story-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-28 md:pt-40 pb-20 px-4 md:px-16"
          >
            <div className="max-w-[1492px] mx-auto">
              {stories.length === 0 ? (
                <p className="text-center text-white/40 font-outfit text-sm tracking-[0.2em] uppercase">
                  Sem histórias disponíveis.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
                  {stories.map((story) => (
                    <button
                      key={story.id}
                      type="button"
                      className="flex flex-col gap-3 cursor-pointer group text-left"
                      onClick={() => openStory(story)}
                    >
                      <div className="bg-white aspect-square flex items-center justify-center p-8 md:p-12">
                        <div className="relative w-full h-full" style={{ boxShadow: '10px 10px 18px -2px rgba(0,0,0,0.49)' }}>
                          <img
                            src={story.cover}
                            alt={story.title}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 group-hover:opacity-0"
                          />
                          {story.images[0] && (
                            <img
                              src={story.images[0]}
                              alt={story.title}
                              loading="lazy"
                              decoding="async"
                              draggable={false}
                              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                            />
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] tracking-[0.2em] font-outfit uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                        {story.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
