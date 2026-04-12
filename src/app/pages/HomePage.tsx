import { Link } from "react-router";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";

const services = [
  {
    slug: "aerial-photography",
    title: "Аэрофотосъемка",
    desc: "Съемка горного рельефа, полей и объектов в 8K для застройщиков и туроператоров Кавказа.",
    icon: "📸",
  },
  {
    slug: "mapping",
    title: "3D-картография",
    desc: "Цифровые модели рельефа для проектирования дорог, ГЭС и агрологистики в СКФО.",
    icon: "🗺",
  },
  {
    slug: "inspection",
    title: "Инспекция",
    desc: "Поиск дефектов на ЛЭП, газопроводах и горных сооружениях без подъема людей.",
    icon: "🔍",
  },
  {
    slug: "agro",
    title: "Агромониторинг",
    desc: "Мультиспектральный анализ посевов — стресс-зоны, точечное орошение, рост урожая.",
    icon: "🌾",
  },
  {
    slug: "thermal",
    title: "Тепловизионная съемка",
    desc: "Выявление утечек тепла, дефектов кровли, мест перегрева оборудования.",
    icon: "🌡",
  },
  {
    slug: "monitoring",
    title: "Охрана периметра",
    desc: "Автономное патрулирование объектов, границ и водоемов в режиме 24/7.",
    icon: "🛡",
  },
];

const stats = [
  { v: "5+", l: "лет опыта" },
  { v: "200+", l: "проектов" },
  { v: "1 см", l: "точность" },
  { v: "15", l: "единиц флота" },
];

const cases = [
  {
    slug: "stavropol-3d",
    category: "Картография",
    title: "Ставрополь 3D",
    desc: "Цифровой двойник промзоны площадью 280 км² для проектирования транспортных развязок.",
    stats: [{ v: "280 км²", l: "площадь" }, { v: "1 см", l: "точность" }],
    accent: "from-blue-950 to-slate-900",
  },
  {
    slug: "kaspiy-patrol",
    category: "Мониторинг",
    title: "Каспий Патруль",
    desc: "Патрулирование 180 км побережья. Время реакции на загрязнения — 22 минуты вместо 5 часов.",
    stats: [{ v: "180 км", l: "маршрут" }, { v: "22 мин", l: "реакция" }],
    accent: "from-cyan-950 to-slate-900",
  },
  {
    slug: "ges-inspect",
    category: "Энергетика",
    title: "ГЭС Инспект",
    desc: "Тепловизионная инспекция ЛЭП Баксанской ГЭС. Выявлено 284 дефекта без риска для людей.",
    stats: [{ v: "284", l: "дефекта" }, { v: "−45%", l: "стоимость" }],
    accent: "from-amber-950 to-slate-900",
  },
];

function StatCard({ v, l, i }: { v: string; l: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <div className="text-5xl lg:text-6xl font-bold text-blue-600 tracking-tighter">{v}</div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{l}</div>
    </motion.div>
  );
}

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen bg-white pt-32 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[70%] h-[60%] lg:w-[60%] lg:h-[80%] z-0">
          <motion.div
            initial={{ skewY: -12, y: 100, opacity: 0 }}
            animate={{ skewY: -12, y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full relative shadow-2xl origin-right overflow-hidden"
            style={{ clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 80%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black" />
            <div className="absolute inset-0 opacity-25" style={{
              backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-3xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 120" className="w-[55%] opacity-60" fill="none">
                <line x1="100" y1="60" x2="35" y2="30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                <line x1="100" y1="60" x2="165" y2="30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                <line x1="100" y1="60" x2="35" y2="90" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                <line x1="100" y1="60" x2="165" y2="90" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                <ellipse cx="35" cy="30" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
                <ellipse cx="165" cy="30" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
                <ellipse cx="35" cy="90" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
                <ellipse cx="165" cy="90" rx="18" ry="6" stroke="#60a5fa" strokeWidth="2" opacity="0.8"/>
                <rect x="86" y="50" width="28" height="20" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2"/>
                <circle cx="100" cy="72" r="5" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5"/>
                <circle cx="100" cy="72" r="2.5" fill="#3b82f6" opacity="0.8"/>
                <circle cx="35" cy="30" r="4" fill="#3b82f6"/>
                <circle cx="165" cy="30" r="4" fill="#3b82f6"/>
                <circle cx="35" cy="90" r="4" fill="#3b82f6"/>
                <circle cx="165" cy="90" r="4" fill="#3b82f6"/>
              </svg>
            </div>
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
            />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] lg:text-[10rem] font-medium leading-[0.8] text-slate-950 tracking-tighter mb-20"
          >
            Небо <br /> Кавказа
          </motion.h1>
          <div className="grid lg:grid-cols-2 gap-12 mt-24 items-end">
            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-slate-900 font-medium max-w-sm leading-snug">
                Профессиональные БПЛА-сервисы для агробизнеса, энергетики и строительства на Северном Кавказе.
              </p>
              <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                <div>Работаем по СКФО и ЮФО</div>
                <div>Лицензия РФ</div>
              </div>
            </div>
            <div className="flex justify-start lg:justify-end pb-10">
              <Link
                to="/contacts"
                className="px-12 py-5 bg-slate-950 text-white rounded-full text-xl font-bold hover:bg-blue-600 transition-all shadow-2xl"
              >
                Начать проект
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((s, i) => <StatCard key={i} v={s.v} l={s.l} i={i} />)}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-slate-50 border-t border-slate-200 py-32">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-7xl lg:text-8xl font-medium tracking-tighter text-slate-950">Услуги</h2>
            <Link to="/services" className="text-sm font-bold text-blue-600 hover:text-slate-950 transition-colors uppercase tracking-widest hidden lg:block">
              Все услуги →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Link
                key={i}
                to={`/services/${s.slug}`}
                className="group bg-white border border-slate-100 p-8 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-6">{s.icon}</div>
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                <div className="mt-6 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Подробнее →
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 lg:hidden">
            <Link to="/services" className="text-sm font-bold text-blue-600 uppercase tracking-widest">Все услуги →</Link>
          </div>
        </div>
      </section>

      {/* Cases preview */}
      <section className="bg-white border-t border-slate-200 py-32">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-7xl lg:text-8xl font-medium tracking-tighter text-slate-950">Проекты</h2>
            <Link to="/cases" className="text-sm font-bold text-blue-600 hover:text-slate-950 transition-colors uppercase tracking-widest hidden lg:block">
              Все проекты →
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <Link
                key={i}
                to={`/cases/${c.slug}`}
                className="group block"
              >
                <div className={`aspect-video bg-gradient-to-br ${c.accent} mb-5 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }} />
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">{c.category}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{c.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4">{c.desc}</p>
                <div className="flex gap-6">
                  {c.stats.map((s, j) => (
                    <div key={j}>
                      <div className="text-lg font-bold text-slate-950">{s.v}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.l}</div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />

      {/* CTA */}
      <section className="relative bg-[#0A0A1B] py-40 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-r from-purple-600 via-blue-500 to-sky-400 opacity-40 blur-[100px]" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 text-center">
          <h2 className="text-[10vw] lg:text-[10rem] font-medium tracking-tighter text-white leading-none mb-12">
            Начнём <br /> проект?
          </h2>
          <Link
            to="/contacts"
            className="inline-block px-20 py-8 bg-white text-[#0A0A1B] rounded-full text-3xl font-bold hover:scale-105 transition-transform shadow-2xl"
          >
            Оставить заявку
          </Link>
        </div>
      </section>
    </>
  );
}
