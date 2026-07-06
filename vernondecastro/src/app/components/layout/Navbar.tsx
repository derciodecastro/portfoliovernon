import { motion, AnimatePresence } from 'motion/react';
import { navGroups } from '../../../data/content';
import { slugify } from '../../../lib/galleries';
import { useClickOutside } from '../../../lib/hooks';

type MenuKey = 'foto' | 'exibicoes' | null;

type NavbarProps = {
  visible: boolean;
  isLight: boolean;
  navigate: (section: string) => void;
  onHoverItem: (item: string | null) => void;
  desktopMenuOpen: boolean;
  setDesktopMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeMenu: MenuKey;
  setActiveMenu: (menu: MenuKey) => void;
};

const linkClass =
  'nav-link text-[11px] tracking-[0.3em] uppercase whitespace-nowrap font-outfit transition-opacity duration-200';

export function Navbar({
  visible,
  isLight,
  navigate,
  onHoverItem,
  desktopMenuOpen,
  setDesktopMenuOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeMenu,
  setActiveMenu,
}: NavbarProps) {
  const desktopRef = useClickOutside<HTMLDivElement>(() => setDesktopMenuOpen(false), desktopMenuOpen);

  const go = (label: string) => {
    navigate(slugify(label));
    setDesktopMenuOpen(false);
    setMobileMenuOpen(false);
    onHoverItem(null);
  };

  const goSection = (section: string) => {
    navigate(section);
    setDesktopMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const submenu = (items: string[]) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex flex-col items-start gap-2 pl-4 border-l border-current/15 mt-1 mb-1 overflow-hidden"
    >
      {items.map((name) => (
        <button
          key={name}
          onMouseEnter={() => onHoverItem(name)}
          onMouseLeave={() => onHoverItem(null)}
          onClick={() => go(name)}
          className={`${linkClass} opacity-55 hover:opacity-100`}
        >
          {name}
        </button>
      ))}
    </motion.div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between transition-transform duration-500 ease-out pointer-events-auto ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${isLight ? 'text-black' : 'text-white'}`}
    >
      <div className="flex items-center gap-4">
        {/* Desktop trigger */}
        <div ref={desktopRef} className="relative hidden md:block">
          <button
            onClick={() => {
              if (!desktopMenuOpen) setDesktopMenuOpen(true);
              else {
                goSection('hero');
                setDesktopMenuOpen(false);
              }
            }}
            className={`${linkClass} font-medium ${desktopMenuOpen ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            {desktopMenuOpen ? 'Página inicial' : 'Menu'}
          </button>

          <AnimatePresence>
            {desktopMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className={`absolute top-full left-0 mt-3 min-w-[220px] ${isLight ? 'text-black' : 'text-white'}`}
              >
                <div className="flex flex-col items-start gap-2">
                  <button
                    onClick={() => setActiveMenu(activeMenu === 'foto' ? null : 'foto')}
                    className={`${linkClass} ${activeMenu === 'foto' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  >
                    Fotos
                  </button>
                  <AnimatePresence>{activeMenu === 'foto' && submenu(navGroups.fotos)}</AnimatePresence>

                  <button
                    onClick={() => setActiveMenu(activeMenu === 'exibicoes' ? null : 'exibicoes')}
                    className={`${linkClass} ${activeMenu === 'exibicoes' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  >
                    Exibições
                  </button>
                  <AnimatePresence>{activeMenu === 'exibicoes' && submenu(navGroups.exibicoes)}</AnimatePresence>

                  {[
                    ['Biografia', 'biografia'],
                    ['Imprensa', 'imprensa'],
                    ['Quiosque', 'quiosque'],
                    ['Agendamentos', 'agendamento'],
                  ].map(([label, section]) => (
                    <button
                      key={section}
                      onMouseEnter={() => onHoverItem(label)}
                      onMouseLeave={() => onHoverItem(null)}
                      onClick={() => goSection(section)}
                      className={`${linkClass} opacity-60 hover:opacity-100`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => {
              if (!mobileMenuOpen) setMobileMenuOpen(true);
              else {
                goSection('hero');
                setMobileMenuOpen(false);
              }
            }}
            className={`${linkClass} font-medium ${mobileMenuOpen ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
          >
            {mobileMenuOpen ? 'Página inicial' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Brand */}
      <button
        onClick={() => goSection('hero')}
        className={`${linkClass} font-medium opacity-70 hover:opacity-100`}
      >
        Vernon De Castro
      </button>

      <div className="flex items-center gap-3 min-w-[3rem] justify-end">
        {(desktopMenuOpen || mobileMenuOpen) && (
          <button
            onClick={() => {
              setDesktopMenuOpen(false);
              setMobileMenuOpen(false);
            }}
            className={`${linkClass} font-medium opacity-60 hover:opacity-100`}
          >
            Fechar
          </button>
        )}
      </div>
    </nav>
  );
}

type MobileMenuProps = {
  open: boolean;
  isLight: boolean;
  navigate: (section: string) => void;
  close: () => void;
};

export function MobileMenu({ open, isLight, navigate, close }: MobileMenuProps) {
  const go = (label: string) => {
    navigate(slugify(label));
    close();
  };
  const goSection = (section: string) => {
    navigate(section);
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed inset-0 z-40 flex flex-col justify-center gap-6 px-10 pt-24 pb-10 overflow-y-auto pointer-events-auto ${
            isLight ? 'bg-[#f5f5f5] text-black' : 'bg-black text-white'
          }`}
        >
          <MobileGroup title="Fotos" items={navGroups.fotos} onSelect={go} />
          <MobileGroup title="Exibições" items={navGroups.exibicoes} onSelect={go} />
          {[
            ['Biografia', 'biografia'],
            ['Imprensa', 'imprensa'],
            ['Quiosque', 'quiosque'],
            ['Agendamentos', 'agendamento'],
          ].map(([label, section]) => (
            <button
              key={section}
              onClick={() => goSection(section)}
              className="text-left text-sm tracking-[0.3em] uppercase font-outfit opacity-70 hover:opacity-100 transition-opacity"
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileGroup({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: string[];
  onSelect: (label: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm tracking-[0.3em] uppercase font-outfit opacity-100">{title}</span>
      <div className="flex flex-col gap-3 pl-4 border-l border-current/15">
        {items.map((name) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className="text-left text-[12px] tracking-[0.25em] uppercase font-outfit opacity-55 hover:opacity-100 transition-opacity"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
