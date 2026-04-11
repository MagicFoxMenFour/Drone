import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'services', label: 'Услуги' },
    { id: 'cases', label: 'Кейсы' },
    { id: 'pricing', label: 'Цены' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100"
      >
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setMobileOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            <div className="w-6 h-6 bg-blue-600 rounded-sm" />
            <span className="text-xl font-bold text-slate-950 tracking-tighter uppercase">Drone Solutions</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Основная навигация">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-sm font-bold text-slate-600 hover:text-slate-950 transition-colors uppercase tracking-widest">
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-slate-950 transition-all active:scale-95"
            >
              Оставить заявку
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-white border-b border-slate-100 shadow-lg md:hidden"
          >
            <nav className="flex flex-col px-8 py-6 gap-2" aria-label="Мобильная навигация">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-base font-bold text-slate-600 hover:text-slate-950 transition-colors uppercase tracking-widest py-3 border-b border-slate-50"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-slate-950 transition-all active:scale-95"
              >
                Оставить заявку
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}