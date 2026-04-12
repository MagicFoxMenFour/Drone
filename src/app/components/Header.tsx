import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Кейсы" },
  { href: "/fleet", label: "Флот" },
  { href: "/about", label: "О нас" },
  { href: "/blog", label: "Блог" },
  { href: "/pricing", label: "Цены" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100"
      >
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-6 h-6 bg-blue-600 rounded-sm" />
            <span className="text-xl font-bold text-slate-950 tracking-tighter uppercase">
              Citrix
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive(link.href)
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => navigate("/contacts")}
              className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-slate-950 transition-all active:scale-95"
            >
              Оставить заявку
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-bold uppercase tracking-widest py-3 border-b border-slate-50 transition-colors ${
                    isActive(link.href) ? "text-blue-600" : "text-slate-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contacts"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-bold text-center hover:bg-slate-950 transition-all"
              >
                Оставить заявку
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
