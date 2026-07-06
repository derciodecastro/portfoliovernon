import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { Navbar, MobileMenu } from './components/layout/Navbar';
import { Lightbox } from './components/Lightbox';
import { Hero } from './sections/Hero';
import { Biografia } from './sections/Biografia';
import { Imprensa } from './sections/Imprensa';
import { Exibicao } from './sections/Exibicao';
import { Historias } from './sections/Historias';
import { Quiosque } from './sections/Quiosque';
import { Agendamento } from './sections/Agendamento';
import { Galeria } from './sections/Galeria';

import { getSectionImages, slugify } from '../lib/galleries';
import { useHideOnScroll, useContentProtection } from '../lib/hooks';

const EXHIBITIONS = ['as-camadas-da-alma', 'os-mangais-de-angola'];
const LIGHT_SECTIONS = ['biografia', 'imprensa', 'quiosque', 'agendamento', ...EXHIBITIONS];

export default function App() {
  const [section, setSection] = useState('hero');
  const [activeMenu, setActiveMenu] = useState<'foto' | 'exibicoes' | null>(null);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const navbarVisible = useHideOnScroll();
  useContentProtection();

  const galleryImages = getSectionImages(section);

  const navigate = (target: string) => {
    setSection(target);
    setHoveredItem(null);
    setActiveMenu(null);
    setLightboxImage(null);
    window.history.pushState({ section: target }, '', target === 'hero' ? '/' : `#${target}`);
  };

  // Sincroniza com o histórico do browser (voltar/avançar) e hash inicial.
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const next = e.state?.section || window.location.hash.replace('#', '') || 'hero';
      setSection(next);
      setHoveredItem(null);
      setLightboxImage(null);
    };
    window.addEventListener('popstate', onPopState);

    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'hero') setSection(hash);

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const isLight =
    LIGHT_SECTIONS.includes(section) ||
    ['Pessoas', 'Biografia', 'As camadas da alma', 'Os mangais de Angola'].includes(hoveredItem || '');

  const bgClass =
    section === 'agendamento'
      ? 'bg-[#E8E4DA]'
      : section === 'quiosque'
        ? 'bg-[#e8e4da]'
        : LIGHT_SECTIONS.includes(section)
          ? 'bg-[#f5f5f5]'
          : 'bg-black';

  const renderSection = () => {
    if (section === 'hero') return <Hero />;
    if (section === 'biografia') return <Biografia />;
    if (section === 'imprensa') return <Imprensa />;
    if (section === 'agendamento') return <Agendamento />;
    if (section === 'historias') return <Historias />;
    if (section === 'quiosque') return <Quiosque />;
    if (EXHIBITIONS.includes(section)) return <Exibicao slug={section} onSelectImage={setLightboxImage} />;
    return <Galeria section={section} images={galleryImages} onSelectImage={setLightboxImage} />;
  };

  return (
    <div
      className={`size-full ${bgClass} overflow-hidden select-none transition-colors duration-500 ${
        isLight ? 'text-black' : 'text-white'
      }`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Navbar
        visible={navbarVisible}
        isLight={isLight}
        navigate={navigate}
        onHoverItem={setHoveredItem}
        desktopMenuOpen={desktopMenuOpen}
        setDesktopMenuOpen={setDesktopMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <MobileMenu
        open={mobileMenuOpen}
        isLight={LIGHT_SECTIONS.includes(section)}
        navigate={navigate}
        close={() => setMobileMenuOpen(false)}
      />

      {/* Overlay do menu (visual, não bloqueia interações) */}
      <AnimatePresence>
        {(desktopMenuOpen || mobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Blur ao abrir submenu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Fundo ao passar o rato num item do menu */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url('/background_de_botoes/${slugify(hoveredItem)}.jpg')` }}
          />
        )}
      </AnimatePresence>

      {/* Conteúdo */}
      <AnimatePresence mode="wait">
        {lightboxImage === null && (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="size-full"
          >
            <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <Lightbox
            images={galleryImages}
            current={lightboxImage}
            onClose={() => setLightboxImage(null)}
            onChange={setLightboxImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
