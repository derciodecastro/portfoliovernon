import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products, site, type Product } from '../../data/content';

export function Quiosque() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const openProduct = (product: Product) => {
    setSelected(product);
    setQty(1);
    setActiveImage(0);
  };

  return (
    <motion.section
      key="quiosque"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="size-full overflow-y-auto custom-scrollbar bg-[#e8e4da] text-black"
    >
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key="product-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-full pt-28 md:pt-40 pb-20"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
              <div className="flex gap-3 pl-4 md:pl-16 pr-4">
                <div className="flex flex-col gap-2">
                  {selected.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-14 h-14 overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-black' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img} loading="lazy" decoding="async" draggable={false} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="flex-1 bg-white flex items-center justify-center p-4 md:p-12 aspect-square">
                  <img
                    src={selected.images[activeImage]}
                    alt={selected.name}
                    loading="eager"
                    draggable={false}
                    className="w-full h-full object-contain"
                    style={{ boxShadow: '10px 10px 18px -2px rgba(0,0,0,0.49)' }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-start pt-4 md:pt-4 gap-6 px-4 md:px-16">
                <h1 className="font-serif text-2xl md:text-3xl leading-tight">{selected.name}</h1>
                <p className="text-sm tracking-[0.05em] font-outfit">{selected.price}</p>
                <p className="text-[11px] tracking-[0.15em] font-outfit opacity-60 leading-relaxed uppercase">
                  {selected.description}
                </p>

                <div className="flex items-stretch gap-3 mt-2 w-fit">
                  <div className="flex items-center border border-black/20 bg-white">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-sm hover:bg-black/5 transition-colors">
                      −
                    </button>
                    <span className="px-4 text-sm font-outfit">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-sm hover:bg-black/5 transition-colors">
                      +
                    </button>
                  </div>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent('Encomenda: ' + selected.name)}&body=${encodeURIComponent(
                      `Olá, gostaria de encomendar ${qty}x ${selected.name}.`,
                    )}`}
                    className="bg-black text-white flex items-center justify-center px-10 text-[10px] tracking-[0.3em] uppercase font-outfit font-medium hover:bg-black/80 transition-colors duration-300"
                  >
                    Encomendar
                  </a>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="w-fit text-[10px] tracking-[0.3em] uppercase font-outfit opacity-50 hover:opacity-100 transition-opacity mt-2"
                >
                  ← Voltar
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="product-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-28 md:pt-40 pb-20 px-4 md:px-16"
          >
            <div className="max-w-[1492px] mx-auto">
              <header className="text-center mb-14">
                <p className="text-[10px] tracking-[0.45em] uppercase text-black/40 font-outfit mb-3">Loja</p>
                <h1 className="font-serif text-3xl md:text-4xl leading-tight">Quiosque</h1>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="flex flex-col gap-3 cursor-pointer group text-left"
                    onClick={() => openProduct(product)}
                  >
                    <div className="bg-white aspect-square flex items-center justify-center p-8 md:p-12">
                      <div className="relative w-full h-full" style={{ boxShadow: '10px 10px 18px -2px rgba(0,0,0,0.49)' }}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        <img
                          src={product.images[1]}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-[11px] tracking-[0.2em] uppercase font-outfit opacity-90">{product.name}</span>
                      <span className="text-[11px] tracking-[0.1em] font-outfit opacity-60">{product.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
